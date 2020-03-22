// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/server/cli.ts',
	external: [
		'crypto',
		'dotenv',
		'fs',
		'http',
		'https',
		'jwt-simple',
		'nodemailer',
		'nodemailer-direct-transport',
		'os',
		'passport',
		'passport-local',
		'path',
		'readline',
		'sendmail',
		'sqlite3'
	],
	output: {
		file: 'dist/server.js',
		format: 'cjs'
	},
	plugins: [typescript()]
};
