// Scroll fluido per la freccia
document.querySelector('.scroll-arrow').addEventListener('click', function() {
    document.querySelector('#career').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Scroll fluido per tutti i link interni alla pagina
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Barra di progresso durante lo scroll
window.addEventListener('scroll', function() {
    const progressBar = document.getElementById('progressBar');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calcola la percentuale di scroll
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    // Aggiorna la larghezza della barra
    progressBar.style.width = scrollPercent + '%';
});

//  Menu mobile 
const menuIcon = document.getElementById('menuIcon');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

menuIcon.addEventListener('click', () => {
    // apre/chiude il menu mobile
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    // chiude il menu quando si clicca sull'overlay
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
});


// Hover effect per l'immagine About che si espande a schermo intero
const aboutSection = document.querySelector('.about-section');
const aboutImage = document.querySelector('.about-image');
const aboutBg = document.createElement('div');

// Crea l'elemento background
aboutBg.classList.add('about-bg');
aboutSection.insertBefore(aboutBg, aboutSection.firstChild);

// Aggiungi eventi hover
aboutImage.addEventListener('mouseenter', () => {
    aboutBg.classList.add('active');
    aboutSection.classList.add('bg-active');
});

aboutImage.addEventListener('mouseleave', () => {
    aboutBg.classList.remove('active');
    aboutSection.classList.remove('bg-active');
});


// CAROUSEL CON FRECCE E CONTROLLO MANUALE
const carouselContainer = document.querySelector('.carousel-container');
const carouselTrack = document.querySelector('.carousel-track');

if (carouselTrack && carouselContainer) {
    let isManualControl = false;
    let currentTranslateX = 0;
    const itemWidth = 350; // larghezza item
    const gap = 30; // gap tra item
    const step = itemWidth + gap;

    // Funzione per aggiornare la posizione del carousel
    function updateCarouselPosition(instant = false) {
        if (instant) {
            carouselTrack.style.transition = 'none';
        } else {
            carouselTrack.style.transition = 'transform 0.5s ease';
        }
        carouselTrack.style.transform = `translateX(${currentTranslateX}px)`;
        
        if (instant) {
            setTimeout(() => {
                carouselTrack.style.transition = '';
            }, 50);
        }
    }

    // Funzione per scorrere a sinistra
    function scrollLeft() {
        currentTranslateX += step;
        if (currentTranslateX > 0) {
            currentTranslateX = 0;
        }
        updateCarouselPosition();
    }

    // Funzione per scorrere a destra
    function scrollRight() {
        const maxScroll = -(step * 7); // 7 items totali
        currentTranslateX -= step;
        if (currentTranslateX < maxScroll) {
            currentTranslateX = maxScroll;
        }
        updateCarouselPosition();
    }

    // Pausa animazione e attiva controllo manuale su hover
    carouselContainer.addEventListener('mouseenter', () => {
        isManualControl = true;
        carouselTrack.style.animationPlayState = 'paused';
        
        // Ottieni la posizione corrente dall'animazione
        const computedStyle = window.getComputedStyle(carouselTrack);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        currentTranslateX = matrix.m41;
        
        // Disabilita l'animazione e imposta la transform manualmente
        carouselTrack.style.animation = 'none';
        carouselTrack.style.transform = `translateX(${currentTranslateX}px)`;
    });

    // Riprendi animazione su mouse leave
    carouselContainer.addEventListener('mouseleave', () => {
        isManualControl = false;
        carouselTrack.style.animation = '';
        carouselTrack.style.transform = '';
        carouselTrack.style.animationPlayState = 'running';
    });

    // Event listeners per le frecce (che creeremo nell'HTML)
    const leftArrow = carouselContainer.querySelector('.carousel-arrow.left');
    const rightArrow = carouselContainer.querySelector('.carousel-arrow.right');

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', scrollLeft);
        rightArrow.addEventListener('click', scrollRight);
    }

    // Touch support per mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        carouselTrack.style.animationPlayState = 'paused';
        
        const computedStyle = window.getComputedStyle(carouselTrack);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        currentTranslateX = matrix.m41;
        carouselTrack.style.animation = 'none';
        carouselTrack.style.transform = `translateX(${currentTranslateX}px)`;
    });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        
        setTimeout(() => {
            carouselTrack.style.animation = '';
            carouselTrack.style.transform = '';
            carouselTrack.style.animationPlayState = 'running';
        }, 2000);
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            scrollRight();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            scrollLeft();
        }
    }

    // Drag con mouse (desktop)
    let isDown = false;
    let startX;
    let scrollLeftPos;

    carouselTrack.addEventListener('mousedown', (e) => {
        if (!isManualControl) return;
        isDown = true;
        startX = e.pageX;
        scrollLeftPos = currentTranslateX;
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carouselTrack.addEventListener('mouseup', () => {
        isDown = false;
    });

    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isDown || !isManualControl) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 1.5;
        currentTranslateX = scrollLeftPos + walk;
        
        // Limiti di scroll
        const maxScroll = -(step * 7);
        if (currentTranslateX > 0) currentTranslateX = 0;
        if (currentTranslateX < maxScroll) currentTranslateX = maxScroll;
        
        updateCarouselPosition(true);
    });
}