#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { getAscii } from '../src/services/asciiArtService';
import { generateAsciiArt } from '../src/services/imageService';
import logger from '../src/utils/logger';
import { ASCII_ART_HEADER } from '../src/config/constants';

const program = new Command();

const usage = chalk.keyword('violet')(
  `\n\n${boxen(chalk.green('\nGet ASCII art or create new one from terminal\n'), {
    padding: 1,
    borderColor: 'green',
    dimBorder: true,
  })}\n`
);

program
  .version('1.0.4')
  .description('A CLI tool to fetch ASCII art or create your own from imagepath')
  .option('-g, --get <text>', 'Input text to get art')
  .option('-c, --create <path>', 'Input path to create art')
  .addHelpText('before', ASCII_ART_HEADER)
  .addHelpText('after', usage);

program.parse(process.argv);

const options = program.opts();

async function main() {
  try {
    if (options.get) {
      const art = await getAscii(options.get);
      console.log(art);
    } else if (options.create) {
      const art = await generateAsciiArt(options.create);
      console.log(art);
    } else {
      program.help();
    }
  } catch (error) {
    logger.error('An error occurred:', error);
    console.error('An error occurred. Please check the logs for more information.');
  }
}

main();
