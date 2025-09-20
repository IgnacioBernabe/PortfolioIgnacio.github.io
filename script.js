const lenis = new Lenis({
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}


function openMail() {
    window.open('https://mail.google.com/mail/?view=cm&to=ignbrnb@gmail.com', '_blank', 'noopener');
}


requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.lagSmoothing(0);

function updateBodyColorVariable(color) {
    document.documentElement.style.setProperty('--body-bg-color', color);
}

// **NUEVA FUNCIÓN - Animación de entrada para project containers**
function initProjectContainerAnimations() {
    // Asegurar que ScrollTrigger esté listo
    ScrollTrigger.refresh();
    // Seleccionar todos los project-container y project-card
    const containers = document.querySelectorAll('.two-columns-container .project-container');
    const newProjects = document.querySelectorAll('.two-new-projects .project-card');

    // Animar containers de las dos columnas
    containers.forEach((container, index) => {
        gsap.fromTo(container, {
            opacity: 0,
            y: 60,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.15,
            scrollTrigger: {
                trigger: container,
                start: "top 90%",
                end: "top 60%",
                toggleActions: "play none none none",
                markers: false, // Cambia a true para ver los markers de debug
                onEnter: () => {
                    console.log('Animating container:', index);
                }
            }
        });
    });

    // Animar nuevos proyectos
    newProjects.forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.15,
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                toggleActions: "play none none none",
                markers: false, // Cambia a true para ver los markers de debug
                onEnter: () => {
                    console.log('Animating new project:', index);
                }
            }
        });
    });
}

// Resto de tus funciones existentes...
function updateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Madrid',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('location-time').textContent = `Valencia, España - ${timeString}`;
}

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const navbarLogo = document.getElementById('navbar-logo');
const navbarButton = document.getElementById('navbar-button');
const nombreSvg = document.getElementById('nombre-svg');
const notification = document.getElementById('notification');
let currentBackgroundColor = '#5ea85e';

ScrollTrigger.create({
    trigger: '.animated-text',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
    onUpdate: (self) => {
        let opacity, yPos, scale;
        if (self.progress < 0.5) {
            const progress = self.progress * 2;
            opacity = gsap.utils.interpolate(0, 1, progress);
            yPos = gsap.utils.interpolate(80, 0, progress);
            scale = gsap.utils.interpolate(0.8, 1, progress);
        } else {
            const progress = (self.progress - 0.5) * 2;
            opacity = gsap.utils.interpolate(1, 0, progress);
            yPos = gsap.utils.interpolate(0, -80, progress);
            scale = gsap.utils.interpolate(1, 0.8, progress);
        }

        gsap.fromTo('.animated-text', {
        opacity: 0,
        y: 60,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 1.5,
        scrollTrigger: {
            trigger: '.animated-text',
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
            scrub: 1.2 // Scrub suave para seguimiento del scroll
        }
    });
    }
});






function initOptimizedScrolling() {
    gsap.utils.toArray('.scrolling-text-container').forEach(container => {
        const textElement = container.querySelector('.scrolling-text');
        const textContent = textElement.textContent;

        gsap.killTweensOf(textElement);
        textElement.textContent = textContent + ' ' + textContent;

        gsap.set(container, { width: '100%', overflow: 'hidden' });
        gsap.set(textElement, { x: 0, display: 'inline-block' });

        const totalWidth = textElement.offsetWidth / 2;
        const speed = 80;
        const duration = totalWidth / speed;

        gsap.to(textElement, {
            x: -totalWidth,
            duration: duration,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => {
                    x = parseFloat(x) % totalWidth;
                    return x > 0 ? x - totalWidth : x;
                })
            }
        });
    });
}

function initParallaxImages() {
    gsap.utils.toArray('.parallax-image').forEach(img => {
        gsap.fromTo(img, {
            yPercent: -5
        }, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
                trigger: img.closest('.image-wrapper'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
                invalidateOnRefresh: true
            }
        });
    });

    // Parallax para services-image-placeholder img: poco movimiento (siempre visible)
gsap.utils.toArray('.services-image-placeholder img').forEach(img => {
    gsap.fromTo(
        img,
        { yPercent: -3 }, // muy suave, nunca sale del placeholder
        {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
                trigger: img.closest('.services-image-placeholder'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
                invalidateOnRefresh: true
            }
        }
    );
});


}

// **ACTUALIZAR LA INICIALIZACIÓN**
window.addEventListener('load', () => {
    setTimeout(() => {
        initOptimizedScrolling();
        initAnimatedText(); // ← AÑADIR ESTA LÍNEA PRIMERA
        initParallaxImages();
        initProjectContainerAnimations();
        initServicesAnimations();
        initSkillsAnimations();
        initProjectOverlay();
        initResponsiveNotification(); // ← AÑADIR ESTA LÍNEA
        updateNavbarColors();
        updateFooterTime();
        initNotificationScroll();
        console.log('All animations initialized');
    }, 200);
});

