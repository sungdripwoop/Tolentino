document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchbtn');

  // Initially hide the search input
  searchInput.style.display = 'none';

  // Toggle function to show/hide search input
  function toggleSearch() {
    if (searchInput.style.display === 'none') {
      searchInput.style.display = 'inline-block';
    } else {
      searchInput.style.display = 'none';
    }
  }

  // Add event listener to search button
  searchButton.addEventListener('click', toggleSearch);
});

// Add to Cart function
function addToCart(id, name, price, image) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id, name, price, quantity: 1, image });
  }
  
  alert(`${name} was added to cart`);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCart(); // Update the cart display
}

// Remove from Cart function
function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item.id === id);

    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCart();
        alert('Item removed from cart.');
    } else {
        alert('Item not found in cart.');
    }
}

// Increment quantity function
function incrementQuantity(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cartItems.find(item => item.id === id);

  if (item) {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
}

// Decrement quantity function
function decrementQuantity(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cartItems.find(item => item.id === id);

  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(id);
    return; // Exit the function if item is removed
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCart();
}

// Retrieve cart items from localStorage and display on cart page
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartContainer');
    let subtotalAmount = document.getElementById('subtotalAmount');
    let total = 0;

    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        let itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;

        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <p><strong>${item.name}</strong></p>
                <p>Price: ₱${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₱${itemSubtotal.toFixed(2)}</p>
                <button class="quantity-btn" onclick="decrementQuantity('${item.id}')">-</button>
                <button class="quantity-btn" onclick="incrementQuantity('${item.id}')">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    subtotalAmount.textContent = `₱${total.toFixed(2)}`;
}