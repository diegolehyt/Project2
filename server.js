// ****************************************************************************
// Server.js
// This file is the initial starting point for the Node/Express server.
// ****************************************************************************

// Dependencies
// =============================================================
const express = require('express')
const exphbs = require('express-handlebars')

// Dependencies for passport ADDED BY KC ----------------------------------------------------------------------
// Requiring necessary npm packages
const session = require('express-session')
// Requiring passport as we've configured it
const passport = require('./config/passport')
// const methodOverride = require('method-override')
// -------------------------------------------------------------------------------------------------------------
// Requiring our models for syncing to the MySQL database
// Remember: This syntax imports the `db` object exported from the
// `./models/index.js` module.
const db = require('./models')

// Sets up the Express App
// =============================================================
const app = express()

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Allow Express to automatically serve static resource like the
// HTML, CSS and JavaScript for the frontend client application.
app.use(express.static('./public'))

// We need to use sessions to keep track of our user's login status------------------------------------------
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

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

// Requiring our routes-----------------------------------------------------
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)

// -------------------------------------------------------------------------------------------------------------------
// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
