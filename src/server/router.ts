import { Route as RouteBase, routes as originalRoutes } from './routes';
import { emailPattern, maskedIdPattern } from './validations';
import { BadInput, NotFound } from '../shared/Errors';

const urlParamPattern = new RegExp('\\{\\{([^#]+?)\\}\\}', 'g');

export interface Route extends RouteBase {
	keys: string[];
	original: RegExp;
}

const routes: { [key: string]: Route[] } = {
	get: [],
	post: [],
	put: [],
	delete: []
};
originalRoutes.forEach((route: RouteBase) => {
	const { keys, url } = getArgumentNamesFromUrlTempalte(route.url);

	routes[route.type].push({
		type: route.type,
		method: route.method,
		original: route.url,
		keys,
		url
	});
});

function getArgumentNamesFromUrlTempalte(urlTemplate: RegExp): { keys: string[]; url: RegExp } {
	const keys: string[] = [];
	let urlString: string = urlTemplate.source;
	let item;

	while ((item = urlParamPattern.exec(urlString)) !== null) {
		// item[0] = {{key:type}}, item[1] = key:type
		const [key, type] = item[1].split(':');

		keys.push(key);

		try {
			urlString = urlString.split(item[0]).join(getPatternByType(type || key));
		} catch (err) {
			console.error(err);
			throw new BadInput(urlTemplate.source, err);
		}
	}

	return { keys, url: new RegExp(urlString) };
}

function getPatternByType(type: string) {
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

export function getRoute(requestMethod: string, url: string) {
	return routes[requestMethod.toLocaleLowerCase()]?.find(route => url.match(route.url));
}
