import { networkInterfaces } from 'os';

export function getIPs(): string[] {
	const ifaces = networkInterfaces();

	return Object.keys(ifaces).reduce((memo: string[], key: string) => {
		memo.push(
			...ifaces[key].filter(iface => 'IPv4' === iface.family && iface.internal === false).map(iface => iface.address)
		);

		return memo;
	}, []);
}
