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
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ===== Mouse-following ambient light on hero ===== */
    var hero = document.getElementById('hero');

    function moveHeroLight(e) {
        var rect = hero.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mx', x + '%');
        hero.style.setProperty('--my', y + '%');
    }

    if (hero) {
        hero.addEventListener('mousemove', moveHeroLight, { passive: true });
    }

    /* ===== Scroll reveal with stagger ===== */
    var revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    function checkReveal() {
        var h = window.innerHeight;
        revealElements.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < h - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('load', checkReveal);

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
            item.style.setProperty('--reveal-delay', (i * 0.05).toFixed(2) + 's');
        });
    });
})();
