'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var readline = require('readline');
var dotenv = require('dotenv');
var path = require('path');
var https = require('https');
var passport = require('passport');
var passportLocal = require('passport-local');
var sendMailNameSpace = require('sendmail');
var sendMailNameSpace__default = _interopDefault(sendMailNameSpace);
require('crypto');
var jwtSimple = require('jwt-simple');
var os = require('os');
var sqlite3 = require('sqlite3');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var DetailedError = /** @class */ (function (_super) {
    __extends(DetailedError, _super);
    function DetailedError(message, status, details, stack) {
        var _this = _super.apply(this, Array.from(arguments)) || this;
        _this.message = message;
        _this.stack = stack;
        _this.status = status;
        _this.details = details;
        return _this;
    }
    DetailedError.prototype.getStackTrace = function () {
        var messages = [this.toString() || this.message], ptr = this;
        if (this.stack) {
            if (typeof this.stack.replace === 'function') {
                messages.push(JSON.stringify(this.stack
                    .replace(/^[^\(]+?[\n$]/gm, '')
                    .replace(/^\s+at\s+/gm, '')
                    .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
                    .split('\n'), null, 4));
            }
            else {
                while (ptr.stack) {
                    messages.push(ptr.stack.toString());
                    ptr = ptr.stack;
                }
            }
        }
        return messages.join('\n');
    };
    DetailedError.prototype.getString = function () {
        return this.message;
    };
    return DetailedError;
}(Error));
var AlreadyExists = /** @class */ (function (_super) {
    __extends(AlreadyExists, _super);
    function AlreadyExists(varType, value) {
        return _super.call(this, 'already-exists', AlreadyExists.status, { key: varType, value: value }) || this;
    }
    AlreadyExists.status = 409;
    return AlreadyExists;
}(DetailedError));
var BadInput = /** @class */ (function (_super) {
    __extends(BadInput, _super);
    function BadInput(key, value) {
        return _super.call(this, 'bad-input', BadInput.status, { key: key, value: value }) || this;
    }
    BadInput.prototype.toString = function () {
        return "Bad Input for " + this.details.key + " (" + this.details.value + ")";
    };
    BadInput.status = 406;
    return BadInput;
}(DetailedError));
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(action, description, error) {
        return _super.call(this, 'custom-error', Custom.status, { key: action, value: description }, error) || this;
    }
    Custom.prototype.toString = function () {
        return this.details.key + " " + this.details.value;
    };
    Custom.status = 500;
    return Custom;
}(DetailedError));
var Expired = /** @class */ (function (_super) {
    __extends(Expired, _super);
    function Expired(varName) {
        return _super.call(this, 'expired', Expired.status, { key: varName }) || this;
    }
    Expired.status = 406;
    return Expired;
}(DetailedError));
var Immutable = /** @class */ (function (_super) {
    __extends(Immutable, _super);
    function Immutable(varType) {
        return _super.call(this, 'immutable', Immutable.status, { key: varType }) || this;
    }
    Immutable.status = 406;
    return Immutable;
}(DetailedError));
var MissingInput = /** @class */ (function (_super) {
    __extends(MissingInput, _super);
    function MissingInput(varName) {
        return _super.call(this, 'missing-input', MissingInput.status, { key: varName }) || this;
    }
    MissingInput.prototype.toString = function () {
        return "Missing Input: " + this.details.key;
    };
    MissingInput.status = 406;
    return MissingInput;
}(DetailedError));
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(type, id) {
        return _super.call(this, 'not-found', NotFound.status, { key: type, value: id }) || this;
    }
    NotFound.prototype.toString = function () {
        return this.details.key + " not Found: " + this.details.value;
    };
    NotFound.status = 404;
    return NotFound;
}(DetailedError));
var NoPermissions = /** @class */ (function (_super) {
    __extends(NoPermissions, _super);
    function NoPermissions(actionName) {
        return _super.call(this, 'no-permissions', NoPermissions.status, { action: actionName }) || this;
    }
    NoPermissions.status = 401;
    return NoPermissions;
}(DetailedError));
var SaveFailed = /** @class */ (function (_super) {
    __extends(SaveFailed, _super);
    function SaveFailed(varName, content, error) {
        return _super.call(this, 'save-failed', SaveFailed.status, { key: varName, value: content }, error) || this;
    }
    SaveFailed.status = 500;
    return SaveFailed;
}(DetailedError));
var System = /** @class */ (function (_super) {
    __extends(System, _super);
    function System(error, args, url) {
        return _super.call(this, 'system-error', System.status, { args: args, error: error, url: url }, error) || this;
    }
    System.status = 500;
    return System;
}(DetailedError));
var TooLong = /** @class */ (function (_super) {
    __extends(TooLong, _super);
    function TooLong(varName, value, max) {
        if (max === void 0) { max = '?'; }
        return _super.call(this, 'too-long', TooLong.status, { key: varName, value: value, max: max }) || this;
    }
    TooLong.prototype.toString = function () {
        return this.details.key + " is longer than " + this.details.max + " (" + this.details.value + ")";
    };
    TooLong.status = 406;
    return TooLong;
}(DetailedError));
var TooShort = /** @class */ (function (_super) {
    __extends(TooShort, _super);
    function TooShort(varName, value, min) {
        if (min === void 0) { min = '?'; }
        return _super.call(this, 'too-short', TooShort.status, { key: varName, value: value, min: min }) || this;
    }
    TooShort.prototype.toString = function () {
        return this.details.key + " is shorter than " + this.details.min + " (" + this.details.value + ")";
    };
    TooShort.status = 406;
    return TooShort;
}(DetailedError));
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized() {
        return _super.call(this, 'unauthorized', Unauthorized.status, {}) || this;
    }
    Unauthorized.status = 401;
    return Unauthorized;
}(DetailedError));
//# sourceMappingURL=Errors.js.map

