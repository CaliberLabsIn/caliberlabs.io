// Main JavaScript for CaliberX Research Labs Website

// Sticky Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add 'scrolled' class when scrolling down
    if (currentScroll > 50) {
        if (navbar) navbar.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    // Theme Management
    const storedTheme = localStorage.getItem('theme');
    // Default to light unless user explicitly chose dark before
    const initialTheme = storedTheme || 'light';
    root.dataset.theme = initialTheme;
    updateThemeIcon(initialTheme);
    updateLogos(initialTheme);

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }

    function updateLogos(theme) {
        document.querySelectorAll('.logo-img').forEach(img => {
            const lightSrc = img.getAttribute('data-light-src');
            const darkSrc = img.getAttribute('data-dark-src');
            const lightFallback = img.getAttribute('data-light-fallback');
            const darkFallback = img.getAttribute('data-dark-fallback');
            const targetSrc = theme === 'dark' ? darkSrc || lightSrc : lightSrc;
            const fallback = theme === 'dark' ? darkFallback || lightFallback : lightFallback;
            if (targetSrc) {
                img.onerror = function() { this.onerror = null; if (fallback) this.src = fallback; };
                img.src = targetSrc;
            }
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
            updateLogos(next);
        });
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Account for sticky header height
                    const headerOffset = 90; // navbar height
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Intersection Observer for fade-in animations
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

// Observe elements with animation class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.division-card, .strength-item, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
