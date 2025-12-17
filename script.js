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
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Format message for WhatsApp
            const whatsappMessage = `Hello, I'm interested in your product%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
            
            // Create WhatsApp link
            const whatsappLink = `https://wa.me/+447534116006?text=${whatsappMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappLink, '_blank');

            contactForm.reset();

            if (successModal) {
                successModal.classList.add('active');
            }
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
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