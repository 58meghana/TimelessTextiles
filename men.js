// Get the slider elements
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');

// Get the display spans for price values
const minPriceDisplay = document.getElementById('min-price');
const maxPriceDisplay = document.getElementById('max-price');

// Function to update the displayed price values
function updatePriceDisplay() {
    // Prevent the min value from exceeding the max value
    if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
        priceMin.value = priceMax.value;
    }

    // Update the displayed values
    minPriceDisplay.textContent = `₹${priceMin.value}`;
    maxPriceDisplay.textContent = `₹${priceMax.value}`;
}

// Event listeners for both sliders
priceMin.addEventListener('input', function() {
    updatePriceDisplay();
    filterProducts();  // Call filter function when price changes
});
priceMax.addEventListener('input', function() {
    updatePriceDisplay();
    filterProducts();  // Call filter function when price changes
});

// Initialize the price display when the page loads
updatePriceDisplay();

// Get all the filter checkboxes
const filterCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');

// Get all the product items
const productItems = document.querySelectorAll('.product-item');

// Function to filter products based on selected categories and price range
function filterProducts() {
    // Get selected categories
    const selectedCategories = Array.from(filterCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    // Get the minimum and maximum price values from the sliders
    const minPrice = parseInt(priceMin.value);
    const maxPrice = parseInt(priceMax.value);

    // Show/hide products based on selected categories and price range
    productItems.forEach(item => {
        const itemCategory = item.querySelector('h3').textContent.toLowerCase();
        const itemPrice = parseInt(item.getAttribute('data-price'));

        // Check if the item matches the selected categories (or all if none selected)
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => itemCategory.includes(category));

        // Check if the item price falls within the selected price range
        const isPriceMatch = itemPrice >= minPrice && itemPrice <= maxPrice;

        // Show the product only if it matches both the category and the price range
        item.style.display = (isCategoryMatch && isPriceMatch) ? 'block' : 'none';
    });
}

// Event listeners for category checkboxes
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

// Function to add an item to the cart
function addToCart(product) {
    // Get the current cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new product to the cart
    cart.push(product);
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user or update the UI
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
            const imageUrl = productElement.querySelector('img').src; // Get the image URL

            // Create a product object
            const product = {
                name: name,
                price: price,
                category: category,
                imageUrl: imageUrl // Store the image URL
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
