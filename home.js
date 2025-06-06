// Get modal element, login button, and close button
var modal = document.getElementById('loginModal');
var loginBtn = document.getElementById('loginBtn');
var closeBtn = document.getElementsByClassName('close');
var logoutBtn = document.getElementById('logoutBtn');

// Automatically show the login modal when the page is loaded
window.onload = function() {
    modal.style.display = 'block';
}

// Show modal when the "Login" button is clicked
loginBtn.onclick = function() {
    modal.style.display = 'block';
}

// Close modal when any close button is clicked
for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function() {
        this.closest('.modal').style.display = 'none'; // Close the specific modal
    }
}

// Close modal if clicked outside of modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Handle login submission
document.getElementById('loginFormElement').onsubmit = function(e) {
    e.preventDefault(); // Prevent form submission

    // Simulate a successful login
    modal.style.display = 'none';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
};

// Handle logout
logoutBtn.onclick = function() {
    // Simulate a logout action
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
};

// Toggle between Login and Signup forms
var signUpLink = document.getElementById('signUpLink');
var loginLink = document.getElementById('loginLink');
var loginForm = document.getElementById('loginForm');
var signupForm = document.getElementById('signupForm');

// Show signup form when "Sign Up" link is clicked
signUpLink.onclick = function() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
};

// Show login form when "Login" link is clicked
loginLink.onclick = function() {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
};

// Offer slider functionality
var offerSlider = document.getElementById('offerSlider');
var currentSlide = 0; // Start with the first offer (index 0)
var totalSlides = 2; // There are two slides (Dassara and Women Tops)

document.getElementById('nextOfferBtn').onclick = function() {
    currentSlide = (currentSlide + 1) % totalSlides; // Switch to the next slide
    offerSlider.style.transform = `translateX(-${currentSlide * 100}%)`; // Slide the content
};

// Close any open modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}
