const { POOL } = require('./index.js');

/******************************
 * Returns a list of all tags
 * Used for rendering many recipe cards
 ******************************/
module.exports.getTags = async () => {
  const SQL = `
  SELECT
  id, name, category, frequency
  FROM tags
  ORDER BY id ASC
  `;

  let data = await POOL.query(SQL);
  return data.rows;
};
