/* ============================================
   CHATBOT.JS - SISTEMA AVANZADO DE CONVERSACIÓN
   Chatbot inteligente con múltiples flujos
   ============================================ */

class ChatbotAdvanced {
    constructor() {
        this.container = document.getElementById('chatbotContainer');
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.close = document.getElementById('chatbotClose');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.optionsContainer = document.getElementById('chatbotOptions');
        this.badge = document.querySelector('.chatbot-badge');
        
        this.conversationState = 'initial';
        this.userName = null;
        this.userInterest = null;
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.toggle.addEventListener('click', () => this.openChat());
        this.close.addEventListener('click', () => this.closeChat());
        
        // Mostrar mensaje inicial después de 3 segundos
        setTimeout(() => {
            if (!this.window.classList.contains('active')) {
                this.showNotification();
            }
        }, 3000);
        
        // Iniciar conversación
        this.startConversation();
    }
    
    showNotification() {
        this.badge.style.display = 'flex';
        this.toggle.style.animation = 'pulse 2s infinite';
    }
    
    hideNotification() {
        this.badge.style.display = 'none';
        this.toggle.style.animation = 'none';
    }
    
    openChat() {
        this.window.classList.add('active');
        this.hideNotification();
        
        // Si es la primera vez, mostrar mensaje de bienvenida
        if (this.conversationState === 'initial') {
            this.conversationState = 'welcome';
            this.addBotMessage('¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?');
            setTimeout(() => this.showMainMenu(), 800);
        }
    }
    
    closeChat() {
        this.window.classList.remove('active');
    }
    
    startConversation() {
        this.messagesContainer.innerHTML = '';
        this.optionsContainer.innerHTML = '';
    }
    
    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message';
        messageDiv.innerHTML = `
            <div class="message-bubble message-bot">
                ${message}
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message';
        messageDiv.innerHTML = `
            <div class="message-bubble message-user">
                ${message}
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
    
    clearOptions() {
        this.optionsContainer.innerHTML = '';
    }
    
    showMainMenu() {
        this.clearOptions();
        
        const options = [
            { text: '📋 Ver servicios', action: 'services' },
            { text: '💰 Consultar precios', action: 'prices' },
            { text: '📍 Ubicación y horarios', action: 'location' },
            { text: '📞 Hablar con un asesor', action: 'contact' },
            { text: '📝 Agendar cita', action: 'appointment' }
        ];
        
        this.createOptions(options);
    }
    
