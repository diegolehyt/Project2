// ==========================================\ Client JS logic /============================================== \\

// GET restaurant Data
// eslint-disable-next-line no-undef
const restaurantId = localStorage.getItem('vOneLocalStorage')

const apiRestURL = `/api/restaurants/${restaurantId}`

// eslint-disable-next-line no-undef
fetch(apiRestURL).then(function (response) { return response.json() }).then(function (data) {
  // document.getElementsById('logo').setAttribute('src', `${data.image}`)
  const restaurantN = document.getElementById('restaurantN')
  restaurantN.innerHTML = (data.data.name)
  console.log(data.data.name)
})

// localStorage.clear()

// POST reviews
document.getElementById('create-form').addEventListener('submit', event => {
  event.preventDefault()
  const newReview = {
    username: document.getElementById('userName').value.trim(),
    comment: document.getElementById('comment').value.trim(),
    RestaurantId: restaurantId
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
