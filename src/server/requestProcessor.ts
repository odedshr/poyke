import { IncomingMessage } from 'http';
import { Route, getRoute } from './router';
import { NotFound, TooLong, Unauthorized } from '../shared/Errors';

export interface Injectable {}

export class OnInit {
	method: Function;

	constructor(method: Function) {
		this.method = method;
	}
}

export class OnInitPromise {
	method: Function;

	constructor(method: Function) {
		this.method = method;
	}
}

export async function processRequest(
	url: string,
	request: IncomingMessage,
	injectables: { [key: string]: Injectable } = {}
): Promise<any> {
	const route: false | Route = getRoute(request.method, url);

	if (!route) {
		return new NotFound('route', url);
	}

	const injectablesAndParameters: { [key: string]: any } = Object.assign(
		{
			remoteIp: fixToIpV4(getRemoteIP(request))
		},
		getParametersFromURL(url, route),
		await getPostData(request).catch(err => {
			console.error('error getting post data', err);
			return {};
		}),
		injectables
	);

	const args: any[] = await getArgumentValues(route.method, injectablesAndParameters, request).catch(err => {
		console.error(`error fetching arguments for ${url}`, err, err instanceof Unauthorized);
		throw err;
	});

	return await executeMethodWithArguments(route.method, args).catch(err => {
		console.error(`error executing method for for ${url}`, err);
		throw err;
	});
}

function getRemoteIP(request: IncomingMessage): string {
	return forceToArray(
		request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress
	).join(', ');
}

function forceToArray(item: any) {
	return Array.isArray(item) ? item : [item];
}

function fixToIpV4(ip: string) {
	return ip.substr(0, 7) == '::ffff:' ? ip.substr(7) : ip;
}

function getParametersFromURL(requestedUrl: string, route: Route): { [key: string]: any } {
	const output: { [key: string]: any } = {};
	const { keys, url } = route;
	let i = 0;

	url.lastIndex = 0;
	let values = url.exec(requestedUrl);
	values.shift();
	const count = Math.min(keys.length, values.length);

	while (i < count) {
		output[keys[i]] = values[i++];
	}

	return output;
}

async function getPostData(request: IncomingMessage): Promise<{ [key: string]: any }> {
	const buffer: string[] = [];

	return new Promise((resolve, reject) => {
		if (request.method == 'POST') {
			request.on('data', data => {
				buffer.push(data);
				if (buffer.length > 1e6) {
					request.connection.destroy();
					reject(new TooLong('input too big', 1e6));
				}
			});

			request.on('end', () => resolve(JSON.parse(buffer.join())));
		}

		resolve({});
	});
}

function getArgumentValues(
	method: Function,
	injectables: { [key: string]: Injectable },
	request: IncomingMessage
): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const argumentNames: string[] = parseArgumentNamesFromFunctionName(method);
		const argumentValues = Promise.all(
			argumentNames.map(
				(argName: string) =>
					new Promise(async (resolveInjectible, rejectInjectible) => {
						const injectable = injectables[argName];

						try {
							if (injectable instanceof OnInit) {
								resolveInjectible(injectable.method(request));
							} else if (injectable instanceof OnInitPromise) {
								resolveInjectible(await injectable.method(request));
							}
						} catch (err) {
							return rejectInjectible(err);
						}

						resolveInjectible(injectable);
					})
			)
		).catch(err => {
			throw err;
		});

		resolve(argumentValues);
	});
}

async function executeMethodWithArguments(method: Function, argumentValues: any[]) {
	try {
		return await method(...argumentValues);
	} catch (err) {
		return err;
	}
}

function parseArgumentNamesFromFunctionName(method: Function): string[] {
	const items = method.toString().match(/^function\s?[^\(]+\s?\(([^\)]+)\)+/);

	return items === null ? [] : items[1].replace(/\s/g, '').split(',');
}

// TODO: for every method, parse the inputs and prepare a caller function that fetches the right inputs
// TODO: when the url matches, pass the request and response into the caller function

