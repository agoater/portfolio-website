/**
 * Portfolio Website JavaScript
 * Handles scrolling, reveal animations, and lightweight interactions.
 */

const SELECTORS = {
    aboutSection: '.about',
    progressBar: '.progress-bar',
    decorativeElements: '.decorative-elements',
    cvContainer: '.cv-container',
    anchorLinks: 'a[href^="#"]',
    revealItems: 'section, .project-card, .about-text',
    scrollArrow: '.scroll-arrow'
};

function scrollToNext() {
    const aboutSection = document.querySelector(SELECTORS.aboutSection);

    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateScrollEffects() {
    const progressBar = document.querySelector(SELECTORS.progressBar);
    const decorativeElements = document.querySelector(SELECTORS.decorativeElements);
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${scrollPercentage}%`;
    }

    if (decorativeElements && window.pageYOffset < window.innerHeight) {
        decorativeElements.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;
    }
}

function initSmoothScroll() {
    document.querySelectorAll(SELECTORS.anchorLinks).forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetSelector = anchor.getAttribute('href');
            const target = targetSelector ? document.querySelector(targetSelector) : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const scrollArrow = document.querySelector(SELECTORS.scrollArrow);

    if (scrollArrow) {
        scrollArrow.addEventListener('click', scrollToNext);
    }
}

function initRevealAnimations() {
    const revealItems = document.querySelectorAll(SELECTORS.revealItems);

    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    let projectCardIndex = 0;

    revealItems.forEach(element => {
        element.classList.add('reveal-element');

        if (element.classList.contains('project-card')) {
            element.style.setProperty('--reveal-delay', `${projectCardIndex * 0.12}s`);
            projectCardIndex += 1;
        }

        observer.observe(element);
    });
}

function initCvLink() {
    const cvContainer = document.querySelector(SELECTORS.cvContainer);

    if (!cvContainer) {
        return;
    }

    cvContainer.addEventListener('click', () => {
        window.open('alex-goater-cv.pdf', '_blank', 'noopener');
    });
}

function initDecorativeAnimations() {
    const shapes = document.querySelectorAll('.shape, .dots');

    shapes.forEach(shape => {
        shape.style.animationDelay = `${Math.random() * 2}s`;
        shape.style.animationDuration = `${4 + Math.random() * 3}s`;
    });
}

function initPageLoad() {
    document.body.classList.add('is-loaded');
}

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initRevealAnimations();
    initCvLink();
    initDecorativeAnimations();
    initPageLoad();
    updateScrollEffects();

    window.addEventListener('scroll', updateScrollEffects, { passive: true });
});