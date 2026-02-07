/* ============================================
   FORMS.JS - VALIDACIÓN Y MANEJO DE FORMULARIOS
   Integración con Formspree y validaciones avanzadas
   ============================================ */

class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        // Validación en tiempo real
        this.setupRealtimeValidation();
        
        // Manejo del envío
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Formato automático de teléfono
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhone(e));
        }
    }
    
    // ============================================
    // VALIDACIÓN EN TIEMPO REAL
    // ============================================
    setupRealtimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Remover error cuando el usuario empiece a escribir
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorMsg = input.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });
        });
    }
    
    // ============================================
    // VALIDAR CAMPO INDIVIDUAL
    // ============================================
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar errores previos
        field.classList.remove('error');
        const prevError = field.parentElement.querySelector('.error-message');
        if (prevError) prevError.remove();
        
        // Campo requerido
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Validaciones específicas
        if (value && type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
        }
        
        if (value && type === 'tel') {
            const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Formato: (000) 000-0000';
            }
        }
        
        // Checkbox de privacidad
        if (type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
            errorMessage = 'Debes aceptar el aviso de privacidad';
        }
        
        // Mostrar error si no es válido
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = 'var(--color-error)';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '5px';
            field.parentElement.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    // ============================================
    // FORMATO AUTOMÁTICO DE TELÉFONO
    // ============================================
    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        
        e.target.value = value;
    }
    
    // ============================================
    // VALIDAR TODO EL FORMULARIO
    // ============================================
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    // ============================================
    // MANEJAR ENVÍO DEL FORMULARIO
    // ============================================
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!this.validateForm()) {
            this.showMessage('Por favor, corrige los errores en el formulario', 'error');
            
            // Scroll al primer error
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Deshabilitar botón y mostrar loading
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        try {
            // Formspree maneja el envío automáticamente
            // Solo necesitamos esperar la respuesta
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                this.form.reset();
                
                // Opcional: Redirigir a WhatsApp después de 3 segundos
                setTimeout(() => {
                    const whatsappNumber = '[WHATSAPP]';
                    const message = encodeURIComponent('Hola, acabo de enviar el formulario de contacto desde su página web.');
                    if (confirm('¿Deseas también contactarnos por WhatsApp para una respuesta más rápida?')) {
                        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                    }
                }, 3000);
                
            } else {
                throw new Error('Error en el envío');
            }
            
        } catch (error) {
            this.showMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.', 'error');
            console.error('Error:', error);
        } finally {
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }
    
    // ============================================
    // MOSTRAR MENSAJES
    // ============================================
    showMessage(message, type = 'info') {
        // Remover mensaje previo si existe
        const prevMessage = this.form.querySelector('.form-message');
        if (prevMessage) prevMessage.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Estilos
        messageDiv.style.padding = '15px 20px';
        messageDiv.style.borderRadius = '10px';
        messageDiv.style.marginBottom = '20px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.animation = 'slideDown 0.3s ease';
        
        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        } else {
            messageDiv.style.background = '#d1ecf1';
            messageDiv.style.color = '#0c5460';
            messageDiv.style.border = '1px solid #bee5eb';
        }
        
        this.form.insertBefore(messageDiv, this.form.firstChild);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
        
        // Scroll al mensaje
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ============================================
// AGREGAR ANIMACIONES CSS PARA MENSAJES
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    input.error,
    textarea.error,
    select.error {
        border-color: var(--color-error) !important;
        animation: shake 0.3s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});
