#!/usr/bin/env node

import { Command } from 'commander';
import { domainCommand } from './commands';

const program = new Command();

program
	.version('1.0.0')
	.description('Sunrin Today CLI');

program
	.addCommand(domainCommand);

if (require.main === module) {
	program.parse(process.argv);
}
