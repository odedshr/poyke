import { readFileSync, existsSync, writeFileSync } from 'fs';
import { createInterface, Interface as IReadLine } from 'readline';
import { config as configEnvironment, parse as parseEnvFile } from 'dotenv';
import { init, Variables } from './main';

function checkForRequiredVariables(varCollection: Variables, lookFor: string[]): string[] {
	const existingKeys = Object.keys(varCollection);
	return lookFor.filter(varName => !existingKeys.includes(varName));
}

function readExistingEnvFile(envFile: string): Variables {
	const existingVars = existsSync(envFile) ? parseEnvFile(readFileSync('./.env')) : {};
	const output: { [key: string]: string } = {};
	for (const k in existingVars) {
		output[k] = existingVars[k];
	}

	return output;
}
async function mergeToExistingFile(varNames: string[]): Promise<Variables> {
	const envFile = './.env';
	const vars = await getVariables(varNames);
	const merged = { ...readExistingEnvFile(envFile), ...vars };
	writeFileSync(envFile, toEnvFileFormat(merged));

	return merged;
}

function toEnvFileFormat(vars: { [key: string]: string }): string {
	return Object.keys(vars)
		.map(key => `${key}=${vars[key]}`)
		.join('\n');
}

async function ask(rl: IReadLine, question: string): Promise<string> {
	return new Promise(resolve => rl.question(question, resolve));
}

async function getVariables(vars: string[]): Promise<Variables> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout
	});

	return new Promise(async resolve => {
		rl.on('close', resolve);

		const email = await ask(rl, '>Email: ');
		const password = await ask(rl, '>Password: ');
		console.log(`SYS_EMAIL=${email}
SYS_EMAIL_PASSWORD=${password}`);
		rl.close();
	});
}

async function setupVariables(): Promise<Variables> {
	return new Promise(resolve => {
		const envFileContent: Variables = configEnvironment().parsed;

		const missingVariables = checkForRequiredVariables({ ...process.env, ...envFileContent }, [
			'SYS_EMAIL_USER',
			'SYS_EMAIL_PASSWORD',
			'PORT'
		]);
		if (missingVariables.length) {
			resolve(mergeToExistingFile({ ...envFileContent, ...missingVariables }));
		} else {
			resolve(envFileContent);
		}
	});
}

setupVariables().then((parameters: Variables) => {
	init(parameters);
});
