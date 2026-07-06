(function () {
    'use strict';

    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    /* ===== Nav scroll ===== */
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ===== Mobile menu ===== */
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    /* ===== Scroll reveal with IntersectionObserver ===== */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.dataset.revealDelay || 0;
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay * 1000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ===== Smooth anchor scroll ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ===== Stagger animation helper for grid cards ===== */
    var staggerGrids = [
        { selector: '.skills-grid', child: '.skill-card' },
        { selector: '.projects-grid', child: '.project-card' },
        { selector: '.edu-grid', child: '.edu-card' }
    ];

    staggerGrids.forEach(function (cfg) {
        var grid = document.querySelector(cfg.selector);
        if (!grid) return;
        var items = grid.querySelectorAll(cfg.child);
        items.forEach(function (item, i) {
            item.classList.add('reveal');
            item.dataset.revealDelay = (i * 0.06).toFixed(2);
        });
    });

    /* ===== Section titles reveal ===== */
    document.querySelectorAll('.section-title').forEach(function (el) {
        el.classList.add('reveal');
    });
})();
