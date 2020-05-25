// ==========================================\ Client JS logic /============================================== \\

document.getElementById('create-form1').addEventListener('submit', event => {
  const newRestaurant = {
    name: document.getElementById('restaurantName').value.trim(),
    image: document.getElementById('restaurantImg').value.trim()
  }

  // eslint-disable-next-line no-undef
  fetch('/restaurants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRestaurant)
  }).then(response => {
    console.log(response)
    // if (response.ok) location.reload()
  })
})
// FIX ----------------------------------------
// let newRating = 5

// fetch(`/api/restaurants/${id}`, {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ averageRating: newRating })
// }).then(response => {
//   if (response.ok) location.reload()
//   console.log(response)
// })

// document.getElementById('create-form').addEventListener('submit', event => {
//   const newReview = {
//     username: document.getElementById('userName').value.trim(),
//     comment: document.getElementById('comment').value.trim()
//   }

//   fetch('/restaurants/reviews', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newReview)
//   }).then(response => {
//     console.log(response)
//     // if (response.ok) location.reload()
//   })
// })
