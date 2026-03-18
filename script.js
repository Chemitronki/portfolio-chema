document.addEventListener('DOMContentLoaded', () => {
    initMatrixEffect();
    initTypingAnimation();
    initNavigation();
    initScrollAnimations();
    initGameMenu();
    initContactForm();
    initSkillsAnimation();
    initLanguageToggle();
    loadLanguage();
});

const translations = {
    en: {
        'nav.home': 'HOME',
        'nav.about': 'ABOUT',
        'nav.projects': 'MISSIONS',
        'nav.skills': 'SKILLS',
        'nav.contact': 'CONTACT',
        'hero.tag1': 'WEB DEVELOPER',
        'hero.tag2': 'UX/UI DESIGNER',
        'hero.tag3': 'FULL STACK',
        'hero.age': 'YEARS',
        'hero.projects': 'PROJECTS',
        'hero.title': 'DEGREE',
        'hero.missions': 'VIEW MISSIONS',
        'hero.contact': 'CONTACT',
        'hero.scroll': 'SCROLL',
        'about.title': 'ABOUT ME',
        'about.character': 'CHARACTER',
        'about.p1': 'Hi! I\'m <strong>Jose Manuel García Seno</strong>, known as <span class="highlight">Chema</span>. I\'m a web developer and UX/UI designer with a gamer soul.',
        'about.p2': 'I currently work as a web developer at <strong>Gesyfar</strong>, managing e-commerce projects with PrestaShop, PHP and MySQL. I was previously UX/UI Designer at <strong>Wiper Gaming</strong> and have training in web development and interface design.',
        'about.p3': 'My passion for video games is reflected in everything I create: immersive interfaces, smooth animations, and experiences that seem taken from a game.',
        'about.class': 'CLASS',
        'about.specialty': 'SPECIALTY',
        'about.inventory': 'INVENTORY',
        'about.location': 'Madrid, Spain',
        'about.job': 'Web Developer at Gesyfar',
        'about.education': 'FP DAW - IES Vista Alegre',
        'about.hobby': 'Gamer & Game Dev',
        'about.degree': 'Audiovisual Communication Degree',
        'projects.title': 'MY MISSIONS',
        'projects.featured': 'FEATURED',
        'projects.play': 'PLAY',
        'projects.code': 'CODE',
        'projects.view': 'VIEW',
        'projects.read': 'READ',
        'skills.title': 'SKILLS',
        'skills.dev': 'DEVELOPMENT',
        'skills.design': 'DESIGN & UX/UI',
        'skills.tools': 'TOOLS',
        'contact.title': 'CONTACT',
        'contact.connect': 'CONNECT',
        'contact.desc': 'Ready for an adventure together? Write to me!',
        'contact.name': 'NAME',
        'contact.email': 'EMAIL',
        'contact.message': 'MESSAGE',
        'contact.send': 'SEND',
        'contact.made': 'Made with ❤️ and ☕',
        'menu.title': 'MENU'
    },
    es: {
        'nav.home': 'INICIO',
        'nav.about': 'SOBRE MÍ',
        'nav.projects': 'MISIONES',
        'nav.skills': 'SKILLS',
        'nav.contact': 'CONTACTO',
        'hero.tag1': 'DESARROLLADOR WEB',
        'hero.tag2': 'UX/UI DESIGNER',
        'hero.tag3': 'FULL STACK',
        'hero.age': 'AÑOS',
        'hero.projects': 'PROYECTOS',
        'hero.title': 'TÍTULO',
        'hero.missions': 'VER MISIONES',
        'hero.contact': 'CONTACTAR',
        'hero.scroll': 'SCROLL',
        'about.title': 'SOBRE MÍ',
        'about.character': 'PERSONAJE',
        'about.p1': '¡Hola! Soy <strong>Jose Manuel García Seno</strong>, conocido como <span class="highlight">Chema</span>. Soy desarrollador web y diseñador UX/UI con alma de gamer.',
        'about.p2': 'Actualmente trabajo como desarrollador web en <strong>Gesyfar</strong>, gestionando proyectos e-commerce con PrestaShop, PHP y MySQL. Antes fui UX/UI Designer en <strong>Wiper Gaming</strong> y cuento con formación en desarrollo web y diseño de interfaces.',
        'about.p3': 'Mi pasión por los videojuegos se refleja en todo lo que creo: interfaces inmersivas, animaciones fluidas y experiencias que parecen sacadas de un juego.',
        'about.class': 'CLASE',
        'about.specialty': 'ESPECIALIDAD',
        'about.inventory': 'INVENTARIO',
        'about.location': 'Madrid, España',
        'about.job': 'Desarrollador Web en Gesyfar',
        'about.education': 'FP DAW - IES Vista Alegre',
        'about.hobby': 'Gamer & Game Dev',
        'about.degree': 'Grado Comunicación Audiovisual',
        'projects.title': 'MIS MISIONES',
        'projects.featured': 'DESTACADO',
        'projects.play': 'JUGAR',
        'projects.code': 'CÓDIGO',
        'projects.view': 'VER',
        'projects.read': 'LEER',
        'skills.title': 'SKILLS',
        'skills.dev': 'DESARROLLO',
        'skills.design': 'DISEÑO & UX/UI',
        'skills.tools': 'HERRAMIENTAS',
        'contact.title': 'CONTACTO',
        'contact.connect': 'CONECTAR',
        'contact.desc': '¿Listo para una aventura conjunta? ¡Escríbeme!',
        'contact.name': 'NOMBRE',
        'contact.email': 'EMAIL',
        'contact.message': 'MENSAJE',
        'contact.send': 'ENVIAR',
        'contact.made': 'Diseñado con ❤️ y ☕',
        'menu.title': 'MENÚ'
    }
};

