// Scroll fluido per la freccia
document.querySelector('.scroll-arrow').addEventListener('click', function() {
    document.querySelector('#career').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Scroll fluido per tutti i link interni (già presente ma migliorato)
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

// Progress Bar Script
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

// Dropdown Menu Functionality
const menuIcon = document.getElementById('menuIcon');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

menuIcon.addEventListener('click', () => {
    // Toggle the active class for the menu and overlay
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    // Close the menu when clicking on the overlay
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
});