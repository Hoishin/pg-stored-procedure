import path from 'path';
import {execSync} from 'child_process';
import test from 'ava';
import pgsp from '.';

test('SQL is correct', t => {
	const sql = pgsp('foo_bar');
	t.is(sql,
`\
DROP TYPE IF EXISTS type_foo_bar CASCADE;
CREATE TYPE type_foo_bar AS (

);

CREATE OR REPLACE FUNCTION foo_bar(

) RETURNS SETOF type_foo_bar AS $FUNCTION$
DECLARE

BEGIN

END;
$FUNCTION$ LANGUAGE plpgsql;
`
	);
});

test('CLI: without path', t => {
	const withoutPath = () => execSync(`node ${path.join(__dirname, 'cli.js')} get_test`);
	t.is(withoutPath().toString().trim(), 'SQL is copied to clipboard');
});

test('CLI: with path', t => {
	const stdout = execSync(`node ${path.join(__dirname, 'cli.js')} get_test --path .`);
	const absolutePath = path.join(process.cwd(), 'get_test.sql');
	t.is(stdout.toString().trim(), `SQL is saved to ${absolutePath}`);
});

test('CLI: with abbreviation', t => {
	const stdout = execSync(`node ${path.join(__dirname, 'cli.js')} get_test -p .`);
	const absolutePath = path.join(process.cwd(), 'get_test.sql');
	t.is(stdout.toString().trim(), `SQL is saved to ${absolutePath}`);
});

test('CLI: errors on no arguments', t => {
	const noArg = () => {
		execSync(`node ${path.join(__dirname, 'cli.js')}`);
	};
	t.throws(noArg, Error);
});

test('CLI: errors with wrong path', t => {
	const wrongPath = () => {
		execSync(`node ${path.join(__dirname, 'cli.js')} get_test --path never/exists`);
	};
	t.throws(wrongPath, Error);
});
