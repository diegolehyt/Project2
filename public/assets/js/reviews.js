/* eslint-disable no-undef */
// ==========================================\ Client JS logic /============================================== \\

// GET restaurant Data
// eslint-disable-next-line no-undef
const restaurantId = localStorage.getItem('vOneLocalStorage')

const apiRestURL = `/api/restaurants/${restaurantId}`

// eslint-disable-next-line no-undef
fetch(apiRestURL).then(function (response) { return response.json() }).then(function (data) {
  const restaurantN = document.getElementById('restaurantN')
  const reviewsContainer = document.getElementById('reviewsContainer')
  // let restaurantImg = document.getElementById('restaurantImg')

  restaurantN.innerHTML = (data.data.name)
  document.getElementById('restaurantImg').setAttribute('src', `${data.data.image}`)

  console.log(data.data.Reviews)

  const allReviews = data.data.Reviews
  allReviews.forEach(review => {
    // const reviewBlock = document.createElement('div')
    // const nombre = document.createElement('div')
    // const titulo = document.createElement('div')
    // const comentario = document.createElement('div')

    // nombre.innerHTML = review.username
    // titulo.innerHTML = review.title
    // comentario.innerHTML = review.comment

    // reviewBlock.appendChild(nombre)
    // reviewBlock.appendChild(titulo)
    // reviewBlock.appendChild(comentario)

    // reviewsContainer.appendChild(reviewBlock)
    // ------------ REAL --------------------
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
    timeStamp.innerHTML = review.createdAt // substring later
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
  // RATING average revers the order of the stars
  let sumRating = 0
  let sumRatingMoney = 0
  let sumRatingBussy = 0
  let sumRatingClean = 0

  allReviews.forEach(review => {
    const oneRating = parseInt(review.rating)
    const oneRatingMoney = parseInt(review.money)
    const oneRatingBussy = parseInt(review.bussy)
    const oneRatingClean = parseInt(review.clean)

    sumRating = sumRating + oneRating
    sumRatingMoney = sumRatingMoney + oneRatingMoney
    sumRatingBussy = sumRatingBussy + oneRatingBussy
    sumRatingClean = sumRatingClean + oneRatingClean
  })

  console.log(sumRating)
  console.log(allReviews.length)

  const averageRating = sumRating / allReviews.length
  const averageMoney = sumRatingMoney / allReviews.length
  const averageBussy = sumRatingBussy / allReviews.length
  const averageClean = sumRatingClean / allReviews.length

  localStorage.setItem('averageRating', averageRating)
  localStorage.setItem('averageMoney', averageMoney)
  localStorage.setItem('averageBussy', averageBussy)
  localStorage.setItem('averageClean', averageClean)

  updateRating()
})

// localStorage.clear()

// POST reviews
document.getElementById('create-form').addEventListener('submit', event => {
  event.preventDefault()
  const newReview = {
    username: document.getElementById('userName').value.trim(),
    title: document.getElementById('title').value.trim(),
    comment: document.getElementById('comment').value.trim(),
    RestaurantId: restaurantId,
    rating: document.querySelector('[name=rating]:checked').value.trim(),
    money: document.querySelector('[name=rating2]:checked').value.trim(),
    bussy: document.querySelector('[name=rating3]:checked').value.trim(),
    clean: document.querySelector('[name=rating4]:checked').value.trim()
  }

  // eslint-disable-next-line no-undef
  fetch('/restaurants/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  }).then(response => {
    console.log(response)
    if (response.ok) location.reload()
  })
})

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
    // eslint-disable-next-line no-undef
    // if (response.ok) location.reload()
    console.log(response)
  })
}
