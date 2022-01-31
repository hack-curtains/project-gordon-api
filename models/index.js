require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
const { Pool } = require('pg');
const pool = new Pool();

const RECIPE_COLUMNS = [
  'id',
  'title',
  'image',
  'servings',
  'price',
  'likes',
  'summary',
  'tags',
  'ingredients',
  'time',
];

module.exports = { pool, RECIPE_COLUMNS };
