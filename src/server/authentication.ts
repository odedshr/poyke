import { IncomingMessage } from 'http';
import * as sendMailNameSpace from 'sendmail';
import { decode } from './encryption';
import { Unauthorized } from '../shared/Errors';
import { getServerIPs } from './http-utils';

interface AuthToken {
	localIP: string;
	serverIP: string;
}

const sendmail: any = (<any>sendMailNameSpace).default();

export function sendSignInEmail(email: string, token: string) {
	console.log('sendSignInEmail');
	const x = sendmail(
		{
			from: 'no-reply@yourdomain.com',
			to: email,
			subject: 'test sendmail',
			html: `Mail of test sendmail: ${token}`
		},
		(err: any, reply: any) => {
			console.log(err && err.stack);
			console.dir(reply);
		}
	);
	console.log('res=', x);
}

export function getAuthUser(req: IncomingMessage): Promise<any> {
	return new Promise<any>((resolve, reject) => {
		let value: any;

		// not authorized
		if (req.headers.authorization === undefined) {
			return reject(new Unauthorized());
		}

		// bad auth code
		try {
			value = JSON.parse(decode(req.headers.authorization));
		} catch (err) {
			return reject(new Unauthorized());
		}

		// auth expired
		if (value.expires instanceof Date && value.expires < new Date()) {
			return reject(new Unauthorized());
		}

		const token = getAuthToken(req);

		// wrong auth code
		if (token.localIP !== value.localIP || token.serverIP !== value.serverIP) {
			throw new Unauthorized();
		}

		resolve(value.user);
	});
}

function getAuthToken(req: IncomingMessage): AuthToken {
	const headers = req.headers['x-forwarded-for'];
	return {
		localIP: (Array.isArray(headers) ? headers.join(';') : headers) || req.connection.remoteAddress,
		serverIP: getServerIPs().join(';')
	};
}

export async function getOptionalUser(req: IncomingMessage): Promise<any> {
	return new Promise<any>((resolve, reject) => {
		try {
			resolve(JSON.parse(decode(req.headers.authorization)).user);
		} catch (err) {
			reject(err);
		}
	});
}
