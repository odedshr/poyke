import { keepAlive } from './ClientManager';

export type Route = {
	url: RegExp;
	method: Function;
	type: 'get' | 'post' | 'put' | 'delete';
};

const routes: Route[] = [
	{
		type: 'get',
		url: /\/ping/,
		method() {
			return { response: 'pong' };
		}
	},
	{
		type: 'post',
		url: /\/keepAlive/,
		method: keepAlive
	},
	{
		type: 'post',
		url: /\/score/,
		method() {
			return { response: 'submitted?' };
		}
	}
];

export function getRoute(url: string) {
	return routes.find(route => url.match(route.url));
}

// client <=> server <=> backend <=> frontend
//															<=> issAdapter
