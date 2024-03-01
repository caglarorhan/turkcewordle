let confetti = {
    canvas: null,
    ctx:null,
    allConfetti: [],
    init() {
        this.createMainCanvas();
        this.confettiMachine({ confettiCount: 100 });
        this.startAnimation();
    },
    createMainCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none'; // Canvas'e tıklanamaz
        canvas.style.zIndex = '9999'; // Diğer öğelerin önünde
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    },
    confettiMachine(dataObj = { confettiCount: Number }) {
        for (let x = 0; x < dataObj.confettiCount; x++) {
            this.allConfetti.push(this.createAConfetti());
        }
    },
    createAConfetti() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 10 + 5,
            radius: Math.random() * 4 + 2,
            color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`,
            angle: Math.random() * 360,
            speed: Math.random() * 5 + 1,
            tilt: Math.random() * 10 - 5,
            opacity: 1, // Add opacity property for fading effect
        };
    },
    startAnimation() {
        console.log('Starting animation...');
        let animationId = null;
        let lastTime = 0; // Initialize lastTime for dt calculation
        const animate = () => {
            console.log('Animating...');
            animationId = requestAnimationFrame(animate);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Calculate time elapsed (dt) between frames
            const now = performance.now();
            const dt = (now - lastTime) / 1000; // Time elapsed in seconds
            lastTime = now;

            // Update and draw each confetti particle
            for (let i = this.allConfetti.length - 1; i >= 0; i--) { // Iterate in reverse
                const confetti = this.allConfetti[i];
                this.updateConfetti(confetti, dt);

                // Draw only visible particles
                if (confetti.y <= this.canvas.height) {
                    this.drawConfetti(confetti);
                } else {
                    // Remove out-of-bounds particles
                    this.allConfetti.splice(i, 1);
                }
            }
        };

        animate();
    },
    updateConfetti(confetti, dt) {
        // Choose your desired animation path and update x and y accordingly:
        let gravity = 9.81; // Gravity (m/s^2)
        // **Parabolic path:**
        confetti.x += confetti.Vx * dt;
        confetti.y += confetti.Vy * dt + 0.5 * gravity * dt * dt;

        // Update velocities
        confetti.Vx += 0; // No horizontal acceleration
        confetti.Vy += gravity * dt;
        confetti.opacity -= 0.01; // Fade opacity
    },
    drawConfetti(confetti) {
        this.ctx.save();
        this.ctx.translate(confetti.x, confetti.y);
        this.ctx.rotate(confetti.angle); // Add rotation for variation

        // Draw the confetti shape (e.g., circle, square)
        this.ctx.beginPath();
        this.ctx.arc(0, 0, confetti.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = confetti.color;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    },
};

//confetti.init();
