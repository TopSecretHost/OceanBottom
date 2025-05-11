const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];
for (let i = 0; i < 10; i++) { // Half as many bubbles
    bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        drift: Math.random() * 2 - 1
    });
}

const sandParticles = [];
for (let i = 0; i < 100; i++) {
    sandParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height - Math.random() * 50,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        drift: Math.random() * 0.2 - 0.1
    });
}

function drawWaves() {
    ctx.fillStyle = '#00ccff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // First wave
    ctx.fillStyle = '#0099cc';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i += 10) {
        ctx.lineTo(i, canvas.height / 2 + 20 * Math.sin(i * 0.02 + Date.now() * 0.001));
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
    
    // Second wave
    ctx.fillStyle = 'rgba(0, 153, 204, 0.5)';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2 + 20);
    for (let i = 0; i < canvas.width; i += 10) {
        ctx.lineTo(i, canvas.height / 2 + 20 + 25 * Math.sin(i * 0.015 + Date.now() * 0.002));
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
    
    // Large wave
    ctx.fillStyle = 'rgba(0, 102, 153, 0.5)';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2 + 40);
    for (let i = 0; i < canvas.width; i += 10) {
        ctx.lineTo(i, canvas.height / 2 + 40 + 35 * Math.sin(i * 0.01 + Date.now() * 0.0005));
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
}

function drawBubbles() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    bubbles.forEach(bubble => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
        ctx.fill();
        bubble.y -= bubble.speed;
        bubble.x += bubble.drift;
        if (bubble.y < canvas.height / 2 + 40) { // Adjusted to pop sooner
            bubble.y = canvas.height + bubble.radius;
            bubble.x = Math.random() * canvas.width;
        }
    });
}

function drawSand() {
    ctx.fillStyle = '#c2b280';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    ctx.fillStyle = 'rgba(194, 178, 128, 0.5)';
    sandParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fill();
        particle.y -= particle.speed;
        particle.x += particle.drift;
        if (particle.y < canvas.height - 50 || particle.x < 0 || particle.x > canvas.width) {
            particle.y = canvas.height - Math.random() * 50;
            particle.x = Math.random() * canvas.width;
        }
    });
}

canvas.addEventListener('click', (e) => {
    bubbles.push({
        x: e.clientX,
        y: e.clientY,
        radius: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        drift: Math.random() * 2 - 1
    });
});

function draw() {
    drawWaves();
    drawBubbles();
    drawSand();
    requestAnimationFrame(draw);
}

draw();
