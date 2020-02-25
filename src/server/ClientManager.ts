export function keepAlive(position: number, type: string, remoteIp: string, fireWebServerEvent: Function) {
	fireWebServerEvent({
		action: 'keepAlive',
		params: {
			position,
			type,
			remoteIp
		}
	});

	return {
		response: `submitted=${position}:${type}`
	};
}
