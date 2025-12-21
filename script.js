document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    const scrollToTop = document.getElementById('scrollToTop');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            if (scrollToTop) {
                scrollToTop.classList.add('show');
            }
        } else {
            navbar.classList.remove('scrolled');
            if (scrollToTop) {
                scrollToTop.classList.remove('show');
            }
        }
    });

    if (scrollToTop) {
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card, .feature-card, .product-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Handle anchor links with smooth scroll offset for fixed navbar
    document.querySelectorAll('a[href^="products.html#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const hash = href.split('#')[1];
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    e.preventDefault();
                    const offset = 80; // Account for fixed navbar
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle hash on page load (for direct links)
    if (window.location.hash) {
        setTimeout(() => {
            const hash = window.location.hash.substring(1);
            const targetElement = document.getElementById(hash);
            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    const showAlcoholicBtn = document.getElementById('showAlcoholic');
    const ageModal = document.getElementById('ageModal');
    const ageYesBtn = document.getElementById('ageYes');
    const ageNoBtn = document.getElementById('ageNo');
    const alcoholicSection = document.getElementById('alcoholic-drinks');
    const ageGate = document.getElementById('age-gate');

    if (showAlcoholicBtn) {
        showAlcoholicBtn.addEventListener('click', () => {
            ageModal.classList.add('active');
        });
    }

    if (ageYesBtn) {
        ageYesBtn.addEventListener('click', () => {
            ageModal.classList.remove('active');
            if (ageGate) ageGate.style.display = 'none';
            if (alcoholicSection) alcoholicSection.style.display = 'block';
            const alcoholicBanner = document.getElementById('alcoholic-banner');
            if (alcoholicBanner) alcoholicBanner.style.display = 'block';

            setTimeout(() => {
                alcoholicSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    }

    if (ageNoBtn) {
        ageNoBtn.addEventListener('click', () => {
            ageModal.classList.remove('active');
        });
    }

    if (ageModal) {
        ageModal.addEventListener('click', (e) => {
            if (e.target === ageModal) {
                ageModal.classList.remove('active');
            }
        });
    }

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Change button text to "Sending..."
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields: Name, Email, and Message.');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }

            // Format message body
            const subject = 'Contact Form Inquiry - Oringo Distributions';
            const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

---
Sent from Oringo Distributions Website
            `.trim();

            // Encode for URL
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            // Create mailto link
            const mailtoLink = `mailto:info@oringodistributions.uk?subject=${encodedSubject}&body=${encodedBody}`;
            
            // Try multiple approaches to ensure the email client opens
            
            // Approach 1: Direct window.location
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 100);
            
            // Approach 2: Create and click a link (for better compatibility)
            const tempLink = document.createElement('a');
            tempLink.href = mailtoLink;
            tempLink.style.display = 'none';
            tempLink.target = '_self';
            document.body.appendChild(tempLink);
            
            // Trigger click
            setTimeout(() => {
                tempLink.click();
            }, 50);
            
            // Clean up
            setTimeout(() => {
                if (tempLink.parentNode) {
                    document.body.removeChild(tempLink);
                }
            }, 1000);

            // Show success message and reset form
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
            }, 1500);
        });
    }


    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});
