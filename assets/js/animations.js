/* ============================================
   ANIMATIONS.JS - EFECTOS DINÁMICOS
   Scroll animations, parallax, counter animations
   ============================================ */

class AnimationController {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollReveal();
        this.setupParallax();
        this.setupNavbarScroll();
        this.setupCounterAnimations();
        this.setupSmoothScroll();
        this.setupMobileMenu();
    }
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Una vez animado, dejar de observar para performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar todos los elementos con data-animate
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // ============================================
    // PARALLAX EFFECT
    // ============================================
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    parallaxElements.forEach(el => {
                        const speed = el.dataset.speed || 0.5;
                        const rect = el.getBoundingClientRect();
                        const scrolled = window.pageYOffset;
                        
                        // Solo aplicar parallax si el elemento está en viewport
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            const yPos = -(scrolled * speed);
                            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                        }
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    setupNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Ocultar navbar al hacer scroll down, mostrar al hacer scroll up
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ============================================
    // COUNTER ANIMATIONS
    // ============================================
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        if (counters.length === 0) return;
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Observer para activar cuando sea visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignorar links vacíos o solo #
                if (!href || href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        document.getElementById('navToggle')?.classList.remove('active');
                        document.querySelector('.nav-overlay')?.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // ============================================
    // MOBILE MENU
    // ============================================
    setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!navToggle || !navMenu) return;
        
        // Crear overlay si no existe
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Prevenir scroll cuando menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer click en overlay
        overlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Cerrar menú al cambiar tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ============================================
// HERO PARALLAX ESPECIAL
// ============================================
class HeroParallax {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroParallax = document.getElementById('heroParallax');
        
        if (this.hero && this.heroParallax) {
            this.init();
        }
    }
    
    init() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = this.hero.offsetHeight;
                    
                    if (scrolled < heroHeight) {
                        // Parallax más lento en el hero
                        this.heroParallax.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
                        
                        // Fade out gradual
                        const opacity = 1 - (scrolled / heroHeight);
                        this.hero.querySelector('.hero-content').style.opacity = opacity;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// ============================================
// PERFORMANCE: REDUCIR ANIMACIONES EN MÓVILES
// ============================================
class PerformanceOptimizer {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.optimize();
    }
    
    optimize() {
        if (this.isMobile) {
            // Reducir complejidad de parallax en móviles
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            parallaxElements.forEach(el => {
                el.style.backgroundAttachment = 'scroll';
            });
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar controlador principal
    new AnimationController();
    
    // Inicializar hero parallax
    new HeroParallax();
    
    // Optimizar performance
    new PerformanceOptimizer();
    
    // Agregar clase para indicar que JS está cargado
    document.body.classList.add('js-loaded');
});

// ============================================
// LOADING STATE
// ============================================
window.addEventListener('load', () => {
    // Remover cualquier loading screen si existe
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Activar transiciones después de carga
    document.body.classList.add('loaded');
});
