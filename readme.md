# pg-stored-procedure [![Build Status](https://travis-ci.org/Hoishin/pg-stored-procedure.svg?branch=master)](https://travis-ci.org/Hoishin/pg-stored-procedure) [![codecov](https://codecov.io/gh/Hoishin/pg-stored-procedure/badge.svg?branch=master)](https://codecov.io/gh/Hoishin/pg-stored-procedure?branch=master)

> CLI for scaffolding out PostgreSQL stored procedures


## CLI

### Install

```
$ npm install --global pg-stored-procedure
```

### Usage

```
$ pgsp --help

  Usage
    $ pgsp [name]

  Options
    --path / -p  Path to SQL file output
      (Outputs to clipboard if omitted)

  Examples
    $ pgsp get_user_info
    $ pgsp get_user_info -p .
```


## Code

### Install

```sh
npm install pg-stored-procedure
```

### Usage

```js
const pgsp = require('pg-stored-procedure');

pgsp('foo_bar');
//=>
// DROP TYPE IF EXISTS type_foo_bar CASCADE;
// CREATE TYPE type_foo_bar AS (

// );

// CREATE OR REPLACE FUNCTION foo_bar(

// ) RETURNS SETOF type_foo_bar AS $FUNCTION$
// DECLARE

// BEGIN

// END;
// $FUNCTION$ LANGUAGE plpgsql;
```


## API

### pgsp(functionName)

#### functionName

Type: `string`

Name of the stored procedure.


## License

MIT © [Hoishin](https://github.com/Hoishin)
