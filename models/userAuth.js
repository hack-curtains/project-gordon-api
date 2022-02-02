const { POOL } = require('./index.js');
const crypto = require('crypto');

module.exports.checkForUser = async (email) => {
  let SQL = `SELECT id, username FROM users WHERE email = '${email}'`;
  let data = await POOL.query(SQL);
  return data.rows;
};

module.exports.createUser = async (username, password, email) => {
  let newSalt = crypto.randomBytes(8).toString('hex');
  let newHash = crypto.pbkdf2Sync(password, newSalt, 1000, 64, `sha512`).toString(`hex`);

  let SQL = `
  INSERT INTO users (username, password, salt, email, "createdAt", "updatedAt")
  VALUES ($1, $2, $3, $4, $5, $6);`;
  try {
    await POOL.query(SQL, [username, newHash, newSalt, email, new Date(), new Date()]);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.loginUser = async (email) => {
  let data = await POOL.query(`SELECT password, salt FROM users WHERE email = '${email}'`);

  if (data.rows.length === 0) {
    return false;
  } else {
    let checkData = [data.rows[0].password, data.rows[0].salt];
    return checkData;
  }
};

module.exports.createSession = async (userID, sessionID) => {
  let insertData = [
    userID,
    sessionID,
    new Date(Date.now() + 24 * 60 * 60 * 1000),
    new Date(),
    new Date(),
  ];
  let insertQuery = `
  INSERT INTO sessions (user_id, cookie, expiration, "createdAt", "updatedAt")
  VALUES ($1, $2, $3, $4, $5);`;
  await POOL.query(insertQuery, insertData);
  return true;
};

module.exports.deleteSession = async (sessionID) => {
  let deleteQuery = `DELETE FROM sessions WHERE cookie = '${sessionID}'`;
  await POOL.query(deleteQuery);
};

module.exports.checkForSession = async (sessionID) => {
  let checkQuery = `SELECT user_id, cookie FROM sessions WHERE cookie = '${sessionID}'`;
  let check = await POOL.query(checkQuery);

  if (check.rows.length === 0) {
    return [false];
  } else {
    return [true, check.rows[0]];
  }
};
