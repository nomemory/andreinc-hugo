const rotatingPi = (s) => {

    addShowFps(s);
    addPaintGrid(s);
    addPauseLoop(s);

    const w = 425;
    const h = 175;
    const d = 100;
    const r = d / 2; 
    const f = theme.frequency; 
    const xOff = r; 
    const twoPiR = s.TWO_PI * r;

    let ang = 0; 
    let vC, vM;  
    let buff;    
    let isResetting = false;

    s.setup = () => {
        const canvas = s.createCanvas(w, h);
        canvas.parent('rotating-PI-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        // Initialise vectors
        vC = s.createVector(xOff, h / 2);
        vM = s.createVector(vC.x + s.sin(ang) * r, vC.y + s.cos(ang) * r);

        // Circle Buffer
        buff = s.createGraphics(w, h);
        let vPgo = s.createVector(vC.x, vC.y + r);
        let pGProps = {
            showUnits: true,
            showOrigin: true,
            showY: false,
            showX: true
        };
        s.paintGrid(buff, s.width, s.height, vPgo, r / 2, 2, pGProps);

        // --- Intersection Observer ---
        // We place this at the end of setup so canvas.elt is definitely ready
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Only start looping if the sketch is on screen 
                // AND we aren't currently in the middle of a 3-second reset pause
                if (entry.isIntersecting && !isResetting) {
                    s.loop();
                } else {
                    s.noLoop();
                }
            });
        }, { threshold: 0.05 }); // Triggers when 5% is visible

        observer.observe(canvas.elt);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);
        
        // 1. Static-style elements (Rolling circle outline)
        s.noFill();
        s.stroke(theme.lightCircleColor || 200);
        s.circle(vC.x, vC.y, d);

        // 2. Path traveled line (Green line on x-axis)
        s.stroke(theme.thetaColor);
        s.strokeWeight(3);
        s.line(xOff, h / 2 + r, vC.x, h / 2 + r);

        // 3. Moving point
        s.fill(theme.thetaColor);
        s.noStroke();
        s.circle(vM.x, vM.y, 5);

        // Update logic (only if not in reset phase)
        if (!isResetting) {
            vC.x += f * r;
            ang -= f;
            vM.set(vC.x + s.sin(ang) * r, vC.y + s.cos(ang) * r);
        }

        // Reset Logic
        if (vC.x > twoPiR + xOff) {
            isResetting = true;
            
            // Display 2π label
            s.fill(theme.thetaColor);
            s.text("2π", xOff + s.PI * r, h / 2 + r - 15);
            
            s.noLoop(); // Pause the animation clock
            
            setTimeout(() => {
                vC.x = xOff;
                ang = 0;
                vM.set(vC.x + s.sin(ang) * r, vC.y + s.cos(ang) * r);
                isResetting = false;
                
                // Re-start the loop ONLY if it's still visible
                // (The observer will have handled the state if we scrolled away)
                s.loop(); 
            }, 3000);
        }
        
        s.showFps();
    };
}

let rotatingPISketch = new p5(rotatingPi, 'rotating-PI-sketch');