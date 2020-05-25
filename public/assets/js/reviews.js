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
    const reviewBlock = document.createElement('div')
    const nombre = document.createElement('div')
    const comentario = document.createElement('div')

    nombre.innerHTML = review.username
    comentario.innerHTML = review.comment

    reviewBlock.appendChild(nombre)
    reviewBlock.appendChild(comentario)

    reviewsContainer.appendChild(reviewBlock)
  })
})

// localStorage.clear()

// POST reviews
document.getElementById('create-form').addEventListener('submit', event => {
  event.preventDefault()
  const newReview = {
    username: document.getElementById('userName').value.trim(),
    comment: document.getElementById('comment').value.trim(),
    RestaurantId: restaurantId,
    rating: document.querySelector('[name=rating]:checked').value.trim(),
    money: document.querySelector('[name=rating2]:checked').value.trim(),
    bussy: document.querySelector('[name=rating3]:checked').value.trim()
  }

  // eslint-disable-next-line no-undef
  fetch('/restaurants/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  }).then(response => {
    console.log(response)
    // if (response.ok) location.reload()
  })
})

document.getElementById('create-form').addEventListener('submit', event => {
  const newAverageRating = 5

  // eslint-disable-next-line no-undef
  fetch(`/api/restaurants/${restaurantId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ averageRating: newAverageRating })
  }).then(response => {
    // eslint-disable-next-line no-undef
    if (response.ok) location.reload()
    console.log(response)
  })
})