var key = "encription-" + process.env.npm_package_version;
function decode(encryptedString) {
    return jwtSimple.decode(encryptedString, key);
}
//# sourceMappingURL=encryption.js.map

function getServerIPs() {
    var ifaces = os.networkInterfaces();
    return Object.keys(ifaces).reduce(function (memo, key) {
        memo.push.apply(memo, ifaces[key].filter(function (iface) { return 'IPv4' === iface.family && iface.internal === false; }).map(function (iface) { return iface.address; }));
        return memo;
    }, []);
}
//# sourceMappingURL=http-utils.js.map

var sendmail = sendMailNameSpace__default();
function sendSignInEmail(email, token) {
    console.log('sendSignInEmail');
    var x = sendmail({
        from: 'no-reply@yourdomain.com',
        to: email,
        subject: 'test sendmail',
        html: "Mail of test sendmail: " + token
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    console.log('res=', x);
}
function getAuthUser(req) {
    return new Promise(function (resolve, reject) {
        var value;
        // not authorized
        if (req.headers.authorization === undefined) {
            return reject(new Unauthorized());
        }
        // bad auth code
        try {
            value = JSON.parse(decode(req.headers.authorization));
        }
        catch (err) {
            return reject(new Unauthorized());
        }
        // auth expired
        if (value.expires instanceof Date && value.expires < new Date()) {
            return reject(new Unauthorized());
        }
        var token = getAuthToken(req);
        // wrong auth code
        if (token.localIP !== value.localIP || token.serverIP !== value.serverIP) {
            throw new Unauthorized();
        }
        resolve(value.user);
    });
}
function getAuthToken(req) {
    var headers = req.headers['x-forwarded-for'];
    return {
        localIP: (Array.isArray(headers) ? headers.join(';') : headers) || req.connection.remoteAddress,
        serverIP: getServerIPs().join(';')
    };
}
function getOptionalUser(req) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    try {
                        resolve(JSON.parse(decode(req.headers.authorization)).user);
                    }
                    catch (err) {
                        reject(err);
                    }
                })];
        });
    });
}
//# sourceMappingURL=authentication.js.map

