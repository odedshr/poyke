import { ServerResponse } from 'http';
import { DetailedError } from '../shared/Errors';

export function write(response: ServerResponse, startTime: Date, data: any) {
	if (data === undefined || data === null) {
		response.end();
	} else if (data._file !== undefined) {
		response.writeHead(200, { 'Content-Type': data._file });
		return response.end(data.content, 'binary');
	} else if (data._redirect !== undefined) {
		response.writeHead(302, { Location: data._redirect });
		return response.end();
	} else {
		if (data instanceof DetailedError) {
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
		data.processTime = getSecondsSince(startTime);
		response.writeHead(data.status);
		response.end(JSON.stringify(data));
	}
}

function getSecondsSince(startTime: Date) {
	return (new Date().getTime() - startTime.getTime()) / 1000;
}

function addObjectSizes(data: { [key: string]: any }) {
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
