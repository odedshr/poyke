import { sendSignInEmail } from './authentication';

export type Route = {
	url: RegExp;
	method: Function;
	type: 'get' | 'post' | 'put' | 'delete';
};

export const routes: Route[] = [
	{
		type: 'get',
		url: /\/ping/,
		method() {
			return { response: 'pong' };
		}
	},
	{
		type: 'get',
		url: /\/test-db/,
		async method(test: () => void) {
			console.log('11');
			test();
			console.log('2');
			return { response: 'tested' };
		}
	},
	{
		type: 'get',
		url: /\/test\/{{email}}/,
		async method(email: string, authUser: any) {
			console.log('email:', email, authUser);
			return { response: 'tested' };
		}
	},
	{
		type: 'post',
		url: /\/signin/,
		method(email: string) {
			sendSignInEmail(email, 'xxx');
			return { response: 'signedin' };
		}
	}
];