let currentLang = 'es';

function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        applyTranslations(currentLang);
        saveLanguage(currentLang);
        updateLangButton();
    });
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
    
    const titles = {
        en: 'Chema García | Web Developer & UX/UI Designer',
        es: 'Chema García | Desarrollador Web & Diseñador UX/UI'
    };
    document.title = titles[lang];
    
    const descs = {
        en: 'Portfolio of Chema García - Web Developer (DAW), UX/UI Designer. Projects: Lovecraftian Escape Room, Web Apps.',
        es: 'Portfolio de Chema García - Desarrollador Web (DAW), UX/UI Designer. Proyectos: Lovecraftian Escape Room, Web Apps.'
    };
    document.querySelector('meta[name="description"]').content = descs[lang];
    
    document.querySelectorAll('.project-card').forEach(card => {
        const titleEl = card.querySelector('.project-title');
        const descEl = card.querySelector('.project-desc');
        if (titleEl) {
            const projectKey = titleEl.textContent.toLowerCase().replace(/\s+/g, '');
            translateProject(card, lang, projectKey);
        }
    });
}

function translateProject(card, lang, projectKey) {
    const projectTranslations = {
        en: {
            'lovecraftianescaperoom': { title: 'LOVECRAFTIAN ESCAPE ROOM', desc: 'Web escape room experience with Lovecraftian theme. 10 unique puzzles, 25 min timer, hint system and global ranking.' },
            'mitologíanórdica': { title: 'NORDIC MYTHOLOGY', desc: 'Interactive web about Norse mythology with information about gods, creatures and ancient texts.' },
            'physiocaremadrid': { title: 'PHYSIO CARE MADRID', desc: 'UX/UI design for physiotherapy and osteopathy website in Madrid. Accessible and user-centered design.' },
            'spainleague2k': { title: 'SPAIN LEAGUE 2K', desc: '2K video game league website. Online competitions for NBA 2K, FIFA and more.' },
            'sanseesports': { title: 'SANSE ESPORTS', desc: 'Esports and gaming club. Tournaments, teams and gaming community.' },
            'hboonyx': { title: 'HBO ONYX', desc: 'Case study about HBO Max and its expansion to all TV devices. UX Analysis.' },
            'stylishday': { title: 'STYLISH DAY', desc: 'Outfit recommendation app based on weather conditions. UX Design.' },
            'designsprint:lapelícula': { title: 'DESIGN SPRINT: THE MOVIE', desc: 'Design Sprint methodology applied to film production. UX Research.' },
            'transicióndigital3ªedad': { title: 'DIGITAL TRANSITION FOR SENIORS', desc: 'Research on how to facilitate digital transition for elderly people.' }
        },
        es: {
            'lovecraftianescaperoom': { title: 'LOVECRAFTIAN ESCAPE ROOM', desc: 'Experiencia de escape room web con temática lovecraftiana. 10 puzzles únicos, timer de 25 min, sistema de pistas y ranking global.' },
            'mitologíanórdica': { title: 'MITOLOGÍA NÓRDICA', desc: 'Web interactiva sobre mitología nórdica con información de dioses, criaturas y textos ancestrales.' },
            'physiocaremadrid': { title: 'PHYSIO CARE MADRID', desc: 'Diseño UX/UI para web de fisioterapia y osteopatía en Madrid. Diseño accesible y centrado en el usuario.' },
            'spainleague2k': { title: 'SPAIN LEAGUE 2K', desc: 'Web de liga de videojuegos 2K. Competiciones online de NBA 2K, FIFA y más.' },
            'sanseesports': { title: 'SANSE ESPORTS', desc: 'Club de esports y gaming. Torneos, equipos y comunidad gamer.' },
            'hboonyx': { title: 'HBO ONYX', desc: 'Case study sobre HBO Max y su expansión a todos los dispositivos TV. Análisis UX.' },
            'stylishday': { title: 'STYLISH DAY', desc: 'App de recomendaciones de outfit según el clima meteorológico. UX Design.' },
            'designsprint:lapelícula': { title: 'DESIGN SPRINT: LA PELÍCULA', desc: 'Metodología Design Sprint aplicada a la producción cinematográfica. UX Research.' },
            'transicióndigital3ªedad': { title: 'TRANSICIÓN DIGITAL 3ª EDAD', desc: 'Investigación sobre cómo facilitar la transición digital a las personas mayores.' }
        }
    };
    
    const titleEl = card.querySelector('.project-title');
    const descEl = card.querySelector('.project-desc');
    
    if (projectTranslations[lang] && projectTranslations[lang][projectKey]) {
        if (titleEl) titleEl.textContent = projectTranslations[lang][projectKey].title;
        if (descEl) descEl.textContent = projectTranslations[lang][projectKey].desc;
    }
}

