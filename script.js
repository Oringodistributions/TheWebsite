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

    // This static website has no server-side email submission service.
    // Open one prefilled email draft; the visitor must send it in their email app.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!contactForm.reportValidity()) return;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const subject = 'Oringo Distributions — website enquiry';
            const body = [
                'Name: ' + name,
                'Email: ' + email,
                'Phone: ' + phone,
                '',
                'Message:',
                message
            ].join('\n');
            const draft = 'mailto:oringodistributions@gmail.com?subject=' +
                encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.location.href = draft;
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