window.addEventListener('resize', () => {
    setTimeout(() => {
        initOptimizedScrolling();
        initParallaxImages();
        updateNavbarColors();
        ScrollTrigger.refresh();
    }, 100);
});

// Resto de tus funciones (checkLogoOverText, etc.)...
function checkLogoOverText() {
    const logoRect = navbarLogo.getBoundingClientRect();
    const logoCenterX = logoRect.left + logoRect.width / 2;
    const logoCenterY = logoRect.top + logoRect.height / 2;

    navbar.style.pointerEvents = 'none';
    const elementBelow = document.elementFromPoint(logoCenterX, logoCenterY);
    navbar.style.pointerEvents = 'auto';

    return checkElementForText(elementBelow);
}

function checkButtonOverText() {
    const buttonRect = navbarButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    navbar.style.pointerEvents = 'none';
    const elementBelow = document.elementFromPoint(buttonCenterX, buttonCenterY);
    navbar.style.pointerEvents = 'auto';

    return checkElementForText(elementBelow);
}

function checkElementForText(elementBelow) {
    if (!elementBelow) return false;

    const hasText = elementBelow.textContent && elementBelow.textContent.trim().length > 0;
    const isTextElement = elementBelow.tagName && ['H1', 'H2', 'H3', 'P', 'SPAN', 'DIV', 'A'].includes(elementBelow.tagName);

    let parentElement = elementBelow.parentElement;
    let parentHasText = false;

    while (parentElement && parentElement !== document.body) {
        if (parentElement.textContent && parentElement.textContent.trim().length > 0) {
            parentHasText = true;
            break;
        }
        parentElement = parentElement.parentElement;
    }

    return (hasText && isTextElement) || parentHasText;
}

function updateNavbarColors() {
    const logoOverText = checkLogoOverText();
    const buttonOverText = checkButtonOverText();

    navbarLogo.classList.remove('green-filter', 'black-filter');
    if (logoOverText) {
        if (currentBackgroundColor === '#5ea85e') {
            navbarLogo.classList.add('black-filter');
        } else {
            navbarLogo.classList.add('green-filter');
        }
    }

    navbarButton.classList.remove('green-bg');
    if (buttonOverText) {
        if (currentBackgroundColor !== '#5ea85e') {
            navbarButton.classList.add('green-bg');
        }
    }
}

// Hacer lenis global para poder acceder desde cualquier función
// Hacer lenis global
window.lenis = lenis;

// Configurar scroll listener inicial directamente
lenis.on('scroll', (e) => {
  const scrollTop = e.scroll;
  if (scrollTop <= 50) {
    notification.classList.remove('hidden');
  } else {
    notification.classList.add('hidden');
  }

  if (scrollTop > lastScrollTop && scrollTop > 200) {
    navbar.classList.add('hidden');
  } else if (scrollTop < lastScrollTop) {
    navbar.classList.remove('hidden');
  }

  lastScrollTop = scrollTop;
  if (!navbar.classList.contains('hidden')) {
    updateNavbarColors();
  }
});


updateTime();
setInterval(updateTime, 1000);

ScrollTrigger.create({
    trigger: '.section-two',
    start: "top 50%",
    end: "bottom 0%",
    onEnter: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#ffffeb',
            ease: "power2.out"
        });
        nombreSvg.classList.add('green-filter');
        currentBackgroundColor = '#ffffeb';
        updateNavbarColors();
    },
    onLeaveBack: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#5ea85e',
            ease: "power2.out"
        });
        nombreSvg.classList.remove('green-filter');
        currentBackgroundColor = '#5ea85e';
        updateNavbarColors();
    }
});

// Animación de cambio de color para section-three
ScrollTrigger.create({
    trigger: '.section-three',
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#ffffeb', // Cambiado a color crema
            ease: "power2.out"
        });
        nombreSvg.classList.add('green-filter');
        currentBackgroundColor = '#ffffeb';
        updateNavbarColors();
    },
    onEnterBack: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#ffffeb', // Cambiado a color crema
            ease: "power2.out"
        });
        nombreSvg.classList.add('green-filter');
        currentBackgroundColor = '#ffffeb';
        updateNavbarColors();
    },
    onLeaveBack: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#ffffeb', // Mantiene el mismo color que section-two
            ease: "power2.out"
        });
        nombreSvg.classList.add('green-filter');
        currentBackgroundColor = '#ffffeb';
        updateNavbarColors();
    }
});

