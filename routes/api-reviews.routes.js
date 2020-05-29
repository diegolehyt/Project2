// *****************************************************************************
// api-reviews.routes.js
// This module provides a set of RESTful API route definitions for
// displaying Post data from and saving Post data to the database.
// *****************************************************************************

// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()

// Import the Post and Author modes using object destructuring assignment
const { Review, Restaurant } = require('../models')

// Routes
// =============================================================

// GET route for getting all of the reviews
router.get('/', function (req, res) {
  Review.findAll({ include: [Restaurant] })
    .then(reviewsArray => res.status(200).json({ data: reviewsArray }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Get route for retrieving a single review
router.get('/:id', function (req, res) {
  Review.findByPk(req.params.id, { include: [Restaurant] })
    .then(review => res.status(200).json({ data: review }))
    .catch(err => {
      console.log('GET /reviews failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// POST route for saving a new review
router.post('/', function (req, res) {
  console.log('REQ USER', req.user)
  Review.create(req.body)
    .then(review => res.status(201).json({ data: review }))
    .catch(err => {
      console.log('GET /reviews failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// ------------------------------------------------------------ coming next

// DELETE route for deleting reviews
router.delete('/:id', async function (req, res) {
  try {
    const review = await Review.findByPk(req.params.id)
    await review.destroy()
    res.status(200).json({ data: review })
  } catch (err) {
    console.log('GET /reviews failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// PUT route for updating reviews
router.put('/:id', async function (req, res) {
  try {
    const review = await Review.findByPk(req.params.id)
    await review.update(req.body)
    res.status(200).json({ data: review })
  } catch (err) {
    console.log('GET /reviews failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
