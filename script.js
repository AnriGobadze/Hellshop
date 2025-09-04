document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===========================
    //   ELEMENTS
    // ===========================
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const langButtons = document.querySelectorAll('.lang-btn');
    const navbar = document.querySelector('.navbar');
    const heroVideo = document.querySelector('.hero-video');
    const heroText = document.querySelector('.hero-text');

    // ===========================
    //   TRANSLATIONS
    // ===========================
    const translations = {
      en: { logo_text: 'HELLSHOP', nav_home: 'Home', nav_fragrances: 'Fragrances', nav_contact: 'Contact', hero_title: 'Unleash Your Scent.', hero_subtitle: 'Bold fragrances for the unapologetic soul.', hero_button: 'Explore The Collection', collection_title: 'Our Collection', contact_title: 'Get In Touch', contact_desc: "Have a question, or a special request for a fragrance? Fill out the form or contact us through one of the methods below. We're always happy to help.", form_fullname: 'Full name', form_email: 'Email', form_fragrance: 'Wanted fragrance (optional)', form_button: 'Submit', powered_by: 'Powered by', footer_copyright: '© 2025 hellsShop'},
      ge: { logo_text: 'HELLSHOP', nav_home: 'მთავარი', nav_fragrances: 'სუნამოები', nav_contact: 'კონტაქტი', hero_title: 'გამოავლინე შენი სურნელი.', hero_subtitle: 'საგულდაგულოდ შერჩეული სუნამოები თამამი სულისთვის.', hero_button: 'კოლექციის ნახვა', collection_title: 'ჩვენი კოლექცია', contact_title: 'დაგვიკავშირდით', contact_desc: 'გაქვთ შეკითხვა, ან განსაკუთრებული თხოვნა სუნამოსთან დაკავშირებით? შეავსეთ ფორმა ან დაგვიკავშირდით ქვემოთ მოცემული მეთოდებით. მოხარული ვიქნებით დაგეხმაროთ.', form_fullname: 'სრული სახელი', form_email: 'თქვენი იმეილი', form_fragrance: 'სასურველი სუნამო (სურვილისამებრ)', form_button: 'გაგზავნა', powered_by: 'შექმნილია', footer_copyright: '© 2025 hellsShop' },
      ru: { logo_text: 'HELLSHOP', nav_home: 'Главная', nav_fragrances: 'Ароматы', nav_contact: 'Контакт', hero_title: 'Раскрой свой аромат.', hero_subtitle: 'Смелые ароматы для души без компромиссов.', hero_button: 'Посмотреть коллекцию', collection_title: 'Наша коллекция', contact_title: 'Свяжитесь с нами', contact_desc: 'Есть вопрос или особый запрос на аромат? Заполните форму или свяжитесь с нами одним из способов ниже. Мы всегда рады помочь.', form_fullname: 'Полное имя', form_email: 'Ваш email', form_fragrance: 'Желаемый аромат (необязательно)', form_button: 'Отправить', powered_by: 'Создано', footer_copyright: '© 2025 hellsShop' }
    };

    // ===========================
    //   NAVBAR: SCROLL STATE
    // ===========================
    const handleScroll = () => {
        if (!navbar) return;
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ===========================
    //   NAV TOGGLE (BURGER)
    // ===========================
    const handleNavToggle = () => {
        if (!burger || !navMenu) return;
        const toggleMenu = () => {
            navMenu.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            burger.setAttribute('aria-expanded', navMenu.classList.contains('nav-active'));
        };
        burger.addEventListener('click', toggleMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-active')) {
                    toggleMenu();
                }
            });
        });
    };

    // ===========================
    //   TRANSLATION LOGIC
    // ===========================
    const translatePage = (language) => {
        if (!translations[language]) return;
        document.querySelectorAll('[data-key], [data-placeholder-key]').forEach(element => {
            const textKey = element.dataset.key;
            const placeholderKey = element.dataset.placeholderKey;
            if (textKey && translations[language][textKey]) {
                element.textContent = translations[language][textKey];
            }
            if (placeholderKey && translations[language][placeholderKey]) {
                element.setAttribute('placeholder', translations[language][placeholderKey]);
            }
        });
        localStorage.setItem('language', language);
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === language);
        });
    };

    langButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            translatePage(event.currentTarget.getAttribute('data-lang'));
        });
    });

    // ===========================
    //   HERO CINEMATIC ANIMATION
    // ===========================
// AFTER (Use this new version)
const handleHeroAnimation = () => {
    if (!heroVideo || !heroText) return;

    // This function contains the animation logic we want to run
    const startAnimations = () => {
        // Now that the video is playing, we can safely run our timed sequence
        setTimeout(() => {
            heroText.classList.add('is-visible');
        }, 1500);

        gsap.to(heroVideo, {
            playbackRate: 0,
            duration: 1.5,
            delay: 1.6,
            ease: "power2.inOut",
            onComplete: () => {
                heroVideo.pause();
                heroVideo.classList.add('is-stopped');
            }
        });
    };

    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            heroVideo.addEventListener('canplaythrough', startAnimations, { once: true });
        }).catch(error => {
            console.warn("Autoplay was blocked. Waiting for user interaction.", error);
        });
    }
};

    // ===========================
    //   SCROLL REVEAL: FRAGRANCE CARDS
    // ===========================
    const handleCardReveal = () => {
        const cards = document.querySelectorAll('.fragrance-card');
        if (!cards.length || !window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.1, 
                        ease: 'power3.out'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        cards.forEach(card => observer.observe(card));
    };

/* ===========================
   LOGO ENTRANCE ANIMATION
   =========================== */
const handleLogoAnimation = () => {
    const logoUnderline = document.querySelector('.logo-underline');
    if (!logoUnderline) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && window.scrollY > 50) {
                    logoUnderline.classList.add('is-drawn');
                    observer.unobserve(navbar);
                }
            });
        }, { 
            root: null,
            threshold: 1.0 
        });

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            observer.observe(navbar);
        }

    } else {
        setTimeout(() => {
            logoUnderline.classList.add('is-drawn');
        }, 1600);
    }
};
    // ===========================
    //   INITIALIZATION
    // ===========================
    const currentLang = localStorage.getItem('language') || 'en';
    translatePage(currentLang);
    handleScroll();
    handleNavToggle();
    handleHeroAnimation();
    handleCardReveal();
    handleLogoAnimation();
});