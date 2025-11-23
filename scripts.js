// ===================================
// Theme Toggle Functionality
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Shrink header on scroll
    if (currentScroll > 100) {
        header.style.padding = '0.5rem 0';
    } else {
        header.style.padding = '1rem 0';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Package Modal Functionality
// ===================================
const packageData = {
    silver: {
        title: '🥈 Silver Package',
        description: 'Perfect for intimate gatherings and small celebrations',
        features: [
            'Basic decoration setup',
            'Standard balloon arrangements',
            'Simple backdrop design',
            'Basic lighting setup',
            'Up to 50 guests capacity',
            'Event duration: 4 hours',
            'Digital invitation design',
            'Event coordinator support'
        ]
    },
    gold: {
        title: '🥇 Gold Package',
        description: 'Comprehensive event planning with premium services',
        features: [
            'Premium themed decoration',
            'Advanced balloon & floral arrangements',
            'Customized backdrop with props',
            'Professional lighting & sound system',
            'Up to 150 guests capacity',
            'Event duration: 6 hours',
            'Photography coverage (4 hours)',
            'Welcome desk setup',
            'Digital + printed invitations',
            'Dedicated event manager',
            'Catering coordination support'
        ]
    },
    platinum: {
        title: '💎 Platinum Package',
        description: 'Luxury all-inclusive experience with exclusive amenities',
        features: [
            'Luxury themed decoration with premium materials',
            'Designer floral arrangements & installations',
            'Grand entrance & stage setup',
            'Premium lighting, sound & AV equipment',
            'Unlimited guests capacity',
            'Full day event coverage',
            'Professional photography & videography (full day)',
            'Drone coverage for outdoor events',
            'Welcome desk with hostess',
            'Valet parking coordination',
            'Premium catering coordination',
            'Entertainment arrangement support',
            'Personalized event branding',
            'Post-event video editing',
            'Dedicated team of coordinators'
        ]
    }
};

function openPackageModal(packageType) {
    const modal = document.getElementById('package-modal');
    const modalBody = document.getElementById('modal-body');
    const pkg = packageData[packageType];

    if (!pkg) {
        console.error('Package not found:', packageType);
        return;
    }

    modalBody.innerHTML = `
        <h2 class="modal-title">${pkg.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">${pkg.description}</p>
        <h3 style="margin-bottom: 1rem; color: var(--text-color);">Package Includes:</h3>
        <ul class="modal-features">
            ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div style="margin-top: 2rem; text-align: center;">
            <a href="#contact" class="btn btn-primary" onclick="closePackageModal()">Get Quote</a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePackageModal() {
    const modal = document.getElementById('package-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===================================
// Gallery Lightbox Functionality
// ===================================
const galleryImages = [
    { src: 'images/decoration.jpg', alt: 'Birthday Celebration' },
    { src: 'images/decoration.jpg', alt: 'Wedding Decoration' },
    { src: 'images/decoration.jpg', alt: 'Corporate Event' },
    { src: 'images/decoration.jpg', alt: 'Baby Shower' },
    { src: 'images/decoration.jpg', alt: 'Anniversary' },
    { src: 'images/decoration.jpg', alt: 'House Warming' }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const img = galleryImages[index];

    lightboxContent.innerHTML = `
        <img src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 90vh; border-radius: 15px;">
    `;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    // Loop back to start/end
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    openLightbox(currentImageIndex);
}

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    const modal = document.getElementById('package-modal');
    
    // Close on Escape key
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        }
        if (modal.classList.contains('active')) {
            closePackageModal();
        }
    }
    
    // Navigate lightbox with arrow keys
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        }
        if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// ===================================
// Update Year in Footer
// ===================================
document.getElementById('year').textContent = new Date().getFullYear();

// ===================================
// Scroll Reveal Animation
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .package-card, .gallery-item, .testimonial-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Preload Images (Optional Enhancement)
// ===================================
function preloadImages() {
    galleryImages.forEach(img => {
        const image = new Image();
        image.src = img.src;
    });
}

// Call preload when page loads
window.addEventListener('load', preloadImages);

// ===================================
// Active Navigation Link Highlight
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Back to Top Button (Optional)
// ===================================
function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// Initialize back to top button
window.addEventListener('load', createBackToTop);

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🎉 Jagajjanani Events', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cWebsite developed with ❤️', 'color: #764ba2; font-size: 14px;');
console.log('%cContact: siddeshmoghavera@gmail.com', 'color: #718096; font-size: 12px;');