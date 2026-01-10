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