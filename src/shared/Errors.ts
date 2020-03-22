class DetailedError extends Error {
	constructor(message: string, status: number, details: { [key: string]: any }, stack?: string | Error) {
		super(...Array.from(arguments));
		this.message = message;
		this.stack = <string>stack;
		this.status = status;
		this.details = details;
	}

	status: number;
	details: { [key: string]: any };

	getStackTrace(): string {
		let messages = [this.toString() || this.message],
			ptr: Error = this;

		if (this.stack) {
			if (typeof this.stack.replace === 'function') {
				messages.push(
					JSON.stringify(
						this.stack
							.replace(/^[^\(]+?[\n$]/gm, '')
							.replace(/^\s+at\s+/gm, '')
							.replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
							.split('\n'),
						null,
						4
					)
				);
			} else {
				while (ptr.stack) {
					messages.push(ptr.stack.toString());
					ptr = <Error>(<unknown>ptr.stack);
				}
			}
		}

		return messages.join('\n');
	}

	getString() {
		return this.message;
	}
}

class AlreadyExists extends DetailedError {
	static status = 409;
	constructor(varType: string, value: any) {
		super('already-exists', AlreadyExists.status, { key: varType, value: value });
	}
}

class BadInput extends DetailedError {
	static status = 406;

	constructor(key: string, value: any) {
		super('bad-input', BadInput.status, { key: key, value: value });
	}

	toString() {
		return `Bad Input for ${this.details.key} (${this.details.value})`;
	}
}

class Custom extends DetailedError {
	static status = 500;

	constructor(action: string, description: any, error: Error) {
		super('custom-error', Custom.status, { key: action, value: description }, error);
	}

	toString() {
		return `${this.details.key} ${this.details.value}`;
	}
}
class Expired extends DetailedError {
	static status = 406;

	constructor(varName: string) {
		super('expired', Expired.status, { key: varName });
	}
}

class Immutable extends DetailedError {
	static status = 406;

	constructor(varType: string) {
		super('immutable', Immutable.status, { key: varType });
	}
}

class MissingInput extends DetailedError {
	static status = 406;

	constructor(varName: string) {
		super('missing-input', MissingInput.status, { key: varName });
	}

	toString() {
		return `Missing Input: ${this.details.key}`;
	}
}

class NotFound extends DetailedError {
	static status = 404;

	constructor(type: string, id: string) {
		super('not-found', NotFound.status, { key: type, value: id });
	}

	toString() {
		return `${this.details.key} not Found: ${this.details.value}`;
	}
}

class NoPermissions extends DetailedError {
	static status = 401;

	constructor(actionName: string) {
		super('no-permissions', NoPermissions.status, { action: actionName });
	}
}

class SaveFailed extends DetailedError {
	static status = 500;

	constructor(varName: string, content: any, error: Error) {
		super('save-failed', SaveFailed.status, { key: varName, value: content }, error);
	}
}

class System extends DetailedError {
	static status = 500;

	constructor(error: Error, args: any, url: string) {
		super('system-error', System.status, { args, error, url }, error);
	}
}

class TooLong extends DetailedError {
	static status = 406;

	constructor(varName: string, value: any, max = '?') {
		super('too-long', TooLong.status, { key: varName, value: value, max });
	}

	toString() {
		return `${this.details.key} is longer than ${this.details.max} (${this.details.value})`;
	}
}

class TooShort extends DetailedError {
	static status = 406;

	constructor(varName: string, value: any, min = '?') {
		super('too-short', TooShort.status, { key: varName, value: value, min });
	}

	toString() {
		return `${this.details.key} is shorter than ${this.details.min} (${this.details.value})`;
	}
}

class Unauthorized extends DetailedError {
	static status = 401;

	constructor() {
		super('unauthorized', Unauthorized.status, {});
	}
}

export {
	AlreadyExists,
	BadInput,
	Custom,
	DetailedError,
	Expired,
	Immutable,
	MissingInput,
	NotFound,
	NoPermissions,
	SaveFailed,
	System,
	TooLong,
	TooShort,
	Unauthorized
};
