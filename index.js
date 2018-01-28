'use strict';

const makeSql = name =>
`\
DROP TYPE IF EXISTS type_${name} CASCADE;
CREATE TYPE type_${name} AS (

);

CREATE OR REPLACE FUNCTION ${name}(

) RETURNS SETOF type_${name} AS $FUNCTION$
DECLARE

BEGIN

END;
$FUNCTION$ LANGUAGE plpgsql;
`;

module.exports = name => makeSql(name);