// Animación de cambio de color para section-four
ScrollTrigger.create({
    trigger: '.section-four',
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#5ea85e',
            ease: "power2.out"
        });
        updateBodyColorVariable('#5ea85e'); // ← AGREGAR
        nombreSvg.classList.remove('green-filter');
        currentBackgroundColor = '#5ea85e';
        updateNavbarColors();
    },
    onEnterBack: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#5ea85e',
            ease: "power2.out"
        });
        updateBodyColorVariable('#5ea85e'); // ← AGREGAR
        nombreSvg.classList.remove('green-filter');
        currentBackgroundColor = '#5ea85e';
        updateNavbarColors();
    },
    onLeaveBack: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#ffffeb',
            ease: "power2.out"
        });
        updateBodyColorVariable('#ffffeb'); // ← AGREGAR
        nombreSvg.classList.add('green-filter');
        currentBackgroundColor = '#ffffeb';
        updateNavbarColors();
    },
    onLeave: () => {
        gsap.to('body', {
            duration: .4,
            backgroundColor: '#5ea85e',
            ease: "power2.out"
        });
        updateBodyColorVariable('#5ea85e'); // ← AGREGAR
        currentBackgroundColor = '#5ea85e';
        updateNavbarColors();
    }
});

function initProjectContainerAnimations() {
    ScrollTrigger.refresh();

    // Animación para el título "Trabajos Recientes"
    const recentJobsTitle = document.querySelector('.recent-jobs h2');
    if (recentJobsTitle) {
        gsap.fromTo(recentJobsTitle, {
            opacity: 0,
            y: 30,
            scale: 0.98
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: recentJobsTitle,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    }

    const containers = document.querySelectorAll('.two-columns-container .project-container');
    const newProjects = document.querySelectorAll('.two-new-projects .project-card');

    // Animar containers con un delay ligeramente mayor para que aparezcan después del título
    containers.forEach((container, index) => {
        gsap.fromTo(container, {
            opacity: 0,
            y: 20,
            scale: 0.99
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.2 + (index * 0.08), // Añadido delay base de 0.2s
            scrollTrigger: {
                trigger: container,
                start: "top 98%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animar nuevos proyectos
    newProjects.forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 20,
            scale: 0.99
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.08,
            scrollTrigger: {
                trigger: card,
                start: "top 98%",
                toggleActions: "play none none none"
            }
        });
    });
}

// *** FUNCIÓN SERVICES SIN ANIMACIONES ***
// La sección de servicios ahora aparece estática, sin animaciones
function initServicesAnimations() {
    // Función vacía - no hay animaciones para services
    // Tanto el services-outer-wrapper como las services-brand-section
    // aparecerán sin animaciones de entrada
}

// ===== SKILLS GRID: Hover Effects + Animaciones =====
function initSkillsAnimations() {
    const skillsGrid = document.querySelector(".skills-container");
    const skillsItems = document.querySelectorAll(".skills-grid-item");
    const skillsOverlay = document.getElementById("skillsHoverOverlay");

    if (skillsGrid && skillsItems.length && skillsOverlay) {
        const gradients = [
            "linear-gradient(45deg, #BAE99A, #BAE99A)",
            "linear-gradient(45deg, #F3FFBA, #F3FFBA)",
            "linear-gradient(45deg, #5EA85E, #5EA85E)",
            "linear-gradient(45deg, #9BDE8A, #9BDE8A)",
            "linear-gradient(45deg, #719a6cff, #8BD982)",
            "linear-gradient(45deg, #E6F8B2, #E6F8B2)",
            "linear-gradient(45deg, #AAE492, #AAE492)",
            "linear-gradient(45deg, #D8F3AA, #D8F3AA)",
            "linear-gradient(45deg, #7CD47A, #7CD47A)",
            "linear-gradient(45deg, #C9EEA2, #C9EEA2)"
            
        ];

        let currentActiveIndex = 0; // El primer elemento estará activo por defecto

        // Función para activar un item
        function activateItem(index) {
            const item = skillsItems[index];
            const label = item.querySelector(".skills-item-label");
            
            const itemRect = item.getBoundingClientRect();
            const containerRect = skillsGrid.getBoundingClientRect();
            const x = itemRect.left - containerRect.left;
            const y = itemRect.top - containerRect.top;
            const width = itemRect.width;
            const height = itemRect.height;

            // Animar overlay
            gsap.to(skillsOverlay, {
                x,
                y,
                width,
                height,
                background: gradients[index % gradients.length],
                opacity: 1,
                duration: 0.4,
                ease: "power3.out"
            });

            // Cambiar color del label
            if (label) {
                label.style.color = "#000";
            }
        }

        // Activar el primer elemento al cargar
        setTimeout(() => {
            activateItem(currentActiveIndex);
        }, 500);

        skillsItems.forEach((item, index) => {
            const svg = item.querySelector("svg");
            const label = item.querySelector(".skills-item-label");

            if (!svg || !label) return;

            // Hover: activar item
            item.addEventListener("mouseenter", () => {
                currentActiveIndex = index;
                activateItem(index);
            });

            // Efecto magnético en SVG
            item.addEventListener("mousemove", (e) => {
                const rect = item.getBoundingClientRect();
                const offsetX = (e.clientX - rect.left - rect.width / 2) / 6;
                const offsetY = (e.clientY - rect.top - rect.height / 2) / 6;

                gsap.to(svg, { x: offsetX, y: offsetY, duration: 0.3, ease: "power2.out" });
            });

            // Al salir: restaurar el SVG pero mantener el overlay activo
            item.addEventListener("mouseleave", () => {
                gsap.to(svg, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
                // NO ocultar el overlay ni cambiar el color del label
                // El overlay y color se mantienen hasta que se haga hover en otro elemento
            });
        });
    }

    // Animaciones de entrada para la sección skills
    ScrollTrigger.refresh();
    const skillsSection1 = document.querySelector('.skills-section-1');

    if (skillsSection1) {
        const skillsLeftImg = skillsSection1.querySelector('.skills-left-column img');
        const skillsTopText = skillsSection1.querySelector('.skills-top-text');
        const skillsBottomText = skillsSection1.querySelector('.skills-bottom-text');
        const skillsBottomImg = skillsSection1.querySelector('.skills-bottom-image');

        gsap.fromTo([skillsLeftImg, skillsTopText, skillsBottomText, skillsBottomImg], {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: skillsSection1,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }

    
}


// Función para actualizar la hora del footer
function updateFooterTime() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Madrid',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    
    const footerTimeElement = document.getElementById('location-time-footer');
    if (footerTimeElement) {
        footerTimeElement.textContent = `Based in Valencia, Spain - ${timeString}`;
    }
}




// ================== PROJECT OVERLAY FUNCTIONALITY ==================


function initProjectOverlay() {
    const projectCards = document.querySelectorAll('.project-card');
    const overlay = document.getElementById('projectOverlay');
    const closeBtn = document.getElementById('projectCloseBtn');
    const projectContent = document.getElementById('projectContent');
    let overlayLenis = null; // Variable para Lenis del overlay

    // Datos de los proyectos
   // Datos de los proyectos - EXPANDIR ESTE OBJETO
const projectsData = {
    'guito': {
        headerImage: 'image/Group 121.png',
        title: 'Güito: una historia familiar convertida en una campaña de crowdfunding de éxito viral',
        description: 'Con una estrategia digital sólida, una identidad visual coherente y contenido cercano para redes, logramos superar la meta de financiación en un 255%.',
        services: ['Copywriting', 'Estrategia', 'Dirección de arte', 'Diseño Web', 'Newsletters', 'Branding', 'Diseño de Packaging', 'Creación de Contenido', 'Storytelling', 'Diseño de personajes', 'Fotografía de producto'],
        columnText: 'Güito es una vela artesanal y de diseño que reinterpreta las aceitunas, ese aperitivo tan típico, en un objeto decorativo único y duradero.',
        columnTitle: 'Definiendo la estética de Güito y su estrategia de lanzamiento',
        challenge: 'Sin un prototipo físico y con un proceso de compra complejo, la producción de la vela dependía de que se alcanzara el objetivo de financiación de la campaña.',
        logo:   'image/guito/logo.png',
        portada: 'image/guito/scene1.gif',
        image1: 'image/guito/rojotarro.webp', 
        image2: 'image/guito/portada.webp',
        image3: 'image/guito/dobletarro.webp',
        image4: 'image/guito/meta.webp',
        image5: 'image/guito/fotostorie1.webp',
        image6: 'image/guito/fotostorie2.webp',
        image7: 'image/guito/fotostorie3.webp',
        image8: 'image/guito/print.gif',
        image9: 'image/guito/cajasfin.webp',
        approach: [
            {
                title: 'Storytelling emocional',
                description: 'Usando la historia familiar como eje de la campaña de crowdfunding y extendiéndola a redes sociales, se alcanzó la viralidad orgánica.'
            },
            {
                title: 'Visuales 3D del producto',
                description: 'Creando renders para mostrar proporciones y acabados, se proyectó la vela como un objeto deseable y cuidadosamente diseñado.'
            },
            {
                title: 'Estrategia visual escalable',
                description: 'Diseñando piezas reutilizables se abre camino a futuras ediciones o producto si el proyecto crece.'
            }
        ]
    },

    // ===== PROYECTO 2 =====
    'ecommerce-brand': {
        headerImage: 'image/Group 121.png',
        title: '1Click Agency: llevando pymes de offline a digital con landings que convierten.',
        description: 'Cómo la traducción de las necesidades de cada pyme en sitios web WordPress alineados con su branding y potenciados con copy SEO, impulsó su presencia digital y facilitó la generación de resultados medibles.',
        services: ['Branding', 'Diseño', 'Desarollo', 'Implementacion de APIS', 'Accesibilidad', 'Estructura SEO', 'KitDigital', 'Creación de Contenidos Multimedia', 'Análisis y Métricas Web', 'Localización y Multilingüismo'],
        columnText: '1Click Agency es una agencia de marketing digital que ayuda a pymes a crecer online con soluciones a medida que combinan sitios web estratégicos, campañas de ads inteligentes y contenido para redes que conecta',
        columnTitle: 'Desarrollando soluciones digitales efectivas para pymes desde 1Click.',
        challenge: 'Con negocios que partían de cero en el terreno digital y en ocasiones hasta sin un branding definido había que convertir una web simple en la mejor extensión estratégica de negocio posible, gestionando múltiples proyectos simultáneamente.',
        logo:   'image/proyecto/1logo.webp',
        portada: 'image/proyecto/gifpaginas2.gif',
        image1: 'image/proyecto/ultima.webp', 
        image2: 'image/proyecto/abogado.webp',
        image3: 'image/proyecto/caceres.webp',
        image4: 'image/proyecto/arquitectura.gif',
        image5: 'image/proyecto/repaslide.webp',
        image6: 'image/proyecto/arqslide.webp',
        image7: 'image/proyecto/civeraslide.webp',
        image8: 'image/proyecto/baile.gif',
        image9: 'image/proyecto/todas.webp',
        approach: [
            {
                title: 'Arquitectura de contenido',
                description: 'Definiendo páginas pilar y clusters de contenido para organizar la información de manera lógica y optimizada para SEO, facilitando la navegación y la conversión.'
            },
            {
                title: 'Accesibilidad web',
                description: 'Cumpliendo los criterios del Kit Digital y garantizando que cualquier usuario pueda navegar y utilizar la web con facilidad.'
            },
            {
                title: 'Arquitectura de contenido',
                description: 'Creando landings estratégicas enfocadas en generación de llamadas, solicitudes de presupuesto o citas, combinando estética y usabilidad para maximizar resultados.'
            }
        ]
    },

    // ===== PROYECTO 3 =====
    'startup-dashboard': {
        headerImage: 'image/Group 121.png',
        title: 'Puestal: probando la viabilidad de una micro-tienda de souvenirs automatizada',
        description: 'Cómo la definición de una identidad de marca, desde el storytelling hasta el diseño de producto, para crear una experiencia de compra memorable contribuyó significativamente en la validación satisfactoria del modelo de negocio de Puestal.',
        services: ['Branding', 'Diseño de Producto', 'Ilustración', 'Diseño de mascota', 'Campaña Ads', 'Storytelling', 'Storytelling', 'Diseño Web','Gestión de redes sociales'],
        columnText: 'Puestal es una marca de souvenirs exclusivos, disponibles 24/7 a través de máquinas de vending en hoteles, campings y hostales seleccionados.',
        columnTitle: 'Materializando el concepto de Puestal para su prueba piloto.',
        challenge: 'Aunque la marca ofrecía souvenirs, el modelo de venta en máquinas de vending era nuevo y tanto viajeros como alojamientos necesitaban conocer y ver el valor del servicio.',
        logo:   'image/puestal/perfil.jpg',
        portada: 'image/puestal/resumenpuestal.gif',
        image1: 'image/puestal/largapuestal.webp', 
        image2: 'image/puestal/PuestalFondo1.webp',
        image3: 'image/puestal/iphonemock2.webp',
        image4: 'image/puestal/productpage.gif',
        image5: 'image/puestal/PuestalFondo2.webp',
        image6: 'image/puestal/maquina.webp',
        image7: 'image/puestal/trastero.webp',
        image8: 'image/puestal/colors.gif',
        image9: 'image/puestal/fotofinisgpues.webp',
        approach: [
            {
                title: 'Investigación centrada en el usuario',
                description: 'Benchmarking, focus groups y encuestas permitieron conocer a fondo a los compradores y entender cómo buscan regalos únicos y personalizados.'
            },
            {
                title: 'Diseño de la experiencia adaptada a compradores y comercios',
                description: 'Mapeando el customer journey y desarrollando wireframes y prototipos de alta fidelidad para que la búsqueda y elección de regalos sea intuitiva, rápida y agradable.'
            },
            {
                title: 'Construcción de marca cercana',
                description: 'Naming, branding y visuales transmiten creatividad, confianza y cercanía, reflejando la personalidad de los comercios locales y haciendo que la experiencia digital se sienta humana y cálida.'
            }
        ]
    },

    // ===== PROYECTO 4 =====
    'brand-identity': {
        headerImage: 'image/Group 121.png',
        title: 'Identidad de Marca: De concepto abstracto a presencia visual impactante',
        description: 'Desarrollo integral de identidad visual para startup tech que logró reconocimiento de marca del 60% en su sector en solo 8 meses.',
        services: ['Estrategia de Marca', 'Diseño de Logo', 'Manual de Marca', 'Diseño Editorial', 'Packaging', 'Diseño Web', 'Social Media Assets'],
        columnText: 'Una identidad que comunica innovación y confianza, diseñada para escalar desde startup hasta líder del mercado.',
        columnTitle: 'Construyendo una marca que trasciende tendencias',
        challenge: 'Startup con producto innovador pero sin identidad visual definida. Competían en un mercado saturado sin diferenciación clara.',
        title: 'Retelier: una plataforma doblemente premiada por su',
        description: 'Cómo la definición de una identidad de marca, desde el storytelling hasta el diseño de producto, para crear una experiencia de compra memorable contribuyó significativamente en la validación satisfactoria del modelo de negocio de Puestal.',
        services: ['Wireframes', 'Naming', 'Branding', 'Diseño Web', 'UX/UI', 'Prototipo de alta fidelidad', 'Benchmarking', 'Estrategia'],
        columnText: 'Retelier es una plataforma digital donde los negocios locales actúan como personal shoppers, recomendando el regalo perfecto para cada ocasión de forma personalizada.',
        columnTitle: 'Redefiniendo el proceso de compra de regalos con Retelier',
        challenge: 'Encontrar un regalo único suele ser frustrante: búsquedas largas, poca inspiración y opciones repetitivas. Había que simplificar ese proceso con propuestas creativas y personalizadas, usando la calidez del comercio local en un entorno digital.',
        logo:   'image/retelier/retelierlogo.webp',
        portada: 'image/retelier/propuestas2.png',
        image1: 'image/retelier/Retelierprimera.webp', 
        image2: 'image/retelier/coloresretelier.png',
        image3: 'image/retelier/responsive.webp',
        image4: 'image/retelier/UserFlow.webp',
        image5: 'image/retelier/PremioAd.webp',
        image6: 'image/retelier/fotopremios.webp',
        image7: 'image/retelier/premiogeneralitat.webp',
        image8: 'image/retelier/selecciongustos.webp',
        image9: 'image/retelier/cajaretisometric.webp',
        approach: [
            {
                title: 'Arquetipos de marca',
                description: 'Definición de personalidad de marca basada en valores core y conexión emocional con el público objetivo.'
            },
            {
                title: 'Sistema visual escalable',
                description: 'Creación de elementos gráficos que funcionan desde aplicaciones móviles hasta vallas publicitarias.'
            },
            {
                title: 'Implementación consistente',
                description: 'Manual de marca detallado con guidelines para mantener coherencia en todos los touchpoints.'
            }
        ]
    }
};


    // Función para generar el HTML del proyecto
    function generateProjectHTML(projectData) {
        const servicesHTML = projectData.services ? projectData.services.map(service => `
            <div class="service-card">${service}</div>
        `).join('') : '';

        const approachHTML = projectData.approach ? projectData.approach.map(item => `
            <li class="approach-item">
                <div class="bullet-point"></div>
                <div class="item-content">
                    <div class="item-title">${item.title}</div>
                    <div class="item-description">${item.description}</div>
                </div>
            </li>
        `).join('') : '';

        return `
            <div class="project-page">
            

   

                <div class="project-header">
                    <img src="${projectData.headerImage}" alt="Project Header" class="header-image">   
                    <div class="header-text-container">
                        <h1 class="project-title">${projectData.title}</h1>
                        <p class="project-description">${projectData.description}</p>
                        <div class="project-services-container">
                            <h3 class="project-services-title">Servicios:</h3>
                            <div class="project-services-cards">
                                ${servicesHTML}
                            </div>
                        </div>
                    </div>
                </div>
                

                
                <div class="project-image-container">
                    <img src="${projectData.portada || 'image/default-single.jpg'}" alt="${projectData.title} - Vista completa" class="project-image">
                </div>
                
                <div class="project-two-columns">
                    <div class="project-column-left">
                        <p class="project-column-text">${projectData.columnText}</p>
                        <div class="project-bottom-content">
                            <h2 class="project-column-title">${projectData.columnTitle}</h2>
                        </div>
                    </div>
                    <div class="project-column-right">
                         <img src="${projectData.logo || 'image/default-single.jpg'}" alt="${projectData.title} - Vista completa" class="project-image">
                    </div>
                </div>
                
                <div class="challenge-container">
                    <h3 class="challenge-title">Desafío</h3>
                    <p class="challenge-text">${projectData.challenge}</p>
                </div>
                

                        
                <div class="single-image-container">
                    <img src="${projectData.image1 || 'image/default-single.jpg'}" alt="${projectData.title} - Vista completa">
                </div>


                <div class="approach-container">
                    <h3 class="approach-title">Enfoque</h3>
                    <ul class="approach-list">
                        ${approachHTML}
                    </ul>
                </div>

                <div class="image-showcase-container">
                    <div class="image-left">
                        <img src="${projectData.image2}" alt="${projectData.title} - Vista 1">
                    </div>
                    <div class="image-right">
                        <img src="${projectData.image3}" alt="${projectData.title} - Vista 2">
                    </div>
                </div>


                <div class="single-image-container">
                    <img src="${projectData.image4 || 'image/default-single.jpg'}" alt="${projectData.title} - Vista completa">
                </div>

                <div class="three-images-container">
                    <div class="image-item">
                        <img src="${projectData.image5 || 'image/default-1.jpg'}" alt="${projectData.title} - Vista 1">
                    </div>
                    <div class="image-item">
                        <img src="${projectData.image6 || 'image/default-2.jpg'}" alt="${projectData.title} - Vista 2">
                    </div>
                    <div class="image-item">
                        <img src="${projectData.image7 || 'image/default-3.jpg'}" alt="${projectData.title} - Vista 3">
                    </div>
                </div>

                  <div class="single-image-container">
                    <img src="${projectData.image8 || 'image/default-single.jpg'}" alt="${projectData.title} - Vista completa">
                </div>

                  <div class="single-image-container">
                    <img src="${projectData.image9 || 'image/default-single.jpg'}" alt="${projectData.title} - Vista completa">
                </div>




            </div>


                    



        `;
    }

    // Función para abrir proyecto
    function openProject(projectId) {
        const projectData = projectsData[projectId];
        if (!projectData) return;

        const projectHTML = generateProjectHTML(projectData);
        projectContent.innerHTML = projectHTML;
        
        // **PAUSAR LENIS PRINCIPAL**
        if (window.lenis) {
            window.lenis.stop();
        }
        
        // Deshabilitar scroll en body
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // Mostrar overlay
        overlay.classList.add('active');
        overlay.scrollTop = 0;
        
        // **CREAR LENIS PARA EL OVERLAY**
        setTimeout(() => {
            overlayLenis = new Lenis({
                wrapper: overlay, // Usar el overlay como wrapper
                content: projectContent, // El contenido del proyecto
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                syncTouch: false,
                touchMultiplier: 2,
            });

            function overlayRaf(time) {
                overlayLenis.raf(time);
                requestAnimationFrame(overlayRaf);
            }
            requestAnimationFrame(overlayRaf);
            
            console.log('Proyecto abierto - Lenis smooth scroll activo en overlay');
        }, 100);
    }

    // Función para cerrar proyecto
    function closeProject() {
        overlay.classList.remove('active');
        
        // **DESTRUIR LENIS DEL OVERLAY**
        if (overlayLenis) {
            overlayLenis.destroy();
            overlayLenis = null;
        }
        
        setTimeout(() => {
            // **REHABILITAR SCROLL Y LENIS PRINCIPAL**
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            // Reiniciar Lenis principal
            if (window.lenis) {
                window.lenis.start();
                window.lenis.resize();
            } else {
                // Recrear Lenis si no existe
                window.lenis = new Lenis({
                    duration: 1.8,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    syncTouch: false,
                    touchMultiplier: 2,
                });

                function raf(time) {
                    window.lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);

                // Reconectar Lenis con ScrollTrigger
                window.lenis.on('scroll', ScrollTrigger.update);
                
                // Reconectar el listener de scroll original
                window.lenis.on('scroll', (e) => {
                    const scrollTop = e.scroll;
                    if (scrollTop <= 50) {
                        notification.classList.remove('hidden');
                    } else {
                        notification.classList.add('hidden');
                    }

                    if (scrollTop > lastScrollTop && scrollTop > 200) {
                        navbar.classList.add('hidden');
                    } else if (scrollTop < lastScrollTop) {
                        navbar.classList.remove('hidden');
                    }

                    lastScrollTop = scrollTop;
                    if (!navbar.classList.contains('hidden')) {
                        updateNavbarColors();
                    }
                });
            }
            
            ScrollTrigger.refresh();
            
        }, 600);
        
        console.log('Proyecto cerrado - Lenis principal reactivado');
    }

    // Event listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            if (projectId) {
                openProject(projectId);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProject);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
            closeProject();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeProject();
            }
        });
    }
}

