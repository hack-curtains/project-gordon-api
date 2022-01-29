const { pool } = require('./index.js');

/******************************
 * Handles authentication in the userbase
 * Used for logging in
 ******************************/

 module.exports.loginUser = async ({ id = 2 }) => {
  // const SQL = `
  //   SELECT *
  //   FROM recipes
  //   WHERE id = ${id}
  // `;
  // let data = await pool.query(SQL);
  // return data.rowCount === 0 ? { message: 'not found' } : data.rows[0];
};