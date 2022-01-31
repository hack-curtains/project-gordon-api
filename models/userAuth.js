const { pool } = require('./index.js')
const crypto = require('crypto')

var mysql = require('mysql2')
/******************************
 * Handles authentication in the userbase
 * Used for logging in
 ******************************/
var con = mysql.createConnection({
  host: 'localhost',
  user: 'ubuntu',
  password: 'password',
  database: 'ProjectGordonUsers'
})
con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports.createUser = async (username, password, email) => {



  let newSalt = crypto.randomBytes(8).toString('hex')
  let newHash = crypto
    .pbkdf2Sync(password, newSalt, 1000, 64, `sha512`)
    .toString(`hex`)

  let insertData = [[username, newHash, newSalt, email]]
  console.log(insertData)
  let insertQuery = `INSERT INTO Users(username, password, salt, email) VALUES ?;`
  con.query(insertQuery, [insertData], function (err, result, fields) {
    if (err) throw err
    return true

  })
  return true
}

module.exports.loginUser = async username => {
  let data = await con
    .promise()
    .query(`SELECT password, salt FROM Users Where username = '${username}'`)
  if (data[0].length === 0) {
    return false
  } else {
    let checkData = [data[0][0].password, data[0][0].salt]
    return checkData
  }
}
module.exports.checkSession = async ({ id = 2 }) => {}
