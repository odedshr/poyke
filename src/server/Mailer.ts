import { createTransport, SentMessageInfo } from 'nodemailer';
import * as directTransport from 'nodemailer-direct-transport';
import { hostname } from 'os';
import { MissingInput, System } from '../shared/Errors';

export class Mailer {
	transporter: any; // type is actually Mail;

	//https://nodemailer.com/smtp/
	constructor(host: string, user: string, pass: string, port = 465) {
		this.transporter = createTransport(this.getSmtpConfig(host, user, pass, port));
	}

	private getSmtpConfig(host: string, user: string, pass: string, port = 465) {
		if (host !== undefined) {
			console.info(`configuring mailer to ${host}`);
			return {
				pool: true,
				host,
				port,
				secure: true, // use TLS
				auth: {
					user,
					pass
				}
			};
		} else {
			console.warn('configuring mailer to send from local machine (not recommended)');
			// should be the hostname machine IP address resolves to
			console.log(directTransport);
			return {};
			//return directTransport({ name: hostname() });
		}
	}

	async send(from: string, to: string, subject: string, text: string, html: string) {
		console.log('aa');
		return new Promise((resolve, reject) => {
			if (to === undefined) {
				reject(new MissingInput('mail.to'));
			}
			console.log('bb');

			if (subject === undefined) {
				reject(new MissingInput('mail.subject'));
			}
			console.log('cc');
			const mailOptions = {
				from,
				to,
				subject,
				text,
				html
			};
			console.log('dd');
			if (this.transporter !== undefined) {
				this.transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
					if (error) {
						console.error('ee', info);
						return reject(new System(error, mailOptions, to));
					}
					console.log('ee', info);
					return resolve({ output: 'sent', details: info });
				});
			} else {
				console.warn('mail parameters were not properly set');
				console.info(JSON.stringify(mailOptions));
				resolve({ output: 'not-sent', details: mailOptions });
			}
		}).catch(err => err);
	}
}

export default Mailer;
