/**
 * CaliberX Research Labs - Main JavaScript
 * Handles theme toggling, navigation, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initContactForm();
});

/**
 * Theme Toggle
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  updateFavicon(savedTheme);
  
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateFavicon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }
  
  function updateFavicon(theme) {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = theme === 'dark' ? 'images/favicon-dark.svg' : 'images/favicon-light.svg';
    }
  }
}

/**
 * Contact Form - open mailto with pre-filled message
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('#name')?.value || '').trim();
    const email = (form.querySelector('#email')?.value || '').trim();
    const subject = (form.querySelector('#subject')?.value || '').trim();
    const message = (form.querySelector('#message')?.value || '').trim();

    const subjectLine = subject || 'Contact from CaliberX website';
    const body = [
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      message && `\nMessage:\n${message}`
    ].filter(Boolean).join('\n');

    const mailto = 'mailto:careers@caliberlab.in?'
      + `subject=${encodeURIComponent(subjectLine)}`
      + (body ? `&body=${encodeURIComponent(body)}` : '');
    window.location.href = mailto;
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navList?.classList.toggle('active');
    
    // Animate hamburger icon
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navList?.classList.contains('active')) {
      navList.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.classList.remove('active');
    }
  });
  
  // Close menu when clicking a link
  navList?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.classList.remove('active');
    });
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Job Card Toggle (for Careers page)
 */
function toggleJob(jobId) {
  const jobDetails = document.getElementById(jobId);
  if (jobDetails) {
    jobDetails.classList.toggle('active');
    
    // Update button text
    const card = jobDetails.closest('.job-card');
    const btn = card?.querySelector('.btn-expand');
    if (btn) {
      btn.textContent = jobDetails.classList.contains('active') ? 'Hide Details' : 'View Details';
    }
  }
}

/**
 * Open Application Form (for Careers page)
 */
function openApplicationForm(jobTitle) {
  // Redirect to application form or open modal
  const subject = encodeURIComponent(`Application for ${jobTitle}`);
  window.location.href = `mailto:careers@caliberlab.in?subject=${subject}`;
}

// Expose functions globally for onclick handlers
window.toggleJob = toggleJob;
window.openApplicationForm = openApplicationForm;
