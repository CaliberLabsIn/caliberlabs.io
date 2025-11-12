// Careers Page JavaScript

// Toggle job details
function toggleJob(jobId) {
    const jobDetails = document.getElementById(jobId);
    const isActive = jobDetails.classList.contains('active');
    
    // Close all job details
    document.querySelectorAll('.job-details').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Reset all buttons
    document.querySelectorAll('.btn-expand').forEach(btn => {
        btn.textContent = 'View Details';
    });
    
    // Toggle current job
    if (!isActive) {
        jobDetails.classList.add('active');
        event.target.textContent = 'Hide Details';
        
        // Smooth scroll to job card
        setTimeout(() => {
            jobDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Open application form modal
function openApplicationForm(positionTitle) {
    const modal = document.getElementById('applicationModal');
    const positionTitleElement = document.getElementById('positionTitle');
    const zohoFormLink = document.getElementById('zohoFormLink');
    
    positionTitleElement.textContent = positionTitle;
    modal.classList.add('active');
    
    // Direct user to the central Zoho application form
    zohoFormLink.href = 'https://forms.zohopublic.com/ujjvalcalib1/form/EmployeeOnboardingForm/formperma/dOVkr1HyC1eSrDQlwVa1Ioe2cVSlUVOQd1r4XoTkw_0';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close application form modal
function closeApplicationForm() {
    const modal = document.getElementById('applicationModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target === modal) {
        closeApplicationForm();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeApplicationForm();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Careers page loaded');
    
    // Add animation to job cards on scroll
    const jobCards = document.querySelectorAll('.job-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    jobCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
});
