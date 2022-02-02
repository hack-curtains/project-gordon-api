require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
const { Pool } = require('pg');

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

const POOL = new Pool();

module.exports = { POOL, RECIPE_COLUMNS };
