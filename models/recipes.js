const { rows } = require('pg/lib/defaults');
const { pool } = require('./index.js');

/******************************
 * Returns an abbreviated list of recipes
 * Used for rendering many recipe cards
 ******************************/
module.exports.getRecipes = async ({ page = 1, count = 50 }) => {
  const offset = (page - 1) * count;
  const end = page * count;

  const SQL = `
    SELECT
    id, title, image, servings, summary, tags, ingredients, "readyInMinutes"
    FROM recipes
    WHERE index > ${offset} AND index <= ${end} order by index;
    SELECT count(1) from recipes;
  `;

  let data = await pool.query(SQL);
  return {
    page: page,
    count: count,
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

module.exports.getRecipesByIngredients = async ({ ids, page = 1, count = 10 }) => {
  if (ids.length < 1) {
    return { message: 'must include at least 1 ingredient' };
  }
  const SQL = `
    WITH temp AS (
      SELECT recipe_id
      FROM recipes_ingredients
      WHERE "ingredient_id" in(${ids.join(',')})
      GROUP BY recipe_id
      having count(distinct ingredient_id) = ${ids.length}
    )
    SELECT
    id, title, image, servings, summary, tags, ingredients, "readyInMinutes"
    FROM recipes
    WHERE id in(SELECT recipe_id FROM temp);
  `;

  let data = await pool.query(SQL);
  let out = data.rows.slice((page - 1) * count, page * count);

  return {
    page: page,
    count: count,
    queryRows: out.length,
    totalRows: data.rows.length,
    rows: out,
  };
};

module.exports.getRecipesByTags = async ({ ids, page = 1, count = 10 }) => {
  if (ids.length < 1) {
    return { message: 'must include at least 1 ingredient' };
  }
  const SQL = `
    WITH temp AS (
      SELECT recipe_id
      FROM recipes_tags
      WHERE "tag_id" in(${ids.join(',')})
      GROUP BY recipe_id
      having count(distinct tag_id) = ${ids.length}
    )
    SELECT
    id, title, image, servings, summary, tags, ingredients, "readyInMinutes"
    FROM recipes
    WHERE id in(SELECT recipe_id FROM temp);
  `;

  let data = await pool.query(SQL);
  let out = data.rows.slice((page - 1) * count, page * count);

  return {
    page: page,
    count: count,
    queryRows: out.length,
    totalRows: data.rows.length,
    rows: out,
  };
};
