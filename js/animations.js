// Typing animation effect
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentChar = 0;
        this.isTyping = false;
    }

    type() {
        if (this.currentChar < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentChar);
            this.currentChar++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.element.textContent = '';
            this.currentChar = 0;
            this.type();
        }
    }
}

// Glitch effect
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.isGlitching = false;
    }

    start() {
        if (!this.isGlitching) {
            this.isGlitching = true;
            this.element.style.textShadow = `
                2px 2px var(--primary-color),
                -2px -2px #ff0000
            `;
            setTimeout(() => this.stop(), 100);
        }
    }

    stop() {
        this.isGlitching = false;
        this.element.style.textShadow = 'none';
    }
}

// Parallax effect
class ParallaxEffect {
    constructor(element, speed = 0.5) {
        this.element = element;
        this.speed = speed;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            this.element.style.transform = `translateY(${scrolled * this.speed}px)`;
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animations
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-speed')) || 50;
        const typeWriter = new TypeWriter(element, text, speed);
        typeWriter.start();
    });

    // Initialize glitch effects
    const glitchElements = document.querySelectorAll('.glitch-text');
    glitchElements.forEach(element => {
        const glitch = new GlitchEffect(element);
        element.addEventListener('mouseenter', () => glitch.start());
    });

    // Initialize parallax effects
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        new ParallaxEffect(element, speed);
    });
}); 