var routes = [
    {
        type: 'get',
        url: /\/ping/,
        method: function () {
            return { response: 'pong' };
        }
    },
    {
        type: 'get',
        url: /\/test-db/,
        method: function (test) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log('11');
                    test();
                    console.log('2');
                    return [2 /*return*/, { response: 'tested' }];
                });
            });
        }
    },
    {
        type: 'get',
        url: /\/test\/{{email}}/,
        method: function (email, authUser) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log('email:', email, authUser);
                    return [2 /*return*/, { response: 'tested' }];
                });
            });
        }
    },
    {
        type: 'post',
        url: /\/signin/,
        method: function (email) {
            sendSignInEmail(email, 'xxx');
            return { response: 'signedin' };
        }
    }
];
//# sourceMappingURL=routes.js.map

var emailPattern = '((([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]' +
    '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))';
var maskedIdPattern = '([\\w\\d\\-]+)';
// const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
// const tagOrComment = new RegExp(
// 	'<(?:' +
// 		'!--(?:(?:-*[^->])*--+|-?)' +
// 		'|script\\b' +
// 		tagBody +
// 		'>[\\s\\S]*?</script\\s*' +
// 		'|style\\b' +
// 		tagBody +
// 		'>[\\s\\S]*?</style\\s*' +
// 		'|/?[a-z]' +
// 		')>',
// 	'gi'
// );
//# sourceMappingURL=validations.js.map

var urlParamPattern = new RegExp('\\{\\{([^#]+?)\\}\\}', 'g');
var routes$1 = {
    get: [],
    post: [],
    put: [],
    delete: []
};
routes.forEach(function (route) {
    var _a = getArgumentNamesFromUrlTempalte(route.url), keys = _a.keys, url = _a.url;
    routes$1[route.type].push({
        type: route.type,
        method: route.method,
        original: route.url,
        keys: keys,
        url: url
    });
});
function getArgumentNamesFromUrlTempalte(urlTemplate) {
    var keys = [];
    var urlString = urlTemplate.source;
    var item;
    while ((item = urlParamPattern.exec(urlString)) !== null) {
        // item[0] = {{key:type}}, item[1] = key:type
        var _a = item[1].split(':'), key = _a[0], type = _a[1];
        keys.push(key);
        try {
            urlString = urlString.split(item[0]).join(getPatternByType(type || key));
        }
        catch (err) {
            console.error(err);
            throw new BadInput(urlTemplate.source, err);
        }
    }
    return { keys: keys, url: new RegExp(urlString) };
}
function getPatternByType(type) {
    switch (type) {
        case 'id':
            return maskedIdPattern;
        case 'email':
            return emailPattern;
        case 'string':
            return '(.+)';
        case 'integer':
            return '(\\d+)';
        default:
            throw new NotFound('url-param', type);
    }
}
function getRoute(requestMethod, url) {
    var _a;
    return (_a = routes$1[requestMethod.toLocaleLowerCase()]) === null || _a === void 0 ? void 0 : _a.find(function (route) { return url.match(route.url); });
}
//# sourceMappingURL=router.js.map

