import { TTLType } from './types';

const isProxiedInquirer = {
	type: 'confirm',
	name: 'isProxied',
	message: 'Proxied 여부를 선택해주세요',
	default: false,
} as const;

const ttlInquirer = {
	type: 'list',
	name: 'ttl',
	message: 'TTL을 선택해주세요',
	choices: Object.values(TTLType),
	default: TTLType.AUTO,
} as const;

const priorityInquirer = {
	type: 'number',
	name: 'priority',
	message: 'Priority를 입력해주세요 (0 - 65535)',
	required: true,
	min: 0,
	max: 65535,
} as const;

const weightInquirer = {
	type: 'number',
	name: 'weight',
	message: 'Weight를 입력해주세요 (0 - 65535)',
	required: true,
	min: 0,
	max: 65535,
} as const;

export { isProxiedInquirer, ttlInquirer, priorityInquirer, weightInquirer };
