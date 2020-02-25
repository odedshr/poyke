import * as http from 'http';

export default interface Server {
	core: http.Server;
	root: string;
	defaultFile: string;
	port: number;
}
