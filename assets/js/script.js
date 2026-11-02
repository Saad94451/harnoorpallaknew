// script.js - Harnoor Pallak Construction Ltd.

document.addEventListener('DOMContentLoaded', function() {
    // MOBILE NAVIGATION: premium full-screen drawer (slides in left to right)
    var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    var navLinks = document.querySelector('.nav-links');
    var MOBILE_BP = 992;

    // Inject animated hamburger bars (replaces the old fa-bars icon)
    if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = '<span class="hb-bar"></span><span class="hb-bar"></span><span class="hb-bar"></span>';
        mobileMenuBtn.setAttribute('role', 'button');
        mobileMenuBtn.setAttribute('tabindex', '0');
        mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mobileMenuBtn.click(); }
        });
    }

    // Inject the drawer header (logo + close) and footer (contact + socials + CTA)
    if (navLinks) {
        var header = document.createElement('div');
        header.className = 'drawer-header';
        header.innerHTML =
            '<span class="drawer-logo"><img src="./assets/img/logo-removebg-preview.png" alt="Harnoor Pallak Construction Ltd."></span>' +
            '<button type="button" class="drawer-close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>';
        navLinks.insertBefore(header, navLinks.firstChild);

        // Reuse phone/email shown in the page's top bar so the drawer stays in sync
        var tel = '', mail = '';
        document.querySelectorAll('.top-bar-right span').forEach(function(s) {
            var t = s.textContent.trim();
            if (/\+\d[\d\s().-]*\d/.test(t) && t.indexOf('@') === -1) tel = t;
            if (t.indexOf('@') !== -1) mail = t;
        });
        var footer = document.createElement('div');
        footer.className = 'drawer-footer';
        footer.innerHTML =
            '<div class="drawer-contact">' +
                (tel ? '<a href="tel:' + tel.replace(/[^+\d]/g, '') + '"><i class="fa-solid fa-phone"></i>' + tel + '</a>' : '') +
                (mail ? '<a href="mailto:' + mail.replace(/\s/g, '') + '"><i class="fa-solid fa-envelope"></i>' + mail + '</a>' : '') +
                '<span style="display:flex;align-items:center;justify-content:center;gap:10px;padding:7px 0;font-size:13.5px;color:rgba(255,255,255,.82)"><i class="fa-solid fa-clock" style="color:var(--accent-gold);font-size:13px;width:16px;text-align:center"></i>Mon - Fri: 8:00 AM - 5:00 PM</span>' +
            '</div>' +
            '<div class="drawer-social">' +
                '<a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
                '<a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
                '<a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
            '</div>' +
            '<a href="#" class="drawer-quote btn-gold">Get a Quote <i class="fa-solid fa-arrow-right"></i></a>';
        navLinks.appendChild(footer);


    }

    var drawerCloseBtn = navLinks ? navLinks.querySelector('.drawer-close') : null;

    function openMenu() {
        // Fallback for mobile browsers where 100vh/100dvh misbehave
        navLinks.style.height = window.innerHeight + 'px';
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.add('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) { closeMenu(); } else { openMenu(); }
        });

        if (drawerCloseBtn) {
            drawerCloseBtn.addEventListener('click', function() { closeMenu(); });
        }

        // Mobile: no dropdowns - Services/Projects links go straight to their pages
        // (hover dropdowns only apply on larger screens via CSS)

        // Close the drawer when any nav link is followed
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() { closeMenu(); });
        });

        // Escape key closes the drawer
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') { closeMenu(); }
        });

        // Reset drawer state when crossing the breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > MOBILE_BP) {
                closeMenu();
                navLinks.style.height = '';
            } else if (navLinks.classList.contains('active')) {
                navLinks.style.height = window.innerHeight + 'px';
            }
        });
    }

    // HERO AUTOPLAY BACKGROUND SLIDER
    (function() {
        var slides = document.querySelectorAll('.hero-slide');
        if (slides.length <= 1) return;
        var current = 0;
        setInterval(function() {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    })();

    // TESTIMONIALS SLIDER NAVIGATION (Interactive on all devices)
    var testiCards = document.querySelector('.testi-cards');
    var prevBtn = document.querySelector('.testi-nav-btn:first-child');
    var nextBtn = document.querySelector('.testi-nav-btn:last-child');

    if (testiCards && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
            testiCards.scrollBy({ left: 320, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', function() {
            testiCards.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }
    // PROJECT FILTER TABS
    var filterBtns = document.querySelectorAll('.project-filter-btn');
    var resSection = document.getElementById('residential-projects');
    var commSection = document.getElementById('commercial-projects');

    if (filterBtns.length > 0 && resSection && commSection) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filter = btn.getAttribute('data-filter');
                if (filter === 'all') {
                    resSection.style.display = 'block';
                    commSection.style.display = 'block';
                } else if (filter === 'residential') {
                    resSection.style.display = 'block';
                    commSection.style.display = 'none';
                    resSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (filter === 'commercial') {
                    resSection.style.display = 'none';
                    commSection.style.display = 'block';
                    commSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ============================================================
    // FORMSPREE - shared endpoint + AJAX submit helper
    // ============================================================
    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzeeaywo';

    function submitToFormspree(form) {
        return fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(function(res) {
            if (!res.ok) {
                return res.json().then(function(data) {
                    var msg = (data && data.errors && data.errors.length) ? data.errors[0].message : ('Formspree error ' + res.status);
                    throw new Error(msg);
                }).catch(function() { throw new Error('Submission failed. Please try again.'); });
            }
            return res;
        });
    }

    function showFormError(form, message) {
        var note = form.querySelector('.form-error-note');
        if (!note) {
            note = document.createElement('p');
            note.className = 'form-error-note';
            form.appendChild(note);
        }
        note.textContent = message;
    }

    // ============================================================
    // GET A QUOTE - POPUP MODAL (injected once, works on all pages)
    // ============================================================
    (function() {
        var overlay = document.createElement('div');
        overlay.className = 'quote-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Get a Quote');
        overlay.innerHTML =
            '<div class="quote-modal">' +
                '<button type="button" class="quote-modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
                '<div class="qm-head">' +
                   
                    '<h3>Get a Quote</h3>' +
                    '<p>Tell us about your project and we\u2019ll get back to you with a detailed quote.</p>' +
                '</div>' +
                '<form class="contact-form" novalidate>' +
                    '<input type="hidden" name="_subject" value="New Quote Request - Harnoor Pallak Website">' +
                    '<input type="text" name="name" placeholder="Full Name *" required>' +
                    '<input type="email" name="email" placeholder="Email Address *" required>' +
                    '<input type="tel" name="phone" placeholder="Phone Number *">' +
                    '<select name="service" required>' +
                        '<option value="" disabled selected>Select Service</option>' +
                        '<option value="wood-framing">Wood Framing</option>' +
                        '<option value="steel-framing">Steel Framing</option>' +
                        '<option value="insulation">Insulation</option>' +
                        '<option value="drywall">Drywall</option>' +
                        '<option value="taping">Taping</option>' +
                        '<option value="concrete">Concrete Finishers</option>' +
                        '<option value="paint">Interior &amp; Exterior Paint</option>' +
                        '<option value="mep">Electrical &amp; Plumbing</option>' +
                        '<option value="renovation">Interior Renovation</option>' +
                    '</select>' +
                    '<textarea name="message" placeholder="Your Message..." rows="3"></textarea>' +
                    '<button type="submit">Send Request <i class="fa-solid fa-arrow-right"></i></button>' +
                '</form>' +
                '<div class="qm-success">' +
                    '<i class="fa-solid fa-circle-check"></i>' +
                    '<h4>Thank You!</h4>' +
                    '<p>Your request has been received. Our team will contact you shortly with your free quote.</p>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        var modal = overlay.querySelector('.quote-modal');
        var form = overlay.querySelector('form');

        function openQuoteModal() {
            overlay.classList.add('open');
            document.body.classList.add('quote-open');
            // reset previous submission state
            modal.classList.remove('sent');
        }
        function closeQuoteModal() {
            overlay.classList.remove('open');
            document.body.classList.remove('quote-open');
        }

        // Wire every "Get a Quote" button (navbar + hero/CTA) - matched by label text
        document.querySelectorAll('a.btn-gold, button.btn-gold, a.btn-promo-quote').forEach(function(btn) {
            if (!/get\s+a\s+(?:free\s+)?quote/i.test(btn.textContent)) return;
            // Only intercept placeholder links (#), not buttons that go to a real page
            var href = btn.getAttribute('href');
            if (href && href !== '#') return;
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openQuoteModal();
            });
        });

        overlay.querySelector('.quote-modal-close').addEventListener('click', closeQuoteModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeQuoteModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('open')) closeQuoteModal();
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var valid = true;
            form.querySelectorAll('[required]').forEach(function(field) {
                if (!field.value) {
                    valid = false;
                    field.style.borderColor = '#c0392b';
                    setTimeout(function() { field.style.borderColor = ''; }, 2000);
                }
            });
            if (!valid) return;
            var btn = form.querySelector('button[type="submit"]');
            var btnHtml = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = 'Sending...';
            showFormError(form, '');
            submitToFormspree(form)
                .then(function() {
                    modal.classList.add('sent');
                    form.reset();
                    setTimeout(closeQuoteModal, 2600);
                })
                .catch(function(err) {
                    showFormError(form, err.message || 'Something went wrong. Please try again or call us.');
                })
                .finally(function() {
                    btn.disabled = false;
                    btn.innerHTML = btnHtml;
                });
        });
    })();

    // ============================================================
    // CONTACT PAGE FORM (.contact-vip-form) -> FORMSPREE (AJAX)
    // ============================================================
    (function() {
        var cForm = document.querySelector('.contact-vip-form');
        if (!cForm) return;
        cForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var valid = true;
            cForm.querySelectorAll('[required]').forEach(function(field) {
                if (!field.value) {
                    valid = false;
                    field.style.borderColor = '#c0392b';
                    setTimeout(function() { field.style.borderColor = ''; }, 2000);
                }
            });
            if (!valid) return;
            var btn = cForm.querySelector('button[type="submit"]');
            var btnHtml = btn ? btn.innerHTML : '';
            if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
            showFormError(cForm, '');
            submitToFormspree(cForm)
                .then(function() {
                    var success = document.createElement('div');
                    success.className = 'vip-form-success';
                    success.innerHTML = '<i class="fa-solid fa-circle-check"></i>' +
                        '<h4>Thank You!</h4>' +
                        '<p>Your message has been sent successfully. Our team will get back to you shortly.</p>';
                    cForm.style.display = 'none';
                    cForm.parentNode.insertBefore(success, cForm.nextSibling);
                })
                .catch(function(err) {
                    showFormError(cForm, err.message || 'Something went wrong. Please try again or call us.');
                })
                .finally(function() {
                    if (btn) { btn.disabled = false; btn.innerHTML = btnHtml; }
                });
        });
    })();

    // ============================================================
    // JS GUARANTEE: top bar, navbar & footer centered on mobile
    // (applies inline styles <=992px, clears them on desktop)
    // ============================================================
    (function() {
        var CENTER_SEL = [
            '.top-bar .container', '.top-bar-left', '.top-bar-right',
            '.navbar > .container',
            '.footer', '.footer-grid', '.footer-logo', '.footer h4',
            '.footer-links', '.footer-links li', '.footer-links a',
            '.footer-social', '.newsletter-form', '.footer-bottom', '.footer-bottom div'
        ];
        var MOBILE_CENTER = {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        function applyChromeCentering() {
            var isMobile = window.innerWidth <= 992;
            CENTER_SEL.forEach(function(sel) {
                document.querySelectorAll(sel).forEach(function(el) {
                    Object.keys(MOBILE_CENTER).forEach(function(prop) {
                        if (isMobile) {
                            // navbar container keeps its grid layout; only text/inline content centers
                            if (el.matches('.navbar > .container') && (prop === 'alignItems' || prop === 'marginLeft' || prop === 'marginRight')) {
                                el.style[prop] = '';
                            } else {
                                el.style[prop] = MOBILE_CENTER[prop];
                            }
                        } else {
                            el.style[prop] = '';
                        }
                    });
                });
            });
        }

        applyChromeCentering();
        var chromeResizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(chromeResizeTimer);
            chromeResizeTimer = setTimeout(applyChromeCentering, 150);
        });
    })();
});
