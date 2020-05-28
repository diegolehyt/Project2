// ==========================================\ Client JS logic /============================================== \\
document.getElementById('create-form1').addEventListener('submit', event => {
  const newRestaurant = {
    name: document.getElementById('restaurantName').value.trim(),
    location: document.getElementById('restaurantLocation').value.trim(),
    image: document.getElementById('restaurantImg').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    website: document.getElementById('website').value.trim(),
    language: document.getElementById('language').value.trim(),
    description: document.getElementById('description').value.trim()
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
