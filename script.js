/**
 * Portfolio Website JavaScript
 * Handles animations, interactions, and dynamic behaviors
 */

// Scroll to About section function
function scrollToNext() {
    document.querySelector('.about').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // SCROLL PROGRESS BAR
    // ===================================
    window.addEventListener('scroll', function () {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        document.querySelector('.progress-bar').style.width = scrollPercentage + '%';
    });

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Special animation for about text
                if (entry.target.classList.contains('about-text')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Apply smooth fade-in to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Apply fade-in to project cards with stagger effect
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Apply fade-in to about text elements
    document.querySelectorAll('.about-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // ===================================
    // CV CONTAINER CLICK HANDLER
    // ===================================
    const cvContainer = document.querySelector('.cv-container');
    if (cvContainer) {
        cvContainer.addEventListener('click', function () {
            window.open('alex-goater-cv.pdf', '_blank');
        });
    }

    // ===================================
    // PAGE LOAD ANIMATIONS
    // ===================================
    window.addEventListener('load', function () {
        // Fade in body
        document.body.style.opacity = '1';

        // Animate hero text in after delay
        const heroText = document.querySelector('.text-section h1');
        if (heroText) {
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // ===================================
    // PARALLAX EFFECT FOR DECORATIVE ELEMENTS
    // ===================================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const decorativeElements = document.querySelector('.decorative-elements');

        if (decorativeElements && scrolled < window.innerHeight) {
            decorativeElements.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ===================================
    // RANDOM FLOATING ANIMATION FOR SHAPES
    // ===================================
    function randomFloat() {
        const shapes = document.querySelectorAll('.shape, .dots');
        shapes.forEach(shape => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 4 + Math.random() * 3;
            shape.style.animationDelay = randomDelay + 's';
            shape.style.animationDuration = randomDuration + 's';
        });
    }

    randomFloat();

    // ===================================
    // CONTACT FORM FUNCTIONALITY
    // ===================================
    window.toggleContactForm = function () {
        const form = document.getElementById('contactForm');
        form.classList.toggle('active');

        // Smooth scroll to form when opening
        if (form.classList.contains('active')) {
            setTimeout(() => {
                form.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    };

    // Handle form submission
    window.handleFormSubmit = function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // For now, show a success message (you can integrate with a backend service later)
        // TODO: Implement actual form submission logic here
        alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon!`);

        // Close the form
        toggleContactForm();

        // Reset form
        event.target.reset();
    };
});