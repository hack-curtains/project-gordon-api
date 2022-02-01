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
  if (sessionExists === true) {
    //Deliver User Page here
    res.send({ loggedIn: true, message: 'deliver user page' })
  } else {
    //deliver login page here
    res.send({ loggedIn: false, message: 'deliver login page' })
  }
})

// create a user in the database
// app.get('/tester', async (req, res) => {
//   let username = "billy"
//   let data = await checkForUser(username)
//   let zeroboy = "blah"
//   let bigStack = !zeroboy ? username : zeroboy
//   console.log(bigStack)
//   res.send(data)
// })
// initiate new session given the new user information
// .next() to login
// post(/users/new) username, password, email

// add dupe handling
// add email login
//maybe password complexity handling
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
    //console.log("here is user check", userCheck.length )
    if (userCheck.length <= 0) {
      let status = await createUser(username, password, email)

      if (status === true) {
        res.status(201).send({ message: 'successfully created new user' })
        res.locals.username = username
        res.locals.password = password
        // res.next('/users/login')
      } else {
        res.status(409).send({ message: 'error processing new user request' })
      }
    } else {
      res.status(409).send({ message: 'Username already taken' })
    }
  }
})

// post(/users/login) username, password
app.post('/users/login', async (req, res) => {
  // attempt to authenticate/login
  // grab hash from database
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
        //console.log(req.session)
        res.status(200).send({ message: 'successfully logged in' })
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
