const simpleCircleRotating = (s) => {
    addPaintGrid(s);
    addShowFps(s);

    const d = 200;
    const r = d / 2;
    const f = theme.frequency;
    const rColor = s.color(theme.radiusColorLight);

    let angl = s.HALF_PI;
    const reset = s.TWO_PI + s.HALF_PI; 

    let vC, vR, cBuff;

    s.setup = () => {
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent("simple-circle-rotating-sketch");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.isIntersecting ? s.loop() : s.noLoop();
            });
        }, { threshold: 0.1 });
        observer.observe(canvas.elt);

        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        vC = s.createVector(s.width / 2, s.height / 2);
        vR = s.createVector(0, 0);

        cBuff = s.createGraphics(s.width, s.height);
        cBuff.noFill();
        s.paintGrid(cBuff, s.width, s.height, vC, r / 5, 5, {
            showUnits: true, showOrigin: true, showY: true, showX: true
        });
        cBuff.circle(vC.x, vC.y, d);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);

        const sSin = s.sin(angl);
        const sCos = s.cos(angl);
        
        vR.set(vC.x + sSin * r, vC.y + sCos * r);

        s.stroke(rColor);
        s.line(vC.x, vC.y, vR.x, vR.y);
        s.circle(vR.x, vR.y, 3);

        s.noStroke();
        // CHANGED: Using theme colors instead of hardcoded 255
        s.fill(theme.radiusColor || 0); 

        const unitX = sSin;
        const unitY = -sCos; 

        s.text(`(x=${unitX.toFixed(2)}, y=${unitY.toFixed(2)})`, vR.x + 5, vR.y);
        s.text("r (radius)", (vC.x + vR.x) / 2, (vC.y + vR.y) / 2);

        // Identity sum at bottom
        const sqrX = (unitX * unitX).toFixed(2);
        const sqrY = (unitY * unitY).toFixed(2);
        s.text(`x² + y² = ${sqrX} + ${sqrY} = 1.00`, 10, s.height - 10);

        angl += f;
        if (angl > reset) angl = s.HALF_PI;
        
        s.showFps();
    };
};

let simpleCircleRotatingSketch = new p5(simpleCircleRotating, 'simple-circle-rotating-sketch');