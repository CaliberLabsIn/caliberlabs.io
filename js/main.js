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
  initActiveNav();
  initBackToTop();
});

/**
 * Theme Toggle
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
  }
  updateThemeIcon(savedTheme);
  updateFavicon(savedTheme);
  
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    }
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
  const body = document.body;

  if (menuToggle && navList && !menuToggle.getAttribute('aria-controls')) {
    if (!navList.id) {
      navList.id = 'primary-navigation';
    }
    menuToggle.setAttribute('aria-controls', navList.id);
  }

  const closeMenu = () => {
    navList?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.classList.remove('active');
    body.classList.remove('menu-open');
  };
  
  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navList?.classList.toggle('active');
    body.classList.toggle('menu-open', !isExpanded);
    
    // Animate hamburger icon
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navList?.classList.contains('active')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList?.classList.contains('active')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navList?.classList.contains('active')) {
      closeMenu();
    }
  });
  
  // Close menu when clicking a link
  navList?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
      header?.classList.add('scrolled');
      header?.classList.add('compact');
    } else {
      header?.classList.remove('scrolled');
      header?.classList.remove('compact');
    }
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
 * Active Nav Link
 */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    const linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
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
