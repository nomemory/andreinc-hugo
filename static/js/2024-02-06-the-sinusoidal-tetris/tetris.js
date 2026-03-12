/**
 Copyright (c) 2024 Andrei N. Ciobanu (www.andreinc.net)
 */

window.suggestions = true;
window.dropInc = 0.2;

const tetris = (s) => {

    // -----------------------------------------------------------------------
    // Game constants
    // -----------------------------------------------------------------------

    const frameRate = 30; 
    const unit = 50; 
    const radius = unit; 
    const increment = 0.05; 

    const canPId = "tetris-sketch"; 
    const canW = 16 * unit; 
    const canH = 16 * unit; 
    const canFront = "monospace"; // Using monospace for a technical, crisp look

    const mBuffW = canW; 
    const mBuffH = canH; 
    const gBuffW = 8 * unit; 
    const gBuffH = 12 * unit; 
    const cBuffW = 4 * unit; 
    const cBuffH = 6 * unit; 
    const sBuffW = 4 * unit; 
    const sBuffH = 4 * unit; 
    const kBuffW = 13 * unit; 
    const kBuffH = unit; 
    
    const kBuffNumKeys = 7;
    const defeatW = 200;
    const defeatH = 110;
    const numResids = 4;
    const winThresh = unit / 3;

    // Buffers orientation
    const gBuffTTO = s.createVector(6 * unit, 2 * unit); 
    const cBuffTTO = s.createVector(unit, 2 * unit); 
    const sBuffTTO = s.createVector(unit, 10 * unit); 

    const defDropSinsA = 1; 
    const defDropSinsFreq = 1; 
    const defDropSinsPhase = 0; 
    const defDropSinsAngl = 0; 
    const dropSinsFreqInc = 0.1; 
    const dropSinsAInc = 0.1; 
    const dropSinsPhaseInc = 0.1; 
    const dropSinsMaxA = 1.5; 
    const dropSinsMinA = 0.5; 
    const dropSinsMaxFreq = 10; 
    const dropSinsMinFreq = 0.1; 
    const dropSinsMaxPhase = Math.PI * 2; 
    const dropSinsSamplesLen = Math.round(gBuffW / unit / increment);
    const dropSinsMinPhase = 0; 
    const dropSinsCenterDiam = 6; 
    const defDropSinsX = cBuffW / 2; 
    const defDropSinsY = dropSinsMaxA * radius; 

    const arrowHead = 7; 
    const stepX = increment * radius; 

    // Strict Monochrome Color Palette
    const colors = {
        background: '#EAEAEA', 
        panelStroke: '#111111', 
        gBufAxis: '#DDDDDD', 
        cBuffGraphLine: '#DDDDDD',
        dropSinsCircle: '#111111', 
        dropSinsCirclePhase: 'rgba(0, 0, 0, 0.05)', 
        dropSinsCircleCenter: '#333333',
        dropSinsMovingPoint: '#333333', 
        keyHighlight: '#111111', 
        keyHover: '#F4F4F4',
        dropSins: '#000000', 
        dropSinsOX: '#CCCCCC', 
        residSins: '#444444', 
        mergePlus: '#333333', 
        mergeMinus: '#888888', 
        conLine: '#AAAAAA', 
        textColor: '#111111',
        defeatColor: '#FFFFFF', 
        defeatBorderColor: '#111111', 
        defeatTextColor: '#111111',
        winColor: '#FFFFFF', 
        winBorderColor: '#111111', 
        winTextColor: '#111111',
        buttonFill: '#FFFFFF', 
        buttonStroke: '#111111'
    };

    const keys = { a: 65, z: 90, s: 83, x: 88, q: 81, w: 87, p: 80 };
    const gameStates = Object.freeze({ DROP: 1, MERGE: 2, DEFEAT: 3, WIN: 4 });

    let canvas, gBuff, cBuff, sBuff, kBuff;
    let cDropSins; 
    let cResidSins = new Float32Array(dropSinsSamplesLen); 
    let cResidSinsSugg = []; 
    let cResidMax = 0; 
    let cMergeIdx = 0; 
    let cGameState = gameStates.DROP; 
    let lScore = 0, lStage = 0, cStage = 0, cScore = 0;
    let mInside = []; 

    // -----------------------------------------------------------------------
    // Core Engine Logic
    // -----------------------------------------------------------------------

    let computeDropSinsSamples = (dS) => {
        const freq = dS.freq, phase = dS.phase, ampRad = dS.amp * radius;
        for (let i = 0; i < dropSinsSamplesLen; i++) {
            dS.samples[i] = Math.sin(freq * (i * increment) + phase) * ampRad;
        }
    }

    let computeDropSinsMovingRadius = (dS) => {
        dS.movRad = {
            x: dS.pos.x + Math.cos(dS.angl * dS.freq + dS.phase) * dS.amp * radius,
            y: dS.pos.y - Math.sin(dS.angl * dS.freq + dS.phase) * dS.amp * radius
        };
    }

    let createDropSins = (amp, freq, phase, pos, angl) => {
        let r = { amp, freq, phase, pos, angl, samples: new Float32Array(dropSinsSamplesLen) };
        computeDropSinsSamples(r);
        computeDropSinsMovingRadius(r);
        return r;
    }

    let createDefaultDropSins = () => {
        return createDropSins(defDropSinsA, defDropSinsFreq, defDropSinsPhase, { x: defDropSinsX + unit, y: defDropSinsY + defDropSinsA * radius }, defDropSinsAngl);
    }

    let createRandomDropSins = () => {
        return createDropSins(random(dropSinsMinA, dropSinsMaxA*0.7), random(dropSinsMinFreq, dropSinsMaxFreq), random(dropSinsMinPhase, dropSinsMaxPhase), { x: defDropSinsX + unit, y: defDropSinsY + defDropSinsA * radius }, defDropSinsAngl);
    }

    let createRandomResidSins = () => {
        let r = new Float32Array(dropSinsSamplesLen);
        cResidSinsSugg = [];
        for (let j = 0; j < numResids; j++) {
            const dS = createRandomDropSins();
            cResidSinsSugg.push(createDropSins(dS.amp, dS.freq, dS.phase + Math.PI, dS.pos, dS.angl));
            for (let i = 0; i < dropSinsSamplesLen; i++) {
                r[i] += dS.samples[i];
                if (Math.abs(r[i]) > cResidMax) cResidMax = Math.abs(r[i]);
            }
        }
        return r;
    }

    let mergeResidSinsWithDropSins = () => {
        cResidMax = 0;
        for (let i = 0; i < dropSinsSamplesLen; i++) {
            cResidSins[i] += cDropSins.samples[i];
            cScore += gBuffH / 2 - Math.abs(cResidSins[i]);
            if (Math.abs(cResidSins[i]) > cResidMax) cResidMax = Math.abs(cResidSins[i]);
        }
        cStage++;
        cResidSinsSugg.pop();
    }

    // -----------------------------------------------------------------------
    // UI Drawing Functions
    // -----------------------------------------------------------------------

    let initCanvas = () => {
        canvas = s.createCanvas(canW, canH);
        canvas.parent(canPId);
        s.textFont(canFront);
        s.frameRate(frameRate);
    }

    let initGameBuffer = () => { gBuff = s.createGraphics(gBuffW, gBuffH); }
    let initCircleBuffer = () => { cBuff = s.createGraphics(cBuffW, cBuffH); }
    let initScoreBuffer = () => { sBuff = s.createGraphics(sBuffW, sBuffH); }
    let initKeyBuffer = () => { kBuff = s.createGraphics(kBuffW, kBuffH); }

    // Renders the floating card effect behind the game areas
    const drawPanel = (x, y, w, h, r = 12) => {
        s.push();
        s.drawingContext.shadowOffsetX = 0;
        s.drawingContext.shadowOffsetY = 8;
        s.drawingContext.shadowBlur = 16;
        s.drawingContext.shadowColor = 'rgba(0,0,0,0.1)';

        s.fill('#FFFFFF');
        s.stroke(colors.panelStroke);
        s.strokeWeight(2);
        s.rect(x, y, w, h, r);
        s.pop();
    };

    let drawCircleBuffer = () => {
        cBuff.clear();
        cBuff.push();
        cBuff.stroke(colors.cBuffGraphLine);
        cBuff.strokeWeight(2);
        cBuff.line(cBuffW / 2, 0, cBuffW / 2, cBuffH);
        cBuff.pop();
        drawCoordinatesToBuffer(cBuff, cBuffW, cBuffH, unit);
    }

    let drawGameBuffer = () => {
        gBuff.clear();
        drawCoordinatesToBuffer(gBuff, gBuffW, gBuffH, unit);
        
        let halfBuffer = gBuffH / 2;
        gBuff.push();
        gBuff.noFill();
        gBuff.stroke(colors.gBufAxis);
        gBuff.strokeWeight(2);
        gBuff.line(0, halfBuffer, gBuffW, halfBuffer);
        gBuff.pop();
        
        gBuff.push();
        gBuff.noFill();
        gBuff.stroke(colors.residSins);
        gBuff.strokeWeight(2);
        gBuff.beginShape();
        for (let i = 0; i < dropSinsSamplesLen; i++) {
            gBuff.vertex(i * stepX, halfBuffer - cResidSins[i]);
        }
        gBuff.endShape();
        gBuff.pop();
    }

    let drawScoreBuffer = () => {
        sBuff.clear();
        sBuff.push();

        // Header Background
        sBuff.fill('#F8F9FA');
        sBuff.noStroke();
        sBuff.rect(0, 0, sBuffW, 40, 10, 10, 0, 0); 
        sBuff.stroke(colors.panelStroke);
        sBuff.strokeWeight(2);
        sBuff.line(0, 40, sBuffW, 40);

        // Header Text
        sBuff.fill(colors.textColor);
        sBuff.textAlign(s.CENTER, s.CENTER);
        sBuff.textFont(canFront);
        sBuff.textSize(16);
        sBuff.textStyle(s.BOLD);
        sBuff.text("SCOREBOARD", sBuffW / 2, 20);

        sBuff.fill(colors.textColor);
        sBuff.textAlign(s.LEFT, s.BASELINE);
        sBuff.textSize(13);
        sBuff.textStyle(s.NORMAL);

        let padX = 20, startY = 75, rowH = 28;

        // Current Stats Labels
        sBuff.text("Current Score", padX, startY);
        sBuff.text("Stage Level", padX, startY + rowH);
        sBuff.text("Drop Speed", padX, startY + rowH * 2);

        // Current Stats Values (Aligned Right)
        sBuff.textAlign(s.RIGHT, s.BASELINE);
        sBuff.textStyle(s.BOLD);
        sBuff.text((cScore / 1000).toFixed(2), sBuffW - padX, startY);
        sBuff.text(cStage, sBuffW - padX, startY + rowH);
        sBuff.text(window.dropInc, sBuffW - padX, startY + rowH * 2);

        // Divider Line
        sBuff.stroke('#EEEEEE');
        sBuff.strokeWeight(1);
        sBuff.line(padX, startY + rowH * 2 + 15, sBuffW - padX, startY + rowH * 2 + 15);

        // Previous Stats Labels
        sBuff.noStroke();
        sBuff.fill('#777777');
        sBuff.textAlign(s.LEFT, s.BASELINE);
        sBuff.textStyle(s.NORMAL);
        sBuff.text("Prev Score", padX, startY + rowH * 4 - 5);
        sBuff.text("Prev Stage", padX, startY + rowH * 5 - 5);

        // Previous Stats Values
        sBuff.textAlign(s.RIGHT, s.BASELINE);
        sBuff.textStyle(s.BOLD);
        sBuff.text((lScore / 1000).toFixed(2), sBuffW - padX, startY + rowH * 4 - 5);
        sBuff.text(lStage, sBuffW - padX, startY + rowH * 5 - 5);

        sBuff.pop();
    }

    let drawDropSins = () => {
        s.push();
        s.fill(colors.dropSinsCirclePhase);
        s.stroke(colors.dropSinsCircle);
        s.strokeWeight(2);
        s.arc(cDropSins.pos.x, cDropSins.pos.y, cDropSins.amp * 2 * unit - 2, cDropSins.amp * 2 * unit - 2, -cDropSins.phase, 0);
        s.pop();
        
        s.push();
        const x1 = cDropSins.pos.x;
        const y1 = cDropSins.pos.y - cDropSins.amp * unit;
        const x2 = cDropSins.pos.x + gBuffW / 2 + unit + gBuffW;
        s.beginShape(s.LINES);
        s.noFill();
        s.stroke(colors.conLine);
        s.vertex(x1, y1);
        s.vertex(x2, y1);
        s.vertex(x1, cDropSins.pos.y + cDropSins.amp * unit);
        s.vertex(x2, cDropSins.pos.y + cDropSins.amp * unit);
        s.endShape();
        s.pop();

        s.push();
        s.stroke(colors.dropSinsOX);
        s.strokeWeight(2);
        s.translate(gBuffTTO.x, 0);
        s.line(0, cDropSins.pos.y, gBuffW, cDropSins.pos.y);
        s.pop();

        s.push();
        s.noFill();
        s.stroke(colors.dropSinsCircle);
        s.strokeWeight(2);
        s.circle(cDropSins.pos.x, cDropSins.pos.y, cDropSins.amp * radius * 2);
        s.noStroke();
        s.fill(colors.dropSinsCircleCenter);
        s.circle(cDropSins.pos.x, cDropSins.pos.y, dropSinsCenterDiam);
        s.pop();

        s.push();
        s.stroke(colors.dropSinsMovingPoint);
        s.strokeWeight(2);
        s.line(cDropSins.pos.x, cDropSins.pos.y, cDropSins.movRad.x, cDropSins.movRad.y);
        s.fill(colors.dropSinsMovingPoint);
        s.circle(cDropSins.movRad.x, cDropSins.movRad.y, 5);
        s.pop();

        s.push();
        s.translate(gBuffTTO.x, gBuffTTO.y);
        s.stroke(colors.dropSins);
        s.strokeWeight(3);
        s.noFill();
        
        // Crisp drop shadow for the main sine wave
        s.drawingContext.shadowOffsetX = 2;
        s.drawingContext.shadowOffsetY = 2;
        s.drawingContext.shadowBlur = 4;
        s.drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
        
        s.beginShape();
        for (let i = 0; i < dropSinsSamplesLen; i++) {
            s.vertex(i * stepX, cDropSins.pos.y - 2 * unit - cDropSins.samples[i]);
        }
        s.endShape();
        s.pop();

        let cSugg = cResidSinsSugg[cResidSinsSugg.length - 1];
        if (cSugg !== undefined && window.suggestions) {
            s.push();
            s.translate(gBuffTTO.x, gBuffTTO.y);
            s.stroke(colors.conLine);
            s.strokeWeight(2);
            s.noFill();
            s.drawingContext.setLineDash([5, 5]); 
            s.beginShape();
            for (let i = 0; i < dropSinsSamplesLen; i++) {
                s.vertex(i * stepX, cDropSins.pos.y - 2 * unit - cSugg.samples[i]);
            }
            s.endShape();
            s.pop();
        }

        s.push();
        s.fill(colors.textColor);
        s.textFont(canFront);
        s.textSize(12);
        const textX = cDropSins.pos.x + gBuffW / 2 + gBuffW - unit / 2;
        const textY = cDropSins.pos.y - cDropSins.amp * unit - 10;
        s.text("A = " + cDropSins.amp.toFixed(2), textX, textY);
        s.pop();

        s.push();
        s.fill(colors.textColor);
        s.stroke(colors.textColor);
        const arrowX1 = textX - 10;
        const arrowY1 = textY + 10;
        arrow(arrowX1, textY - unit / 2, arrowX1, arrowY1, arrowHead);
        arrow(arrowX1, cDropSins.pos.y + cDropSins.amp * unit + unit / 2, arrowX1, cDropSins.pos.y + cDropSins.amp * unit, arrowHead);
        s.pop();

        s.push();
        s.fill(colors.textColor);
        s.textFont(canFront);
        s.textSize(12);
        s.text("φ= " + cDropSins.phase.toFixed(2), cDropSins.pos.x + cDropSins.amp * unit + 10, cDropSins.pos.y);
        s.pop();

        s.push();
        s.fill(colors.textColor);
        s.textFont(canFront);
        s.textSize(12);
        s.text("ω= " + cDropSins.freq.toFixed(2), cDropSins.movRad.x + 8, cDropSins.movRad.y + 8);
        s.pop();
    }

    let drawMerge = () => {
        let sum = cDropSins.samples[cMergeIdx] + cResidSins[cMergeIdx];
        let halfBuffer = gBuffH / 2;
        let x1 = cMergeIdx * stepX;
        let y1 = halfBuffer - cResidSins[cMergeIdx];
        let y2 = halfBuffer - sum;
        let cColor = (sum > cResidSins[cMergeIdx]) ? colors.mergePlus : colors.mergeMinus;
        gBuff.push();
        gBuff.strokeWeight(2);
        gBuff.stroke(cColor);
        gBuff.line(x1, y1, x1, y2);
        gBuff.pop();
    }

    let drawOverlay = (title, msg1, msg2) => {
        gBuff.push();
        let w = defeatW + 40;
        let h = defeatH + 20;
        const x = (gBuffW - w) / 2;
        const y = (gBuffH - h) / 2;
        
        gBuff.drawingContext.shadowOffsetX = 0;
        gBuff.drawingContext.shadowOffsetY = 10;
        gBuff.drawingContext.shadowBlur = 20;
        gBuff.drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
        
        gBuff.fill('#FFFFFF');
        gBuff.stroke('#111111');
        gBuff.strokeWeight(3);
        gBuff.rect(x, y, w, h, 12);
        gBuff.pop();
        
        gBuff.push();
        gBuff.fill('#111111');
        gBuff.textFont(canFront);
        gBuff.textAlign(s.CENTER, s.CENTER);
        gBuff.textStyle(s.BOLD);
        gBuff.textSize(22);
        gBuff.text(title, gBuffW / 2, y + 30);
        
        gBuff.textStyle(s.NORMAL);
        gBuff.textSize(14);
        gBuff.text(msg1, gBuffW / 2, y + 65);
        gBuff.text(msg2, gBuffW / 2, y + 85);
        
        gBuff.fill('#666666');
        gBuff.textSize(12);
        gBuff.text("Press DROP to restart", gBuffW / 2, y + 115);
        gBuff.pop();
    }

    let drawDefeat = () => drawOverlay("GAME OVER", "Score: " + (cScore / 1000).toFixed(2), "Stages: " + cStage);
    let drawWin = () => drawOverlay("YOU WIN!", "Score: " + (cScore / 1000).toFixed(2), "Stages: " + cStage);

    let dropped = () => cDropSins.pos.y >= canH / 2;
    let merged = () => cMergeIdx >= dropSinsSamplesLen;
    let defeat = () => cResidMax > gBuffH / 2;
    let win = () => cResidMax < winThresh;

    let newGameReset = () => {
        cDropSins = createDefaultDropSins();
        cResidMax = 0;
        cResidSins = createRandomResidSins();
        drawGameBuffer();
        lScore = cScore;
        lStage = cStage;
        cScore = 0;
        cStage = 1;
    }

    let dropNow = () => {
        if (cGameState === gameStates.DROP) {
            cDropSins.pos.y = canH / 2;
        } else if (cGameState === gameStates.MERGE) {
            for (; cMergeIdx < dropSinsSamplesLen; cMergeIdx++) drawMerge();
        } else if (cGameState === gameStates.DEFEAT || cGameState === gameStates.WIN) {
            newGameReset();
            drawScoreBuffer();
            cGameState = gameStates.DROP;
        }
    }

    let ampInc = () => { if (cDropSins.amp < dropSinsMaxA) { cDropSins.amp += dropSinsAInc; computeDropSinsSamples(cDropSins); computeDropSinsMovingRadius(cDropSins); } };
    let ampDec = () => { if (cDropSins.amp > dropSinsMinA) { cDropSins.amp -= dropSinsAInc; computeDropSinsSamples(cDropSins); computeDropSinsMovingRadius(cDropSins); } };
    let freqInc = () => { if (cDropSins.freq < dropSinsMaxFreq) { cDropSins.freq += dropSinsFreqInc; computeDropSinsSamples(cDropSins); computeDropSinsMovingRadius(cDropSins); } };
    let freqDec = () => { if (cDropSins.freq > dropSinsMinFreq) { cDropSins.freq -= dropSinsFreqInc; computeDropSinsSamples(cDropSins); computeDropSinsMovingRadius(cDropSins); } };
    let phaseInc = () => { cDropSins.phase += dropSinsPhaseInc; computeDropSinsSamples(cDropSins); computeDropSinsMovingRadius(cDropSins); }
    let phaseDec = () => { cDropSins.phase -= dropSinsPhaseInc; computeDropSinsSamples(cDropSins); computeDropSinsMovingRadius(cDropSins); }

    let buttonChange = () => {
        for (let i = 0; i < kBuffNumKeys; i++) {
            if (mInside[i].isMouseHover(s.mouseX, s.mouseY)) mInside[i].action();
        }
    }

    let keyboardChange = () => {
        if (s.keyIsDown(keys.a)) ampInc()
        else if (s.keyIsDown(keys.z)) ampDec()
        else if (s.keyIsDown(keys.s)) freqInc();
        else if (s.keyIsDown(keys.x)) freqDec();
        else if (s.keyIsDown(keys.q)) phaseInc();
        else if (s.keyIsDown(keys.w)) phaseDec();
    };

    const mpActions = [ampInc, ampDec, freqInc, freqDec, phaseInc, phaseDec, dropNow]
    let initMInside = () => {
        let gap = 14;
        let bW = (kBuffW - gap * (kBuffNumKeys - 1)) / kBuffNumKeys;

        for (let i = 0; i < kBuffNumKeys; i++) {
            mInside[i] = {
                isMouseHover: (x, y) => {
                    let bx = unit + i * (bW + gap);
                    let by = 14.5 * unit + 4;
                    let bH = unit - 8;
                    return (x >= bx) && (x <= bx + bW) && (y >= by) && (y <= by + bH);
                },
                action: mpActions[i]
            }
        }
    }

    const mpLabels = ["A++", "A--", "ω++", "ω--", "φ++", "φ--", "DROP"];
    
    // Improved Neubrutalism Monochrome Buttons
    let drawKeyBuffer = () => {
        kBuff.clear();
        let gap = 14;
        let bW = (kBuffW - gap * (kBuffNumKeys - 1)) / kBuffNumKeys;

        for (let i = 0; i < kBuffNumKeys; i++) {
            let bx = i * (bW + gap);
            let by = 4; // Padding for the 3D click effect
            let bH = unit - 8;

            let isHover = mInside[i].isMouseHover(s.mouseX, s.mouseY);
            let isPressed = s.mouseIsPressed && isHover;

            kBuff.push();

            // Static background shadow for 3D effect
            if (!isPressed) {
                kBuff.fill('#B0B0B0');
                kBuff.noStroke();
                kBuff.rect(bx + 3, by + 3, bW, bH, 6);
            }

            // Foreground Button movement
            if (isPressed) {
                kBuff.fill(colors.keyHighlight);
                kBuff.translate(2, 2); // Simulates physical button depression
            } else if (isHover) {
                kBuff.fill(colors.keyHover);
            } else {
                kBuff.fill(colors.buttonFill);
            }
            
            kBuff.stroke(colors.buttonStroke);
            kBuff.strokeWeight(2);
            kBuff.rect(bx, by, bW, bH, 6); 
            
            // Text alignment strictly to center
            kBuff.noStroke();
            kBuff.fill(isPressed ? '#FFFFFF' : colors.textColor);
            kBuff.textFont(canFront);
            if (i === 6) kBuff.textStyle(s.BOLD);
            kBuff.textSize(14);
            kBuff.textAlign(s.CENTER, s.CENTER);
            kBuff.text(mpLabels[i], bx + bW / 2, by + bH / 2);
            
            kBuff.pop();
        }
    }

    s.setup = () => {
        cDropSins = createDefaultDropSins();
        cResidSins = createRandomResidSins();

        initCanvas();
        initGameBuffer();
        initCircleBuffer();
        initScoreBuffer();
        initKeyBuffer();
        initMInside();

        drawCircleBuffer();
        drawGameBuffer();
        drawScoreBuffer();
    }

    s.draw = () => {
        s.background(colors.background);
        
        // Draw the sleek floating cards directly to the main canvas
        drawPanel(6 * unit, 2 * unit, gBuffW, gBuffH);
        drawPanel(unit, 2 * unit, cBuffW, cBuffH);
        drawPanel(unit, 10 * unit, sBuffW, sBuffH);

        // Overlay transparent buffers containing the graphics
        s.image(gBuff, 6 * unit, 2 * unit);
        s.image(cBuff, unit, 2 * unit);
        s.image(sBuff, unit, 10 * unit);
        
        // Continuously update button interactions
        drawKeyBuffer();
        s.image(kBuff, unit, 14.5 * unit);

        if (cGameState === gameStates.DROP) {
            drawDropSins();
            computeDropSinsMovingRadius(cDropSins);
            cDropSins.pos.y += window.dropInc;
            cDropSins.angl += increment;
            
            keyboardChange();
            if (s.mouseIsPressed) buttonChange();

            if (dropped()) {
                drawScoreBuffer();
                cGameState = gameStates.MERGE;
            }
        } else if (cGameState === gameStates.MERGE) {
            drawDropSins();
            drawMerge();
            cMergeIdx++;

            if (merged()) {
                mergeResidSinsWithDropSins();
                
                if (defeat()) {
                    cGameState = gameStates.DEFEAT;
                } else if (win()) {
                    cGameState = gameStates.WIN;
                } else {
                    cDropSins = createRandomDropSins();
                    drawGameBuffer();
                    drawScoreBuffer();
                    cMergeIdx = 0;
                    cGameState = gameStates.DROP;
                }
            }
        } else if (cGameState === gameStates.DEFEAT) {
            drawDefeat();
        } else if (cGameState === gameStates.WIN) {
            drawWin();
        }
    }

    s.keyPressed = () => { if (s.keyCode == keys.p) dropNow(); }
    s.mouseReleased = () => { if (mInside[6].isMouseHover(s.mouseX, s.mouseY)) mInside[6].action(); }
    s.touchReleased = () => { if (mInside[6].isMouseHover(s.mouseX, s.mouseY)) mInside[6].action(); }

    let drawCoordinatesToBuffer = (buff, buffW, buffH, unit) => {
        let hSteps = buffH / unit;
        buff.push(); buff.noFill(); buff.stroke(colors.gBufAxis); buff.beginShape(s.LINES);
        for (let i = 0; i < hSteps; i++) { buff.vertex(0, i * unit); buff.vertex(buffW, i * unit); }
        buff.endShape(); buff.pop();
        
        let vSteps = buffW / unit;
        buff.push(); buff.noFill(); buff.stroke(colors.gBufAxis); buff.beginShape(s.LINES);
        for (let i = 0; i < vSteps; i++) { buff.vertex(i * unit, 0); buff.vertex(i * unit, buffH); }
        buff.endShape(); buff.pop();
    }

    let random = (min, max) => Math.random() * (max - min) + min;

    let arrow = (x1, y1, x2, y2, size) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        const d = s.dist(x1, y1, x2, y2);
        s.push();
        s.translate(x1, y1);
        s.rotate(angle);
        s.line(0, 0, d, 0);
        s.triangle(d, 0, d - size, -size / 3, d - size, size / 3);
        s.pop();
    }
}

let tetrisSketch = new p5(tetris, "tetris-sketch");

const suggBtn = document.querySelector("#suggestions");
const turnBtn = document.querySelector("#turnBased");

suggBtn.onclick = () => { window.suggestions = suggBtn.checked; };
turnBtn.onclick = () => { window.dropInc = turnBtn.checked ? 0 : 0.2; }