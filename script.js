// Enhanced JavaScript for MK Enterprise Website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Handle contact form submission
    initContactForm();
    
    // Add scroll-based animations
    initScrollAnimations();
    
    // Header scroll effect
    initHeaderScrollEffect();
    
    // Image lazy loading
    initImageLazyLoading();
});

// Smooth scrolling functionality
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"], .cta-primary[href^="#"], .cta-secondary[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            // Handle scroll to top for "#" links
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav state
                updateActiveNav(targetId);
            }
        });
    });
}

// Update active navigation state
function updateActiveNav(targetId) {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Handle contact form submission
function initContactForm() {
    const form = document.querySelector('.inquiry-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const product = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handler)
            showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
            form.reset();
        });
    }
}

// Show notification messages
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
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-item, .feature-item, .product-category, .gallery-item');
    animateElements.forEach(el => {
        el.style.cssText = `
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        `;
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyle);
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add header scroll styles
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        .header.scrolled {
            background: rgba(245, 245, 220, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(headerStyle);
}

// Image lazy loading with placeholder
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[src*="images/"]');
    
    images.forEach(img => {
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #f5f5dc, #fff8dc);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8B4513;
            font-family: Georgia, serif;
            font-size: 1.2rem;
            font-weight: bold;
        `;
        placeholder.textContent = 'Image Placeholder';
        
        // Replace image with placeholder temporarily
        const parent = img.parentElement;
        parent.insertBefore(placeholder, img);
        img.style.display = 'none';
        
        // Show placeholder info
        setTimeout(() => {
            placeholder.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🏭</div>
                    <div>Factory Image</div>
                    <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.7;">
                        ${img.alt || 'Handloom Manufacturing'}
                    </div>
                </div>
            `;
        }, 100);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate any position-dependent elements
    const header = document.querySelector('.header');
    if (header) {
        // Update any cached header height values
        window.headerHeight = header.offsetHeight;
    }
});

// Add loading state management
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Add loaded styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        .loaded {
            opacity: 1;
            transition: opacity 0.3s ease-in;
        }
    `;
    document.head.appendChild(loadedStyle);
});