var OnInit = /** @class */ (function () {
    function OnInit(method) {
        this.method = method;
    }
    return OnInit;
}());
var OnInitPromise = /** @class */ (function () {
    function OnInitPromise(method) {
        this.method = method;
    }
    return OnInitPromise;
}());
function processRequest(url, request, injectables) {
    if (injectables === void 0) { injectables = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var route, injectablesAndParameters, _a, _b, _c, args;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    route = getRoute(request.method, url);
                    if (!route) {
                        return [2 /*return*/, new NotFound('route', url)];
                    }
                    _b = (_a = Object).assign;
                    _c = [{
                            remoteIp: fixToIpV4(getRemoteIP(request))
                        },
                        getParametersFromURL(url, route)];
                    return [4 /*yield*/, getPostData(request).catch(function (err) {
                            console.error('error getting post data', err);
                            return {};
                        })];
                case 1:
                    injectablesAndParameters = _b.apply(_a, _c.concat([_d.sent(),
                        injectables]));
                    return [4 /*yield*/, getArgumentValues(route.method, injectablesAndParameters, request).catch(function (err) {
                            console.error("error fetching arguments for " + url, err, err instanceof Unauthorized);
                            throw err;
                        })];
                case 2:
                    args = _d.sent();
                    return [4 /*yield*/, executeMethodWithArguments(route.method, args).catch(function (err) {
                            console.error("error executing method for for " + url, err);
                            throw err;
                        })];
                case 3: return [2 /*return*/, _d.sent()];
            }
        });
    });
}
function getRemoteIP(request) {
    return forceToArray(request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress).join(', ');
}
function forceToArray(item) {
    return Array.isArray(item) ? item : [item];
}
function fixToIpV4(ip) {
    return ip.substr(0, 7) == '::ffff:' ? ip.substr(7) : ip;
}
function getParametersFromURL(requestedUrl, route) {
    var output = {};
    var keys = route.keys, url = route.url;
    var i = 0;
    url.lastIndex = 0;
    var values = url.exec(requestedUrl);
    values.shift();
    var count = Math.min(keys.length, values.length);
    while (i < count) {
        output[keys[i]] = values[i++];
    }
    return output;
}
function getPostData(request) {
    return __awaiter(this, void 0, void 0, function () {
        var buffer;
        return __generator(this, function (_a) {
            buffer = [];
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (request.method == 'POST') {
                        request.on('data', function (data) {
                            buffer.push(data);
                            if (buffer.length > 1e6) {
                                request.connection.destroy();
                                reject(new TooLong('input too big', 1e6));
                            }
                        });
                        request.on('end', function () { return resolve(JSON.parse(buffer.join())); });
                    }
                    resolve({});
                })];
        });
    });
}
function getArgumentValues(method, injectables, request) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var argumentNames = parseArgumentNamesFromFunctionName(method);
        var argumentValues = Promise.all(argumentNames.map(function (argName) {
            return new Promise(function (resolveInjectible, rejectInjectible) { return __awaiter(_this, void 0, void 0, function () {
                var injectable, _a, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            injectable = injectables[argName];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, , 6]);
                            if (!(injectable instanceof OnInit)) return [3 /*break*/, 2];
                            resolveInjectible(injectable.method(request));
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(injectable instanceof OnInitPromise)) return [3 /*break*/, 4];
                            _a = resolveInjectible;
                            return [4 /*yield*/, injectable.method(request)];
                        case 3:
                            _a.apply(void 0, [_b.sent()]);
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            err_1 = _b.sent();
                            return [2 /*return*/, rejectInjectible(err_1)];
                        case 6:
                            resolveInjectible(injectable);
                            return [2 /*return*/];
                    }
                });
            }); });
        })).catch(function (err) {
            throw err;
        });
        resolve(argumentValues);
    });
}
function executeMethodWithArguments(method, argumentValues) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, method.apply(void 0, argumentValues)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, err_2];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function parseArgumentNamesFromFunctionName(method) {
    var items = method.toString().match(/^function\s?[^\(]+\s?\(([^\)]+)\)+/);
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
//# sourceMappingURL=requestProcessor.js.map

function write(response, startTime, data) {
    if (data === undefined || data === null) {
        response.end();
    }
    else if (data._file !== undefined) {
        response.writeHead(200, { 'Content-Type': data._file });
        return response.end(data.content, 'binary');
    }
    else if (data._redirect !== undefined) {
        response.writeHead(302, { Location: data._redirect });
        return response.end();
    }
    else {
        if (data instanceof DetailedError) {
            data = {
                message: data.message,
                details: data.details,
                status: data.status || 500
            };
        }
        else if (typeof data !== 'object') {
            data = { result: data };
        }
        addObjectSizes(data);
        data.status = data.status || 200;
        data.processTime = getSecondsSince(startTime);
        response.writeHead(data.status);
        response.end(JSON.stringify(data));
    }
}
function getSecondsSince(startTime) {
    return (new Date().getTime() - startTime.getTime()) / 1000;
}
function addObjectSizes(data) {
    Object.keys(data).forEach(function (key) {
        var value = data[key];
        if (value !== null && value !== undefined) {
            if (Array.isArray(data[key])) {
                data[key + "Length"] = data[key].length;
            }
            else if (typeof data[key] === 'object' && key !== 'error') {
                data[key + "Size"] = Object.keys(data[key]).length;
            }
        }
    });
}
//# sourceMappingURL=responseWriter.js.map

var WebServer = /** @class */ (function () {
    function WebServer(port, rootFolder, defaultFile, injectables) {
        this.defaultFile = 'index.html';
        this.injectables = {};
        this.rootFolder = rootFolder;
        this.defaultFile = defaultFile;
        this.port = port;
        this.injectables = injectables;
    }
    WebServer.prototype.createServer = function (rootFolder, defaultFile, injectables) {
        return __awaiter(this, void 0, void 0, function () {
            var sslDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExistingOrNewSSLDetails()];
                    case 1:
                        sslDetails = _a.sent();
                        return [2 /*return*/, https.createServer(sslDetails, this.getHandleRequest(rootFolder, defaultFile, injectables))];
                }
            });
        });
    };
    WebServer.prototype.start = function (port) {
        if (port === void 0) { port = this.port; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.server) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.createServer(this.rootFolder + "/www", this.defaultFile, this.injectables)];
                    case 1:
                        _a.server = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.server.listen(port);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebServer.prototype.stop = function () {
        this.server.close();
    };
    WebServer.prototype.getHandleRequest = function (wwwFolder, defaultFile, injectables) {
        return function handleRequest(request, response) {
            return __awaiter(this, void 0, void 0, function () {
                var url, startTime, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = getUrlFromRequest(request, defaultFile);
                            if (!!serveFile(wwwFolder, url, response)) return [3 /*break*/, 2];
                            startTime = new Date();
                            return [4 /*yield*/, processRequest(url, request, injectables).catch(function (err) {
                                    switch (err.status) {
                                        case NotFound.status:
                                            handleUnknownUrl(wwwFolder, request, response);
                                            break;
                                        case Unauthorized.status:
                                            response.writeHead(err.status);
                                            response.end(err.message);
                                            break;
                                        default:
                                            console.error('unhandled error', err);
                                    }
                                })];
                        case 1:
                            result = _a.sent();
                            try {
                                write(response, startTime, result);
                            }
                            catch (err) {
                                response.writeHead(err.statusCode);
                                response.end(err.message);
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
    };
    WebServer.prototype.getExistingOrNewSSLDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errMessage, key, cert;
            return __generator(this, function (_a) {
                errMessage = "\nCRITICAL ERROR: SSL DETAILS ARE MISSING.\nRun the command `openssl req -nodes -new -x509 -keyout " + this.rootFolder + "/var/server.key -out " + this.rootFolder + "/var/server.cert`\nand paste in chrome `chrome://flags/#allow-insecure-localhost`\n";
                key = this.rootFolder + "/var/server.key";
                cert = this.rootFolder + "/var/server.cert";
                this.throwIfFileNotExist(key, errMessage);
                this.throwIfFileNotExist(cert, errMessage);
                return [2 /*return*/, new Promise(function (resolve) {
                        return resolve({
                            key: fs.readFileSync(key, 'utf8'),
                            cert: fs.readFileSync(cert, 'utf8')
                        });
                    })];
            });
        });
    };
    WebServer.prototype.throwIfFileNotExist = function (file, errMessage) {
        if (!fs.existsSync(file)) {
            console.error(errMessage);
            throw new NotFound('ssl', file);
        }
    };
    return WebServer;
}());
var verifyLocalStrategy = function (username, password, done) {
    // done(err);
    //done(null, false, { message: 'Incorrect username.' });
    console.log('verifyLocalStrategy', username, password);
    return done(null, { email: 'odedshr@gmail.com', username: username, password: password });
};
passport.use(new passportLocal.Strategy(verifyLocalStrategy));
function getUrlFromRequest(request, defaultFile) {
    var url = request.url;
    if ('/' === url) {
        url = "/" + defaultFile;
    }
    return url;
}
function serveFile(root, url, response, statusCode) {
    if (statusCode === void 0) { statusCode = 200; }
    var filePath = "" + root + url;
    if (!fs.existsSync(filePath)) {
        return false;
    }
    try {
        var data = fs.readFileSync(path.join(__dirname, filePath));
        response.writeHead(200);
        response.end(data);
    }
    catch (err) {
        response.writeHead(statusCode);
        response.end(JSON.stringify(err));
    }
    return true;
}
function handleUnknownUrl(root, request, response) {
    console.error('404 not Found', request.url);
    serveFile(root, '404.html', response, 404);
}
//# sourceMappingURL=WebServer.js.map

