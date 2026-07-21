// starfield.js
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const STAR_COUNT = 150; // jumlah bintang

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 0.5, 
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.008, // kecepatan kedip
            angle: Math.random() * Math.PI * 2
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity >= 1 || star.opacity <= 0.2) {
            star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${star.opacity})`; // hijau terminal
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
    resize();
    createStars();
});

resize();
createStars();
drawStars();