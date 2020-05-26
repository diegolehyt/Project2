// ****************************************************************************
// Server.js
// This file is the initial starting point for the Node/Express server.
// ****************************************************************************

// Dependencies
// =============================================================
const express = require('express')
const exphbs = require('express-handlebars')

// Requiring our models for syncing to the MySQL database
// Remember: This syntax imports the `db` object exported from the
// `./models/index.js` module.
const db = require('./models')
// Models
const models = require('./models')

// Sets up the Express App
// =============================================================
const app = express()

const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Allow Express to automatically serve static resource like the
// HTML, CSS and JavaScript for the frontend client application.
app.use(express.static('./public'))

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
// Handlebars set up
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// -------------------------------------------------------------------------------------------------------------
// Routes
// =============================================================
// Api
app.use('/api/reviews', require('./routes/api-reviews.routes.js'))
app.use('/api/restaurants', require('./routes/api-restaurants.routes.js'))

// Pages
app.use(require('./routes/handlebars.routes.js'))

// Routess
// eslint-disable-next-line no-unused-vars
const authRoute = require('./routes/auth.js')(app, passport)

// load passport strategies
require('./config/passport/passport.js')(passport, models.user)

// -------------------------------------------------------------------------------------------------------------------
// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
