/* eslint-disable no-undef */
// ==========================================\ Client JS logic /============================================== \\
// GET restaurant Data
// eslint-disable-next-line no-undef
const restaurantId = localStorage.getItem('vOneLocalStorage')
const apiRestURL = `/api/restaurants/${restaurantId}`

// Getting data from restaurant API
// eslint-disable-next-line no-undef
fetch(apiRestURL).then(function (response) { return response.json() }).then(function (data) {
  const restaurantN = document.getElementById('restaurantN')
  const reviewsContainer = document.getElementById('reviewsContainer')
  restaurantN.innerHTML = (data.data.name)
  document.getElementById('restaurantImg').setAttribute('src', `${data.data.image}`)
  // console.log(data.data.Reviews)

  const allReviews = data.data.Reviews

  // Comment Block generator
  allReviews.forEach(review => {
    const reviewBlock = document.createElement('li')
    reviewBlock.className = 'uk-transition-toggle'
    reviewBlock.setAttribute('tabindex', '0')

    const reviewSubBlock = document.createElement('article')
    reviewSubBlock.className = 'uk-comment uk-comment-primary uk-width-3-4@l uk-margin-bottom uk-transition-scale-up uk-transition-opaque'
    reviewBlock.appendChild(reviewSubBlock)

    // scope 2
    const reviewHeader = document.createElement('header')
    reviewHeader.className = 'uk-comment-header uk-grid-medium uk-flex-middle'
    const reviewCommentBody = document.createElement('div')
    reviewCommentBody.className = 'uk-comment-body'
    reviewSubBlock.appendChild(reviewHeader)
    reviewSubBlock.appendChild(reviewCommentBody)

    // scope 3 A
    const dataDiv = document.createElement('div')
    dataDiv.className = 'uk-width-expand'
    reviewHeader.appendChild(dataDiv)
    const author = document.createElement('h4')
    author.className = 'uk-comment-title uk-margin-remove'
    author.innerHTML = review.username
    dataDiv.appendChild(author)
    const ulBlock = document.createElement('ul')
    ulBlock.className = 'uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top'
    dataDiv.appendChild(ulBlock)

    // scope 4 A
    const timeStamp = document.createElement('li')
    timeStamp.innerHTML = (review.createdAt).substr(0, 10) // substring later
    ulBlock.appendChild(timeStamp)

    const startBlock = document.createElement('li')
    startBlock.className = 'uk-text-large uk-margin-small@s uk-width-small@s'
    startBlock.innerHTML = `${review.rating} <a uk-icon="icon: star; ratio: 2" class="uk-text-warning"></a>`
    ulBlock.appendChild(startBlock)

    const moneyBlock = document.createElement('li')
    moneyBlock.className = 'uk-text-normal'
    moneyBlock.innerHTML = `${review.money} <a uk-icon="credit-card" class="uk-text-secondary"></a>`
    ulBlock.appendChild(moneyBlock)

    const bussyBlock = document.createElement('li')
    bussyBlock.className = 'uk-text-normal'
    bussyBlock.innerHTML = `${review.bussy} <a uk-icon="users" class="uk-text-success"></a>`
    ulBlock.appendChild(bussyBlock)

    const cleanBlock = document.createElement('li')
    cleanBlock.className = 'uk-text-normal'
    cleanBlock.innerHTML = `${review.clean} <a uk-icon="warning" class="uk-text-primary"></a>`
    ulBlock.appendChild(cleanBlock)

    // scope 3 B
    const titleBlock = document.createElement('h2')
    titleBlock.innerHTML = review.title
    reviewCommentBody.appendChild(titleBlock)

    const commentBlock = document.createElement('p')
    commentBlock.innerHTML = review.comment
    reviewCommentBody.appendChild(commentBlock)

    // connect DOM
    reviewsContainer.appendChild(reviewBlock)
  })

  // RATING
  let sumRating = 0
  let sumRatingMoney = 0
  let sumRatingBussy = 0
  let sumRatingClean = 0

  // Calculating all average criterias
  allReviews.forEach(review => {
    const oneRating = review.rating
    const oneRatingMoney = review.money
    const oneRatingBussy = review.bussy
    const oneRatingClean = review.clean

    sumRating = sumRating + oneRating
    sumRatingMoney = sumRatingMoney + oneRatingMoney
    sumRatingBussy = sumRatingBussy + oneRatingBussy
    sumRatingClean = sumRatingClean + oneRatingClean
  })

  const averageRating = (sumRating / allReviews.length).toFixed(1)
  const averageMoney = (sumRatingMoney / allReviews.length).toFixed(1)
  const averageBussy = (sumRatingBussy / allReviews.length).toFixed(1)
  const averageClean = (sumRatingClean / allReviews.length).toFixed(1)

  // used LocalStorage to pass data between to js files
  localStorage.setItem('averageRating', averageRating)
  localStorage.setItem('averageMoney', averageMoney)
  localStorage.setItem('averageBussy', averageBussy)
  localStorage.setItem('averageClean', averageClean)

  average()
  updateRating()

  async function average () {
    const restaurantStar = document.getElementById('restaurantStar')
    const restaurantMoney = document.getElementById('restaurantMoney')
    const restaurantBussy = document.getElementById('restaurantBussy')
    const restaurantClean = document.getElementById('restaurantClean')
    const restaurantDescription = document.getElementById('restaurantDescription')
    restaurantStar.innerHTML = await (data.data.averageRating)
    restaurantMoney.innerHTML = await (data.data.averageMoney)
    restaurantBussy.innerHTML = await (data.data.averageBussy)
    restaurantClean.innerHTML = await (data.data.averageClean)
    restaurantDescription.innerHTML = await (data.data.description)
  }
})

// POST reviews
document.getElementById('create-form').addEventListener('submit', event => {
  event.preventDefault()
  const newReview = {
    title: document.getElementById('title').value.trim(),
    comment: document.getElementById('comment').value.trim(),
    RestaurantId: restaurantId,
    rating: document.getElementById('generalSlider').value.trim(),
    money: document.getElementById('affordSlider').value.trim(),
    bussy: document.getElementById('busynessSlider').value.trim(),
    clean: document.getElementById('cleanSlider').value.trim()
  }
  // eslint-disable-next-line no-undef
  fetch('/restaurants/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  }).then(response => {
    console.log(response)
    if (response.ok) location.reload()
    if (response) location.reload()
  })
})

// PATCH
// Sends the data to the serve, rin order to update a restaurant with the new ratings created
async function updateRating () {
  const newRating = {
    averageRating: localStorage.getItem('averageRating'),
    averageMoney: localStorage.getItem('averageMoney'),
    averageBussy: localStorage.getItem('averageBussy'),
    averageClean: localStorage.getItem('averageClean')
  }
  // eslint-disable-next-line no-undef
  await fetch(`/api/restaurants/${restaurantId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRating)
  }).then(response => {
    console.log(response)
  })
}
