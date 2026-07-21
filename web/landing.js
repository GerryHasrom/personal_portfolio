// Partikel background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 204, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles(count = 150) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Typewriter loop untuk .hero-name
// Typewriter loop untuk .subtitle dengan 3 teks bergantian
const subtitleEl = document.querySelector('.subtitle');
if (subtitleEl) {
    const texts = [
        "Informatics graduate from Mulawarman University",
        "Currently studying in the field of web development",
    ];
    let textIndex = 0;           // indeks teks saat ini
    let charIndex = 0;
    let isTyping = true;
    let timeoutId;

    // Konfigurasi kecepatan (sesuaikan)
    const typingSpeed = 80;      // ms per karakter
    const deletingSpeed = 50;
    const pauseAfterTyping = 1500; // jeda setelah selesai mengetik satu kalimat
    const pauseAfterDeleting = 500; // jeda setelah teks terhapus (sebelum mengetik kalimat berikutnya)

    function typewriterStep() {
        const currentText = texts[textIndex];
        if (isTyping) {
            if (charIndex < currentText.length) {
                subtitleEl.textContent = currentText.slice(0, charIndex + 1);
                charIndex++;
                timeoutId = setTimeout(typewriterStep, typingSpeed);
            } else {
                // Selesai mengetik, jeda lalu hapus
                isTyping = false;
                timeoutId = setTimeout(typewriterStep, pauseAfterTyping);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                subtitleEl.textContent = currentText.slice(0, charIndex);
                timeoutId = setTimeout(typewriterStep, deletingSpeed);
            } else {
                // Teks habis, pindah ke teks berikutnya
                isTyping = true;
                textIndex = (textIndex + 1) % texts.length; // loop kembali
                timeoutId = setTimeout(typewriterStep, pauseAfterDeleting);
            }
        }
    }

    // Mulai dengan teks kosong, lalu langsung ketik pertama
    subtitleEl.textContent = '';
    typewriterStep();
}

// Load Lottie animation
const lottieContainer = document.getElementById('lottie-hero');
if (lottieContainer && typeof lottie !== 'undefined') {
    lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/hero_animation.json'  
    });
}