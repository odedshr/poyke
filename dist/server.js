/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/ClientManager.ts":
/*!*************************************!*\
  !*** ./src/server/ClientManager.ts ***!
  \*************************************/
/*! exports provided: keepAlive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keepAlive", function() { return keepAlive; });
function keepAlive(position, type, remoteIp, fireWebServerEvent) {
    fireWebServerEvent({
        action: 'keepAlive',
        params: {
            position: position,
            type: type,
            remoteIp: remoteIp
        }
    });
    return {
        response: "submitted=" + position + ":" + type
    };
}


/***/ }),

/***/ "./src/server/WebServer.ts":
/*!*********************************!*\
  !*** ./src/server/WebServer.ts ***!
  \*********************************/
/*! exports provided: init, start, stop, readRequestParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readRequestParameters", function() { return readRequestParameters; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _requestProcessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./requestProcessor */ "./src/server/requestProcessor.ts");
/* harmony import */ var _responseWriter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./responseWriter */ "./src/server/responseWriter.ts");
/* harmony import */ var _shared_Errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/Errors */ "./src/shared/Errors.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};






function init(port, wwwFolder, injectables, defaultFile) {
    if (injectables === void 0) { injectables = {}; }
    if (defaultFile === void 0) { defaultFile = 'index.html'; }
    var handleRequest = function handleRequest(request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var url, startTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = getUrlFromRequest(request, defaultFile);
                        if (!!serveFile(wwwFolder, url, response)) return [3 /*break*/, 2];
                        startTime = new Date();
                        return [4 /*yield*/, Object(_requestProcessor__WEBPACK_IMPORTED_MODULE_3__["processRequest"])(url, request, injectables)];
                    case 1:
                        result = _a.sent();
                        try {
                            if (result instanceof _shared_Errors__WEBPACK_IMPORTED_MODULE_5__["NotFound"]) {
                                handleUnknownUrl(wwwFolder, request, response);
                            }
                            else {
                                Object(_responseWriter__WEBPACK_IMPORTED_MODULE_4__["write"])(response, startTime, result);
                            }
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
    return {
        core: Object(http__WEBPACK_IMPORTED_MODULE_2__["createServer"])(handleRequest),
        root: wwwFolder,
        defaultFile: defaultFile,
        port: port
    };
}
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
    if (!Object(fs__WEBPACK_IMPORTED_MODULE_0__["existsSync"])(filePath)) {
        return false;
    }
    try {
        var data = Object(fs__WEBPACK_IMPORTED_MODULE_0__["readFileSync"])(Object(path__WEBPACK_IMPORTED_MODULE_1__["join"])(__dirname, filePath));
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
function start(server, port) {
    server.core.listen(port);
}
function stop(server) {
    server.core.close();
}
function readRequestParameters(request, keys, reURL) {
    var output = new Map();
    var values, count, i;
    reURL.lastIndex = 0;
    values = reURL.exec(request.url.toString());
    values.shift();
    count = Math.min(keys.length, values.length);
    for (i = 0; i < count; i++) {
        output.set(keys[i], values[i]);
    }
    return output;
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebServer */ "./src/server/WebServer.ts");

var injectables = {};
var defaultFile = 'index.html';
var wwwFolder = process.cwd() + "/bin/www";
var defaultPort = 9990;
var server = Object(_WebServer__WEBPACK_IMPORTED_MODULE_0__["init"])(defaultPort, wwwFolder, injectables, defaultFile);
Object(_WebServer__WEBPACK_IMPORTED_MODULE_0__["start"])(server, defaultPort);


/***/ }),

/***/ "./src/server/requestProcessor.ts":
/*!****************************************!*\
  !*** ./src/server/requestProcessor.ts ***!
  \****************************************/
/*! exports provided: processRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processRequest", function() { return processRequest; });
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/server/router.ts");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validations */ "./src/server/validations.ts");
/* harmony import */ var _shared_Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/Errors */ "./src/shared/Errors.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};



function processRequest(url, request, injectables) {
    if (injectables === void 0) { injectables = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var route, injectablesAndParametes, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    route = Object(_router__WEBPACK_IMPORTED_MODULE_0__["getRoute"])(url);
                    if (!route) {
                        return [2 /*return*/, new _shared_Errors__WEBPACK_IMPORTED_MODULE_2__["NotFound"]('route', url)];
                    }
                    _b = (_a = Object).assign;
                    _c = [{
                            remoteIp: fixToIpV4(getRemoteIP(request))
                        },
                        getParametersFromURL(url, route.url)];
                    return [4 /*yield*/, getPostData(request)];
                case 1:
                    injectablesAndParametes = _b.apply(_a, _c.concat([_d.sent(),
                        injectables]));
                    return [4 /*yield*/, executeMethodWithInjectable(route.method, injectablesAndParametes)];
                case 2: return [2 /*return*/, _d.sent()];
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
function getParametersFromURL(requestedUrl, template) {
    var output = {};
    var _a = getArgumentNamesFromUrlTempalte(template), keys = _a.keys, url = _a.url;
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
function getPatternByType(type) {
    switch (type) {
        case 'id':
            return _validations__WEBPACK_IMPORTED_MODULE_1__["maskedIdPattern"];
        case 'email':
            return _validations__WEBPACK_IMPORTED_MODULE_1__["emailPattern"];
        case 'string':
            return '(.+)';
        case 'integer':
            return '(\\d+)';
        default:
            throw new _shared_Errors__WEBPACK_IMPORTED_MODULE_2__["NotFound"]('url-param', type);
    }
}
function getArgumentNamesFromUrlTempalte(urlTemplate) {
    var keys = [];
    var urlString = urlTemplate.source;
    var item;
    while ((item = _validations__WEBPACK_IMPORTED_MODULE_1__["urlParamPattern"].exec(urlString)) !== null) {
        var _a = item[1].split(':'), key = _a[0], type = _a[1];
        keys.push(key);
        try {
            urlString = urlString.split(item[0]).join(getPatternByType(type || key));
        }
        catch (err) {
            throw new _shared_Errors__WEBPACK_IMPORTED_MODULE_2__["BadInput"](urlTemplate.source, err);
        }
    }
    return { keys: keys, url: new RegExp(urlString) };
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
                                reject(new _shared_Errors__WEBPACK_IMPORTED_MODULE_2__["TooLong"]('input too big', 1e6));
                            }
                        });
                        request.on('end', function () { return resolve(JSON.parse(buffer.join())); });
                    }
                    resolve({});
                })];
        });
    });
}
function executeMethodWithInjectable(method, injectables) {
    return __awaiter(this, void 0, void 0, function () {
        var argumentNames, argumentValues, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    argumentNames = parseArgumentNamesFromFunctionName(method);
                    argumentValues = argumentNames.map(function (argName) { return injectables[argName]; });
                    return [4 /*yield*/, method.apply(void 0, argumentValues)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
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


/***/ }),

/***/ "./src/server/responseWriter.ts":
/*!**************************************!*\
  !*** ./src/server/responseWriter.ts ***!
  \**************************************/
/*! exports provided: write */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony import */ var _shared_Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/Errors */ "./src/shared/Errors.ts");

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
        if (data instanceof _shared_Errors__WEBPACK_IMPORTED_MODULE_0__["DetailedError"]) {
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


/***/ }),

