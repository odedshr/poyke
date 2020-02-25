import { existsSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { createServer, IncomingMessage, RequestListener, ServerResponse } from 'http';
import Server from './ServerModel';
import { Injectable, processRequest } from './requestProcessor';
import { write } from './responseWriter';
import { NotFound } from '../shared/Errors';

export function init(
	port: number,
	wwwFolder: string,
	injectables: { [key: string]: Injectable } = {},
	defaultFile = 'index.html'
): Server {
	const handleRequest: RequestListener = async function handleRequest(
		request: IncomingMessage,
		response: ServerResponse
	) {
		const url = getUrlFromRequest(request, defaultFile);

		if (!serveFile(wwwFolder, url, response)) {
			const startTime = new Date();
			const result: any = await processRequest(url, request, injectables);
			try {
				if (result instanceof NotFound) {
					handleUnknownUrl(wwwFolder, request, response);
				} else {
					write(response, startTime, result);
				}
			} catch (err) {
				response.writeHead(err.statusCode);
				response.end(err.message);
			}
		}
	};

	return {
		core: createServer(handleRequest),
		root: wwwFolder,
		defaultFile,
		port
	};
}

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

export function start(server: Server, port: number) {
	server.core.listen(port);
}

export function stop(server: Server) {
	server.core.close();
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
