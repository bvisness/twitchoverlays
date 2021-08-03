const MATH_MEME_SPAWN_DURATION = 10; // seconds
let lastMathMemeCommandTime = -10000;

function doMathMeme() {
    const NUM_IMAGE_FILES = 21;
    const FOV = 90 * (Math.PI/180);

    const SPAWN_RATE = 12; // particles per second
    const SPREAD = 4000;
    const MAX_DEPTH = 8000;
    const Z_SPEED = 1000;
    const NEAR_CLIP = 800;
    const IN_FADE_DISTANCE = 600;
    const OUT_FADE_DISTANCE = 1000;
    const MAX_OPACITY = 0.6;

    const images = [];
    for (let i = 1; i <= NUM_IMAGE_FILES; i++) {
        const image = new Image();
        image.src = `math/${i}.png`;
        images.push(image);
    }

    const canvas = document.querySelector('#math');
    const ctx = canvas.getContext('2d');

    function xz2screenX(x, z) {
        const hAngle = (Math.PI/2) - Math.atan2(z, x);
        return hAngle / (FOV/2) * canvas.width + canvas.width/2;
    }

    function yz2screenY(y, z) {
        const vAngle = Math.atan2(y, z);
        const vFOV = (canvas.height/canvas.width) * FOV;
        return vAngle / (vFOV/2) * canvas.height + canvas.height/2;
    }

    function lerp(a, t, b) {
        const result = (1-t)*a + t*b;
        if (result < Math.min(a, b)) {
            return Math.min(a, b);
        }
        if (result > Math.max(a, b)) {
            return Math.max(a, b);
        }
        return result;
    }

    let imageIndex = 0;
    function nextImage() {
        const result = images[imageIndex];
        imageIndex = (imageIndex + 1) % NUM_IMAGE_FILES;
        return result;
    }

    const particles = [];
    const makeParticle = (z = MAX_DEPTH) => ({
        x: Math.random() * SPREAD - SPREAD/2,
        y: Math.random() * SPREAD - SPREAD/2,
        z: z,
        image: nextImage(),
        dead: false,
    });

    let lastFrameTime = performance.now();
    let lastParticleSpawnTime = performance.now();
    function mathMemeFrame(now) {
        let dt = 0;
        if (now) {
            dt = (now - lastFrameTime) / 1000;
            lastFrameTime = now;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (
            now - lastMathMemeCommandTime < MATH_MEME_SPAWN_DURATION * 1000
            && now > lastParticleSpawnTime + (1/SPAWN_RATE) * 1000
        ) {
            particles.push(makeParticle());
            lastParticleSpawnTime = now;
        }

        for (const particle of particles) {
            particle.z -= dt * Z_SPEED;

            if (particle.z < NEAR_CLIP) {
                particle.dead = true;
            }
        }

        for (let i = particles.length-1; i >= 0; i--) {
            if (particles[i].dead) {
                particles.splice(i, 1);
            }
        }
        
        for (const particle of particles) {
            // Calculate screen positions
            const nw = particle.image.naturalWidth;
            const nh = particle.image.naturalHeight;

            const centerX = xz2screenX(particle.x, particle.z);
            const rightX = xz2screenX(particle.x + nw/2, particle.z);
            const leftX = xz2screenX(particle.x - nw/2, particle.z);
            const screenW = rightX - leftX;

            const centerY = yz2screenY(particle.y, particle.z);
            const topY = yz2screenY(particle.y + nh/2, particle.z);
            const bottomY = yz2screenY(particle.y - nh/2, particle.z);
            const screenH = topY - bottomY;

            // Calculate opacity
            let travelDistance = MAX_DEPTH - particle.z;
            let inThreshold = IN_FADE_DISTANCE;
            let outThreshold = MAX_DEPTH - NEAR_CLIP - OUT_FADE_DISTANCE;

            let opacity = MAX_OPACITY;
            if (travelDistance < inThreshold) {
                // fading in
                opacity = lerp(0, travelDistance/IN_FADE_DISTANCE, MAX_OPACITY);
            } else if (travelDistance > outThreshold) {
                // fading out
                const travelSinceFadeout = travelDistance - outThreshold;
                opacity = lerp(MAX_OPACITY, travelSinceFadeout/OUT_FADE_DISTANCE, 0);
            }

            ctx.globalAlpha = opacity;
            ctx.drawImage(particle.image, centerX - screenW/2, centerY - screenH/2, screenW, screenH);
        }

        window.requestAnimationFrame(mathMemeFrame);
    }
    mathMemeFrame();
}
doMathMeme();
