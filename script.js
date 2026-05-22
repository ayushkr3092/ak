// ========== INTERACTIONS (No typing message anymore) ==========
window.addEventListener('DOMContentLoaded', () => {
    
    // 1️⃣ FLOATING BACKGROUND (hearts, stars, sparkles)
    const bg = document.getElementById('floatingBg');
    const icons = ['💜', '✨', '⭐', '💖', '🌸', '🌟', '🎀', '💗', '🦋', '🌙'];
    for (let i = 0; i < 80; i++) {
        let el = document.createElement('div');
        el.classList.add('float-item');
        el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 26 + 10) + 'px';
        el.style.animationDuration = (Math.random() * 12 + 5) + 's';
        el.style.animationDelay = Math.random() * 8 + 's';
        bg.appendChild(el);
    }
    for (let i=0; i<50; i++) {
        let star = document.createElement('div');
        star.classList.add('star-twinkle');
        let size = Math.random() * 5 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = Math.random() * 3 + 1.5 + 's';
        bg.appendChild(star);
    }
    
    // 2️⃣ CONFETTI BURST (on load + on surprise)
    function burstConfetti() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        for (let i=0; i<160; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 4,
                color: `hsl(${Math.random() * 70 + 280}, 80%, 65%)`,
                speedY: Math.random() * 7 + 4,
                speedX: (Math.random() - 0.5) * 4,
                rotation: Math.random() * 360
            });
        }
        let anim;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let p of particles) {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size/1.8);
                p.y += p.speedY;
                p.x += p.speedX;
                if (p.y > canvas.height + 50) p.y = -30;
            }
            anim = requestAnimationFrame(draw);
        }
        draw();
        setTimeout(() => { cancelAnimationFrame(anim); canvas.remove(); }, 2800);
    }
    burstConfetti();
    
    // 3️⃣ SURPRISE MODAL (optional feature)
    const surpriseBtn = document.getElementById('surpriseBtn');
    const modal = document.getElementById('surpriseModal');
    const closeModalBtn = document.getElementById('closeModal');
    if (surpriseBtn && modal && closeModalBtn) {
        surpriseBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            burstConfetti();
        });
        closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    }
    
    // 4️⃣ CAKE SECTION: Blow candles effect
    const blowBtn = document.getElementById('blowCandleBtn');
    const flame = document.querySelector('.flame');
    blowBtn.addEventListener('click', () => {
        if (flame) {
            flame.style.opacity = '0';
            blowBtn.innerHTML = '<i class="fas fa-heart"></i> Wish granted! 💜';
            blowBtn.disabled = true;
            burstConfetti();
        }
    });
    
    // 5️⃣ MUSIC PLAYER
    const audio = document.getElementById('bgMelody');
    const playBtn = document.getElementById('playMusicBtn');
    const pauseBtn = document.getElementById('pauseMusicBtn');
    const volumeSlider = document.getElementById('volumeControl');
    playBtn.addEventListener('click', () => {
        audio.play().catch(e => alert("Click again to play melody 💜 (browser needs interaction)"));
    });
    pauseBtn.addEventListener('click', () => audio.pause());
    volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });
    
    // 6️⃣ SMOOTH SCROLL & SECTION REVEAL
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    function revealSections() {
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 150) {
                sec.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealSections);
    revealSections();
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) current = i;
        });
        dots.forEach((dot, idx) => {
            if (idx === current) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    });
    
    // 7️⃣ Name customization
    const nameSpan = document.getElementById('herName');
    if (nameSpan) nameSpan.innerText = "My Angel 💜";
});