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
const { Restaurant, Review } = require('../models') // ======remember add review page route Review
// Routes
// =============================================================
// The route for creating blob reviews
router.get('/index', function (req, res) {
  res.render('index')
})
// The route for managing restaurants
router.get('/restaurants', async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll({
      raw: true
    })
    // console.log(req.user)
    res.status(200).render('restaurants', { restaurants: restaurants })
  } catch (err) {
    res.status(500).json({ errors: [err] }) // change to better error display
  }
})
router.post('/restaurants', async function (req, res) {
  try {
    const { name, image, location, phone, email, language, website, description } = req.body
    // save it into the db
    await Restaurant.create({ name, image, location, phone, email, language, website, description })
    res.status(200).redirect('/restaurants')
  } catch (err) {
    res.status(500).json({ errors: [err] }) // change to better error display
  }
})
// The route for viewing the blog reviews
router.get('/restaurants/new', function (req, res) {
  res.render('new')
})
// The index route redirects to /landing route
// router.get('/', (req, res) => res.redirect('/register'))
// reviews page
// The route for managing restaurants
// router.get('/restaurants/reviews/:id', async function (req, res) {
//   try {
//     const restaurant = await Restaurant.findOne({
//       raw: true,
//       id: req.params.id
//     })
//     console.log(restaurant)
//     res.status(200).render('reviews', { restaurants: restaurant })
//   } catch (err) {
//     res.status(500).json({ errors: [err] }) // change to better error display
//   }
// })
router.get('/restaurants/reviews', async function (req, res) {
  try {
    const restaurant = await Restaurant.findAll({ raw: true, include: [Review] })
    // const restaurant = await Restaurant.findAll({ include: [Review] })
    // console.log('REVIEWS', req.user.firstname)
    // console.log('one restaurant: \n' + restaurant)
    res.status(200).render('reviews', { restaurant: restaurant })
  } catch (err) {
    res.status(500).json({ errors: [err] }) // change to better error display
  }
})
router.post('/restaurants/reviews', async function (req, res) {
  try {
    req.body.username = req.user.firstname
    const { username, title, comment, RestaurantId, rating, money, bussy, clean } = req.body
    // save it into the db
    const review = await Review.create({ username, comment, title, RestaurantId, rating, money, bussy, clean })
    console.log(review)
    res.status(200).redirect('/restaurants/reviews')
  } catch (err) {
    res.status(500).json({ errors: [err] }) // change to better error display
  }
})
// EXTRA for Reviews
router.get('/restaurants/reviews/:id', async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true, include: [Review] })
    res.status(200).render('reviews', { restaurant: restaurant })
  } catch (err) {
    res.status(500).json({ errors: [err] }) // change to better error display
  }
})
module.exports = router
