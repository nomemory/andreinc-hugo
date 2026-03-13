let triangleInCircle = (s) => {
    addPaintGrid(s);
    addShowFps(s);

    const r = 100;
    const d = 2 * r;
    const f = theme.frequency;
    const dotLCol = s.color(theme.radiusColorLight);
    const rCCol = s.color(theme.circleColor);

    let ang = s.HALF_PI;
    let reset = s.PI + s.HALF_PI;
    let vC, vP, vPP, vThet;
    let cBuff;

    s.setup = () => {
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('triangle-in-circle-sketch');
        
        // --- Intersection Observer Logic ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.isIntersecting ? s.loop() : s.noLoop();
            });
        }, { threshold: 0.1 });
        observer.observe(canvas.elt);
        // ------------------------------------

        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        vC = s.createVector(s.width / 2, s.height / 2);
        vP = s.createVector(0, 0);
        vPP = s.createVector(0, 0);
        vThet = s.createVector(0, 0);
        
        cBuff = s.createGraphics(s.width, s.height);
        s.paintGrid(cBuff, s.width, s.height, vC, r / 5, 5, {
            showUnits: true,
            showOrigin: true,
            showY: true,
            showX: true
        });
        cBuff.stroke(theme.lightCircleColor);
        cBuff.noFill();
        cBuff.circle(vC.x, vC.y, d);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);

        // Pre-calculate trig values
        let sSin = s.sin(ang);
        let sCos = s.cos(ang);
        let rSin = sSin * r;
        let rCos = sCos * r;

        // Points
        vP.set(vC.x + rSin, vC.y + rCos);
        vPP.set(vC.x - rSin, vC.y - rCos);
        vThet.set(vC.x + rSin / 2, vC.y + rCos / 2);

        // Center-point + Center-projection-point
        s.stroke(dotLCol);
        s.line(vC.x, vC.y, vP.x, vP.y);
        s.line(vC.x, vC.y, vPP.x, vPP.y);

        // Growing Arcs
        s.noFill();
        s.stroke(rCCol);
        s.arc(vC.x, vC.y, d, d, s.HALF_PI - ang, 0);
        s.arc(vC.x, vC.y, d, d, -s.HALF_PI - ang, -s.PI);

        // 180 arc
        s.fill(theme.thetaColorLight);
        s.stroke(theme.thetaColor);
        s.arc(vC.x, vC.y, d / 6, d / 6, (1.5 * s.PI) - ang, s.HALF_PI - ang);

        // Text & Labels
        s.noStroke();
        s.fill(theme.thetaColor);
        s.text('θ=180°', vThet.x, vThet.y);
        
        // Points visual
        s.fill(theme.radiusColor || 0);
        s.circle(vP.x, vP.y, 3);
        s.circle(vPP.x, vPP.y, 3);

        s.text('A', vP.x + 5, vP.y + 5);
        s.text('A\'', vPP.x + 5, vPP.y + 5);

        ang += f;
        if (ang > reset) ang = s.HALF_PI;
        
        s.showFps();
    };
};

let triangleInCircleSketch = new p5(triangleInCircle, 'triangle-in-circle-sketch');