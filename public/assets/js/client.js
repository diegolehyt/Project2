// ==========================================\ Client JS logic /============================================== \\

document.getElementById('create-form').addEventListener('submit', event => {
    
    
    const newRestaurant = {
        name: document.getElementById('restaurantName').value.trim(),
        image: document.getElementById('restaurantName').value.trim()
    }
    
    fetch(`/api/restaurants/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRestaurant)
    }).then(response => {
        console.log(response)
        if (response.ok) location.reload()
    })
})




document.getElementById('create-form').addEventListener('submit', event => {
    
    
    const newRestaurant = {
        name: document.getElementById('restaurantName').value.trim()
    }
    
    fetch(`/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRestaurant)
    }).then(response => {
        console.log(response)
        if (response.ok) location.reload()
    })
})





