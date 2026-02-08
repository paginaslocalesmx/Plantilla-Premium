# 📝 GUÍA DE PERSONALIZACIÓN RÁPIDA

Esta guía te mostrará cómo personalizar la plantilla premium en menos de 2 horas.

---

## 🎯 PASO 1: Preparar la Información del Cliente

Antes de empezar, recopila la siguiente información:

### Información Básica
- [ ] Nombre del negocio
- [ ] Slogan o frase principal
- [ ] Descripción corta (1-2 líneas)
- [ ] Descripción larga (3-4 párrafos)

### Datos de Contacto
- [ ] Teléfono
- [ ] WhatsApp (formato: 52XXXXXXXXXX sin espacios)
- [ ] Email
- [ ] Dirección completa
- [ ] Ciudad
- [ ] URL de Google Maps (embed)

### Horarios
- [ ] Lunes a Viernes: _____________
- [ ] Sábado: _____________
- [ ] Domingo: _____________
- [ ] Notas especiales: _____________

### Servicios (Mínimo 3)
1. **Servicio 1:**
   - Nombre: _____________
   - Descripción: _____________
   - Precio desde: _____________

2. **Servicio 2:**
   - Nombre: _____________
   - Descripción: _____________
   - Precio desde: _____________

3. **Servicio 3:**
   - Nombre: _____________
   - Descripción: _____________
   - Precio desde: _____________

### Redes Sociales
- [ ] Facebook: _____________
- [ ] Instagram: _____________
- [ ] Twitter/X: _____________

---

## 🎨 PASO 2: Seleccionar Tema de Color

Edita `index.html` línea 59, cambia la clase del body:

```html
<!-- Para Restaurante -->
<body class="theme-restaurant">

<!-- Para Spa/Wellness -->
<body class="theme-spa">

<!-- Para Consultorio/Médico -->
<body class="theme-medical">

<!-- Para Cafetería/Panadería -->
<body class="theme-cafe">

<!-- Para Gimnasio/Fitness -->
<body class="theme-gym">
```

---

## 🔍 PASO 3: Reemplazar Placeholders

### Método 1: Búsqueda y Reemplazo Global (Recomendado)

Usa el editor de código (VS Code, Sublime, etc.) para buscar y reemplazar:

| Placeholder | Reemplazar con |
|-------------|----------------|
| `[NOMBRE_NEGOCIO]` | Nombre del negocio |
| `[SLOGAN]` | Slogan principal |
| `[DESCRIPCION_CORTA]` | Descripción breve |
| `[DESCRIPCION_HERO]` | Descripción en hero |
| `[TELEFONO]` | Número de teléfono |
| `[WHATSAPP]` | Número WhatsApp (52XXXXXXXXXX) |
| `[WHATSAPP_DISPLAY]` | Número formateado (+52 XXX XXX XXXX) |
| `[EMAIL]` | Correo electrónico |
| `[DIRECCION]` | Dirección completa |
| `[DIRECCION_CORTA]` | Dirección resumida |
| `[CIUDAD]` | Ciudad |
| `[URL_SITIO]` | URL del sitio publicado |
| `[GOOGLE_MAPS_EMBED_URL]` | URL de Google Maps embed |
| `[VIDEO_ID]` | ID de video de YouTube |

### Secciones Específicas:

**Servicios:**
- `[SERVICIO_1]`, `[SERVICIO_2]`, `[SERVICIO_3]`
- `[DESCRIPCION_SERVICIO_1]`, etc.
- `[PRECIO_1]`, `[PRECIO_2]`, `[PRECIO_3]`

**Horarios:**
- `[HORARIO_SEMANA]`
- `[HORARIO_SABADO]`
- `[HORARIO_DOMINGO]`
- `[NOTA_HORARIOS]`
- `[HORARIO_SCHEMA]` (formato: Mo-Fr 09:00-18:00)

**Equipo:**
- `[NOMBRE_MIEMBRO_1]`, `[CARGO_MIEMBRO_1]`, `[BIO_CORTA_MIEMBRO_1]`
- Repetir para miembro 2 y 3

**Testimonios:**
- `[TESTIMONIO_1]`, `[NOMBRE_CLIENTE_1]`, `[CARGO_CLIENTE_1]`
- Repetir para testimonio 2 y 3

**Redes Sociales:**
- `[FACEBOOK_URL]`
- `[INSTAGRAM_URL]`
- `[TWITTER_URL]`

---

## 📸 PASO 4: Agregar Imágenes

### Estructura de carpeta de imágenes:

```
assets/images/placeholder/
├── logo.png (200x80px recomendado)
├── favicon.png (32x32px)
├── hero-bg.jpg (1920x1080px)
├── parallax-bg.jpg (1920x1080px)
├── about.jpg (800x600px)
├── service1.jpg (600x400px)
├── service2.jpg (600x400px)
├── service3.jpg (600x400px)
├── featured.jpg (800x600px)
├── gallery1.jpg a gallery6.jpg (800x800px)
├── team1.jpg a team3.jpg (400x500px)
├── client1.jpg a client3.jpg (100x100px círculo)
└── avatar.png (100x100px para chatbot)
```

### Optimización de imágenes:

1. **Tamaño máximo:** 200KB por imagen
2. **Formato:** JPG para fotos, PNG para logos con transparencia
3. **Herramientas recomendadas:**
   - TinyPNG (https://tinypng.com/)
   - Squoosh (https://squoosh.app/)

---

## ⚙️ PASO 5: Configurar Formspree

1. Ve a https://formspree.io/
2. Crea una cuenta gratis
3. Crea un nuevo formulario
4. Copia el ID del formulario (algo como `xyzabc123`)
5. En `index.html` línea 847, reemplaza:

```html
<form class="contact-form" id="contactForm" 
      action="https://formspree.io/f/TU_FORMSPREE_ID" 
      method="POST">
```

---

## 🎬 PASO 6: Agregar Video de YouTube

1. Sube tu video a YouTube
2. Copia el ID del video (la parte después de `v=` en la URL)
3. En `index.html` línea 703, reemplaza `[VIDEO_ID]`

Ejemplo:
- URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
- ID: `dQw4w9WgXcQ`

---

## 🗺️ PASO 7: Configurar Mapa de Google

1. Ve a Google Maps
2. Busca la dirección del negocio
3. Click en "Compartir" → "Insertar un mapa"
4. Copia el enlace que aparece en `src="..."`
5. Reemplaza `[GOOGLE_MAPS_EMBED_URL]` en línea 940

---

## 🔧 PASO 8: Personalizar Chatbot

En `assets/js/chatbot.js`:

### Mensajes del chatbot:
- Línea 93: Mensaje de bienvenida
- Línea 106-112: Opciones del menú principal
- Línea 150-160: Información de servicios
- Línea 165-175: Información de precios
- Línea 185-195: Información de ubicación

---

## 📄 PASO 9: Actualizar Páginas Legales

### privacidad.html
1. Reemplaza todos los placeholders
2. Agrega información específica si aplica

### terminos.html
1. Reemplaza todos los placeholders
2. Ajusta políticas según el negocio

---

## 🚀 PASO 10: Publicar en GitHub Pages

### Primera vez:

```bash
cd base-premium
git init
git add .
git commit -m "Sitio web de [NOMBRE_NEGOCIO]"
git remote add origin https://github.com/TU_USUARIO/nombre-sitio.git
git branch -M main
git push -u origin main
```

### Activar GitHub Pages:

1. Ve a Settings del repositorio
2. Sección "Pages"
3. Source: "Deploy from branch"
4. Branch: main, carpeta: / (root)
5. Save

**Tu sitio estará en:** `https://TU_USUARIO.github.io/nombre-sitio/`

---

## ✅ CHECKLIST FINAL

Antes de entregar al cliente, verifica:

- [ ] Todos los placeholders han sido reemplazados
- [ ] El tema de color es el correcto
- [ ] Todas las imágenes están cargadas y optimizadas
- [ ] El formulario de Formspree funciona
- [ ] El botón de WhatsApp redirige correctamente
- [ ] El mapa de Google Maps se visualiza
- [ ] El video de YouTube carga
- [ ] El chatbot responde correctamente
- [ ] Los enlaces de redes sociales funcionan
- [ ] Probado en móvil, tablet y desktop
- [ ] Velocidad de carga es buena (< 3 segundos)
- [ ] SEO básico configurado

---

## 🎨 PERSONALIZACIÓN AVANZADA (Opcional)

### Cambiar fuentes:

En `index.html` línea 47-48, cambiar URLs de Google Fonts.

### Ajustar colores manualmente:

Editar `assets/css/themes.css` para crear tu propio tema.

### Agregar/quitar secciones:

Simplemente eliminar o duplicar las secciones HTML en `index.html`.

---

## 🆘 TROUBLESHOOTING

### El sitio no se ve bien en móvil
- Verifica que el viewport meta tag esté presente
- Prueba con Chrome DevTools en modo responsive

### Las imágenes no cargan
- Verifica que las rutas sean correctas
- Confirma que las imágenes estén en la carpeta correcta

### El formulario no envía
- Verifica el ID de Formspree
- Confirma que el action del form sea correcto

### El chatbot no funciona
- Abre la consola del navegador (F12)
- Busca errores en JavaScript
- Verifica que todos los archivos JS estén cargados

---

## 📞 SOPORTE

Para soporte o dudas sobre la plantilla:
- Revisa el README.md principal
- Consulta la documentación completa

---

**¡Listo! Tu sitio web premium está completo y listo para impresionar.**
