// *****************************************************************************
// api-restaurants.routes.js
// This module provides a set of RESTful API route definitions for
// displaying Author data from and saving Author data to the database.
// *****************************************************************************

// Dependencies
// =============================================================

const { Restaurant, Review } = require('../models')
const router = require('express').Router()

// Routes
// =============================================================

// Find all Restaurants and return them to the user with res.json
router.get('/', function (req, res) {
  // console.log('USER DATA', req.user)
  Restaurant.findAll({ include: [Review] })
    .then(restaurantsArray => res.status(200).json({ data: restaurantsArray }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Find one Restaurant with the id = req.params.id and return it with res.json
router.get('/:id', function (req, res) {
  Restaurant.findByPk(req.params.id, { include: [Review] })
    .then(restaurant => res.status(200).json({ data: restaurant }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Create a new Restaurant with the data recieved in req.body
router.post('/', function (req, res) {
  // console.log(req.body) // testing

  Restaurant.create(req.body)
    .then(restaurant => res.status(201).json({ data: restaurant }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Delete the Restaurant with the id = req.params.id
router.delete('/:id', async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.status(200).json({ data: restaurant })
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// PATCH route for updating restaurant
router.patch('/:id', async function (req, res) {
  try {
    const { averageRating, averageMoney, averageBussy, averageClean } = req.body
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update({ averageRating, averageMoney, averageBussy, averageClean }, { where: { id: req.params.id } })
    res.status(200).json({ data: restaurant })
  } catch (err) {
    console.log('GET /reviews failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
