const { pool } = require('./index.js')
const crypto = require('crypto')
/******************************
 * Handles authentication in the userbase
 * Used for logging in
 ******************************/

// const SQL = `
//   SELECT *
//   FROM recipes
//   WHERE id = ${id}
// `;
// let data = await pool.query(SQL);
// return data.rowCount === 0 ? { message: 'not found' } : data.rows[0];
module.exports.createUser = async (username, password, email) => {

  randomBytes(256, (err, buf) => {
    if (err) throw err
    console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`)
  })
  crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err
  })
}
module.exports.loginUser = async ({ id = 2 }) => {}
module.exports.loginUser = async ({ id = 2 }) => {}
