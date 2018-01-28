#!/usr/bin/env node
'use strict';

const {writeFile} = require('fs');
const path = require('path');
const meow = require('meow');
const clip = require('node-clipboard');
const pgsp = require('.');

const cli = meow(`
  Usage
    $ pgsp [name]

  Options
    --path / -p  Path to SQL file output
      (Outputs to clipboard if omitted)

  Examples
    $ pgsp get_user_info
    $ pgsp get_user_info -p .
`);

if (cli.input.length !== 1) {
	throw new Error(`Requires exactly 1 argument; got ${cli.input.length} instead`);
}

const name = cli.input[0];
const outputPath = cli.flags.path || cli.flags.p;
const sql = pgsp(name, outputPath);

if (outputPath === undefined) {
	clip(sql, err => {
		if (err) {
			throw err;
		}
		console.log(`
  SQL is copied to clipboard
		`);
	});
} else {
	const absolutePath = path.join(process.cwd(), outputPath, `${name}.sql`);
	writeFile(absolutePath, sql, err => {
		if (err) {
			throw err;
		}
		console.log(`
  SQL is saved to ${absolutePath}
		`);
	});
}
