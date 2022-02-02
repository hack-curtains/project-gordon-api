const express = require('express')
const port = process.env.PORT || 3000
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const crypto = require('crypto')
const bodyParser = require('body-parser')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('docs'))
app.use(bodyParser.json())

/* ### Set up session ### */
const oneDay = 1000 * 60 * 60 * 24
app.use(
  sessions({
    secret: 'secretkeythatwouldbehiddeninproductionenvironment',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
  })
)

const {
  checkForUser,
  checkSession,
  createUser,
  loginUser,
  createSession,
  checkForSession
} = require('../models/userAuth.js')

app.get('/', async (req, res) => {
  session = req.session
  //console.log(session)
  let sessionExists = await checkForSession(req.sessionID)
  if (sessionExists[0] === true) {
    //Deliver User Page here
    session.userid = sessionExists[1]
    res.send({ userID: sessionsExists[1],loggedIn: true, message: 'deliver user page' })

  } else {
    //deliver login page here
    res.send({ loggedIn: false, message: 'deliver login page' })
  }
})

app.post('/users/new', async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.email === undefined
  ) {
    res.status(406).send({ message: 'New user data incomplete' })
  } else {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    // console.log(email)
    let userCheck = await checkForUser(email)
    // console.log("here is user check", userCheck.length )
    if (userCheck.length <= 0) {
      let status = await createUser(username, password, email)

      if (status === true) {
        res.locals.username = username
        res.locals.password = password
        session = req.session
        session.userid = email
        let newSessionInformation = await checkForUser(email)
        // console.log(newSessionInformation[0].id)
        createSession(newSessionInformation[0].id, req.sessionID)
        res.session = session
        res.status(201).send({ userID: email, message: 'successfully created new user' })
      } else {
        res.status(409).send({ message: 'error processing new user request' })
      }
    } else {
      res.status(409).send({ message: 'Email already used' })
    }
  }
})

app.post('/users/login', async (req, res) => {
  // attempt to authenticate/login
  // grab hash from database
  console.log(req.body)
  if (
    req.body.password === undefined ||
    req.body.email === undefined
  ) {
    res.status(406).send({ message: 'User login data incomplete' })
  } else {
    const password = req.body.password
    const email = req.body.email
    console.log(req.sessionID)
    // console.log(username, password)
    let data = await loginUser(email)
    if (data === false) {
      res.status(500).send({ message: 'No such user' })
    } else {
      let checkerHash = crypto
        .pbkdf2Sync(password, data[1], 1000, 64, `sha512`)
        .toString(`hex`)
      //console.log(checkerHash === data[0])

      if (checkerHash === data[0]) {
        session = req.session
        session.userid = email
        let userInfo = await checkForUser(email)
        let userID = userInfo[0].id
        let sessionID = req.sessionID
        let sessionCreated = await createSession(userID, sessionID)
        res.session = session
        console.log(res.session)
        res.status(200).send({userID: email, message: 'successfully logged in' })
        //   res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`)
      } else {
        res.send({ message: 'Invalid username or password' })
      }

      // create cookie/session if success
      //res.status(200).send(data)
      // return reason for failure if failure
    }
  }
})

// put(/users/logout)
app.put('/users/logout', async (req, res) => {
  req.session.destroy()
  res.redirect('/')
  // end user session
})

app.listen(port, async () => {
  console.log('Server is running at http://localhost:' + port)
})
