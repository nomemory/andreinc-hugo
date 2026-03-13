let triangleInCircle = (s) => {
    // ... (Your existing variables)
    let isVisible = false;

    s.setup = () => {
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('triangle-in-circle-sketch');
        
        // --- Intersection Observer Logic ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    s.loop();
                } else {
                    s.noLoop();
                }
            });
        }, { threshold: 0.1 }); // Starts when 10% of canvas is visible

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
            showUnits: true, showOrigin: true, showY: true, showX: true
        });
        cBuff.stroke(theme.lightCircleColor);
        cBuff.noFill();
        cBuff.circle(vC.x, vC.y, d);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);

        let sAng = s.sin(ang);
        let cCos = s.cos(ang); // Fixed: named cos for clarity
        let rSin = sAng * r;
        let rCos = cCos * r;

        vP.set(vC.x + rSin, vC.y + rCos);
        vPP.set(vC.x - rSin, vC.y - rCos);
        
        // Lines
        s.stroke(dotLCol);
        s.line(vC.x, vC.y, vP.x, vP.y);
        s.line(vC.x, vC.y, vPP.x, vPP.y);

        // Arcs
        s.noFill();
        s.stroke(rCCol);
        let offsetAng = s.HALF_PI - ang;
        s.arc(vC.x, vC.y, d, d, offsetAng, 0);
        s.arc(vC.x, vC.y, d, d, -s.HALF_PI - ang, -s.PI);

        // Theta Arc & Text
        s.fill(theme.thetaColorLight);
        s.stroke(theme.thetaColor);
        let arcSize = d / 6;
        s.arc(vC.x, vC.y, arcSize, arcSize, (1.5 * s.PI) - ang, offsetAng);
        
        s.fill(theme.thetaColor);
        s.noStroke();
        s.text('θ=180°', vC.x + sAng * (r/2), vC.y + cCos * (r/2));
        
        // Labels
        s.fill(255); // Or your theme color
        s.text('A', vP.x + 5, vP.y + 5);
        s.text('A\'', vPP.x + 5, vPP.y + 5);

        // Points
        s.circle(vP.x, vP.y, 3);
        s.circle(vPP.x, vPP.y, 3);

        ang += f;
        if (ang > reset) ang = s.HALF_PI;
        
        s.showFps();
    };
};

let triangleInCircleSketch = new p5(triangleInCircle, 'triangle-in-circle-sketch');