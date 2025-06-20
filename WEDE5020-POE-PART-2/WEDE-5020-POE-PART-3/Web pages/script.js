// DOM elements
const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');

// Helper functions for validation and error/success states
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

// Validate input fields
const validateInputs = () => {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue === '') {
    setError(username, 'Username is required');
  } else {
    setSuccess(username);
  }

  if (passwordValue === '') {
    setError(password, 'Password is required');
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 characters');
  } else {
    setSuccess(password);
  }
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInputs();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue && passwordValue && passwordValue.length >= 8) {
    // If valid, show thank you message and disable submit button
    btnText.textContent = "Thank you!";
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "#28a745"; // green color for success

    // Reset form after a delay
    setTimeout(() => {
      form.reset();
      btnText.textContent = "Login";
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = ""; // Reset to default
    }, 2000);
  }
});

// Initialize floating labels for inputs with content
document.querySelectorAll('.form-input input').forEach(input => {
  if (input.value) {
    input.nextElementSibling.style.transform = 'translateY(-1.5rem) scale(0.85)';
    input.nextElementSibling.style.backgroundColor = 'white';
    input.nextElementSibling.style.padding = '0 0.5rem';
    input.nextElementSibling.style.color = '#3b82f6';
  }
});

/*Signup*/

// DOM elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get the email and password values from the input fields
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!email || !password) {
    messageElement.textContent = 'Please enter both email and password.';
    messageElement.classList.add('error');
    messageElement.classList.remove('success');
    return;
  }

  // Save data to localStorage
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPassword', password);

  // Clear the form inputs
  form.reset();

  // Show success message
  messageElement.textContent = 'Sign up successful! You can now log in with your credentials.';
  messageElement.classList.add('success');
  messageElement.classList.remove('error');

  // Optionally, redirect to the login page after a short delay
  setTimeout(() => {
    window.location.href = 'login.html'; // Redirect to login page (adjust URL as needed)
  }, 2000);
});

// Optional: Check if the email is already saved in localStorage (for auto-login or messaging)
const savedEmail = localStorage.getItem('userEmail');
if (savedEmail) {
  messageElement.textContent = `Welcome back, ${savedEmail}!`;
  messageElement.classList.add('success');
}


/*Enquiry*/

document.addEventListener('DOMContentLoaded', function() {
  // Get elements by ID
  const enquiryForm = document.getElementById('enquiryForm');
  const successMessage = document.getElementById('successMessage');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  const newMessageBtn = document.getElementById('newMessageBtn');
  const subjectSelect = document.getElementById('subject');

  // Ensure elements exist
  if (!enquiryForm || !successMessage || !submitText || !submitSpinner || !newMessageBtn) {
    console.error("One or more necessary elements are missing from the HTML.");
    return;
  }

  // Handle form submission
  enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();  // Prevent the form from submitting normally

      // Show loading state (spinner and change submit text)
      submitText.textContent = 'Sending...';
      submitSpinner.classList.remove('hidden'); // Show spinner

      // Simulate a form submission (this could be replaced with an actual fetch/axios request)
      setTimeout(() => {
          // After form submission, hide the form and show the success message
          enquiryForm.classList.add('hidden'); // Hide form
          successMessage.classList.remove('hidden'); // Show success message

          // Reset the button text and hide the spinner
          submitText.textContent = 'Send Message';
          submitSpinner.classList.add('hidden'); // Hide spinner again
      }, 1500); // Simulating a 1.5 second delay for form submission
  });

  // Handle the reset functionality (when the "Send Another Message" button is clicked)
  newMessageBtn.addEventListener('click', function() {
      // Reset form and show it again
      enquiryForm.reset();
      enquiryForm.classList.remove('hidden');
      successMessage.classList.add('hidden');
  });

  // Add focus styles to select element
  subjectSelect.addEventListener('focus', function() {
      this.parentElement.classList.add('ring-2', 'ring-blue-500'); // Tailwind focus ring
  });

  subjectSelect.addEventListener('blur', function() {
      this.parentElement.classList.remove('ring-2', 'ring-blue-500'); // Remove focus ring
  });

  // Custom select styling: add text color when a value is selected
  subjectSelect.addEventListener('change', function() {
      if (this.value) {
          this.classList.add('text-gray-800'); // Apply text color when a value is selected
      } else {
          this.classList.remove('text-gray-800'); // Remove color if no value is selected
      }
  });
});

/*GALLERY*/

document.addEventListener('DOMContentLoaded', function() {
  // Elements:
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const loadingIndicator = document.querySelector('.lightbox-loading');

  let currentIndex = 0;

  function preloadImages() {
    galleryItems.forEach(img => {
      new Image().src = img.src;
    });
  }

  function openLightbox(index) {
    const img = galleryItems[index];
    const src = img.src;
    const alt = img.alt || '';
    currentIndex = index;

    loadingIndicator.style.display = 'block';
    lightboxImg.classList.remove('loaded');

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    lightboxImg.onload = () => {
      loadingIndicator.style.display = 'none';
      lightboxImg.classList.add('loaded');
    };

    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = alt;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  preloadImages(); // Load full images early
});