var DataProvider = /** @class */ (function () {
    function DataProvider(connectionStr) {
        this.connectionStr = connectionStr;
    }
    DataProvider.prototype.getDB = function () {
        var sqlite3$1 = sqlite3.verbose();
        return new sqlite3$1.Database(this.connectionStr);
    };
    DataProvider.prototype.init = function (migrationFolder) {
        if (migrationFolder === void 0) { migrationFolder = ':memory:'; }
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.getDB();
                        return [4 /*yield*/, this.updateDB(db, migrationFolder)];
                    case 1:
                        _a.sent();
                        db.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataProvider.prototype.updateDB = function (db, migrationFolder) {
        return __awaiter(this, void 0, void 0, function () {
            var versionRecord, version, migrationsFiles, newVersion_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, get(db, 'PRAGMA user_version')];
                    case 1:
                        versionRecord = _a.sent();
                        version = '' + versionRecord.user_version;
                        migrationsFiles = fs.readdirSync(migrationFolder)
                            .filter(function (filename) { return version < filename.match(/-((\d+\.?)*)\.sql/)[1]; })
                            .sort();
                        if (migrationsFiles.length) {
                            newVersion_1 = migrationsFiles[migrationsFiles.length - 1].match(/-(\d+)\.sql/)[1];
                            db.serialize(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            migrationsFiles.forEach(function (filename) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, exec(db, fs.readFileSync(migrationFolder + "/" + filename, 'utf-8'))];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            }); }); });
                                            return [4 /*yield*/, exec(db, "PRAGMA user_version=" + newVersion_1)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            console.info("db migrated from v" + version + "  to v" + newVersion_1);
                        }
                        else {
                            console.info("db is up to date (v" + version + ")");
                        }
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    DataProvider.prototype.test = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.getDB();
                        return [4 /*yield*/, test(db)];
                    case 1:
                        _a.sent();
                        db.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DataProvider;
}());
function exec(db, query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    return db.exec(query, function (err) {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    });
                })];
        });
    });
}
function get(db, query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    db.get(query, function (err, row) {
                        if (err) {
                            reject(err);
                        }
                        resolve(row);
                    });
                })];
        });
    });
}
function test(db) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    db.serialize(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, stmt, i;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    // db.run('CREATE TABLE lorem (info TEXT)');
                                    _b = (_a = console).log;
                                    return [4 /*yield*/, get(db, 'PRAGMA user_version')];
                                case 1:
                                    // db.run('CREATE TABLE lorem (info TEXT)');
                                    _b.apply(_a, [_c.sent()]);
                                    stmt = db.prepare('INSERT INTO lorem VALUES (?)');
                                    for (i = 0; i < 10; i++) {
                                        stmt.run('Ipsum ' + i);
                                    }
                                    stmt.finalize();
                                    db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
                                        console.log(row.id + ': ' + row.info);
                                    });
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                })];
        });
    });
}
//# sourceMappingURL=data-provider.js.map

