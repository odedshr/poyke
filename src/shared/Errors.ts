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
	constructor(varType: string, value: any) {
		super('already-exists', 409, { key: varType, value: value });
	}
}

class BadInput extends DetailedError {
	constructor(key: string, value: any) {
		super('bad-input', 406, { key: key, value: value });
	}

	toString() {
		return `Bad Input for ${this.details.key} (${this.details.value})`;
	}
}

class Custom extends DetailedError {
	constructor(action: string, description: any, error: Error) {
		super('custom-error', 500, { key: action, value: description }, error);
	}

	toString() {
		return `${this.details.key} ${this.details.value}`;
	}
}
class Expired extends DetailedError {
	constructor(varName: string) {
		super('expired', 406, { key: varName });
	}
}

class Immutable extends DetailedError {
	constructor(varType: string) {
		super('immutable', 406, { key: varType });
	}
}

class MissingInput extends DetailedError {
	constructor(varName: string) {
		super('missing-input', 406, { key: varName });
	}

	toString() {
		return `Missing Input: ${this.details.key}`;
	}
}

class NotFound extends DetailedError {
	constructor(type: string, id: string) {
		super('not-found', 404, { key: type, value: id });
	}

	toString() {
		return `${this.details.key} not Found: ${this.details.value}`;
	}
}

class NoPermissions extends DetailedError {
	constructor(actionName: string) {
		super('no-permissions', 401, { action: actionName });
	}
}

class SaveFailed extends DetailedError {
	constructor(varName: string, content: any, error: Error) {
		super('save-failed', 500, { key: varName, value: content }, error);
	}
}

class System extends DetailedError {
	constructor(error: Error, args: any, url: string) {
		super('system-error', 500, { args, error, url }, error);
	}
}

class TooLong extends DetailedError {
	constructor(varName: string, value: any, max = '?') {
		super('too-long', 406, { key: varName, value: value, max });
	}

	toString() {
		return `${this.details.key} is longer than ${this.details.max} (${this.details.value})`;
	}
}

class TooShort extends DetailedError {
	constructor(varName: string, value: any, min = '?') {
		super('too-short', 406, { key: varName, value: value, min });
	}

	toString() {
		return `${this.details.key} is shorter than ${this.details.min} (${this.details.value})`;
	}
}

class Unauthorized extends DetailedError {
	constructor() {
		super('unauthorized', 401, {});
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
