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
