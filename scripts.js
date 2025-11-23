// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Mobile Navigation Toggle
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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
    } else {
        header.style.padding = '1rem 0';
    }
});

// Package Modal
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

// Gallery Lightbox
const galleryImages = [
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🎂', title: 'Birthday Celebration' },
    { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '💐', title: 'Wedding Decoration' },
    { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '🎉', title: 'Corporate Event' },
    { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '👶', title: 'Baby Shower' },
    { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', icon: '💍', title: 'Anniversary' },
    { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: '🏠', title: 'House Warming' }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const img = galleryImages[index];

    lightboxContent.innerHTML = `
                <div style="background: ${img.bg}; width: 800px; max-width: 100%; height: 600px; max-height: 80vh; border-radius: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
                    <div style="font-size: 8rem; margin-bottom: 1rem;">${img.icon}</div>
                    <div style="font-size: 2rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${img.title}</div>
                </div>
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
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    openLightbox(currentImageIndex);
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closePackageModal();
    }
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
    }
});

// Update Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll Reveal Animation
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

// Observe elements
document.querySelectorAll('.service-card, .package-card, .gallery-item, .testimonial-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});