/*

import url from 'url';
import { Errors } from 'groundup';
import logger from './logger.js';
import { emailPattern, maskedIdPattern as idPattern, urlParamPattern } from './validations.js';
import config from './../config.js';
import Encryption from './Encryption.js';

const apiUrlPrefix = config.apiUrlPrefix || '';

function readRequestParameters (request, keys, reURL) {
  const output = {};
  let values, count, i;

  reURL.lastIndex = 0;
  values = reURL.exec(request.url.toString());
  values.shift();
  count = Math.min(keys.length, values.length);

  for (i = 0; i < count; i++) {
    output[keys[i]] = values[i];
  }

  return output;
}

function read(req, urlParameters, reURL) {
  let output = {};

  try {
    return Object.assign({}, 
      readRequestParameters(req, urlParameters, reURL),
      url.parse(req.url, true).query,
      //req.params,
      req.body);
  } catch (err) {
    logger.error(new Errors.BadInput('Reading URL inputs', '', err));
  }

  return output;
}

function addObjectSizes(data) {
  Object.keys(data).forEach(key => {
    const value = data[key];

    if (value !== null && value !== undefined) {
      if (Array.isArray(data[key])) {
        data[`${key}Length`] = data[key].length;
      } else if (typeof data[key] === 'object' && key !== 'error') {
        data[`${key}Size`] = Object.keys(data[key]).length;
      }
    }
  });
}

function getAuthToken(req) {
  return {
    localIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    serverIP: `${config.ip}:${config.port}`
  };
}

class Context {
  constructor(url, type, handler, db, fileManager, mailer) {
    const { regex, urlParameters } = parseURL(url);

    this.db = db;
    this.urlPattern = regex;
    this.type = type;
    this.handler = handler;
    this.urlParameters = urlParameters;
    this.parameters = parseArgumentsFromFunctionName(handler),
    this.fileManager = fileManager;
    this.mailer = mailer;
  }

  getType() {
    return this.type;
  }

  getURL() {
    return this.urlPattern;
  }

  getHandler() {
    return this.adapter.bind(this);
  }

  adapter(req, res) {
    const startTime = new Date();
    try {
      this._readRequest(req)
        .then(args => this.handler(...args))
        .then(data => this._writeResponse(res, startTime, data));
    } catch (err) {
      console.trace(err);
      logger.error('Failed processing request', err);
      write(res, startTime, err);

      return false;
    }
  }

  _readRequest(req) {
    return new Promise(resolve => resolve())
    .then(() => {
      const input = read(req, this.urlParameters, this.urlPattern);

      return this.parameters.map(parameter => input[parameter] || this._getFromContext(parameter, req));
    });
  }

  _getFromContext(parameter, req) {
    switch (parameter) {
      case 'db':
        return this.db;
      case 'authToken':
        return getAuthToken(req);
      case 'authUser':
        if (req.headers.authorization === undefined) {
          throw new Errors.Unauthorized();
        }

        try {
          value = JSON.parse(Encryption.decode(req.headers.authorization));
        } catch (err) {
          throw new Errors.Unauthorized(err);
        }

        if (value.expires instanceof Date && value.expires < (new Date())) {
          throw new Errors.Unauthorized(err);
        }

        token = getAuthToken(req);

        if (token.localIP !== value.localIP || token.serverIP !== value.serverIP) {
          throw new Errors.Unauthorized(err);
        }

        return value.user;
      case 'optionalUser':
        try {
          return JSON.parse(Encryption.decode(req.headers.authorization)).user;
        } catch (err) {
          return undefined;
        }

      case 'isReturnJson':
        return (req.get('accept').indexOf('json') !== -1);
      case 'files':
        return this.fileManager;
      case 'mailer':
        return this.mailer;
    }
  }

  _writeResponse(response, startTime, data) {
    if (data === undefined || data === null) {
      response.end();
    } else if (data._file !== undefined) {
      return response
        .writeHead(200, { 'Content-Type': data._file })
        .end(data.content, 'binary');
    } else if (data._redirect !== undefined) {
      return response
        .writeHead(302, { Location: data._redirect })
        .end();
    } else {
      if (data instanceof Error) {
        data = {
          message: data.message,
          details: data.details,
          status: data.status || 500
        };
      } else if (typeof data !== 'object') {
        data = { result: data };
      }
  
      addObjectSizes(data);
      data.status = data.status || 200;
      data.processTime = (new Date() - startTime) / 1000;
      response
        .status(data.status)
        .end(JSON.stringify(data));
    }
  }
}

export default Context;
/*
module.exports = function ContextTemplate(url, def, FileManager, Mailer) {
    context = function Context(req, res) {
      var args = [],
          input = read(req, url, urlPattern),
          value,
          settings,
          isHandlerAsync = false,
          authorizationProblem = false,

          writeToRes = write.bind({}, res, new Date());

      try {
        parameters.forEach(function perParameter(parameter) {
          var token;

          value = input[parameter];
          settings = urlParameters ? urlParameters[parameter] : false;

          if (value === undefined) {
            switch (parameter) {
              case 'callback':
                value = writeToRes;
                isHandlerAsync = true;
                break;
              case 'db':
                value = req.models;
                break;
              case 'authToken':
                value = getAuthToken(req);
                break;
              case 'authUser':
                if (req.headers.authorization === undefined) {
                  authorizationProblem = true;

                  return;
                }

                try {
                  value = JSON.parse(Encryption.decode(req.headers.authorization));
                } catch (err) {
                  authorizationProblem = true;

                  return;
                }

                if (value.expires instanceof Date && value.expires < (new Date())) {
                  authorizationProblem = true;

                  return;
                }

                token = getAuthToken(req);

                if (token.localIP !== value.localIP || token.serverIP !== value.serverIP) {
                  writeToRes(Errors.unauthorized());
                  authorizationProblem = true;

                  return;
                }

                value = value.user;
                break;
              case 'optionalUser':
                try {
                  value = JSON.parse(Encryption.decode(req.headers.authorization)).user;
                } catch (err) {
                  value = undefined;
                }

                break;
              case 'isReturnJson':
                value = (req.get('accept').indexOf('json') !== -1);
                break;
              case 'files':
                value = FileManager;
                break;
              case 'mailer':
                value = Mailer;
                break;
            }
          }

          if (settings !== undefined) {
            if (settings.alias !== undefined) {
              value = input[settings.alias];
            }

            if (settings.value !== undefined) {
              value = settings.value;
            }
          }

          args.push(value);
        });

        if (authorizationProblem) {
          writeToRes(Errors.unauthorized());

          return;
        }

        try {
          value = action.apply(this, args);
        } catch (err) {
          log(err);
          writeToRes(Errors.systemError(err, args, req.url));

          return false;
        }

        if (!isHandlerAsync) {
          writeToRes(value);
        } else {
          return value;
        }
      } catch (err) {
        err.details = {
          args: args,
          url: req.method + ':' + req.url,
          message: err.message
        };
        log(''.concat('error in URL ', res.req.method, ':', res.req.url));
        log(err, 'fatal');

        try {
          writeToRes(err);
        }
        catch (err) {
          try {
            log('failed to use writeToRes');
            res.status(500).end(err);
          }
          catch (err) {
            log('failed to send any response', 'fatal');
          }
        }

        return false;
      }
    };



    return context;
  };
*/
