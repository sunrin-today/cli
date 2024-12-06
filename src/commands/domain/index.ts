import { Command } from 'commander';
import inquirer from 'inquirer';
import { CAATag, DomainResponse, DomainType } from './types';
import { isProxiedInquirer, priorityInquirer, ttlInquirer, weightInquirer } from './template';
import { isFQDN, isFQDNOrEmpty, isIpv4Address, isIpv6Address } from './validation';

const chalk = require('chalk');
const ora = require('ora');

const domainCommand = new Command('domain');

domainCommand
	.command('login')
	.action(() => {
		console.log('Login');
	});

domainCommand
	.command('logout')
	.action(() => {
		console.log('Logout');
	});

domainCommand
	.command('register')
	.argument('<name>', 'Domain name')
	.action(async () => {
		// console.log(`${ chalk.bgHex('#FFA500').whiteBright.bold(' LOADING ') } 도메인이 유효한지 확인하는 중...`);

		const spinner = ora('도메인이 유효한지 확인하는 중...').start();

		const isExist = await isExistDomainName('test.com');

		if (isExist) {
			// console.log(`${ chalk.bgRed.whiteBright.bold(' ERROR ') } 이미 존재하는 도메인입니다.`);
			spinner.fail('이미 존재하는 도메인입니다.');
			return;
		}

		spinner.succeed('도메인이 유효한지 확인되었습니다.');

		const response = await inquirer.prompt<DomainResponse>([
			{
				type: 'list',
				name: 'type',
				message: 'Domain Type을 선택해주세요',
				choices: Object.values(DomainType),
			},
		]);

		let parameters: any;

		switch (response.type) {
			case DomainType.A:
				parameters = await inquirer.prompt([
					{
						type: 'input',
						name: 'content',
						message: 'IPv4 Address를 입력해주세요',
						validate: isIpv4Address,
						required: true,
					},
					isProxiedInquirer,
				]);

				if (!parameters.isProxied) {
					const res = await inquirer.prompt([
						ttlInquirer,
					]);
					parameters.ttl = res.ttl;
				}

				break;

			case DomainType.AAAA:
				parameters = await inquirer.prompt([
					{
						type: 'input',
						name: 'content',
						message: 'IPv6 Address를 입력해주세요',
						validate: isIpv6Address,
						required: true,
					},
					isProxiedInquirer,
				]);

				if (!parameters.isProxied) {
					const res = await inquirer.prompt([
						ttlInquirer,
					]);
					parameters.ttl = res.ttl;
				}

				break;

			case DomainType.CAA:
				parameters = await inquirer.prompt([
					ttlInquirer,
					{
						type: 'list',
						name: 'tag',
						message: 'Tag를 선택해주세요',
						choices: Object.values(CAATag),
					},
					{
						type: 'input',
						name: 'caDomainName',
						message: 'CA Domain Name을 입력해주세요',
						required: true,
					},
				]);

				switch (parameters.tag) {
					case CAATag.ISSUE:
						parameters.tag = 'issue';
						break;

					case CAATag.ISSUEWILD:
						parameters.tag = 'issuewild';
						break;

					case CAATag.IODEF:
						parameters.tag = 'iodef';
				}

				break;

			case DomainType.CNAME:
				parameters = await inquirer.prompt([
					{
						type: 'input',
						name: 'content',
						message: 'Target을 입력해주세요 (E.g. www.example.com)',
						validate: isFQDN,
					},
					isProxiedInquirer,
				]);

				if (!parameters.isProxied) {
					const res = await inquirer.prompt([
						ttlInquirer,
					]);
					parameters.ttl = res.ttl;
				}

				break;

			case DomainType.DS:
				parameters = await inquirer.prompt([
					ttlInquirer,
					{
						type: 'number',
						name: 'keyTag',
						message: 'Key Tag를 입력해주세요 (0 - 65535)',
						required: true,
						min: 0,
						max: 65535,
					},
					{
						type: 'number',
						name: 'algorithm',
						message: 'Algorithm을 입력해주세요 (0 - 255)',
						required: true,
						min: 0,
						max: 255,
					},
					{
						type: 'list',
						name: 'digestType',
						message: 'Digest Type을 입력해주세요',
						choices: [ 'SHA-1', 'SHA-256', 'GOST R 34,11-94', 'SHA-384' ],
					},
					{
						type: 'input',
						name: 'digest',
						message: 'Digest를 입력해주세요',
						required: true,
					},
				]);

				switch (parameters.digestType) {
					case 'SHA-1':
						parameters.digestType = 1;
						break;

					case 'SHA-256':
						parameters.digestType = 2;
						break;

					case 'GOST R 34,11-94':
						parameters.digestType = 3;
						break;

					case 'SHA-384':
						parameters.digestType = 4;
				}

				break;

			case DomainType.MX:
				parameters = await inquirer.prompt([
					{
						type: 'input',
						name: 'content',
						message: 'Mail server를 입력해주세요',
						validate: isFQDN,
						required: true,
					},
					ttlInquirer,
					priorityInquirer,
				]);

				break;

			case DomainType.NS:
				parameters = await inquirer.prompt([
					{
						type: 'input',
						name: 'content',
						message: 'Nameserver를 입력해주세요 (E.g. ns1.example.com)',
						validate: isFQDN,
						required: true,
					},
					ttlInquirer,
				]);

				break;

			case DomainType.SRV:
				parameters = await inquirer.prompt([
					priorityInquirer,
					weightInquirer,
					ttlInquirer,
					{
						type: 'number',
						name: 'port',
						message: 'Port를 입력해주세요 (0 - 65535)',
						required: true,
						min: 0,
						max: 65535,
					},
					{
						type: 'input',
						name: 'target',
						message: 'Target을 입력해주세요 (E.g. _sip._tcp.example.com)',
						validate: isFQDNOrEmpty,
						required: true,
					},
				]);

				break;

			case DomainType.TXT:
				parameters = await inquirer.prompt([
					ttlInquirer,
					{
						type: 'input',
						name: 'content',
						message: 'Text를 입력해주세요',
						required: true,
					},
				]);

				break;

			case DomainType.URI:
				parameters = await inquirer.prompt([
					ttlInquirer,
					priorityInquirer,
					weightInquirer,
					{
						type: 'input',
						name: 'target',
						message: 'Target을 입력해주세요',
						required: true,
					},
				]);

				break;
		}

		const confirmResponse = await inquirer.prompt([
			{
				type: 'confirm',
				name: 'confirm',
				message: '이대로 등록하시겠습니까?',
				default: true,
			},
		]);

		if (confirmResponse.confirm) {
			console.log(response, parameters);
		} else {
			console.log('취소되었습니다.');
		}
	});

async function isExistDomainName(name: string): Promise<boolean> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(false);
		}, 3000);
	});
}

export default domainCommand;
