/* ==============================
   JOHN KIRBY SOLIVEN — main.js
   ============================== */

document.addEventListener('DOMContentLoaded', function() {

  // AOS — scroll animations
  // Elements with data-aos="fade-up" in HTML will animate when scrolled into view
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700, // how long the animation takes (ms)
      once: true,    // only animate once per page load
      offset: 60     // trigger animation 60px before element enters screen
    });
  }

  // Navbar shadow on scroll
  var navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Show back to top button when scrolled down
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
  }

});

// Open lightbox when a cert badge is clicked
function openLightbox(img) {
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('show');
  document.body.style.overflow = '';
}

// Also close with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});

//Contact form submission handler
function sendMessage() {
  // Step 1: Get the values from the form fields
  var name    = document.getElementById('fname').value.trim();
  var email   = document.getElementById('femail').value.trim();
  var subject = document.getElementById('fsubject').value.trim();
  var message = document.getElementById('fmessage').value.trim();
  var btn     = document.getElementById('sendBtn');

  // Step 2: Simple validation — name and email are required
  if (name === '' || email === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Hold on!',
      text: 'Please fill in your name and email before sending.',
      confirmButtonColor: '#111'
    });
    return; // Stop the function here if validation fails
  }

  // Step 3: Disable button so it can't be clicked twice
  btn.disabled = true;
  btn.textContent = 'Sending...';

  // Step 4: Send the email using EmailJS
  emailjs.send('service_slc7tl8', 'template_3vugr89', {
    name:    name,
    email:   email,
    title:   subject || '(No subject)',
    message: message || '(No message)'
  })
  .then(function() {
    // Step 5a: If it worked — show success popup
    Swal.fire({
      icon: 'success',
      title: 'Message Sent! 🎉',
      text: "Thanks for reaching out! I'll get back to you within 24–48 hours.",
      confirmButtonColor: '#111',
      confirmButtonText: 'Awesome!'
    });

    // Clear all the form fields
    document.getElementById('fname').value    = '';
    document.getElementById('femail').value   = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmessage').value = '';

    // Re-enable the button
    btn.disabled    = false;
    btn.textContent = 'Send Message →';
  })
  .catch(function(error) {
    // Step 5b: If it failed — show error popup
    console.log('EmailJS error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong. Please try again.',
      confirmButtonColor: '#111'
    });

    btn.disabled    = false;
    btn.textContent = 'Send Message →';
  });
}