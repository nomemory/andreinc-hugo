(function() {
    const container = document.getElementById('fresco-container');
    const canvas = document.getElementById('frescoCanvas');
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    const imgSrc = document.getElementById('frescoSource');
    const hint = document.getElementById('fresco-hint');
    let hotspot = null;

    // Hit area coordinates mapped to the light switch
    const hitArea = { xMin: 0.69, xMax: 0.76, yMin: 0.26, yMax: 0.32 };
    let sunIsVisible = false;
    let hasInteracted = false; 

    function init() {
        if (!imgSrc.complete || imgSrc.naturalWidth === 0) {
            imgSrc.onload = setupCanvas;
        } else {
            setupCanvas();
        }
    }

    function setupCanvas() {
        const maxWidth = container.clientWidth || 800; 
        const aspectRatio = imgSrc.naturalWidth / imgSrc.naturalHeight;
        
        canvas.width = maxWidth;
        canvas.height = maxWidth / aspectRatio;

        drawScene();
        setupHotspot();
    }

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height);
        
        // Draw the hint layer if the user hasn't clicked yet
        if (!hasInteracted) {
            drawHitAreaHint();
        }

        if (sunIsVisible) {
            drawSun();
        }
    }

    function drawHitAreaHint() {
        const area = getHitBounds();
        const x = area.xMin;
        const y = area.yMin;
        const w = area.xMax - area.xMin;
        const h = area.yMax - area.yMin;

        ctx.save();
        // Dashed white border
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
        
        // Subtle blue-ish highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(x, y, w, h);
        ctx.restore();
    }

    function toggleSun() {
        hasInteracted = true;
        sunIsVisible = !sunIsVisible;
        drawScene();
    }

    function setupHotspot() {
        if (!hotspot) {
            hotspot = document.createElement('button');
            hotspot.type = 'button';
            hotspot.className = 'fresco-hotspot';
            hotspot.setAttribute('aria-label', 'Toggle the light');
            hotspot.addEventListener('click', (e) => {
                e.preventDefault();
                toggleSun();
            });
            container.appendChild(hotspot);
        }

        const area = getHitBounds();
        hotspot.style.left = `${area.left}px`;
        hotspot.style.top = `${area.top}px`;
        hotspot.style.width = `${area.width}px`;
        hotspot.style.height = `${area.height}px`;
    }

    function getHitBounds() {
        const rect = canvas.getBoundingClientRect();
        const minHit = 44;

        const rawLeft = canvas.offsetLeft + canvas.clientWidth * hitArea.xMin;
        const rawTop = canvas.offsetTop + canvas.clientHeight * hitArea.yMin;
        const rawWidth = canvas.clientWidth * (hitArea.xMax - hitArea.xMin);
        const rawHeight = canvas.clientHeight * (hitArea.yMax - hitArea.yMin);

        const width = Math.max(minHit, rawWidth);
        const height = Math.max(minHit, rawHeight);

        return {
            left: rawLeft - Math.max(0, (width - rawWidth) / 2),
            top: rawTop - Math.max(0, (height - rawHeight) / 2),
            width,
            height,
            xMin: (rawLeft - canvas.offsetLeft) * (canvas.width / Math.max(rect.width, 1)) - Math.max(0, (width - rawWidth) / 2) * (canvas.width / Math.max(rect.width, 1)),
            yMin: (rawTop - canvas.offsetTop) * (canvas.height / Math.max(rect.height, 1)) - Math.max(0, (height - rawHeight) / 2) * (canvas.height / Math.max(rect.height, 1)),
            xMax: (rawLeft - canvas.offsetLeft + rawWidth) * (canvas.width / Math.max(rect.width, 1)) + Math.max(0, (width - rawWidth) / 2) * (canvas.width / Math.max(rect.width, 1)),
            yMax: (rawTop - canvas.offsetTop + rawHeight) * (canvas.height / Math.max(rect.height, 1)) + Math.max(0, (height - rawHeight) / 2) * (canvas.height / Math.max(rect.height, 1))
        };
    }

    function drawSun() {
        const sunRadius = canvas.width * 0.1;
        const sunCenter = { x: canvas.width * 0.8, y: canvas.height * 0.1 };

        ctx.save();
        ctx.shadowColor = 'rgba(255, 180, 0, 1)';
        ctx.shadowBlur = canvas.width * 0.05;
        
        ctx.beginPath();
        ctx.arc(sunCenter.x, sunCenter.y, sunRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 230, 0, 0.4)';
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(sunCenter.x, sunCenter.y, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFDD00';
        ctx.fill();

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
