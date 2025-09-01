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

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].style.display = 'block';
    dots[index].classList.add('active');
    currentSlide = index;
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
}); 

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact form handler loaded');
  
  const contactForm = document.querySelector('.contact-form');
  console.log('Contact form found:', contactForm);
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      console.log('Form submitted!');
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      console.log('Form data:', { name, email, message });
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="loading-text">Sending...</span>';
      submitBtn.disabled = true;
      
      // Check if EmailJS is properly configured
      console.log('EmailJS available:', typeof emailjs !== 'undefined');
      if (typeof emailjs !== 'undefined' && emailjs.init && emailjs.send) {
        console.log('EmailJS is properly configured');
        // EmailJS is available - use it
        const templateParams = {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Niara Seña Team',
          to_email: 'niarasena14@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
          })
          .catch(function(error) {
            console.log('FAILED...', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
          })
          .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          });
      } else {
        console.log('EmailJS not configured - running in demo mode');
        // EmailJS not configured yet - show demo message
        console.log('Form submitted with:', { name, email, message });
        
        // Simulate sending delay
        setTimeout(() => {
          showNotification('Form submitted successfully! (Demo mode - EmailJS not yet configured)', 'success');
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
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