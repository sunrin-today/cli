import { isIPv4, isIPv6 } from 'node:net';

function isIpv4Address(value: string): boolean | string {
	if (isIPv4(value)) {
		return true;
	}

	return '올바른 형식의 IPv4 Address를 입력해주세요';
}

function isIpv6Address(value: string): boolean | string {
	if (isIPv6(value)) {
		return true;
	}

	return '올바른 형식의 IPv6 Address를 입력해주세요';
}

function isFQDN(value: string): boolean | string {
	if (value.match(/^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|([a-z0-9-]{1,30}\.[a-z]{2,}))$/)) {
		return true;
	}

	return '올바른 형식의 Target을 입력해주세요';
}

function isFQDNOrEmpty(value: string): boolean | string {
	if (isFQDN(value) || value === '') {
		return true;
	}

	return '올바른 형식의 Target을 입력해주세요';
}

export { isIpv4Address, isIpv6Address, isFQDN, isFQDNOrEmpty };
