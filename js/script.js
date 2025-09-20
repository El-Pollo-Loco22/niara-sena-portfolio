// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('w--open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
      
      if (!isClickInside && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('w--open');
      }
    });

    // Close menu when clicking a link
    const navItems = navLinks.querySelectorAll('.nav-link');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('w--open');
      });
    });
  }
});

// Hero Slider (only initialize if elements exist)
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  
  // Only initialize slider if slides exist
  if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      if (slides[index] && dots[index]) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
        currentSlide = index;
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    // Initialize slider
    showSlide(0);

    // Add event listeners
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
  }
}); 

// Contact Form Handler (Formspree - no JavaScript needed)
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact form handler loaded - using Formspree');
  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    console.log('Contact form found - Formspree will handle submission');
    // Formspree handles the form submission automatically
    // No JavaScript intervention needed
  }
});

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 16px 20px;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      margin-left: 15px;
      padding: 0;
      line-height: 1;
    }
    .notification-close:hover {
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
} 