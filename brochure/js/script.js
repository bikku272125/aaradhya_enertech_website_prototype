/**
 * Main JavaScript File for Electrical/Transformer Company Website
 */

// Configuration Variables
const COMPANY_CONFIG = {
    // Replace this with your deployed Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: "PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE",
    
    // Replace with your WhatsApp number (include country code, no +, no spaces)
    // Example: "919876543210" for India
    WHATSAPP_NUMBER: "PASTE_YOUR_WHATSAPP_NUMBER_HERE",
    
    // Replace with your Phone number
    PHONE_NUMBER: "PASTE_YOUR_PHONE_NUMBER_HERE"
};

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProjectFilters();
    initLightbox();
    initContactForm();
    initWhatsAppButton();
});

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

/**
 * Project Gallery Filtering
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add a small delay for animation effect
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // match transition duration
                    }
                });
            });
        });
    }
}

/**
 * Image Lightbox for Projects Gallery
 */
function initLightbox() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;

    // Create lightbox HTML if it doesn't exist
    if (!document.querySelector('.lightbox')) {
        const lightboxHtml = `
            <div class="lightbox">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-img" src="" alt="Enlarged project image">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/**
 * Contact Form Submission to Google Apps Script
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');

    if (!form || !statusDiv) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Prevent duplicate submissions
        if (form.classList.contains('is-submitting')) return;

        // Configuration Check
        if (COMPANY_CONFIG.GOOGLE_SCRIPT_URL === "PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE") {
            showStatus(statusDiv, 'error', 'Error: Google Apps Script URL not configured. Please see documentation.');
            return;
        }

        // Basic Validation
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !service || !message) {
            showStatus(statusDiv, 'error', 'Please fill in all required fields marked with *');
            return;
        }

        // Phone validation (simple numeric check)
        const phoneRegex = /^[0-9+\s-]{8,15}$/;
        if (!phoneRegex.test(phone)) {
            showStatus(statusDiv, 'error', 'Please enter a valid phone number.');
            return;
        }

        // Set Loading State
        form.classList.add('is-submitting');
        showStatus(statusDiv, 'loading', 'Sending your message... Please wait.');
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        // Prepare Data (FormData format which works well with App Script Web App doPost)
        const formData = new FormData(form);
        
        try {
            const response = await fetch(COMPANY_CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                // Mode 'no-cors' is often needed when calling Apps Script from a frontend to prevent CORS errors, 
                // but it means we can't read the JSON response. We just assume success if it doesn't throw.
                mode: 'no-cors' 
            });

            // If we are using no-cors, response.ok is false and response.status is 0, so we just assume success
            showStatus(statusDiv, 'success', 'Thank you! Your enquiry has been received. We will contact you shortly.');
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showStatus(statusDiv, 'error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
        } finally {
            form.classList.remove('is-submitting');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Enquiry <i class="fas fa-paper-plane"></i>';
            }
        }
    });
}

/**
 * Utility: Show Form Status Message
 */
function showStatus(element, type, message) {
    element.className = 'form-status ' + type;
    element.textContent = message;
    
    // Hide success/error messages after 5 seconds
    if (type !== 'loading') {
        setTimeout(() => {
            element.style.display = 'none';
            // Reset class
            element.className = 'form-status';
        }, 5000);
    } else {
        element.style.display = 'block';
    }
}

/**
 * WhatsApp Button Initialization
 */
function initWhatsAppButton() {
    const waBtns = document.querySelectorAll('.btn-whatsapp, .floating-whatsapp');
    
    waBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (COMPANY_CONFIG.WHATSAPP_NUMBER === "PASTE_YOUR_WHATSAPP_NUMBER_HERE") {
                e.preventDefault();
                alert("WhatsApp number is not configured yet.");
                return;
            }
            
            const message = encodeURIComponent("Hello, I would like to enquire about your transformer and electrical services.");
            const url = \`https://wa.me/\${COMPANY_CONFIG.WHATSAPP_NUMBER}?text=\${message}\`;
            btn.setAttribute('href', url);
        });
    });

    // Update tel links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (COMPANY_CONFIG.PHONE_NUMBER === "PASTE_YOUR_PHONE_NUMBER_HERE") {
                e.preventDefault();
                alert("Phone number is not configured yet.");
            } else {
                link.setAttribute('href', \`tel:\${COMPANY_CONFIG.PHONE_NUMBER}\`);
            }
        });
    });
}
