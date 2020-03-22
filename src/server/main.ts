import { IncomingMessage } from 'http';

import { WebServer } from './WebServer';
import { Injectable, OnInitPromise } from './requestProcessor';
import { DataProvider } from './data-provider';
import { getAuthUser, getOptionalUser } from './authentication';

export type Variables = { [key: string]: string };

export async function init(prameters: Variables) {
	const dataProvider = new DataProvider('./dist/var/db.sql');
	await dataProvider.init('./src/sql');

	const injectables: { [key: string]: Injectable } = {
		authUser: new OnInitPromise(async (req: IncomingMessage) => {
			return await getAuthUser(req);
		}),

		optionalUser: new OnInitPromise(async (req: IncomingMessage) => {
			return await getOptionalUser(req);
		}),

		async test() {
			await dataProvider.test();
		}
	};
	const rootFolder = `${process.cwd()}/${process.env.npm_package_rootFolder}`;
	const defaultFile = 'index.html';

	let port = +prameters.PORT;
	const server: WebServer = new WebServer(port, rootFolder, defaultFile, injectables);

	await server.start(port).catch(err => console.error(err));
	console.log(`server running on port ${port}`);
}