/***/ "./src/server/router.ts":
/*!******************************!*\
  !*** ./src/server/router.ts ***!
  \******************************/
/*! exports provided: getRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoute", function() { return getRoute; });
/* harmony import */ var _ClientManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientManager */ "./src/server/ClientManager.ts");

var routes = [
    {
        type: 'get',
        url: /\/ping/,
        method: function () {
            return { response: 'pong' };
        }
    },
    {
        type: 'post',
        url: /\/keepAlive/,
        method: _ClientManager__WEBPACK_IMPORTED_MODULE_0__["keepAlive"]
    },
    {
        type: 'post',
        url: /\/score/,
        method: function () {
            return { response: 'submitted?' };
        }
    }
];
function getRoute(url) {
    return routes.find(function (route) { return url.match(route.url); });
}
// client <=> server <=> backend <=> frontend
//															<=> issAdapter


/***/ }),

/***/ "./src/server/validations.ts":
/*!***********************************!*\
  !*** ./src/server/validations.ts ***!
  \***********************************/
/*! exports provided: emailPattern, maskedIdPattern, urlParamPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailPattern", function() { return emailPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskedIdPattern", function() { return maskedIdPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlParamPattern", function() { return urlParamPattern; });
var emailPattern = '((([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]' +
    '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))';
var maskedIdPattern = '([\\w\\d\\-]+)';
var urlParamPattern = new RegExp('\\[([^#]+?)\\]', 'g');
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



/***/ }),

/***/ "./src/shared/Errors.ts":
/*!******************************!*\
  !*** ./src/shared/Errors.ts ***!
  \******************************/
/*! exports provided: AlreadyExists, BadInput, Custom, DetailedError, Expired, Immutable, MissingInput, NotFound, NoPermissions, SaveFailed, System, TooLong, TooShort, Unauthorized */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlreadyExists", function() { return AlreadyExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BadInput", function() { return BadInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Custom", function() { return Custom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailedError", function() { return DetailedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expired", function() { return Expired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Immutable", function() { return Immutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissingInput", function() { return MissingInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFound", function() { return NotFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoPermissions", function() { return NoPermissions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveFailed", function() { return SaveFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooLong", function() { return TooLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooShort", function() { return TooShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unauthorized", function() { return Unauthorized; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        return _super.call(this, 'already-exists', 409, { key: varType, value: value }) || this;
    }
    return AlreadyExists;
}(DetailedError));
var BadInput = /** @class */ (function (_super) {
    __extends(BadInput, _super);
    function BadInput(key, value) {
        return _super.call(this, 'bad-input', 406, { key: key, value: value }) || this;
    }
    BadInput.prototype.toString = function () {
        return "Bad Input for " + this.details.key + " (" + this.details.value + ")";
    };
    return BadInput;
}(DetailedError));
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(action, description, error) {
        return _super.call(this, 'custom-error', 500, { key: action, value: description }, error) || this;
    }
    Custom.prototype.toString = function () {
        return this.details.key + " " + this.details.value;
    };
    return Custom;
}(DetailedError));
var Expired = /** @class */ (function (_super) {
    __extends(Expired, _super);
    function Expired(varName) {
        return _super.call(this, 'expired', 406, { key: varName }) || this;
    }
    return Expired;
}(DetailedError));
var Immutable = /** @class */ (function (_super) {
    __extends(Immutable, _super);
    function Immutable(varType) {
        return _super.call(this, 'immutable', 406, { key: varType }) || this;
    }
    return Immutable;
}(DetailedError));
var MissingInput = /** @class */ (function (_super) {
    __extends(MissingInput, _super);
    function MissingInput(varName) {
        return _super.call(this, 'missing-input', 406, { key: varName }) || this;
    }
    MissingInput.prototype.toString = function () {
        return "Missing Input: " + this.details.key;
    };
    return MissingInput;
}(DetailedError));
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(type, id) {
        return _super.call(this, 'not-found', 404, { key: type, value: id }) || this;
    }
    NotFound.prototype.toString = function () {
        return this.details.key + " not Found: " + this.details.value;
    };
    return NotFound;
}(DetailedError));
var NoPermissions = /** @class */ (function (_super) {
    __extends(NoPermissions, _super);
    function NoPermissions(actionName) {
        return _super.call(this, 'no-permissions', 401, { action: actionName }) || this;
    }
    return NoPermissions;
}(DetailedError));
var SaveFailed = /** @class */ (function (_super) {
    __extends(SaveFailed, _super);
    function SaveFailed(varName, content, error) {
        return _super.call(this, 'save-failed', 500, { key: varName, value: content }, error) || this;
    }
    return SaveFailed;
}(DetailedError));
var System = /** @class */ (function (_super) {
    __extends(System, _super);
    function System(error, args, url) {
        return _super.call(this, 'system-error', 500, { args: args, error: error, url: url }, error) || this;
    }
    return System;
}(DetailedError));
var TooLong = /** @class */ (function (_super) {
    __extends(TooLong, _super);
    function TooLong(varName, value, max) {
        if (max === void 0) { max = '?'; }
        return _super.call(this, 'too-long', 406, { key: varName, value: value, max: max }) || this;
    }
    TooLong.prototype.toString = function () {
        return this.details.key + " is longer than " + this.details.max + " (" + this.details.value + ")";
    };
    return TooLong;
}(DetailedError));
var TooShort = /** @class */ (function (_super) {
    __extends(TooShort, _super);
    function TooShort(varName, value, min) {
        if (min === void 0) { min = '?'; }
        return _super.call(this, 'too-short', 406, { key: varName, value: value, min: min }) || this;
    }
    TooShort.prototype.toString = function () {
        return this.details.key + " is shorter than " + this.details.min + " (" + this.details.value + ")";
    };
    return TooShort;
}(DetailedError));
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized() {
        return _super.call(this, 'unauthorized', 401, {}) || this;
    }
    return Unauthorized;
}(DetailedError));



