const simpleCircleRotatingTriangle = (s) => {

    addPaintGrid(s);
    addShowFps(s);

    const d = 200;
    const r = d / 2;
    const f = theme.frequency;
    const ar = d / 6;
    const reset = s.TWO_PI + s.HALF_PI;

    let angle = s.HALF_PI;
    let bTxtY1, bTxtY2, bTxtY3;
    let buff;
    let vC, vR, vRProj, vThet;

    s.setup = () => {
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('simple-circle-rotating-triangle-sketch');
        
        // --- Intersection Observer (Visibility Fix) ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.isIntersecting ? s.loop() : s.noLoop();
            });
        }, { threshold: 0.10 });
        observer.observe(canvas.elt);
        // ----------------------------------------------

        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        vC = s.createVector(s.width / 2, s.height / 2);
        vR = s.createVector(0, 0);
        vThet = s.createVector(0, 0);
        vRProj = s.createVector(0, 0);

        buff = s.createGraphics(s.width, s.height);
        s.paintGrid(buff, s.width, s.height, vC, r / 5, 5, {
            showUnits: true, showOrigin: true, showY: true, showX: true
        });
        buff.noFill();
        buff.circle(vC.x, vC.y, d);

        bTxtY1 = s.height - 5;
        bTxtY2 = bTxtY1 - 15;
        bTxtY3 = bTxtY2 - 15;
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        // Pre-calculate trig once per frame
        const sSin = s.sin(angle);
        const sCos = s.cos(angle);
        const rX = vC.x + sSin * r;
        const rY = vC.y + sCos * r;

        vR.set(rX, rY);
        vRProj.set(rX, vC.y);

        // 1. Drawing Theta Arc
        s.stroke(theme.thetaColor);
        s.fill(theme.thetaColorLight);
        s.arc(vC.x, vC.y, ar, ar, s.HALF_PI - angle, 0);
        
        // Arc Label "θ"
        const labelAng = s.HALF_PI - (angle / 2);
        s.noStroke();
        s.fill(theme.thetaColor);
        s.text("θ", vC.x + s.cos(labelAng) * (ar / 1.5), vC.y - s.sin(labelAng) * (ar / 1.5));

        // 2. Lines (Hypotenuse, Opposite, Adjacent)
        s.noFill();
        s.stroke(theme.radiusColorLight);
        s.line(vC.x, vC.y, vR.x, vR.y); // Radius

        s.stroke(theme.sineColor);
        s.line(vRProj.x, vRProj.y, vR.x, vR.y); // Sine line

        s.stroke(theme.cosineColor);
        s.line(vC.x, vC.y, vRProj.x, vRProj.y); // Cosine line

        // 3. Points
        s.fill(theme.radiusColorLight);
        s.noStroke();
        s.circle(vR.x, vR.y, 4);
        s.circle(vRProj.x, vRProj.y, 4);

        // 4. Side Labels
        const soff = (angle >= s.PI && angle < s.TWO_PI) ? -45 : 5;
        s.fill(theme.sineColor);
        s.text("sin(θ)", vR.x + soff, (vC.y + vR.y) / 2);

        const coff = (angle >= s.HALF_PI && angle < 1.5 * s.PI) ? 15 : -5;
        s.fill(theme.cosineColor);
        s.text("cos(θ)", (vC.x + vR.x) / 2 - 15, vC.y + coff);

        // 5. Moving Coordinate Text (A bit cleaner)
        s.fill(theme.textColor || 255);
        let txtBaseX = vR.x + 10;
        s.text("(", txtBaseX, vR.y);
        s.fill(theme.sineColor);
        s.text("sin(θ)", txtBaseX + 5, vR.y);
        s.fill(theme.textColor || 255);
        s.text(",", txtBaseX + 45, vR.y);
        s.fill(theme.cosineColor);
        s.text("cos(θ)", txtBaseX + 50, vR.y);
        s.fill(theme.textColor || 255);
        s.text(")", txtBaseX + 90, vR.y);

        // 6. Bottom Status Values
        const deg = ((angle - s.HALF_PI) * 180 / s.PI).toFixed(2);
        s.fill(theme.thetaColor);
        s.text(`θ = ${deg}°`, 5, bTxtY3);
        s.fill(theme.sineColor);
        s.text(`sin(θ) = ${sSin.toFixed(2)}`, 5, bTxtY2);
        s.fill(theme.cosineColor);
        s.text(`cos(θ) = ${(-sCos).toFixed(2)}`, 5, bTxtY1); // Negative because P5 Y is inverted

        // Update Angle
        angle += f;
        if (angle > reset) angle = s.HALF_PI;

        s.showFps();
    };
};

let simpleCircleRotatingTriangleSketch = new p5(simpleCircleRotatingTriangle, 'simple-circle-rotating-triangle-sketch');