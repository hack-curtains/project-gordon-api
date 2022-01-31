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

const { checkSession, createUser, loginUser } = require('../models/userAuth.js')

app.get('/', (req, res) => {
  session = req.session
  console.log(session)
  if (session.userid) {
    //Deliver User Page here
    res.send({message:"deliver user page"})
  } else {
    //deliver login page here
    res.send( {message: "deliver login page"})
  }
})

// post(/users/new) username, password, email
app.post('/users/new', async (req, res) => {
  // const username = req.body.username
  // const password = req.body.password
  // const email = req.body.email
  console.log(req.body, req.query, req.data)
  res.send("ok")
  // let status = await createUser(username, password, email)
  // if (status === true) {
  //   res.status(201).send({ message: 'successfully created new user' })
  // } else {
    // res.status(409).send({ message: 'error processing request'})
  // }
  // Prints derivedKey
})
// create a user in the database

// initiate new session given the new user information
// .next() to login

// post(/users/login) username, password
app.post('/users/login', async (req, res) => {
  // attempt to authenticate/login
  // grab hash from database
  const username = req.query.username
  const password = req.query.password

  // console.log(username, password)
  let data = await loginUser(username)
  if (data === false) {
    res.status(500).send({ message: 'No such user' })
  } else {
    let checkerHash = crypto
      .pbkdf2Sync(password, data[1], 1000, 64, `sha512`)
      .toString(`hex`)
    console.log(checkerHash === data[0])

    if (checkerHash === data[0]) {
      session = req.session
      session.userid = username
      console.log(req.session)
    //   res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`)
    } else {
      res.send('Invalid username or password')
    }

    // create cookie/session if success
    res.status(200).send(data)
    // return reason for failure if failure
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
