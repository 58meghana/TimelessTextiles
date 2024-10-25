// Function to filter products based on selected checkboxes and radio buttons
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const selectedPriceRange = document.querySelector('input[name="price"]:checked')?.value;

    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemPrice = parseInt(item.getAttribute('data-price'));

        // Check category filter
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(itemCategory);

        // Check price filter
        let priceMatch = true;
        if (selectedPriceRange) {
            switch (selectedPriceRange) {
                case 'below1000':
                    priceMatch = itemPrice < 1000;
                    break;
                case '1000to3000':
                    priceMatch = itemPrice >= 1000 && itemPrice <= 3000;
                    break;
                case 'above3000':
                    priceMatch = itemPrice > 3000;
                    break;
            }
        }

        // Show or hide item based on filter
        if (categoryMatch && priceMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Event listeners for filtering
document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', filterProducts);
});

document.querySelectorAll('input[name="price"]').forEach(input => {
    input.addEventListener('change', filterProducts);
});

// Function to add an item to the cart
function addToCart(product) {
    // Get the current cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new product to the cart
    cart.push(product);
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, alert the user or update the UI
    alert(`${product.name} has been added to your cart!`);
}

// Function to set up event listeners for the "Add to Cart" buttons
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.product-item button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement; // Get the product item
            const price = parseFloat(productElement.getAttribute('data-price')); // Get price
            const name = `Product ${index + 1}`; // Generate a product name
            const category = productElement.getAttribute('data-category'); // Get category

            // Create a product object
            const product = {
                name: name,
                price: price,
                category: category
            };

            // Add product to the cart
            addToCart(product);
        });
    });
}

// Initialize the event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    setupAddToCartButtons();
});

