import { existsSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { IncomingMessage, RequestListener, ServerResponse } from 'http';
import { Server, createServer } from 'https';
import * as passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction, IVerifyOptions } from 'passport-local';

import { Injectable, processRequest } from './requestProcessor';
import { write } from './responseWriter';
import { NotFound, Unauthorized } from '../shared/Errors';

interface SSLDetails {
	key: string;
	cert: string;
}

export class WebServer {
	server: Server;
	rootFolder: string;
	defaultFile: string = 'index.html';
	port: number;
	injectables: { [key: string]: Injectable } = {};

	constructor(port: number, rootFolder: string, defaultFile: string, injectables: { [key: string]: Injectable }) {
		this.rootFolder = rootFolder;
		this.defaultFile = defaultFile;
		this.port = port;
		this.injectables = injectables;
	}

	private async createServer(
		rootFolder: string,
		defaultFile: string,
		injectables: { [key: string]: Injectable }
	): Promise<Server> {
		const sslDetails: SSLDetails = await this.getExistingOrNewSSLDetails();
		return createServer(sslDetails, this.getHandleRequest(rootFolder, defaultFile, injectables));
	}

	async start(port: number = this.port) {
		if (!this.server) {
			this.server = await this.createServer(`${this.rootFolder}/www`, this.defaultFile, this.injectables);
		}
		this.server.listen(port);
	}

	stop() {
		this.server.close();
	}

	private getHandleRequest(
		wwwFolder: string,
		defaultFile: string,
		injectables: { [key: string]: Injectable }
	): RequestListener {
		return async function handleRequest(request: IncomingMessage, response: ServerResponse) {
			const url = getUrlFromRequest(request, defaultFile);

			if (!serveFile(wwwFolder, url, response)) {
				const startTime = new Date();
				const result: any = await processRequest(url, request, injectables).catch(err => {
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
				});
				try {
					write(response, startTime, result);
				} catch (err) {
					response.writeHead(err.statusCode);
					response.end(err.message);
				}
			}
		};
	}

	private async getExistingOrNewSSLDetails(): Promise<SSLDetails> {
		const errMessage = `
CRITICAL ERROR: SSL DETAILS ARE MISSING.
Run the command \`openssl req -nodes -new -x509 -keyout ${this.rootFolder}/var/server.key -out ${this.rootFolder}/var/server.cert\`
and paste in chrome \`chrome://flags/#allow-insecure-localhost\`
`;
		const key = `${this.rootFolder}/var/server.key`;
		const cert = `${this.rootFolder}/var/server.cert`;
		this.throwIfFileNotExist(key, errMessage);
		this.throwIfFileNotExist(cert, errMessage);

		return new Promise(resolve =>
			resolve({
				key: readFileSync(key, 'utf8'),
				cert: readFileSync(cert, 'utf8')
			})
		);
	}

	private throwIfFileNotExist(file: string, errMessage: string): void {
		if (!existsSync(file)) {
			console.error(errMessage);
			throw new NotFound('ssl', file);
		}
	}
}

const verifyLocalStrategy: VerifyFunction = function(
	username: string,
	password: string,
	done: (err: any, user?: any, options?: IVerifyOptions) => void
) {
	// done(err);
	//done(null, false, { message: 'Incorrect username.' });
	console.log('verifyLocalStrategy', username, password);
	return done(null, { email: 'odedshr@gmail.com', username, password });
};

passport.use(new LocalStrategy(verifyLocalStrategy));

function getUrlFromRequest(request: IncomingMessage, defaultFile: string) {
	let { url } = request;

	if ('/' === url) {
		url = `/${defaultFile}`;
	}

	return url;
}

function serveFile(root: string, url: string, response: ServerResponse, statusCode = 200) {
	const filePath = `${root}${url}`;

	if (!existsSync(filePath)) {
		return false;
	}

	try {
		const data = readFileSync(pathJoin(__dirname, filePath));
		response.writeHead(200);
		response.end(data);
	} catch (err) {
		response.writeHead(statusCode);
		response.end(JSON.stringify(err));
	}

	return true;
}

function handleUnknownUrl(root: string, request: IncomingMessage, response: ServerResponse) {
	console.error('404 not Found', request.url);
	serveFile(root, '404.html', response, 404);
}

export function readRequestParameters(request: IncomingMessage, keys: string[], reURL: RegExp): Map<string, string> {
	const output = new Map<string, string>();
	let values: string[], count: number, i: number;

	reURL.lastIndex = 0;
	values = reURL.exec(request.url.toString());
	values.shift();
	count = Math.min(keys.length, values.length);

	for (i = 0; i < count; i++) {
		output.set(keys[i], values[i]);
	}

	return output;
}
