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
    id, title, image, servings, summary, tags, "readyInMinutes"
    FROM recipes
    WHERE index >= ${offset} AND index < ${end} order by index;
  `;

  let data = await pool.query(SQL);
  return data.rows;
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