/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9DbGllbnRNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvV2ViU2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yZXF1ZXN0UHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcmVzcG9uc2VXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci92YWxpZGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL0Vycm9ycy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVB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QSxvREFBb0QsZUFBZTtBQUNuRTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxlQUFlO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVCQUF1QjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxxQkFBcUI7QUFDOUU7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsK0JBQStCO0FBQ3JGO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHFDQUFxQztBQUM1RjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixXQUFXO0FBQ3hDLG1EQUFtRCx1Q0FBdUM7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsV0FBVztBQUN4QyxvREFBb0QsdUNBQXVDO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQSxDQUFDO0FBQ3lLOzs7Ozs7Ozs7Ozs7QUM5SjFLLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGlDIiwiZmlsZSI6Ii4vc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2VydmVyL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGtlZXBBbGl2ZShwb3NpdGlvbiwgdHlwZSwgcmVtb3RlSXAsIGZpcmVXZWJTZXJ2ZXJFdmVudCkge1xuICAgIGZpcmVXZWJTZXJ2ZXJFdmVudCh7XG4gICAgICAgIGFjdGlvbjogJ2tlZXBBbGl2ZScsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIHJlbW90ZUlwOiByZW1vdGVJcFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzcG9uc2U6IFwic3VibWl0dGVkPVwiICsgcG9zaXRpb24gKyBcIjpcIiArIHR5cGVcbiAgICB9O1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IGV4aXN0c1N5bmMsIHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IGpvaW4gYXMgcGF0aEpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gJ2h0dHAnO1xuaW1wb3J0IHsgcHJvY2Vzc1JlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RQcm9jZXNzb3InO1xuaW1wb3J0IHsgd3JpdGUgfSBmcm9tICcuL3Jlc3BvbnNlV3JpdGVyJztcbmltcG9ydCB7IE5vdEZvdW5kIH0gZnJvbSAnLi4vc2hhcmVkL0Vycm9ycyc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChwb3J0LCB3d3dGb2xkZXIsIGluamVjdGFibGVzLCBkZWZhdWx0RmlsZSkge1xuICAgIGlmIChpbmplY3RhYmxlcyA9PT0gdm9pZCAwKSB7IGluamVjdGFibGVzID0ge307IH1cbiAgICBpZiAoZGVmYXVsdEZpbGUgPT09IHZvaWQgMCkgeyBkZWZhdWx0RmlsZSA9ICdpbmRleC5odG1sJzsgfVxuICAgIHZhciBoYW5kbGVSZXF1ZXN0ID0gZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXJsLCBzdGFydFRpbWUsIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IGdldFVybEZyb21SZXF1ZXN0KHJlcXVlc3QsIGRlZmF1bHRGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXNlcnZlRmlsZSh3d3dGb2xkZXIsIHVybCwgcmVzcG9uc2UpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBwcm9jZXNzUmVxdWVzdCh1cmwsIHJlcXVlc3QsIGluamVjdGFibGVzKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVVua25vd25Vcmwod3d3Rm9sZGVyLCByZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZShyZXNwb25zZSwgc3RhcnRUaW1lLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS53cml0ZUhlYWQoZXJyLnN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVuZChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvcmU6IGNyZWF0ZVNlcnZlcihoYW5kbGVSZXF1ZXN0KSxcbiAgICAgICAgcm9vdDogd3d3Rm9sZGVyLFxuICAgICAgICBkZWZhdWx0RmlsZTogZGVmYXVsdEZpbGUsXG4gICAgICAgIHBvcnQ6IHBvcnRcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0VXJsRnJvbVJlcXVlc3QocmVxdWVzdCwgZGVmYXVsdEZpbGUpIHtcbiAgICB2YXIgdXJsID0gcmVxdWVzdC51cmw7XG4gICAgaWYgKCcvJyA9PT0gdXJsKSB7XG4gICAgICAgIHVybCA9IFwiL1wiICsgZGVmYXVsdEZpbGU7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59XG5mdW5jdGlvbiBzZXJ2ZUZpbGUocm9vdCwgdXJsLCByZXNwb25zZSwgc3RhdHVzQ29kZSkge1xuICAgIGlmIChzdGF0dXNDb2RlID09PSB2b2lkIDApIHsgc3RhdHVzQ29kZSA9IDIwMDsgfVxuICAgIHZhciBmaWxlUGF0aCA9IFwiXCIgKyByb290ICsgdXJsO1xuICAgIGlmICghZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgZGF0YSA9IHJlYWRGaWxlU3luYyhwYXRoSm9pbihfX2Rpcm5hbWUsIGZpbGVQYXRoKSk7XG4gICAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCgyMDApO1xuICAgICAgICByZXNwb25zZS5lbmQoZGF0YSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVzcG9uc2Uud3JpdGVIZWFkKHN0YXR1c0NvZGUpO1xuICAgICAgICByZXNwb25zZS5lbmQoSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaGFuZGxlVW5rbm93blVybChyb290LCByZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJzQwNCBub3QgRm91bmQnLCByZXF1ZXN0LnVybCk7XG4gICAgc2VydmVGaWxlKHJvb3QsICc0MDQuaHRtbCcsIHJlc3BvbnNlLCA0MDQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KHNlcnZlciwgcG9ydCkge1xuICAgIHNlcnZlci5jb3JlLmxpc3Rlbihwb3J0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdG9wKHNlcnZlcikge1xuICAgIHNlcnZlci5jb3JlLmNsb3NlKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVhZFJlcXVlc3RQYXJhbWV0ZXJzKHJlcXVlc3QsIGtleXMsIHJlVVJMKSB7XG4gICAgdmFyIG91dHB1dCA9IG5ldyBNYXAoKTtcbiAgICB2YXIgdmFsdWVzLCBjb3VudCwgaTtcbiAgICByZVVSTC5sYXN0SW5kZXggPSAwO1xuICAgIHZhbHVlcyA9IHJlVVJMLmV4ZWMocmVxdWVzdC51cmwudG9TdHJpbmcoKSk7XG4gICAgdmFsdWVzLnNoaWZ0KCk7XG4gICAgY291bnQgPSBNYXRoLm1pbihrZXlzLmxlbmd0aCwgdmFsdWVzLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgb3V0cHV0LnNldChrZXlzW2ldLCB2YWx1ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuIiwiaW1wb3J0IHsgaW5pdCwgc3RhcnQgfSBmcm9tICcuL1dlYlNlcnZlcic7XG52YXIgaW5qZWN0YWJsZXMgPSB7fTtcbnZhciBkZWZhdWx0RmlsZSA9ICdpbmRleC5odG1sJztcbnZhciB3d3dGb2xkZXIgPSBwcm9jZXNzLmN3ZCgpICsgXCIvYmluL3d3d1wiO1xudmFyIGRlZmF1bHRQb3J0ID0gOTk5MDtcbnZhciBzZXJ2ZXIgPSBpbml0KGRlZmF1bHRQb3J0LCB3d3dGb2xkZXIsIGluamVjdGFibGVzLCBkZWZhdWx0RmlsZSk7XG5zdGFydChzZXJ2ZXIsIGRlZmF1bHRQb3J0KTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBnZXRSb3V0ZSB9IGZyb20gJy4vcm91dGVyJztcbmltcG9ydCB7IGVtYWlsUGF0dGVybiwgbWFza2VkSWRQYXR0ZXJuLCB1cmxQYXJhbVBhdHRlcm4gfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcbmltcG9ydCB7IE5vdEZvdW5kLCBCYWRJbnB1dCwgVG9vTG9uZyB9IGZyb20gJy4uL3NoYXJlZC9FcnJvcnMnO1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NSZXF1ZXN0KHVybCwgcmVxdWVzdCwgaW5qZWN0YWJsZXMpIHtcbiAgICBpZiAoaW5qZWN0YWJsZXMgPT09IHZvaWQgMCkgeyBpbmplY3RhYmxlcyA9IHt9OyB9XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm91dGUsIGluamVjdGFibGVzQW5kUGFyYW1ldGVzLCBfYSwgX2IsIF9jO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9kLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByb3V0ZSA9IGdldFJvdXRlKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgTm90Rm91bmQoJ3JvdXRlJywgdXJsKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBPYmplY3QpLmFzc2lnbjtcbiAgICAgICAgICAgICAgICAgICAgX2MgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW90ZUlwOiBmaXhUb0lwVjQoZ2V0UmVtb3RlSVAocmVxdWVzdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UGFyYW1ldGVyc0Zyb21VUkwodXJsLCByb3V0ZS51cmwpXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZ2V0UG9zdERhdGEocmVxdWVzdCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0YWJsZXNBbmRQYXJhbWV0ZXMgPSBfYi5hcHBseShfYSwgX2MuY29uY2F0KFtfZC5zZW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RhYmxlc10pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZXhlY3V0ZU1ldGhvZFdpdGhJbmplY3RhYmxlKHJvdXRlLm1ldGhvZCwgaW5qZWN0YWJsZXNBbmRQYXJhbWV0ZXMpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBfZC5zZW50KCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldFJlbW90ZUlQKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gZm9yY2VUb0FycmF5KHJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ10gfHwgcmVxdWVzdC5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MgfHwgcmVxdWVzdC5zb2NrZXQucmVtb3RlQWRkcmVzcykuam9pbignLCAnKTtcbn1cbmZ1bmN0aW9uIGZvcmNlVG9BcnJheShpdGVtKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xufVxuZnVuY3Rpb24gZml4VG9JcFY0KGlwKSB7XG4gICAgcmV0dXJuIGlwLnN1YnN0cigwLCA3KSA9PSAnOjpmZmZmOicgPyBpcC5zdWJzdHIoNykgOiBpcDtcbn1cbmZ1bmN0aW9uIGdldFBhcmFtZXRlcnNGcm9tVVJMKHJlcXVlc3RlZFVybCwgdGVtcGxhdGUpIHtcbiAgICB2YXIgb3V0cHV0ID0ge307XG4gICAgdmFyIF9hID0gZ2V0QXJndW1lbnROYW1lc0Zyb21VcmxUZW1wYWx0ZSh0ZW1wbGF0ZSksIGtleXMgPSBfYS5rZXlzLCB1cmwgPSBfYS51cmw7XG4gICAgdmFyIGkgPSAwO1xuICAgIHVybC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciB2YWx1ZXMgPSB1cmwuZXhlYyhyZXF1ZXN0ZWRVcmwpO1xuICAgIHZhbHVlcy5zaGlmdCgpO1xuICAgIHZhciBjb3VudCA9IE1hdGgubWluKGtleXMubGVuZ3RoLCB2YWx1ZXMubGVuZ3RoKTtcbiAgICB3aGlsZSAoaSA8IGNvdW50KSB7XG4gICAgICAgIG91dHB1dFtrZXlzW2ldXSA9IHZhbHVlc1tpKytdO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuZnVuY3Rpb24gZ2V0UGF0dGVybkJ5VHlwZSh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2lkJzpcbiAgICAgICAgICAgIHJldHVybiBtYXNrZWRJZFBhdHRlcm47XG4gICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgIHJldHVybiBlbWFpbFBhdHRlcm47XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gJyguKyknO1xuICAgICAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgICAgIHJldHVybiAnKFxcXFxkKyknO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kKCd1cmwtcGFyYW0nLCB0eXBlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRBcmd1bWVudE5hbWVzRnJvbVVybFRlbXBhbHRlKHVybFRlbXBsYXRlKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB2YXIgdXJsU3RyaW5nID0gdXJsVGVtcGxhdGUuc291cmNlO1xuICAgIHZhciBpdGVtO1xuICAgIHdoaWxlICgoaXRlbSA9IHVybFBhcmFtUGF0dGVybi5leGVjKHVybFN0cmluZykpICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBfYSA9IGl0ZW1bMV0uc3BsaXQoJzonKSwga2V5ID0gX2FbMF0sIHR5cGUgPSBfYVsxXTtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcuc3BsaXQoaXRlbVswXSkuam9pbihnZXRQYXR0ZXJuQnlUeXBlKHR5cGUgfHwga2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0KHVybFRlbXBsYXRlLnNvdXJjZSwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBrZXlzOiBrZXlzLCB1cmw6IG5ldyBSZWdFeHAodXJsU3RyaW5nKSB9O1xufVxuZnVuY3Rpb24gZ2V0UG9zdERhdGEocmVxdWVzdCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1ZmZlcjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5tZXRob2QgPT0gJ1BPU1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDFlNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmNvbm5lY3Rpb24uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IFRvb0xvbmcoJ2lucHV0IHRvbyBiaWcnLCAxZTYpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUoSlNPTi5wYXJzZShidWZmZXIuam9pbigpKSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe30pO1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBleGVjdXRlTWV0aG9kV2l0aEluamVjdGFibGUobWV0aG9kLCBpbmplY3RhYmxlcykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3VtZW50TmFtZXMsIGFyZ3VtZW50VmFsdWVzLCBlcnJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnROYW1lcyA9IHBhcnNlQXJndW1lbnROYW1lc0Zyb21GdW5jdGlvbk5hbWUobWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRWYWx1ZXMgPSBhcmd1bWVudE5hbWVzLm1hcChmdW5jdGlvbiAoYXJnTmFtZSkgeyByZXR1cm4gaW5qZWN0YWJsZXNbYXJnTmFtZV07IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBtZXRob2QuYXBwbHkodm9pZCAwLCBhcmd1bWVudFZhbHVlcyldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGVycl8xXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBwYXJzZUFyZ3VtZW50TmFtZXNGcm9tRnVuY3Rpb25OYW1lKG1ldGhvZCkge1xuICAgIHZhciBpdGVtcyA9IG1ldGhvZC50b1N0cmluZygpLm1hdGNoKC9eZnVuY3Rpb25cXHM/W15cXChdK1xccz9cXCgoW15cXCldKylcXCkrLyk7XG4gICAgcmV0dXJuIGl0ZW1zID09PSBudWxsID8gW10gOiBpdGVtc1sxXS5yZXBsYWNlKC9cXHMvZywgJycpLnNwbGl0KCcsJyk7XG59XG4vLyBUT0RPOiBmb3IgZXZlcnkgbWV0aG9kLCBwYXJzZSB0aGUgaW5wdXRzIGFuZCBwcmVwYXJlIGEgY2FsbGVyIGZ1bmN0aW9uIHRoYXQgZmV0Y2hlcyB0aGUgcmlnaHQgaW5wdXRzXG4vLyBUT0RPOiB3aGVuIHRoZSB1cmwgbWF0Y2hlcywgcGFzcyB0aGUgcmVxdWVzdCBhbmQgcmVzcG9uc2UgaW50byB0aGUgY2FsbGVyIGZ1bmN0aW9uXG4vKlxuXG5pbXBvcnQgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgeyBFcnJvcnMgfSBmcm9tICdncm91bmR1cCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyLmpzJztcbmltcG9ydCB7IGVtYWlsUGF0dGVybiwgbWFza2VkSWRQYXR0ZXJuIGFzIGlkUGF0dGVybiwgdXJsUGFyYW1QYXR0ZXJuIH0gZnJvbSAnLi92YWxpZGF0aW9ucy5qcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vLi4vY29uZmlnLmpzJztcbmltcG9ydCBFbmNyeXB0aW9uIGZyb20gJy4vRW5jcnlwdGlvbi5qcyc7XG5cbmNvbnN0IGFwaVVybFByZWZpeCA9IGNvbmZpZy5hcGlVcmxQcmVmaXggfHwgJyc7XG5cbmZ1bmN0aW9uIHJlYWRSZXF1ZXN0UGFyYW1ldGVycyAocmVxdWVzdCwga2V5cywgcmVVUkwpIHtcbiAgY29uc3Qgb3V0cHV0ID0ge307XG4gIGxldCB2YWx1ZXMsIGNvdW50LCBpO1xuXG4gIHJlVVJMLmxhc3RJbmRleCA9IDA7XG4gIHZhbHVlcyA9IHJlVVJMLmV4ZWMocmVxdWVzdC51cmwudG9TdHJpbmcoKSk7XG4gIHZhbHVlcy5zaGlmdCgpO1xuICBjb3VudCA9IE1hdGgubWluKGtleXMubGVuZ3RoLCB2YWx1ZXMubGVuZ3RoKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIG91dHB1dFtrZXlzW2ldXSA9IHZhbHVlc1tpXTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHJlYWQocmVxLCB1cmxQYXJhbWV0ZXJzLCByZVVSTCkge1xuICBsZXQgb3V0cHV0ID0ge307XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgIHJlYWRSZXF1ZXN0UGFyYW1ldGVycyhyZXEsIHVybFBhcmFtZXRlcnMsIHJlVVJMKSxcbiAgICAgIHVybC5wYXJzZShyZXEudXJsLCB0cnVlKS5xdWVyeSxcbiAgICAgIC8vcmVxLnBhcmFtcyxcbiAgICAgIHJlcS5ib2R5KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yKG5ldyBFcnJvcnMuQmFkSW5wdXQoJ1JlYWRpbmcgVVJMIGlucHV0cycsICcnLCBlcnIpKTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGFkZE9iamVjdFNpemVzKGRhdGEpIHtcbiAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldO1xuXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcbiAgICAgICAgZGF0YVtgJHtrZXl9TGVuZ3RoYF0gPSBkYXRhW2tleV0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAnb2JqZWN0JyAmJiBrZXkgIT09ICdlcnJvcicpIHtcbiAgICAgICAgZGF0YVtgJHtrZXl9U2l6ZWBdID0gT2JqZWN0LmtleXMoZGF0YVtrZXldKS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QXV0aFRva2VuKHJlcSkge1xuICByZXR1cm4ge1xuICAgIGxvY2FsSVA6IHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1mb3InXSB8fCByZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzLFxuICAgIHNlcnZlcklQOiBgJHtjb25maWcuaXB9OiR7Y29uZmlnLnBvcnR9YFxuICB9O1xufVxuXG5jbGFzcyBDb250ZXh0IHtcbiAgY29uc3RydWN0b3IodXJsLCB0eXBlLCBoYW5kbGVyLCBkYiwgZmlsZU1hbmFnZXIsIG1haWxlcikge1xuICAgIGNvbnN0IHsgcmVnZXgsIHVybFBhcmFtZXRlcnMgfSA9IHBhcnNlVVJMKHVybCk7XG5cbiAgICB0aGlzLmRiID0gZGI7XG4gICAgdGhpcy51cmxQYXR0ZXJuID0gcmVnZXg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIHRoaXMudXJsUGFyYW1ldGVycyA9IHVybFBhcmFtZXRlcnM7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyc2VBcmd1bWVudHNGcm9tRnVuY3Rpb25OYW1lKGhhbmRsZXIpLFxuICAgIHRoaXMuZmlsZU1hbmFnZXIgPSBmaWxlTWFuYWdlcjtcbiAgICB0aGlzLm1haWxlciA9IG1haWxlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy51cmxQYXR0ZXJuO1xuICB9XG5cbiAgZ2V0SGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBhZGFwdGVyKHJlcSwgcmVzKSB7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fcmVhZFJlcXVlc3QocmVxKVxuICAgICAgICAudGhlbihhcmdzID0+IHRoaXMuaGFuZGxlciguLi5hcmdzKSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB0aGlzLl93cml0ZVJlc3BvbnNlKHJlcywgc3RhcnRUaW1lLCBkYXRhKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLnRyYWNlKGVycik7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0ZhaWxlZCBwcm9jZXNzaW5nIHJlcXVlc3QnLCBlcnIpO1xuICAgICAgd3JpdGUocmVzLCBzdGFydFRpbWUsIGVycik7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBfcmVhZFJlcXVlc3QocmVxKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZSgpKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gcmVhZChyZXEsIHRoaXMudXJsUGFyYW1ldGVycywgdGhpcy51cmxQYXR0ZXJuKTtcblxuICAgICAgcmV0dXJuIHRoaXMucGFyYW1ldGVycy5tYXAocGFyYW1ldGVyID0+IGlucHV0W3BhcmFtZXRlcl0gfHwgdGhpcy5fZ2V0RnJvbUNvbnRleHQocGFyYW1ldGVyLCByZXEpKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXRGcm9tQ29udGV4dChwYXJhbWV0ZXIsIHJlcSkge1xuICAgIHN3aXRjaCAocGFyYW1ldGVyKSB7XG4gICAgICBjYXNlICdkYic6XG4gICAgICAgIHJldHVybiB0aGlzLmRiO1xuICAgICAgY2FzZSAnYXV0aFRva2VuJzpcbiAgICAgICAgcmV0dXJuIGdldEF1dGhUb2tlbihyZXEpO1xuICAgICAgY2FzZSAnYXV0aFVzZXInOlxuICAgICAgICBpZiAocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9ycy5VbmF1dGhvcml6ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKEVuY3J5cHRpb24uZGVjb2RlKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9ycy5VbmF1dGhvcml6ZWQoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5leHBpcmVzIGluc3RhbmNlb2YgRGF0ZSAmJiB2YWx1ZS5leHBpcmVzIDwgKG5ldyBEYXRlKCkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9ycy5VbmF1dGhvcml6ZWQoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuID0gZ2V0QXV0aFRva2VuKHJlcSk7XG5cbiAgICAgICAgaWYgKHRva2VuLmxvY2FsSVAgIT09IHZhbHVlLmxvY2FsSVAgfHwgdG9rZW4uc2VydmVySVAgIT09IHZhbHVlLnNlcnZlcklQKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9ycy5VbmF1dGhvcml6ZWQoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZS51c2VyO1xuICAgICAgY2FzZSAnb3B0aW9uYWxVc2VyJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShFbmNyeXB0aW9uLmRlY29kZShyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uKSkudXNlcjtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlICdpc1JldHVybkpzb24nOlxuICAgICAgICByZXR1cm4gKHJlcS5nZXQoJ2FjY2VwdCcpLmluZGV4T2YoJ2pzb24nKSAhPT0gLTEpO1xuICAgICAgY2FzZSAnZmlsZXMnOlxuICAgICAgICByZXR1cm4gdGhpcy5maWxlTWFuYWdlcjtcbiAgICAgIGNhc2UgJ21haWxlcic6XG4gICAgICAgIHJldHVybiB0aGlzLm1haWxlcjtcbiAgICB9XG4gIH1cblxuICBfd3JpdGVSZXNwb25zZShyZXNwb25zZSwgc3RhcnRUaW1lLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhID09PSBudWxsKSB7XG4gICAgICByZXNwb25zZS5lbmQoKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEuX2ZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgICAgIC53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiBkYXRhLl9maWxlIH0pXG4gICAgICAgIC5lbmQoZGF0YS5jb250ZW50LCAnYmluYXJ5Jyk7XG4gICAgfSBlbHNlIGlmIChkYXRhLl9yZWRpcmVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgICAgLndyaXRlSGVhZCgzMDIsIHsgTG9jYXRpb246IGRhdGEuX3JlZGlyZWN0IH0pXG4gICAgICAgIC5lbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSxcbiAgICAgICAgICBkZXRhaWxzOiBkYXRhLmRldGFpbHMsXG4gICAgICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyB8fCA1MDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRhdGEgPSB7IHJlc3VsdDogZGF0YSB9O1xuICAgICAgfVxuICBcbiAgICAgIGFkZE9iamVjdFNpemVzKGRhdGEpO1xuICAgICAgZGF0YS5zdGF0dXMgPSBkYXRhLnN0YXR1cyB8fCAyMDA7XG4gICAgICBkYXRhLnByb2Nlc3NUaW1lID0gKG5ldyBEYXRlKCkgLSBzdGFydFRpbWUpIC8gMTAwMDtcbiAgICAgIHJlc3BvbnNlXG4gICAgICAgIC5zdGF0dXMoZGF0YS5zdGF0dXMpXG4gICAgICAgIC5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0O1xuLypcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ29udGV4dFRlbXBsYXRlKHVybCwgZGVmLCBGaWxlTWFuYWdlciwgTWFpbGVyKSB7XG4gICAgY29udGV4dCA9IGZ1bmN0aW9uIENvbnRleHQocmVxLCByZXMpIHtcbiAgICAgIHZhciBhcmdzID0gW10sXG4gICAgICAgICAgaW5wdXQgPSByZWFkKHJlcSwgdXJsLCB1cmxQYXR0ZXJuKSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgICBpc0hhbmRsZXJBc3luYyA9IGZhbHNlLFxuICAgICAgICAgIGF1dGhvcml6YXRpb25Qcm9ibGVtID0gZmFsc2UsXG5cbiAgICAgICAgICB3cml0ZVRvUmVzID0gd3JpdGUuYmluZCh7fSwgcmVzLCBuZXcgRGF0ZSgpKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uIHBlclBhcmFtZXRlcihwYXJhbWV0ZXIpIHtcbiAgICAgICAgICB2YXIgdG9rZW47XG5cbiAgICAgICAgICB2YWx1ZSA9IGlucHV0W3BhcmFtZXRlcl07XG4gICAgICAgICAgc2V0dGluZ3MgPSB1cmxQYXJhbWV0ZXJzID8gdXJsUGFyYW1ldGVyc1twYXJhbWV0ZXJdIDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3dpdGNoIChwYXJhbWV0ZXIpIHtcbiAgICAgICAgICAgICAgY2FzZSAnY2FsbGJhY2snOlxuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JpdGVUb1JlcztcbiAgICAgICAgICAgICAgICBpc0hhbmRsZXJBc3luYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2RiJzpcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlcS5tb2RlbHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2F1dGhUb2tlbic6XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBnZXRBdXRoVG9rZW4ocmVxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnYXV0aFVzZXInOlxuICAgICAgICAgICAgICAgIGlmIChyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25Qcm9ibGVtID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoRW5jcnlwdGlvbi5kZWNvZGUocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblByb2JsZW0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmV4cGlyZXMgaW5zdGFuY2VvZiBEYXRlICYmIHZhbHVlLmV4cGlyZXMgPCAobmV3IERhdGUoKSkpIHtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25Qcm9ibGVtID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0QXV0aFRva2VuKHJlcSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4ubG9jYWxJUCAhPT0gdmFsdWUubG9jYWxJUCB8fCB0b2tlbi5zZXJ2ZXJJUCAhPT0gdmFsdWUuc2VydmVySVApIHtcbiAgICAgICAgICAgICAgICAgIHdyaXRlVG9SZXMoRXJyb3JzLnVuYXV0aG9yaXplZCgpKTtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25Qcm9ibGVtID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudXNlcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnb3B0aW9uYWxVc2VyJzpcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKEVuY3J5cHRpb24uZGVjb2RlKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pKS51c2VyO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2lzUmV0dXJuSnNvbic6XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAocmVxLmdldCgnYWNjZXB0JykuaW5kZXhPZignanNvbicpICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2ZpbGVzJzpcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEZpbGVNYW5hZ2VyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYWlsZXInOlxuICAgICAgICAgICAgICAgIHZhbHVlID0gTWFpbGVyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZXR0aW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYWxpYXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGlucHV0W3NldHRpbmdzLmFsaWFzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBzZXR0aW5ncy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhcmdzLnB1c2godmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYXV0aG9yaXphdGlvblByb2JsZW0pIHtcbiAgICAgICAgICB3cml0ZVRvUmVzKEVycm9ycy51bmF1dGhvcml6ZWQoKSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gYWN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2coZXJyKTtcbiAgICAgICAgICB3cml0ZVRvUmVzKEVycm9ycy5zeXN0ZW1FcnJvcihlcnIsIGFyZ3MsIHJlcS51cmwpKTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNIYW5kbGVyQXN5bmMpIHtcbiAgICAgICAgICB3cml0ZVRvUmVzKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnIuZGV0YWlscyA9IHtcbiAgICAgICAgICBhcmdzOiBhcmdzLFxuICAgICAgICAgIHVybDogcmVxLm1ldGhvZCArICc6JyArIHJlcS51cmwsXG4gICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgbG9nKCcnLmNvbmNhdCgnZXJyb3IgaW4gVVJMICcsIHJlcy5yZXEubWV0aG9kLCAnOicsIHJlcy5yZXEudXJsKSk7XG4gICAgICAgIGxvZyhlcnIsICdmYXRhbCcpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd3JpdGVUb1JlcyhlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9nKCdmYWlsZWQgdG8gdXNlIHdyaXRlVG9SZXMnKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5lbmQoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nKCdmYWlsZWQgdG8gc2VuZCBhbnkgcmVzcG9uc2UnLCAnZmF0YWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuXG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfTtcbiovXG4iLCJpbXBvcnQgeyBEZXRhaWxlZEVycm9yIH0gZnJvbSAnLi4vc2hhcmVkL0Vycm9ycyc7XG5leHBvcnQgZnVuY3Rpb24gd3JpdGUocmVzcG9uc2UsIHN0YXJ0VGltZSwgZGF0YSkge1xuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICByZXNwb25zZS5lbmQoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YS5fZmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6IGRhdGEuX2ZpbGUgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5lbmQoZGF0YS5jb250ZW50LCAnYmluYXJ5Jyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEuX3JlZGlyZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzcG9uc2Uud3JpdGVIZWFkKDMwMiwgeyBMb2NhdGlvbjogZGF0YS5fcmVkaXJlY3QgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5lbmQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgRGV0YWlsZWRFcnJvcikge1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBkYXRhLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgZGV0YWlsczogZGF0YS5kZXRhaWxzLFxuICAgICAgICAgICAgICAgIHN0YXR1czogZGF0YS5zdGF0dXMgfHwgNTAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZGF0YSA9IHsgcmVzdWx0OiBkYXRhIH07XG4gICAgICAgIH1cbiAgICAgICAgYWRkT2JqZWN0U2l6ZXMoZGF0YSk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gZGF0YS5zdGF0dXMgfHwgMjAwO1xuICAgICAgICBkYXRhLnByb2Nlc3NUaW1lID0gZ2V0U2Vjb25kc1NpbmNlKHN0YXJ0VGltZSk7XG4gICAgICAgIHJlc3BvbnNlLndyaXRlSGVhZChkYXRhLnN0YXR1cyk7XG4gICAgICAgIHJlc3BvbnNlLmVuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0U2Vjb25kc1NpbmNlKHN0YXJ0VGltZSkge1xuICAgIHJldHVybiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUuZ2V0VGltZSgpKSAvIDEwMDA7XG59XG5mdW5jdGlvbiBhZGRPYmplY3RTaXplcyhkYXRhKSB7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleSArIFwiTGVuZ3RoXCJdID0gZGF0YVtrZXldLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICdvYmplY3QnICYmIGtleSAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5ICsgXCJTaXplXCJdID0gT2JqZWN0LmtleXMoZGF0YVtrZXldKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGtlZXBBbGl2ZSB9IGZyb20gJy4vQ2xpZW50TWFuYWdlcic7XG52YXIgcm91dGVzID0gW1xuICAgIHtcbiAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgIHVybDogL1xcL3BpbmcvLFxuICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiAncG9uZycgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgIHVybDogL1xcL2tlZXBBbGl2ZS8sXG4gICAgICAgIG1ldGhvZDoga2VlcEFsaXZlXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgdXJsOiAvXFwvc2NvcmUvLFxuICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiAnc3VibWl0dGVkPycgfTtcbiAgICAgICAgfVxuICAgIH1cbl07XG5leHBvcnQgZnVuY3Rpb24gZ2V0Um91dGUodXJsKSB7XG4gICAgcmV0dXJuIHJvdXRlcy5maW5kKGZ1bmN0aW9uIChyb3V0ZSkgeyByZXR1cm4gdXJsLm1hdGNoKHJvdXRlLnVybCk7IH0pO1xufVxuLy8gY2xpZW50IDw9PiBzZXJ2ZXIgPD0+IGJhY2tlbmQgPD0+IGZyb250ZW5kXG4vL1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDw9PiBpc3NBZGFwdGVyXG4iLCJ2YXIgZW1haWxQYXR0ZXJuID0gJygoKFtePD4oKVtcXFxcXVxcXFxcXFxcLiw7OlxcXFxzQFxcXFxcIl0rKFxcXFwuW148PigpW1xcXFxdXFxcXFxcXFwuLDs6XFxcXHNAXFxcXFwiXSspKil8KFxcXFxcIi4rXFxcXFwiKSlAKChcXFxcW1swLTldJyArXG4gICAgJ3sxLDN9XFxcXC5bMC05XXsxLDN9XFxcXC5bMC05XXsxLDN9XFxcXC5bMC05XXsxLDN9XFxcXF0pfCgoW2EtekEtWlxcXFwtMC05XStcXFxcLikrW2EtekEtWl17Mix9KSkpJztcbnZhciBtYXNrZWRJZFBhdHRlcm4gPSAnKFtcXFxcd1xcXFxkXFxcXC1dKyknO1xudmFyIHVybFBhcmFtUGF0dGVybiA9IG5ldyBSZWdFeHAoJ1xcXFxbKFteI10rPylcXFxcXScsICdnJyk7XG4vLyBjb25zdCB0YWdCb2R5ID0gJyg/OlteXCJcXCc+XXxcIlteXCJdKlwifFxcJ1teXFwnXSpcXCcpKic7XG4vLyBjb25zdCB0YWdPckNvbW1lbnQgPSBuZXcgUmVnRXhwKFxuLy8gXHQnPCg/OicgK1xuLy8gXHRcdCchLS0oPzooPzotKlteLT5dKSotLSt8LT8pJyArXG4vLyBcdFx0J3xzY3JpcHRcXFxcYicgK1xuLy8gXHRcdHRhZ0JvZHkgK1xuLy8gXHRcdCc+W1xcXFxzXFxcXFNdKj88L3NjcmlwdFxcXFxzKicgK1xuLy8gXHRcdCd8c3R5bGVcXFxcYicgK1xuLy8gXHRcdHRhZ0JvZHkgK1xuLy8gXHRcdCc+W1xcXFxzXFxcXFNdKj88L3N0eWxlXFxcXHMqJyArXG4vLyBcdFx0J3wvP1thLXpdJyArXG4vLyBcdFx0Jyk+Jyxcbi8vIFx0J2dpJ1xuLy8gKTtcbmV4cG9ydCB7IGVtYWlsUGF0dGVybiwgbWFza2VkSWRQYXR0ZXJuLCB1cmxQYXJhbVBhdHRlcm4gfTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIERldGFpbGVkRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERldGFpbGVkRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRGV0YWlsZWRFcnJvcihtZXNzYWdlLCBzdGF0dXMsIGRldGFpbHMsIHN0YWNrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5hcHBseSh0aGlzLCBBcnJheS5mcm9tKGFyZ3VtZW50cykpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICBfdGhpcy5zdGFjayA9IHN0YWNrO1xuICAgICAgICBfdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIF90aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERldGFpbGVkRXJyb3IucHJvdG90eXBlLmdldFN0YWNrVHJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZXNzYWdlcyA9IFt0aGlzLnRvU3RyaW5nKCkgfHwgdGhpcy5tZXNzYWdlXSwgcHRyID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuc3RhY2spIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zdGFjay5yZXBsYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChKU09OLnN0cmluZ2lmeSh0aGlzLnN0YWNrXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eW15cXChdKz9bXFxuJF0vZ20sICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlxccythdFxccysvZ20sICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sICd7YW5vbnltb3VzfSgpQCcpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnXFxuJyksIG51bGwsIDQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlIChwdHIuc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChwdHIuc3RhY2sudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIHB0ciA9IHB0ci5zdGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzLmpvaW4oJ1xcbicpO1xuICAgIH07XG4gICAgRGV0YWlsZWRFcnJvci5wcm90b3R5cGUuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICAgIH07XG4gICAgcmV0dXJuIERldGFpbGVkRXJyb3I7XG59KEVycm9yKSk7XG52YXIgQWxyZWFkeUV4aXN0cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWxyZWFkeUV4aXN0cywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbHJlYWR5RXhpc3RzKHZhclR5cGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAnYWxyZWFkeS1leGlzdHMnLCA0MDksIHsga2V5OiB2YXJUeXBlLCB2YWx1ZTogdmFsdWUgfSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFscmVhZHlFeGlzdHM7XG59KERldGFpbGVkRXJyb3IpKTtcbnZhciBCYWRJbnB1dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQmFkSW5wdXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQmFkSW5wdXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ2JhZC1pbnB1dCcsIDQwNiwgeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH0pIHx8IHRoaXM7XG4gICAgfVxuICAgIEJhZElucHV0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiQmFkIElucHV0IGZvciBcIiArIHRoaXMuZGV0YWlscy5rZXkgKyBcIiAoXCIgKyB0aGlzLmRldGFpbHMudmFsdWUgKyBcIilcIjtcbiAgICB9O1xuICAgIHJldHVybiBCYWRJbnB1dDtcbn0oRGV0YWlsZWRFcnJvcikpO1xudmFyIEN1c3RvbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3VzdG9tLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEN1c3RvbShhY3Rpb24sIGRlc2NyaXB0aW9uLCBlcnJvcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ2N1c3RvbS1lcnJvcicsIDUwMCwgeyBrZXk6IGFjdGlvbiwgdmFsdWU6IGRlc2NyaXB0aW9uIH0sIGVycm9yKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDdXN0b20ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxzLmtleSArIFwiIFwiICsgdGhpcy5kZXRhaWxzLnZhbHVlO1xuICAgIH07XG4gICAgcmV0dXJuIEN1c3RvbTtcbn0oRGV0YWlsZWRFcnJvcikpO1xudmFyIEV4cGlyZWQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEV4cGlyZWQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRXhwaXJlZCh2YXJOYW1lKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAnZXhwaXJlZCcsIDQwNiwgeyBrZXk6IHZhck5hbWUgfSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEV4cGlyZWQ7XG59KERldGFpbGVkRXJyb3IpKTtcbnZhciBJbW11dGFibGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEltbXV0YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbW11dGFibGUodmFyVHlwZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ2ltbXV0YWJsZScsIDQwNiwgeyBrZXk6IHZhclR5cGUgfSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEltbXV0YWJsZTtcbn0oRGV0YWlsZWRFcnJvcikpO1xudmFyIE1pc3NpbmdJbnB1dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWlzc2luZ0lucHV0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1pc3NpbmdJbnB1dCh2YXJOYW1lKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAnbWlzc2luZy1pbnB1dCcsIDQwNiwgeyBrZXk6IHZhck5hbWUgfSkgfHwgdGhpcztcbiAgICB9XG4gICAgTWlzc2luZ0lucHV0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiTWlzc2luZyBJbnB1dDogXCIgKyB0aGlzLmRldGFpbHMua2V5O1xuICAgIH07XG4gICAgcmV0dXJuIE1pc3NpbmdJbnB1dDtcbn0oRGV0YWlsZWRFcnJvcikpO1xudmFyIE5vdEZvdW5kID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhOb3RGb3VuZCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBOb3RGb3VuZCh0eXBlLCBpZCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ25vdC1mb3VuZCcsIDQwNCwgeyBrZXk6IHR5cGUsIHZhbHVlOiBpZCB9KSB8fCB0aGlzO1xuICAgIH1cbiAgICBOb3RGb3VuZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldGFpbHMua2V5ICsgXCIgbm90IEZvdW5kOiBcIiArIHRoaXMuZGV0YWlscy52YWx1ZTtcbiAgICB9O1xuICAgIHJldHVybiBOb3RGb3VuZDtcbn0oRGV0YWlsZWRFcnJvcikpO1xudmFyIE5vUGVybWlzc2lvbnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE5vUGVybWlzc2lvbnMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTm9QZXJtaXNzaW9ucyhhY3Rpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAnbm8tcGVybWlzc2lvbnMnLCA0MDEsIHsgYWN0aW9uOiBhY3Rpb25OYW1lIH0pIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBOb1Blcm1pc3Npb25zO1xufShEZXRhaWxlZEVycm9yKSk7XG52YXIgU2F2ZUZhaWxlZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2F2ZUZhaWxlZCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYXZlRmFpbGVkKHZhck5hbWUsIGNvbnRlbnQsIGVycm9yKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAnc2F2ZS1mYWlsZWQnLCA1MDAsIHsga2V5OiB2YXJOYW1lLCB2YWx1ZTogY29udGVudCB9LCBlcnJvcikgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNhdmVGYWlsZWQ7XG59KERldGFpbGVkRXJyb3IpKTtcbnZhciBTeXN0ZW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN5c3RlbSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTeXN0ZW0oZXJyb3IsIGFyZ3MsIHVybCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ3N5c3RlbS1lcnJvcicsIDUwMCwgeyBhcmdzOiBhcmdzLCBlcnJvcjogZXJyb3IsIHVybDogdXJsIH0sIGVycm9yKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU3lzdGVtO1xufShEZXRhaWxlZEVycm9yKSk7XG52YXIgVG9vTG9uZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVG9vTG9uZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUb29Mb25nKHZhck5hbWUsIHZhbHVlLCBtYXgpIHtcbiAgICAgICAgaWYgKG1heCA9PT0gdm9pZCAwKSB7IG1heCA9ICc/JzsgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ3Rvby1sb25nJywgNDA2LCB7IGtleTogdmFyTmFtZSwgdmFsdWU6IHZhbHVlLCBtYXg6IG1heCB9KSB8fCB0aGlzO1xuICAgIH1cbiAgICBUb29Mb25nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlscy5rZXkgKyBcIiBpcyBsb25nZXIgdGhhbiBcIiArIHRoaXMuZGV0YWlscy5tYXggKyBcIiAoXCIgKyB0aGlzLmRldGFpbHMudmFsdWUgKyBcIilcIjtcbiAgICB9O1xuICAgIHJldHVybiBUb29Mb25nO1xufShEZXRhaWxlZEVycm9yKSk7XG52YXIgVG9vU2hvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRvb1Nob3J0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRvb1Nob3J0KHZhck5hbWUsIHZhbHVlLCBtaW4pIHtcbiAgICAgICAgaWYgKG1pbiA9PT0gdm9pZCAwKSB7IG1pbiA9ICc/JzsgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgJ3Rvby1zaG9ydCcsIDQwNiwgeyBrZXk6IHZhck5hbWUsIHZhbHVlOiB2YWx1ZSwgbWluOiBtaW4gfSkgfHwgdGhpcztcbiAgICB9XG4gICAgVG9vU2hvcnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxzLmtleSArIFwiIGlzIHNob3J0ZXIgdGhhbiBcIiArIHRoaXMuZGV0YWlscy5taW4gKyBcIiAoXCIgKyB0aGlzLmRldGFpbHMudmFsdWUgKyBcIilcIjtcbiAgICB9O1xuICAgIHJldHVybiBUb29TaG9ydDtcbn0oRGV0YWlsZWRFcnJvcikpO1xudmFyIFVuYXV0aG9yaXplZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5hdXRob3JpemVkLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVuYXV0aG9yaXplZCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsICd1bmF1dGhvcml6ZWQnLCA0MDEsIHt9KSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVW5hdXRob3JpemVkO1xufShEZXRhaWxlZEVycm9yKSk7XG5leHBvcnQgeyBBbHJlYWR5RXhpc3RzLCBCYWRJbnB1dCwgQ3VzdG9tLCBEZXRhaWxlZEVycm9yLCBFeHBpcmVkLCBJbW11dGFibGUsIE1pc3NpbmdJbnB1dCwgTm90Rm91bmQsIE5vUGVybWlzc2lvbnMsIFNhdmVGYWlsZWQsIFN5c3RlbSwgVG9vTG9uZywgVG9vU2hvcnQsIFVuYXV0aG9yaXplZCB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=