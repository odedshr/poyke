import { IncomingMessage, ServerResponse } from 'http';
import { networkInterfaces } from 'os';
import { TooLong } from '../shared/Errors';

export function sendJson(response: ServerResponse, data: any) {
	response.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Content-Type': 'application/json'
	});
	response.end(JSON.stringify(data));
}

export async function getPostData(request: IncomingMessage): Promise<{ [key: string]: any }> {
	const buffer: string[] = [];

	return new Promise((resolve, reject) => {
		if (request.method !== 'POST') {
			resolve({});
		}

		request.on('data', data => {
			buffer.push(data);

			if (buffer.length > 1e6) {
				request.connection.destroy();
				reject(new TooLong('input too big', 1e6));
			}
		});

		request.on('end', () => resolve(JSON.parse(buffer.join())));
	});
}

export function getServerIPs(): string[] {
	const ifaces = networkInterfaces();

	return Object.keys(ifaces).reduce((memo: string[], key: string) => {
		memo.push(
			...ifaces[key].filter(iface => 'IPv4' === iface.family && iface.internal === false).map(iface => iface.address)
		);

		return memo;
	}, []);
}