function init(prameters) {
    return __awaiter(this, void 0, void 0, function () {
        var dataProvider, injectables, rootFolder, defaultFile, port, server;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataProvider = new DataProvider('./dist/var/db.sql');
                    return [4 /*yield*/, dataProvider.init('./src/sql')];
                case 1:
                    _a.sent();
                    injectables = {
                        authUser: new OnInitPromise(function (req) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getAuthUser(req)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }),
                        optionalUser: new OnInitPromise(function (req) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getOptionalUser(req)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }),
                        test: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, dataProvider.test()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }
                    };
                    rootFolder = process.cwd() + "/" + process.env.npm_package_rootFolder;
                    defaultFile = 'index.html';
                    port = +prameters.PORT;
                    server = new WebServer(port, rootFolder, defaultFile, injectables);
                    return [4 /*yield*/, server.start(port).catch(function (err) { return console.error(err); })];
                case 2:
                    _a.sent();
                    console.log("server running on port " + port);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=main.js.map

function checkForRequiredVariables(varCollection, lookFor) {
    var existingKeys = Object.keys(varCollection);
    return lookFor.filter(function (varName) { return !existingKeys.includes(varName); });
}
function readExistingEnvFile(envFile) {
    var existingVars = fs.existsSync(envFile) ? dotenv.parse(fs.readFileSync('./.env')) : {};
    var output = {};
    for (var k in existingVars) {
        output[k] = existingVars[k];
    }
    return output;
}
function mergeToExistingFile(varNames) {
    return __awaiter(this, void 0, void 0, function () {
        var envFile, vars, merged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    envFile = './.env';
                    return [4 /*yield*/, getVariables()];
                case 1:
                    vars = _a.sent();
                    merged = __assign(__assign({}, readExistingEnvFile(envFile)), vars);
                    fs.writeFileSync(envFile, toEnvFileFormat(merged));
                    return [2 /*return*/, merged];
            }
        });
    });
}
function toEnvFileFormat(vars) {
    return Object.keys(vars)
        .map(function (key) { return key + "=" + vars[key]; })
        .join('\n');
}
function ask(rl, question) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return rl.question(question, resolve); })];
        });
    });
}
function getVariables(vars) {
    return __awaiter(this, void 0, void 0, function () {
        var rl;
        var _this = this;
        return __generator(this, function (_a) {
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var email, password;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                rl.on('close', resolve);
                                return [4 /*yield*/, ask(rl, '>Email: ')];
                            case 1:
                                email = _a.sent();
                                return [4 /*yield*/, ask(rl, '>Password: ')];
                            case 2:
                                password = _a.sent();
                                console.log("SYS_EMAIL=" + email + "\nSYS_EMAIL_PASSWORD=" + password);
                                rl.close();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function setupVariables() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var envFileContent = dotenv.config().parsed;
                    var missingVariables = checkForRequiredVariables(__assign(__assign({}, process.env), envFileContent), [
                        'SYS_EMAIL_USER',
                        'SYS_EMAIL_PASSWORD',
                        'PORT'
                    ]);
                    if (missingVariables.length) {
                        resolve(mergeToExistingFile(__assign(__assign({}, envFileContent), missingVariables)));
                    }
                    else {
                        resolve(envFileContent);
                    }
                })];
        });
    });
}
setupVariables().then(function (parameters) {
    init(parameters);
});