// ================== NOTIFICATION TEXT RESPONSIVE ==================
let notificationResizeTimeout;

// Función para cambiar texto de notificación según el tamaño de pantalla
function updateNotificationText() {
    const notificationText = document.getElementById('notification-text');
    
    if (!notificationText) {
        console.warn('Element with ID "notification-text" not found');
        return;
    }
    
    const isMobile = window.innerWidth <= 768;
    const newText = isMobile ? 'Mis proyectos' : 'Al grano: Mira mis proyectos';
    
    // Solo cambiar si es diferente para evitar reflows innecesarios
    if (notificationText.textContent !== newText) {
        notificationText.textContent = newText;
        console.log(`📱 Notification text updated: "${newText}" (${isMobile ? 'mobile' : 'desktop'})`);
    }
}

// Función para manejar resize con debouncing
function handleNotificationResize() {
    clearTimeout(notificationResizeTimeout);
    notificationResizeTimeout = setTimeout(() => {
        updateNotificationText();
    }, 150); // Debounce de 150ms
}

// Función para inicializar el texto responsivo de notificación
function initResponsiveNotification() {
    // Configurar texto inicial
    updateNotificationText();
    
    // Escuchar cambios de tamaño de ventana con debouncing
    window.addEventListener('resize', handleNotificationResize);
    
    // También escuchar orientationchange para móviles
    if ('onorientationchange' in window) {
        window.addEventListener('orientationchange', () => {
            setTimeout(updateNotificationText, 200); // Delay para orientation change
        });
    }
    
    console.log('📱 Responsive notification text initialized with debouncing');
}


