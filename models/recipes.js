const { rows } = require('pg/lib/defaults');
const { pool } = require('./index.js');

const ABBREVIATED_COLUMNS =
  'id, title, image, servings, price, likes, summary, tags, ingredients, time';

/******************************
 * Returns an abbreviated list of recipes
 * Used for rendering many recipe cards
 ******************************/
module.exports.getRecipes = async ({ page = 1, count = 50, sort = 'id', direction = 'asc' }) => {
  if (!['id', 'likes', 'price'].includes(sort) || !['asc', 'desc'].includes(direction)) {
    return { message: 'invalid parameters' };
  }

  const offset = (page - 1) * count;
  const end = page * count;

  let where = `1=1`;
  let order = `${sort} ${direction} OFFSET ${offset} LIMIT ${count}`;

  const SQL = `
    SELECT ${ABBREVIATED_COLUMNS} FROM recipes WHERE ${where} ORDER BY ${order};
    SELECT count(1) from recipes;
  `;

  let data = await pool.query(SQL);
  return {
    page: parseInt(page),
    count: parseInt(count),
    sort: sort === 'id' ? 'default' : sort,
    direction: direction,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };
};

module.exports.getRecipe = async ({ id = 2 }) => {
  const SQL = `
    SELECT *
    FROM recipes
    WHERE id = ${id}
  `;
  let data = await pool.query(SQL);
  return data.rowCount === 0 ? { message: 'not found' } : data.rows[0];
};

/*********************************************
 * getRecipesByIngredients
 ********************************************* */

module.exports.getRecipesByIngredients = async ({
  ids,
  page = 1,
  count = 10,
  sort = 'id',
  direction = 'asc',
}) => {
  if (ids.length < 1) {
    return { message: 'must include at least 1 ingredient' };
  }
  if (!['id', 'likes', 'price'].includes(sort) || !['asc', 'desc'].includes(direction)) {
    return { message: 'invalid parameters' };
  }

  const offset = (page - 1) * count;
  const end = page * count;

  const withstatement = `
  WITH temp AS (
    SELECT recipe_id
    FROM recipes_ingredients
    WHERE ingredient_id in(${ids.join(',')})
    GROUP BY recipe_id
    having count(distinct ingredient_id) = ${ids.length}
  )`;

  const order = `${sort} ${direction} OFFSET ${offset} LIMIT ${count}`;

  const SQL = `
    ${withstatement} SELECT ${ABBREVIATED_COLUMNS} FROM recipes
    WHERE id in(SELECT recipe_id FROM temp) ORDER BY ${order};
    ${withstatement} SELECT count(1) from temp;
  `;

  let data = await pool.query(SQL);

  return {
    page: parseInt(page),
    count: parseInt(count),
    ids: ids.map((x) => parseInt(x)),
    sort: sort === 'id' ? 'default' : sort,
    direction: direction,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };
};

/*********************************************
 * getRecipesByTags
 ********************************************* */

module.exports.getRecipesByTags = async ({
  ids,
  page = 1,
  count = 10,
  sort = 'id',
  direction = 'asc',
}) => {
  if (ids.length < 1) {
    return { message: 'must include at least 1 tag' };
  }
  if (!['id', 'likes', 'price'].includes(sort) || !['asc', 'desc'].includes(direction)) {
    return { message: 'invalid parameters' };
  }

  const offset = (page - 1) * count;
  const end = page * count;

  const withstatement = `
  WITH temp AS (
    SELECT recipe_id
    FROM recipes_tags
    WHERE tag_id in(${ids.join(',')})
    GROUP BY recipe_id
    having count(distinct tag_id) = ${ids.length}
  )`;

  const order = `${sort} ${direction} OFFSET ${offset} LIMIT ${count}`;

  const SQL = `
    ${withstatement} SELECT ${ABBREVIATED_COLUMNS} FROM recipes
    WHERE id in(SELECT recipe_id FROM temp) ORDER BY ${order};
    ${withstatement} SELECT count(1) from temp;
  `;

  let data = await pool.query(SQL);

  return {
    page: parseInt(page),
    count: parseInt(count),
    ids: ids.map((x) => parseInt(x)),
    sort: sort === 'id' ? 'default' : sort,
    direction: direction,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };
};

/*********************************************
 * filterRecipesByIngredients
 ********************************************* */

module.exports.filterRecipesByIngredients = async ({
  ids,
  page = 1,
  count = 10,
  sort = 'id',
  direction = 'asc',
}) => {
  if (ids.length < 1) {
    return { message: 'must include at least 1 ingredient' };
  }
  if (!['id', 'likes', 'price'].includes(sort) || !['asc', 'desc'].includes(direction)) {
    return { message: 'invalid parameters' };
  }

  const offset = (page - 1) * count;
  const end = page * count;

  const withstatement = `
  WITH temp AS (
    SELECT distinct recipe_id
    FROM recipes_ingredients
    WHERE ingredient_id in(${ids.join(',')})
  )`;

  const order = `${sort} ${direction} OFFSET ${offset} LIMIT ${count}`;

  const SQL = `
    ${withstatement} SELECT ${ABBREVIATED_COLUMNS} FROM recipes
    WHERE id not in(SELECT recipe_id FROM temp) ORDER BY ${order};
    ${withstatement} SELECT count(1) from recipes
    WHERE id not in (SELECT recipe_id FROM temp);
  `;

  let data = await pool.query(SQL);

  return {
    page: parseInt(page),
    count: parseInt(count),
    ids: ids.map((x) => parseInt(x)),
    sort: sort === 'id' ? 'default' : sort,
    direction: direction,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };
};
/*********************************************
 * getRecipesByTags
 ********************************************* */

module.exports.filterRecipesByTags = async ({
  ids,
  page = 1,
  count = 10,
  sort = 'id',
  direction = 'asc',
}) => {
  if (ids.length < 1) {
    return { message: 'must include at least 1 tag' };
  }
  if (!['id', 'likes', 'price'].includes(sort) || !['asc', 'desc'].includes(direction)) {
    return { message: 'invalid parameters' };
  }

  const offset = (page - 1) * count;
  const end = page * count;

  const withstatement = `
  WITH temp AS (
    SELECT distinct recipe_id
    FROM recipes_tags
    WHERE tag_id in(${ids.join(',')})
  )`;

  const order = `${sort} ${direction} OFFSET ${offset} LIMIT ${count}`;

  const SQL = `
    ${withstatement} SELECT ${ABBREVIATED_COLUMNS} FROM recipes
    WHERE id not in(SELECT recipe_id FROM temp) ORDER BY ${order};
    ${withstatement} SELECT count(1) FROM recipes
    WHERE id not in(SELECT recipe_id FROM temp);
  `;

  let data = await pool.query(SQL);

  return {
    page: parseInt(page),
    count: parseInt(count),
    ids: ids.map((x) => parseInt(x)),
    sort: sort === 'id' ? 'default' : sort,
    direction: direction,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };
};
