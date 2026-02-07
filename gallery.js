/* ============================================
   GALLERY.JS - GALERÍA EXPANDIBLE PROFESIONAL
   Lightbox con navegación completa
   ============================================ */

class GalleryLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxCounter = document.getElementById('lightboxCounter');
        this.currentIndex = 0;
        this.images = [];
        
        this.init();
    }
    
    init() {
        // Recopilar todas las imágenes de la galería
        const galleryItems = document.querySelectorAll('.gallery-item img');
        this.images = Array.from(galleryItems).map(img => ({
            src: img.src,
            alt: img.alt
        }));
        
        // Event listeners para controles
        document.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        document.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        document.querySelector('.lightbox-next').addEventListener('click', () => this.next());
        
        // Click fuera de la imagen para cerrar
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
        
        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
        
        // Prevenir scroll cuando lightbox está abierto
        this.lightbox.addEventListener('wheel', (e) => {
            if (this.lightbox.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }
    
    updateImage() {
        const img = this.images[this.currentIndex];
        this.lightboxImage.src = img.src;
        this.lightboxImage.alt = img.alt;
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        
        // Animación de entrada
        this.lightboxImage.style.opacity = '0';
        this.lightboxImage.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.lightboxImage.style.opacity = '1';
            this.lightboxImage.style.transform = 'scale(1)';
        }, 50);
    }
}

// Función global para abrir lightbox (llamada desde HTML)
let galleryLightbox;

function openLightbox(index) {
    if (!galleryLightbox) {
        galleryLightbox = new GalleryLightbox();
    }
    galleryLightbox.open(index);
}

function closeLightbox() {
    if (galleryLightbox) {
        galleryLightbox.close();
    }
}

function changeLightboxImage(direction) {
    if (galleryLightbox) {
        if (direction > 0) {
            galleryLightbox.next();
        } else {
            galleryLightbox.prev();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading para imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-item img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger lazy load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        galleryImages.forEach(img => imageObserver.observe(img));
    }
    
    // Precargar lightbox
    galleryLightbox = new GalleryLightbox();
});
