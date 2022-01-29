require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
const { Pool } = require('pg');
const pool = new Pool();

console.log('CONNECTING TO DATABASE>>>>>>>>>>');
console.log(process.env);

module.exports = { pool };