const originalTitle = document.title;
let messageIndex = 0;
const messages = [
    '👋 ¡No te vayas sin contactarme!',
    '💼 Mi experiencia te está esperando',
    '🚀 Proyectos increíbles aquí dentro',
    '✨ Tu próximo desarrollador está aquí'
];

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Rotar mensajes para hacer más engaging
        document.title = messages[messageIndex % messages.length];
        messageIndex++;
    } else {
        document.title = originalTitle;
    }
});


// AÑADIR esta función al final de script.js:

function initNotificationScroll() {
    const notificationLink = document.getElementById('notification');
    const targetSection = document.querySelector('.recent-jobs-screen');
    
    if (notificationLink && targetSection) {
        notificationLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamiento por defecto del enlace
            
            // Usar Lenis para scroll suave (ya que está disponible globalmente)
            if (window.lenis) {
                window.lenis.scrollTo(targetSection, {
                    duration: 2, // Duración en segundos
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Mismo easing que Lenis
                    offset: -100 // Offset para evitar que el navbar tape el contenido
                });
            } else {
                // Fallback si Lenis no está disponible
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}


// ================== FUNCIONES FALTANTES ==================

// AÑADIR esta función (que faltaba en el código actual):
function initAnimatedText() {
    const animatedTextElement = document.querySelector('.animated-text');
    if (animatedTextElement) {
        // Limpiar cualquier animación previa
        gsap.killTweensOf('.animated-text');
        // Configurar estado inicial limpio
        gsap.set('.animated-text', {
            opacity: 0,
            y: 60,
            scale: 0.9,
            transformOrigin: "center center",
            clearProps: "all"
        });
        console.log('✅ Animated text initialized');
    }
}

// AÑADIR esta función para el scroll a recent-jobs-screen:
function initNotificationScroll() {
    const notificationLink = document.getElementById('notification');
    const targetSection = document.querySelector('.recent-jobs-screen');
    
    console.log('Notification link:', notificationLink);
    console.log('Target section:', targetSection);
    
    if (notificationLink && targetSection) {
        notificationLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Notification clicked! Scrolling to recent-jobs-screen...');
            
            // Usar Lenis para scroll suave
            if (window.lenis) {
                console.log('Using Lenis for scroll');
                window.lenis.scrollTo(targetSection, {
                    duration: 2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    offset: -100
                });
            } else {
                console.log('Using native scroll as fallback');
                // Calcular posición con offset para el navbar
                const targetPosition = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        console.log('✅ Notification scroll initialized');
    } else {
        console.error('❌ Notification link or target section not found');
        console.log('Available elements with class recent-jobs-screen:', document.querySelectorAll('.recent-jobs-screen'));
    }
}


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: '.recent-jobs',
  start: 'top top',
  end: 'bottom top',
  onEnter: () => {
    document.getElementById('scrollTopLogoBtn').classList.add('visible');
  },
  onLeaveBack: () => {
    document.getElementById('scrollTopLogoBtn').classList.remove('visible');
  }
});



document.getElementById('scrollTopLogoBtn').addEventListener('click', function() {
  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    window.lenis.scrollTo(0, { duration: 2.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Modificación en script.js: Ajusta la animación GSAP para mover el botón hacia abajo (bottom negativo) en lugar de hacia arriba. Si querías moverlo hacia arriba, revierte a bottom: 100.
// Asume que "desplaze hacia abajo" significa moverlo abajo (off-screen) al scroll down, pero si es un error y quieres moverlo arriba, usa bottom: 100 como original.
gsap.to("#projectCloseBtnBottom", {
    bottom: -100,  // Mueve hacia abajo (negativo para position: fixed, lo empuja fuera de la pantalla inferior)
    ease: "none",
    scrollTrigger: {
        trigger: "#projectOverlay",  // Limita al scroll del overlay
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.4,
        invalidateOnRefresh: true
    }
});

// El event listener ya existe en tu código, así que no necesita cambios.
// Asegúrate de que openProject() y closeProject() manejen la visibilidad del botón si es necesario (ej: mostrar solo cuando overlay active).
// En openProject(), después de setTimeout:
document.getElementById('projectCloseBtnBottom').style.display = 'flex'; // O 'block' si no usas flex

// En closeProject(), antes de setTimeout:
document.getElementById('projectCloseBtnBottom').style.display = 'none';


document.getElementById('projectCloseBtnBottom').addEventListener('click', () => {
  const overlay = document.getElementById('projectOverlay');
  if (overlay) {
    overlay.classList.remove('active'); // o tu método para cerrar
  }
});






updateBrowserThemeColor('#5ea85e')    // Cambiar a verde
updateBrowserThemeColor('#ffffeb')    // Cambiar a crema
syncThemeColorWithBackground()        // Sincronizar automático


// Ejecutar al cargar y en resize
window.addEventListener('load', updateNotificationText);
window.addEventListener('resize', updateNotificationText);



