require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
const { Pool } = require('pg');

let pool;

if (process.env.NODE_ENV !== 'development') {
  console.log('PRODUCTION');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  });
} else {
  console.log('DEV');
  pool = new Pool();
}

module.exports = { pool };
