// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Render each cart item
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Create HTML structure for cart item
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price; // Calculate total price
    });

    // Update total price
    totalPriceElement.innerText = `₹${totalPrice}`;
}

// Initialize the cart on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
   
});
{ localStorage.clear(); alert('All data cleared from localStorage'); }