function saveLanguage(lang) {
    localStorage.setItem('portfolio-lang', lang);
}

function loadLanguage() {
    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        currentLang = savedLang;
        applyTranslations(currentLang);
    }
    updateLangButton();
}

function updateLangButton() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;
    
    const flagEl = langToggle.querySelector('.lang-flag');
    const textEl = langToggle.querySelector('.lang-text');
    
    if (currentLang === 'en') {
        flagEl.textContent = '🇬🇧';
        textEl.textContent = 'EN';
    } else {
        flagEl.textContent = '🇪🇸';
        textEl.textContent = 'ES';
    }
}

function initMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            const alpha = Math.random() * 0.5 + 0.1;
            ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.fillText(char, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

function initTypingAnimation() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const texts = [
        'Desarrollador Web',
        'UX/UI Designer',
        'Gamer & Creador',
        'Full Stack Dev'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            closeMenu();
        });
    });
}

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.about-card, .project-card, .skill-category, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

function initGameMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuPanel = document.getElementById('menu-panel');
    const gameMenu = document.querySelector('.game-menu');
    const menuLinks = document.querySelectorAll('.menu-items a');
    
    function toggleMenu() {
        gameMenu.classList.toggle('active');
        document.body.style.overflow = gameMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        gameMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const mailtoLink = `mailto:chema.ucm@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        form.reset();
        
        showNotification('¡Mensaje preparado! Se abrirá tu cliente de correo.');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: var(--bg-dark);
        padding: 1rem 2rem;
        border-radius: 4px;
        font-family: var(--font-display);
        font-size: 0.9rem;
        letter-spacing: 1px;
        z-index: 10000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar .bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.game-nav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        nav.style.background = 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(10, 10, 15, 0.8) 100%)';
    }
    
    lastScrollTop = scrollTop;
});
