// Random flicker effect with blue tint
function randomFlicker() {
    const flickerElement = document.getElementById('randomFlicker');

    setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance every interval
            flickerElement.style.opacity = '1';
            flickerElement.style.background = `rgba(${Math.random() > 0.5 ? '255, 255, 255' : '100, 150, 255'}, 0.02)`;
            setTimeout(() => {
                flickerElement.style.opacity = '0';
            }, Math.random() * 100 + 50); // Flicker duration: 50-150ms
        }
    }, 100);
}

// Screen interference effect
function screenInterference() {
    const screen = document.querySelector('.crt-screen');

    setInterval(() => {
        if (Math.random() < 0.005) { // Very rare interference
            screen.style.transform = `perspective(1000px) rotateX(${Math.random() * 0.5 - 0.25}deg) translateX(${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                screen.style.transform = 'perspective(1000px) rotateX(0deg)';
            }, Math.random() * 200 + 100);
        }
    }, 200);
}

// Enhanced phosphor persistence effect with white glow
function phosphorPersistence() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        let originalShadow = '';

        link.addEventListener('mouseenter', function () {
            originalShadow = this.style.textShadow || '';
            this.style.textShadow = originalShadow + ', 0 0 30px #ffffff, 0 0 40px rgba(100, 150, 255, 0.6)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.textShadow = originalShadow;
        });
    });
}

// Blue CRT startup effect
function startupEffect() {
    const container = document.querySelector('.crt-container');
    container.style.filter = 'brightness(0)';

    setTimeout(() => {
        container.style.transition = 'filter 1s ease-out';
        container.style.filter = 'brightness(1)';
    }, 100);
}

// Initialize effects
document.addEventListener('DOMContentLoaded', function () {
    startupEffect();
    randomFlicker();
    screenInterference();
    phosphorPersistence();
});

// Disable right-click for authentic CRT experience
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Blue screen flicker on focus
window.addEventListener('focus', function () {
    const screen = document.querySelector('.crt-screen');
    screen.style.background += ', rgba(100, 150, 255, 0.05)';
    setTimeout(() => {
        screen.style.background = screen.style.background.replace(', rgba(100, 150, 255, 0.05)', '');
    }, 200);
});