import { generateKeyPair } from 'crypto';
import { encode as jwtEncode, decode as jwtDecode } from 'jwt-simple';
import { BadInput } from '../shared/Errors';

const key = `encription-${process.env.npm_package_version}`;

export function encode(string: string) {
	if (typeof string !== 'string') {
		throw new BadInput('string', string);
	}

	return jwtEncode(string, key);
}

export function decode(encryptedString: string) {
	return jwtDecode(encryptedString, key);
}

export interface RSAKeys {
	publicKey: string;
	privateKey: string;
}

export async function getRSAKeys(passphrase: string = key): Promise<RSAKeys> {
	return new Promise((resolve, reject) => {
		generateKeyPair(
			'rsa',
			{
				modulusLength: 4096,
				publicKeyEncoding: {
					type: 'spki',
					format: 'pem'
				},
				privateKeyEncoding: {
					type: 'pkcs8',
					format: 'pem',
					cipher: 'aes-256-cbc',
					passphrase
				}
			},
			(err, publicKey, privateKey) => {
				if (err) {
					reject(err);
				} else {
					resolve({ publicKey, privateKey });
				}
			}
		);
	});
}
