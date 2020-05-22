// ****************************************************************************
// Server.js
// This file is the initial starting point for the Node/Express server.
// ****************************************************************************
// Dependencies
// =============================================================
const express = require('express')
const exphbs = require('express-handlebars')
// Dependencies for passport ADDED BY KC
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

// Requiring our models for syncing to the MySQL database
// Remember: This syntax imports the `db` object exported from the
// `./models/index.js` module.
const db = require('./models')

// Sets up the Express App
// =============================================================
const app = express()

// Sets up the Express app to handle data parsing

// =============================================================
// added by KC
// set this to false below, as this should be false will this line for testing
// ^ app.use(express.urlencoded({ extended: true })) ^ related to comment on 34
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// connects password-config to function to server
const initializePassport = require('./passport-config.js')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

// connect to DB this is the user array that needs to be stored in the DB
const users = []

// keeps the user logged in without needing to login again while navigating the site
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Above was added by KC
// -------------------------------------------------------------------
// Allow Express to automatically serve static resource like the
// HTML, CSS and JavaScript for the frontend client application.
app.use(express.static('./public'))

// Handlebars set up
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// -------------------------------------------------------------------------------------
// setting how getting routes works for logging in and creating user accounts
// -------------------------------------------------------------------------------------
// ADD BY KC
// if logged in
app.get('/account', checkAuthenticated, (req, res) => {
  res.render('account', { name: req.user.name })
})
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login',
  failureFlash: true
}))
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register')
})
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      // id handled by DB
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/account')
  }
  next()
}
// end of code added by KC
// -----------------------------------------------------------

// Routes
// =============================================================
// Api
app.use('/api/reviews', require('./routes/api-reviews.routes.js'))
app.use('/api/restaurants', require('./routes/api-restaurants.routes.js'))

// Pages
app.use(require('./routes/handlebars.routes.js'))

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})

/// ------------------------------------------------------------------
