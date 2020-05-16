// *********************************************************************************
// app.routes.js
//
// This module provides a set of routes for sending users the various
// HTML pages for the frontend client app.
// *********************************************************************************

// Dependencies
// =============================================================
// const path = require('path')
const router = require('express').Router()

// Import the Post and Author modes using object destructuring assignment
const { Review, Restaurant } = require('../models')

// Routes
// =============================================================

// The route for creating blob reviews
router.get('/landing', function (req, res) {
  
  res.render('landing')
})

// The route for managing restaurants
router.get('/restaurants', async function (req, res) {
  try {
    const restaurantsArray = await Restaurant.findAll()
    console.log(restaurantsArray)
    res.status(200).render('restaurants', {restaurants: restaurantsArray})
  }
  catch (err) {
    res.status(500).json({ errors: [err] }) // change to better error display
  }
  
})

// The route for viewing the blog reviews
router.get('/restaurants/new', function (req, res) {
  res.render('new')
})

// The index route redirects to /landing route
router.get('/', (req, res) => res.redirect('/landing'))

module.exports = router
