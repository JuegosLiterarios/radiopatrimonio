/* ============================================
   RADIO PATRIMONIO — Lógica Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVEGACIÓN MÓVIL
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // ==========================================
    // 2. REPRODUCTOR DE RADIO
    // ==========================================
    const btnPlay = document.getElementById('btnPlay');
    const radioStream = document.getElementById('radioStream');
    const nowPlaying = document.getElementById('nowPlaying');
    const waveCanvas = document.getElementById('waveCanvas');
    let isPlaying = false;
    let animationId = null;
    
    // URL del stream (ejemplo - reemplazar con el real)
    const streamUrl = 'https://stream.zeno.fm/radiopatrimonio'; // Placeholder
    
    btnPlay?.addEventListener('click', () => {
        if (isPlaying) {
            pauseRadio();
        } else {
            playRadio();
        }
    });
    
    function playRadio() {
        // En producción: radioStream.src = streamUrl;
        // radioStream.play();
        isPlaying = true;
        btnPlay.classList.add('playing');
        btnPlay.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
        nowPlaying.textContent = '● Reproduciendo en vivo';
        startWaveAnimation();
    }
    
    function pauseRadio() {
        // radioStream.pause();
        isPlaying = false;
        btnPlay.classList.remove('playing');
        btnPlay.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        nowPlaying.textContent = 'Radio Patrimonio';
        stopWaveAnimation();
    }
    
    // Animación de ondas visuales
    function startWaveAnimation() {
        const ctx = waveCanvas.getContext('2d');
        const bars = 50;
        
        function draw() {
            const width = waveCanvas.width = waveCanvas.offsetWidth;
            const height = waveCanvas.height = waveCanvas.offsetHeight;
            const barWidth = width / bars;
            
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(233, 69, 96, 0.6)';
            
            for (let i = 0; i < bars; i++) {
                const barHeight = Math.random() * height * 0.8 + height * 0.1;
                const x = i * barWidth;
                const y = (height - barHeight) / 2;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
            }
            
            animationId = requestAnimationFrame(draw);
        }
        
        draw();
    }
    
    function stopWaveAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        const ctx = waveCanvas.getContext('2d');
        ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    }
    
    // ==========================================
    // 3. PROGRAMACIÓN (Carga desde JSON)
    // ==========================================
    const programGrid = document.getElementById('programGrid');
    const currentProgram = document.getElementById('currentProgram');
    const nowContent = document.getElementById('nowContent');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Datos de programación (en producción se cargaría desde programacion.json)
    const programacionData = {
        lunes: [
            { hora: '07:00', fin: '09:00', nombre: 'Amanecer Cultural', desc: 'Música y noticias del patrimonio' },
            { hora: '09:00', fin: '12:00', nombre: 'Melodías de Ayer', desc: 'Clásicos de la música chilena' },
            { hora: '12:00', fin: '14:00', nombre: 'Patrimonio Gastronómico', desc: 'Recetas y tradiciones culinarias' },
            { hora: '14:00', fin: '16:00', nombre: 'Crónicas de Ciudad', desc: 'Historias urbanas y barriales' },
            { hora: '16:00', fin: '19:00', nombre: 'Archivo Sonoro', desc: 'Documentales y testimonios' },
            { hora: '19:00', fin: '21:00', nombre: 'Jazz Vespertino', desc: 'Jazz chileno e internacional' },
            { hora: '21:00', fin: '23:00', nombre: 'Leyendas Urbanas Sonoras', desc: 'Relatos y mitos del país' },
            { hora: '23:00', fin: '02:00', nombre: 'Insomnio Cultural', desc: 'Música ambiental y reflexión' },
            { hora: '02:00', fin: '07:00', nombre: 'Hasta el Amanecer', desc: 'Música para la madrugada' }
        ],
        martes: [
            { hora: '07:00', fin: '09:00', nombre: 'Amanecer Cultural', desc: 'Música y noticias del patrimonio' },
            { hora: '09:00', fin: '12:00', nombre: 'Raíces del Norte', desc: 'Música de Arica a Atacama' },
            { hora: '12:00', fin: '14:00', nombre: 'Patrimonio Gastronómico', desc: 'Recetas y tradiciones culinarias' },
            { hora: '14:00', fin: '16:00', nombre: 'Oficios en Voz', desc: 'Testimonios de artesanos' },
            { hora: '16:00', fin: '19:00', nombre: 'Archivo Sonoro', desc: 'Documentales y testimonios' },
            { hora: '19:00', fin: '21:00', nombre: 'Jazz Vespertino', desc: 'Jazz chileno e internacional' },
            { hora: '21:00', fin: '23:00', nombre: 'Lenguas Indígenas', desc: 'Mapudungun, Aymara, Rapa Nui' },
            { hora: '23:00', fin: '02:00', nombre: 'Insomnio Cultural', desc: 'Música ambiental y reflexión' },
            { hora: '02:00', fin: '07:00', nombre: 'Hasta el Amanecer', desc: 'Música para la madrugada' }
        ],
        miercoles: [
            { hora: '07:00', fin: '09:00', nombre: 'Amanecer Cultural', desc: 'Música y noticias del patrimonio' },
            { hora: '09:00', fin: '12:00', nombre: 'Melodías de Ayer', desc: 'Clásicos de la música chilena' },
            { hora: '12:00', fin: '14:00', nombre: 'Patrimonio Gastronómico', desc: 'Recetas y tradiciones culinarias' },
            { hora: '14:00', fin: '16:00', nombre: 'Crónicas de Ciudad', desc: 'Historias urbanas y barriales' },
            { hora: '16:00', fin: '19:00', nombre: 'Archivo Sonoro', desc: 'Documentales y testimonios' },
            { hora: '19:00', fin: '21:00', nombre: 'Folclor Nacional', desc: 'Cuecas, tonadas, valses' },
            { hora: '21:00', fin: '23:00', nombre: 'Leyendas Urbanas Sonoras', desc: 'Relatos y mitos del país' },
            { hora: '23:00', fin: '02:00', nombre: 'Insomnio Cultural', desc: 'Música ambiental y reflexión' },
            { hora: '02:00', fin: '07:00', nombre: 'Hasta el Amanecer', desc: 'Música para la madrugada' }
        ],
        jueves: [
            { hora: '07:00', fin: '09:00', nombre: 'Amanecer Cultural', desc: 'Música y noticias del patrimonio' },
            { hora: '09:00', fin: '12:00', nombre: 'Melodías del Sur', desc: 'Música de la Patagonia' },
            { hora: '12:00', fin: '14:00', nombre: 'Patrimonio Gastronómico', desc: 'Recetas y tradiciones culinarias' },
            { hora: '14:00', fin: '16:00', nombre: 'Memoria Viva', desc: 'Testimonios históricos' },
            { hora: '16:00', fin: '19:00', nombre: 'Archivo Sonoro', desc: 'Documentales y testimonios' },
            { hora: '19:00', fin: '21:00', nombre: 'Jazz Vespertino', desc: 'Jazz chileno e internacional' },
            { hora: '21:00', fin: '23:00', nombre: 'Leyendas Urbanas Sonoras', desc: 'Relatos y mitos del país' },
            { hora: '23:00', fin: '02:00', nombre: 'Insomnio Cultural', desc: 'Música ambiental y reflexión' },
            { hora: '02:00', fin: '07:00', nombre: 'Hasta el Amanecer', desc: 'Música para la madrugada' }
        ],
        viernes: [
            { hora: '07:00', fin: '09:00', nombre: 'Amanecer Cultural', desc: 'Música y noticias del patrimonio' },
            { hora: '09:00', fin: '12:00', nombre: 'Melodías de Ayer', desc: 'Clásicos de la música chilena' },
            { hora: '12:00', fin: '14:00', nombre: 'Patrimonio Gastronómico', desc: 'Recetas y tradiciones culinarias' },
            { hora: '14:00', fin: '16:00', nombre: 'Crónicas de Ciudad', desc: 'Historias urbanas y barriales' },
            { hora: '16:00', fin: '19:00', nombre: 'Archivo Sonoro', desc: 'Documentales y testimonios' },
            { hora: '19:00', fin: '21:00', nombre: 'Jazz Vespertino', desc: 'Jazz chileno e internacional' },
            { hora: '21:00', fin: '23:00', nombre: 'Leyendas Urbanas Sonoras', desc: 'Relatos y mitos del país' },
            { hora: '23:00', fin: '02:00', nombre: 'Insomnio Cultural', desc: 'Música ambiental y reflexión' },
            { hora: '02:00', fin: '07:00', nombre: 'Hasta el Amanecer', desc: 'Música para la madrugada' }
        ],
        sabado: [
            { hora: '07:00', fin: '10:00', nombre: 'Sábado Patrimonial', desc: 'Especiales de fin de semana' },
            { hora: '10:00', fin: '13:00', nombre: 'Feria de Pulgas Sonora', desc: 'Música de ferias y mercados' },
            { hora: '13:00', fin: '15:00', nombre: 'Almuerzo Familiar', desc: 'Música para compartir' },
            { hora: '15:00', fin: '18:00', nombre: 'Rutas Patrimoniales', desc: 'Recorridos sonoros por Chile' },
            { hora: '18:00', fin: '20:00', nombre: 'Conciertos en Vivo', desc: 'Grabaciones de presentaciones' },
            { hora: '20:00', fin: '23:00', nombre: 'Noche de Gala', desc: 'Música clásica y docta' },
            { hora: '23:00', fin: '03:00', nombre: 'Madrugada Cultural', desc: 'Música para la noche larga' }
        ],
        domingo: [
            { hora: '07:00', fin: '10:00', nombre: 'Domingo de Resurrección', desc: 'Música sacra y tradicional' },
            { hora: '10:00', fin: '13:00', nombre: 'Café con Cueca', desc: 'Folclor de todo el país' },
            { hora: '13:00', fin: '15:00', nombre: 'Almuerzo Familiar', desc: 'Música para compartir' },
            { hora: '15:00', fin: '18:00', nombre: 'Cuentos y Leyendas', desc: 'Narración oral para toda la familia' },
            { hora: '18:00', fin: '20:00', nombre: 'Atardecer Patrimonial', desc: 'Música para cerrar la semana' },
            { hora: '20:00', fin: '23:00', nombre: 'Cine en la Radio', desc: 'Bandas sonoras chilenas' },
            { hora: '23:00', fin: '03:00', nombre: 'Madrugada Cultural', desc: 'Música para la noche larga' }
        ]
    };
    
    // Función para obtener día actual en español
    function getDiaActual() {
        const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        return dias[new Date().getDay()];
    }
    
    // Renderizar programación
    function renderProgramacion(dia) {
        const data = programacionData[dia] || programacionData.lunes;
        const ahora = new Date();
        const horaActual = ahora.getHours() * 60 + ahora.getMinutes();
        
        programGrid.innerHTML = data.map((prog, index) => {
            const [h, m] = prog.hora.split(':').map(Number);
            const [fh, fm] = prog.fin.split(':').map(Number);
            const inicioMin = h * 60 + m;
            const finMin = fh * 60 + fm;
            
            let status = 'upcoming';
            let statusText = 'Próximo';
            
            if (horaActual >= inicioMin && (finMin > inicioMin ? horaActual < finMin : true)) {
                status = 'live';
                statusText = 'EN VIVO';
            } else if (horaActual > finMin && finMin > inicioMin) {
                status = 'past';
                statusText = 'Finalizado';
            }
            
            // Solo mostrar "EN VIVO" o "Próximo"
            const showStatus = status === 'live' ? 'live' : (status === 'upcoming' ? 'upcoming' : '');
            const showText = status === 'live' ? 'EN VIVO' : (status === 'upcoming' ? 'Próximo' : '');
            
            return `
                <div class="program-item" data-status="${status}">
                    <div class="program-time">${prog.hora}</div>
                    <div>
                        <div class="program-name">${prog.nombre}</div>
                        <div class="program-desc">${prog.desc}</div>
                    </div>
                    ${showStatus ? `<div class="program-status ${showStatus}">${showText}</div>` : ''}
                </div>
            `;
        }).join('');
        
        // Actualizar "Ahora en vivo"
        const programaActual = data.find(prog => {
            const [h, m] = prog.hora.split(':').map(Number);
            const [fh, fm] = prog.fin.split(':').map(Number);
            const inicioMin = h * 60 + m;
            const finMin = fh * 60 + fm;
            return horaActual >= inicioMin && (finMin > inicioMin ? horaActual < finMin : true);
        });
        
        if (programaActual) {
            currentProgram.textContent = `${programaActual.nombre} — ${programaActual.hora} a ${programaActual.fin}`;
            nowContent.innerHTML = `
                <h4>${programaActual.nombre}</h4>
                <p>${programaActual.desc}</p>
            `;
        } else {
            currentProgram.textContent = 'Programación nocturna';
            nowContent.innerHTML = `
                <h4>Hasta el Amanecer</h4>
                <p>Música para la madrugada</p>
            `;
        }
    }
    
    // Tabs de días
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProgramacion(btn.dataset.day);
        });
    });
    
    // Inicializar con día actual
    const diaHoy = getDiaActual();
    tabBtns.forEach(btn => {
        if (btn.dataset.day === diaHoy) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderProgramacion(diaHoy);
    
    // Actualizar cada minuto
    setInterval(() => renderProgramacion(diaHoy), 60000);
    
    // ==========================================
    // 4. FILTROS DEL ARCHIVO SONORO
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const archivoCards = document.querySelectorAll('.archivo-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            archivoCards.forEach(card => {
                if (filter === 'todos' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // ==========================================
    // 5. CARRUSEL DE PATRIMONIO
    // ==========================================
    const carousel = document.querySelector('.patrimonio-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let carouselPosition = 0;
    
    function updateCarousel() {
        const cardWidth = 280 + 24; // ancho + gap
        const maxPosition = -(carousel.children.length - 3) * cardWidth;
        carouselPosition = Math.max(maxPosition, Math.min(0, carouselPosition));
        carousel.style.transform = `translateX(${carouselPosition}px)`;
    }
    
    prevBtn?.addEventListener('click', () => {
        carouselPosition += 304;
        updateCarousel();
    });
    
    nextBtn?.addEventListener('click', () => {
        carouselPosition -= 304;
        updateCarousel();
    });
    
    // ==========================================
    // 6. MAPA SONORO INTERACTIVO
    // ==========================================
    const mapPoints = document.querySelectorAll('.map-point');
    const mapaTooltip = document.getElementById('mapaTooltip');
    const mapaInfo = document.getElementById('mapaInfo');
    
    const regionData = {
        arica: {
            title: 'Arica y Parinacota',
            sounds: [
                { name: 'Música Aymara', duration: '12:30' },
                { name: 'Carnaval de Putre', duration: '08:45' },
                { name: 'Viento del Altiplano', duration: '05:20' }
            ]
        },
        antofagasta: {
            title: 'Antofagasta',
            sounds: [
                { name: 'Salitreras de Humberstone', duration: '24:15' },
                { name: 'Tocopilla, puerto minero', duration: '15:40' },
                { name: 'Desierto florido', duration: '10:00' }
            ]
        },
        atacama: {
            title: 'Atacama',
            sounds: [
                { name: 'Observatorio ALMA', duration: '18:20' },
                { name: 'Valle de la Luna', duration: '14:10' },
                { name: 'Festival de la Cosecha', duration: '22:00' }
            ]
        },
        coquimbo: {
            title: 'Coquimbo',
            sounds: [
                { name: 'Diablada de La Tirana', duration: '30:00' },
                { name: 'Mamalluca, estrellas', duration: '11:45' },
                { name: 'Pisco Elqui', duration: '16:30' }
            ]
        },
        valparaiso: {
            title: 'Valparaíso',
            sounds: [
                { name: 'Ascensores porteños', duration: '09:15' },
                { name: 'Música de los 60', duration: '25:00' },
                { name: 'Puerto en la noche', duration: '13:50' }
            ]
        },
        maule: {
            title: 'Maule',
            sounds: [
                { name: 'Cuecas del Maule', duration: '18:42' },
                { name: 'Villa Cultural Huilquilemu', duration: '20:10' },
                { name: 'Vino del Valle', duration: '15:00' }
            ]
        },
        biobio: {
            title: 'Biobío',
            sounds: [
                { name: 'Puerto de Talcahuano', duration: '14:30' },
                { name: 'Música de la Concepción', duration: '21:00' },
                { name: 'Lota, memoria del carbón', duration: '28:15' }
            ]
        },
        araucania: {
            title: 'La Araucanía',
            sounds: [
                { name: 'Mapuzugun: Voces', duration: '45:30' },
                { name: 'Nguillatún', duration: '33:20' },
                { name: 'Bosque nativo', duration: '19:45' }
            ]
        },
        aysen: {
            title: 'Aysén',
            sounds: [
                { name: 'Carretera Austral', duration: '27:00' },
                { name: 'Caleta Tortel', duration: '16:40' },
                { name: 'Ventisquero San Rafael', duration: '12:10' }
            ]
        },
        magallanes: {
            title: 'Magallanes',
            sounds: [
                { name: 'Vientos de la Patagonia', duration: '22:30' },
                { name: 'Pingüinos de Magdalena', duration: '08:50' },
                { name: 'Puerto Natales', duration: '17:15' }
            ]
        }
    };
    
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', (e) => {
            const region = point.dataset.region;
            const title = point.dataset.title;
            
            mapaTooltip.textContent = title;
            mapaTooltip.classList.add('visible');
            
            // Posicionar tooltip
            const rect = point.getBoundingClientRect();
            const containerRect = point.closest('.mapa-visual').getBoundingClientRect();
            mapaTooltip.style.left = `${rect.left - containerRect.left + 10}px`;
            mapaTooltip.style.top = `${rect.top - containerRect.top - 30}px`;
        });
        
        point.addEventListener('mouseleave', () => {
            mapaTooltip.classList.remove('visible');
        });
        
        point.addEventListener('click', () => {
            const region = point.dataset.region;
            const data = regionData[region];
            
            if (data) {
                mapaInfo.innerHTML = `
                    <div class="region-info">
                        <h3>${data.title}</h3>
                        <p>Sonidos y grabaciones de esta región:</p>
                        <ul class="region-sounds">
                            ${data.sounds.map(sound => `
                                <li>
                                    <span class="play-icon">▶</span>
                                    <div>
                                        <strong>${sound.name}</strong>
                                        <span style="color: var(--color-text-muted); font-size: 0.85rem; display: block;">${sound.duration}</span>
                                    </div>
                                </