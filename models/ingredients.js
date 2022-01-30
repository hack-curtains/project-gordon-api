const { pool } = require('./index.js');

/******************************
 * Returns a list of all tags
 * Used for rendering many recipe cards
 ******************************/
module.exports.getIngredients = async () => {
  const SQL = `
  SELECT
  id, name, category, frequency
  FROM ingredients
  ORDER BY id ASC`;

  let data = await pool.query(SQL);
  return data.rows;
};