    createOptions(options) {
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'chatbot-option';
            button.textContent = option.text;
            button.addEventListener('click', () => this.handleOption(option.action, option.text));
            this.optionsContainer.appendChild(button);
        });
    }
    
    handleOption(action, userText) {
        // Agregar mensaje del usuario
        this.addUserMessage(userText);
        this.clearOptions();
        
        // Pequeño delay para simular "pensando"
        setTimeout(() => {
            switch(action) {
                case 'services':
                    this.showServices();
                    break;
                case 'prices':
                    this.showPrices();
                    break;
                case 'location':
                    this.showLocation();
                    break;
                case 'contact':
                    this.showContact();
                    break;
                case 'appointment':
                    this.showAppointment();
                    break;
                case 'service_1':
                case 'service_2':
                case 'service_3':
                    this.showServiceDetail(action);
                    break;
                case 'whatsapp':
                    this.redirectWhatsApp();
                    break;
                case 'phone':
                    this.showPhone();
                    break;
                case 'form':
                    this.redirectForm();
                    break;
                case 'back':
                    this.showMainMenu();
                    break;
                default:
                    this.showMainMenu();
            }
        }, 500);
    }
    
    showServices() {
        this.addBotMessage('Estos son nuestros principales servicios:');
        
        setTimeout(() => {
            const options = [
                { text: '[SERVICIO_1]', action: 'service_1' },
                { text: '[SERVICIO_2]', action: 'service_2' },
                { text: '[SERVICIO_3]', action: 'service_3' },
                { text: '↩️ Volver al menú', action: 'back' }
            ];
            this.createOptions(options);
        }, 600);
    }
    
    showPrices() {
        this.addBotMessage('Nuestros precios son muy competitivos:');
        
        setTimeout(() => {
            this.addBotMessage(`
                • <strong>[SERVICIO_1]:</strong> Desde $[PRECIO_1]<br>
                • <strong>[SERVICIO_2]:</strong> Desde $[PRECIO_2]<br>
                • <strong>[SERVICIO_3]:</strong> Desde $[PRECIO_3]<br><br>
                ¿Te gustaría agendar una cita o hablar con un asesor?
            `);
            
            setTimeout(() => {
                const options = [
                    { text: '📝 Agendar cita', action: 'appointment' },
                    { text: '💬 Hablar por WhatsApp', action: 'whatsapp' },
                    { text: '↩️ Volver al menú', action: 'back' }
                ];
                this.createOptions(options);
            }, 600);
        }, 600);
    }
    
    showLocation() {
        this.addBotMessage('Nos encontramos en:');
        
        setTimeout(() => {
            this.addBotMessage(`
                📍 <strong>Dirección:</strong><br>
                [DIRECCION]<br>
                [CIUDAD]<br><br>
                ⏰ <strong>Horarios:</strong><br>
                Lun - Vie: [HORARIO_SEMANA]<br>
                Sábado: [HORARIO_SABADO]<br>
                Domingo: [HORARIO_DOMINGO]
            `);
            
            setTimeout(() => {
                const options = [
                    { text: '🗺️ Ver en mapa', action: 'map' },
                    { text: '📞 Llamar ahora', action: 'phone' },
                    { text: '↩️ Volver al menú', action: 'back' }
                ];
                this.createOptions(options);
            }, 600);
        }, 600);
    }
    
    showContact() {
        this.addBotMessage('¡Perfecto! ¿Cómo prefieres que te contactemos?');
        
        setTimeout(() => {
            const options = [
                { text: '💬 WhatsApp', action: 'whatsapp' },
                { text: '📞 Llamada telefónica', action: 'phone' },
                { text: '📧 Formulario de contacto', action: 'form' },
                { text: '↩️ Volver al menú', action: 'back' }
            ];
            this.createOptions(options);
        }, 600);
    }
    
    showAppointment() {
        this.addBotMessage('¡Excelente! Para agendar tu cita de manera rápida, te voy a conectar con nuestro WhatsApp donde un asesor te atenderá de inmediato.');
        
        setTimeout(() => {
            const options = [
                { text: '💬 Abrir WhatsApp', action: 'whatsapp' },
                { text: '📧 Llenar formulario', action: 'form' },
                { text: '↩️ Volver al menú', action: 'back' }
            ];
            this.createOptions(options);
        }, 600);
    }
    
    showServiceDetail(service) {
        let serviceName, serviceDescription;
        
        switch(service) {
            case 'service_1':
                serviceName = '[SERVICIO_1]';
                serviceDescription = '[DESCRIPCION_SERVICIO_1]';
                break;
            case 'service_2':
                serviceName = '[SERVICIO_2]';
                serviceDescription = '[DESCRIPCION_SERVICIO_2]';
                break;
            case 'service_3':
                serviceName = '[SERVICIO_3]';
                serviceDescription = '[DESCRIPCION_SERVICIO_3]';
                break;
        }
        
        this.addBotMessage(`<strong>${serviceName}</strong><br><br>${serviceDescription}`);
        
        setTimeout(() => {
            this.addBotMessage('¿Te gustaría agendar este servicio o necesitas más información?');
            
            setTimeout(() => {
                const options = [
                    { text: '📝 Agendar', action: 'appointment' },
                    { text: '💬 Más información', action: 'whatsapp' },
                    { text: '📋 Ver otros servicios', action: 'services' },
                    { text: '↩️ Volver al menú', action: 'back' }
                ];
                this.createOptions(options);
            }, 600);
        }, 800);
    }
    
    redirectWhatsApp() {
        this.addBotMessage('¡Perfecto! Te estoy redirigiendo a WhatsApp... 💬');
        
        setTimeout(() => {
            const whatsappNumber = '[WHATSAPP]'; // Sin espacios ni caracteres especiales
            const message = encodeURIComponent('Hola, vengo del chatbot del sitio web y me gustaría obtener más información.');
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            setTimeout(() => {
                this.addBotMessage('¿Hay algo más en lo que pueda ayudarte?');
                setTimeout(() => this.showMainMenu(), 600);
            }, 1000);
        }, 1000);
    }
    
    showPhone() {
        this.addBotMessage('Puedes llamarnos al:');
        
        setTimeout(() => {
            this.addBotMessage(`
                📞 <strong><a href="tel:[TELEFONO]">[TELEFONO]</a></strong><br><br>
                Estamos disponibles en nuestro horario de atención.
            `);
            
            setTimeout(() => {
                const options = [
                    { text: '💬 Preferir WhatsApp', action: 'whatsapp' },
                    { text: '↩️ Volver al menú', action: 'back' }
                ];
                this.createOptions(options);
            }, 600);
        }, 600);
    }
    
    redirectForm() {
        this.addBotMessage('Te voy a llevar a nuestro formulario de contacto... 📝');
        
        setTimeout(() => {
            // Scroll suave al formulario
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                this.closeChat();
            }
            
            setTimeout(() => {
                this.addBotMessage('Si necesitas ayuda llenando el formulario, ¡aquí estaré!');
            }, 1000);
        }, 1000);
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatbotAdvanced();
});
