document.addEventListener('DOMContentLoaded', () => {
    initMatrixEffect();
    initTypingAnimation();
    initNavigation();
    initScrollAnimations();
    initGameMenu();
    initContactForm();
    initSkillsAnimation();
});

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
