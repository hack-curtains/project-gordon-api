const crypto = require('crypto');
/* ### Set up session ### */
const {
  checkForUser,
  checkSession,
  createUser,
  loginUser,
  createSession,
  deleteSession,
  checkForSession,
  userInfoFromID
} = require('../models/userAuth.js');

module.exports.checkSession = async (req, res) => {
  console.log("The request session ID is: ", req.sessionID);
  session = req.session;
  //console.log(session, req.sessionID)
  let sessionExists = await checkForSession(req.sessionID);
  //console.log("session exists looks like this", sessionExists)
  if (sessionExists[0] === true) {
    //Deliver User Page here
    let userData = await userInfoFromID(sessionExists[1].user_id)
    session.userid = userData;
    //console.log("userData looks like: ", userData)
    res.status(200).send({ userID: sessionExists[1].user_id, userEmail: userData.email, username:userData.username, loggedIn: true, message: 'deliver user page' });
  } else if (sessionExists[0] !== true) {
    //deliver login page here
    res.status(200).send({ loggedIn: false, message: 'deliver login page' });
  }
};

module.exports.newUser = async (req, res) => {
  console.log("The request session ID is: ", req.sessionID);
  if (
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.email === undefined
  ) {
    res.status(406).send({ message: 'New user data incomplete' });
  } else {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    // console.log(email)

    //console.log(req.body);

    let userCheck = await checkForUser(email);

    // console.log("here is user check", userCheck.length )
    if (userCheck.length <= 0) {
      let status = await createUser(username, password, email);

      // console.log('>>>>', status);

      if (status === true) {
        session = req.session;
        session.userid = email;
        let newSessionInformation = await checkForUser(email);
        let user_id = newSessionInformation[0].id
        createSession(newSessionInformation[0].id, req.sessionID);
        // res.body = {userID: email, password: password, username: username}
        res.session = session;
        res.status(201).send({userID: user_id, userEmail: email, username: username, message: 'successfully created new user' });
      } else {
        res.status(409).send({message: 'error processing new user request'});
      }
    } else {
      res.status(409).send({ message: 'Email already used' });
    }
  }
};

module.exports.loginUser = async (req, res) => {
  console.log("The request session ID is: ", req.sessionID);
  // console.log(req.body);
  // console.log(req.sessionID);
  if (req.body.password === undefined || req.body.email === undefined) {
    res.status(406).send({ message: 'User login data incomplete' });
  } else {
    const password = req.body.password;
    const email = req.body.email;
    let data = await loginUser(email);
    if (data === false) {
      res.status(500).send({ message: 'No such user' });
    } else {
      let checkerHash = crypto.pbkdf2Sync(password, data[1], 1000, 64, `sha512`).toString(`hex`);

      if (checkerHash === data[0]) {
        let username = data[2];
        session = req.session;
        session.userid = email;
        let userInfo = await checkForUser(email);
        let user_id = userInfo[0].id;
        let sessionID = req.sessionID;
        let sessionCreated = await createSession(user_id, sessionID);
        res.session = session;
        res.status(200).send({ userID: user_id, email:email, username: username, message: 'successfully logged in' });
      } else {
        res.send({ message: 'Invalid username or password' });
      }
    }
  }
};

module.exports.logoutUser = async (req, res) => {
  console.log("The request session ID is: ", req.sessionID);
  deleteSession(req.sessionID)
  req.session.destroy();
  res.status(200).send({messsage:"Successfully logged out"})
  // res.redirect('/checkSession');
};
