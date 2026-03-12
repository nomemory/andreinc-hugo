(function() {
    const container = document.getElementById('fresco-container');
    const canvas = document.getElementById('frescoCanvas');
    const ctx = canvas.getContext('2d');
    const imgSrc = document.getElementById('frescoSource');
    const hint = document.getElementById('fresco-hint');

    // Hit area coordinates mapped to the light switch
    const hitArea = { xMin: 0.69, xMax: 0.76, yMin: 0.26, yMax: 0.32 };
    let sunIsVisible = false;
    let hasInteracted = false; // Track if the user has clicked it at least once

    function init() {
        if (!imgSrc.complete || imgSrc.naturalWidth === 0) {
            imgSrc.onload = setupCanvas;
        } else {
            setupCanvas();
        }
    }

    function setupCanvas() {
        // Scale canvas to fit the blog post width dynamically
        const maxWidth = container.clientWidth || 800; 
        const aspectRatio = imgSrc.naturalWidth / imgSrc.naturalHeight;
        
        canvas.width = maxWidth;
        canvas.height = maxWidth / aspectRatio;

        drawScene();

        canvas.addEventListener('mousedown', checkClick);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkClick(e.touches[0]);
        }, { passive: false });
    }

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height);
        
        if (sunIsVisible) {
            drawSun();
        }
        
        // Hide text after the first successful interaction
        if (hasInteracted && hint) {
            hint.style.display = 'none'; 
        }
    }

    function checkClick(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        // Check if the click falls within the switch's boundaries
        if (
            clickX >= hitArea.xMin * canvas.width &&
            clickX <= hitArea.xMax * canvas.width &&
            clickY >= hitArea.yMin * canvas.height &&
            clickY <= hitArea.yMax * canvas.height
        ) {
            sunIsVisible = !sunIsVisible; // Toggle the state (true -> false, false -> true)
            hasInteracted = true;
            drawScene();
        }
    }

    function drawSun() {
        const sunRadius = canvas.width * 0.1;
        const sunCenter = { x: canvas.width * 0.8, y: canvas.height * 0.1 };

        ctx.save();
        
        // Outer glow
        ctx.shadowColor = 'rgba(255, 180, 0, 1)';
        ctx.shadowBlur = canvas.width * 0.05;
        
        ctx.beginPath();
        ctx.arc(sunCenter.x, sunCenter.y, sunRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 230, 0, 0.4)';
        ctx.fill();

        // Inner solid core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(sunCenter.x, sunCenter.y, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFDD00';
        ctx.fill();

        // Radiating rays
        const numRays = 16;
        const innerRayRadius = sunRadius * 1.1;
        const outerRayRadius = sunRadius * 2.2;
        const rayGradient = ctx.createRadialGradient(
            sunCenter.x, sunCenter.y, innerRayRadius,
            sunCenter.x, sunCenter.y, outerRayRadius
        );
        rayGradient.addColorStop(0, '#FFDD00');
        rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = rayGradient;
        ctx.lineWidth = canvas.width * 0.01;

        for (let i = 0; i < numRays; i++) {
            const angle = (Math.PI * 2 * i) / numRays;
            const startX = sunCenter.x + Math.cos(angle) * innerRayRadius;
            const startY = sunCenter.y + Math.sin(angle) * innerRayRadius;
            const endX = sunCenter.x + Math.cos(angle) * outerRayRadius;
            const endY = sunCenter.y + Math.sin(angle) * outerRayRadius;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        ctx.restore();
    }

    window.addEventListener('resize', () => {
        if(imgSrc.complete) setupCanvas();
    });

    init();
})();