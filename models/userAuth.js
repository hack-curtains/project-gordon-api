const { pool } = require('./index.js')
const crypto = require('crypto')

var mysql = require('mysql2')
/******************************
 * Handles authentication in the userbase
 * Used for logging in
 ******************************/
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'ubuntu',
  password: 'password',
  database: 'ProjectGordonUsers'
})
con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports.checkForUser = async (email) => {
  let sqlQuery = `SELECT id, username FROM Users WHERE email = '${email}'`
  let data = await con
  .promise()
  .query(sqlQuery)
  console.log(data[0])
  return data[0]
}
module.exports.checkForUserID = async (email) => {
  let sqlQuery = `SELECT id FROM Users WHERE email = '${email}'`
  let data = await con
  .promise()
  .query(sqlQuery)
  console.log(data[0])
  return data[0]
}

module.exports.createUser = async (username, password, email) => {



  let newSalt = crypto.randomBytes(8).toString('hex')
  let newHash = crypto
    .pbkdf2Sync(password, newSalt, 1000, 64, `sha512`)
    .toString(`hex`)

  let insertData = [[username, newHash, newSalt, email]]
  //console.log(insertData)
  let insertQuery = `INSERT INTO Users(username, password, salt, email) VALUES ?;`
  con.query(insertQuery, [insertData], function (err, result, fields) {
    if (err) throw err
    return true

  })
  return true
}

module.exports.loginUser = async email => {
  let data = await con
    .promise()
    .query(`SELECT password, salt FROM Users Where email = '${email}'`)
  if (data[0].length === 0) {
    return false
  } else {
    let checkData = [data[0][0].password, data[0][0].salt]
    return checkData
  }
}
module.exports.createSession = async (userID, sessionID) => {

  let insertData = [[userID, sessionID]]
  let insertQuery = `INSERT INTO Sessions (id_Users, cookie) VALUES ?;`
  con.promise().query(insertQuery, [insertData])
  return true
}
module.exports.checkForSession = async (sessionID) => {
  let checkData = [[sessionID]]
  let checkQuery = `SELECT id_Users, cookie FROM Users Where cookie = '${sessionID}'`
  let check = await con.promise().query(insertQuery, [insertData])
  let checkResponse = check[0]
  if (check[0].length >= 0) {
    return [true, checkResponse]
  } else {
    return [false]
  }

}

