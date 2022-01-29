require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const { Pool } = require('pg');

const pool = new Pool();

module.exports = { pool };
