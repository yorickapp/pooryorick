// Mobile nav toggle
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
        });
        // Close nav when a non-dropdown link is clicked
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                if (!a.closest('.nav-dropdown') || a.closest('.nav-dropdown-menu')) {
                    links.classList.remove('open');
                }
            });
        });
    }

    // Mobile: toggle dropdown on tap
    document.querySelectorAll('.nav-dropdown > a').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                var parent = trigger.parentElement;
                // Close other dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(function (d) {
                    if (d !== parent) d.classList.remove('open');
                });
                parent.classList.toggle('open');
            }
        });
    });
})();

// Carousel functionality (used on portfolio page)
(function () {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    const dotsContainer = document.getElementById('carouselDots');

    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.onclick = function () { goToSlide(i); };
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        if (dotsContainer) {
            document.querySelectorAll('.carousel-dot').forEach(function (dot, index) {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    window.moveCarousel = function (direction) {
        currentSlide += direction;
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
        updateCarousel();
    };

    window.goToSlide = function (index) {
        currentSlide = index;
        updateCarousel();
    };

    updateCarousel();

    // Keyboard navigation for carousel
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') window.moveCarousel(-1);
        if (e.key === 'ArrowRight') window.moveCarousel(1);
    });
})();

// Scroll-reveal observer
(function () {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(
        function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add('is-visible');
                    observer.unobserve(entries[i].target);
                }
            }
        },
        { threshold: 0.15 }
    );

    els.forEach(function (el) { observer.observe(el); });
})();

// Modal functionality
window.openModal = function (imageElement) {
    var modal = document.getElementById('imageModal');
    var modalContent = document.getElementById('modalContent');
    if (!modal || !modalContent) return;

    var imgSrc = imageElement.src;
    var imgAlt = imageElement.alt;
    modalContent.innerHTML = '<img src="' + imgSrc + '" alt="' + imgAlt + '">';
    modal.classList.add('active');
};

window.closeModal = function () {
    var modal = document.getElementById('imageModal');
    if (modal) modal.classList.remove('active');
};

// Escape key closes modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeModal();
});

// Scroll progress indicator
(function () {
    var indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;

    window.addEventListener('scroll', function () {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service hero nav dropdown
(function () {
    var nav = document.getElementById('serviceNav');
    if (!nav) return;
    var toggle = nav.querySelector('.service-hero__nav-toggle');
    var menu = nav.querySelector('.service-hero__nav-menu');
    toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();

// Portfolio tab switcher
(function () {
    var tabs = document.querySelectorAll('.portfolio-tab-nav .stab');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = tab.getAttribute('data-tab');
            tabs.forEach(function (t) { t.classList.remove('active'); });
            document.querySelectorAll('.portfolio-panel').forEach(function (p) { p.classList.remove('active'); });
            tab.classList.add('active');
            var panel = document.getElementById(target);
            if (panel) panel.classList.add('active');
        });
    });
})();
