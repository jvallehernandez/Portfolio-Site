// Animation functions

function startTruckAnimation() {
    const container = document.getElementById("truckAnimation");
    if (!container) return;
  
    anim.truck.shouldStopAfterPass = false;
  
    container.innerHTML = "";
    container.style.whiteSpace = "pre";
    container.style.fontFamily = "monospace";
    container.style.overflow = "hidden";
  
    // ASCII truck (3 lines)
    const truck = [
        "      .--.",
        " .----'   '--.",
        " '-()-----()-'"    
    ];
  
    const probe = document.createElement("span");
    probe.textContent = "M";
    probe.style.visibility = "hidden";
    probe.style.position = "absolute";
    probe.style.fontFamily = "monospace";
    container.appendChild(probe);
  
    const charWidth = probe.getBoundingClientRect().width || 10;
    probe.remove();
  
    const cols = Math.max(40, Math.floor(container.clientWidth / charWidth));
  
    const output = document.createElement("div");
    output.className = "truck-animation";
    output.style.whiteSpace = "pre";
    container.appendChild(output);
  
    let pos = -truck[2].length;
    let roadOffset = 0;
  
    // ===== SPEED CONTROL =====
    const FPS = 24;
    const FRAME_TIME = 1000 / FPS;
    let lastTime = 0;
  
    function renderFrame(now) {
        // Check if animation should be stopped
        if (anim.truck.shouldStopAfterPass && pos > cols) {
            anim.truck.rafId = null;
            return; // Stop animation
        }
        
        if (now - lastTime < FRAME_TIME) {
            anim.truck.rafId = requestAnimationFrame(renderFrame);
            return;
        }
        lastTime = now;
    
        // Build road (dotted lane)
        let road = "";
        for (let i = 0; i < cols; i++) {
            road += ((i + roadOffset) % 2 === 0) ? "·" : " ";
        }
    
        const lines = ["", "", ""];
    
        for (let row = 0; row < 3; row++) {
            let base = (row === 2) ? road : " ".repeat(cols);
    
            const t = truck[row];
            const start = Math.max(0, pos);
            const end = Math.min(cols, pos + t.length);
    
            if (end > start) {
                const sliceStart = Math.max(0, -pos);
                const slice = t.slice(sliceStart, sliceStart + (end - start));
                base = base.slice(0, start) + slice + base.slice(end);
            }
    
            lines[row] = base;
        }
    
        output.textContent = lines.join("\n");
    
        pos += 1;
        roadOffset += 2;               
    
        if (pos > cols) {
            if (anim.truck.shouldStopAfterPass) {
                anim.truck.rafId = null;
                return; // Stop animation
            }
            pos = -truck[2].length;
        }
    
        anim.truck.rafId = requestAnimationFrame(renderFrame);
    }
  
    anim.truck.rafId = requestAnimationFrame(renderFrame);
    
    // Store stop function
    anim.truck.stop = function() {
        if (anim.truck.rafId) {
            cancelAnimationFrame(anim.truck.rafId);
            anim.truck.rafId = null;
        }
    };
}

function startExitStoryAnimation() {
    // Create container for exit story
    const storyContainer = document.createElement('div');
    storyContainer.className = 'exit-story-container';
    storyContainer.style.whiteSpace = 'pre';
    storyContainer.style.fontFamily = 'monospace';
    storyContainer.style.color = '#27c93f';
    storyContainer.style.margin = '2rem 0';
    storyContainer.style.lineHeight = '1.2';
    terminal.appendChild(storyContainer);
    
    // ASCII art definitions 
    const house = [
        ' ____',
        '/____\\',
        '|[] .|',
        "'----'"
    ];
    
    const truck = [
        "      .--.",
        " .----'   '--.",
        " '-()-----()-'"
    ];
    
    const father = [
        "    '_'",
        "   /[]\\",
        "    []",
        "    /\\ "
    ];
    
    const son = [
        "dad! -  \\o/",
        "         |",
        "        / \\ "
    ];
    
    const probe = document.createElement('span');
    probe.textContent = 'M';
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.style.fontFamily = 'monospace';
    storyContainer.appendChild(probe);
    const charWidth = probe.getBoundingClientRect().width || 10;
    probe.remove();
    
    const cols = Math.max(80, Math.floor(storyContainer.clientWidth / charWidth) || 80);
    
    // Positioning: All figures align at ground level
    const groundY = 9; // Ground level (where road is)
    const houseX = cols - 20; // House on the right
    const truckStopX = houseX - 45; // Truck stops here
    const fatherX = truckStopX + 18; // Father appears next to truck (to the right of truck)
    const sonX = houseX - 12; // Son appears next to house (to the right of house)
    
    const houseBaseY = groundY - house.length + 1; // House base at ground
    const truckBaseY = groundY - truck.length + 1; // Truck base at ground (road level)
    const fatherBaseY = groundY - father.length + 1; // Father feet at ground
    const sonBaseY = groundY - son.length + 1; // Son feet at ground
    
    let truckPos = -truck[2].length;
    let frame = 0;
    let roadOffset = 0;
    let stage = 'truck_arriving'; // truck_arriving, father_appearing, son_appearing, complete
    
    const FPS = 24;
    const FRAME_TIME = 1000 / FPS;
    let lastTime = 0;
    
    function renderStoryFrame(now) {
        if (now - lastTime < FRAME_TIME) {
            requestAnimationFrame(renderStoryFrame);
            return;
        }
        lastTime = now;
        
        const lines = Array(groundY + 1).fill(' '.repeat(cols));
        
        let road = "";
        for (let i = 0; i < cols; i++) {
            road += ((i + roadOffset) % 2 === 0) ? "·" : " ";
        }
        lines[groundY] = road;
        roadOffset += 2;
        
        // Always show house on the right
        for (let i = 0; i < house.length; i++) {
            const y = houseBaseY + i;
            if (y >= 0 && y < lines.length) {
                let line = lines[y];
                const start = houseX;
                const end = Math.min(cols, houseX + house[i].length);
                if (end > start) {
                    const slice = house[i].slice(0, end - start);
                    line = line.slice(0, start) + slice + line.slice(end);
                    lines[y] = line;
                }
            }
        }
        
        // Stage 1: Truck arriving
        if (stage === 'truck_arriving') {
            if (truckPos < truckStopX) {
                for (let i = 0; i < truck.length; i++) {
                    const y = truckBaseY + i;
                    if (y >= 0 && y < lines.length && truckPos + truck[i].length > 0) {
                        let line = lines[y];
                        const start = Math.max(0, truckPos);
                        const end = Math.min(cols, truckPos + truck[i].length);
                        if (end > start) {
                            const sliceStart = Math.max(0, -truckPos);
                            const slice = truck[i].slice(sliceStart, sliceStart + (end - start));
                            line = line.slice(0, start) + slice + line.slice(end);
                            lines[y] = line;
                        }
                    }
                }
                truckPos += 1;
                frame++;
            } else {
                // Truck has arrived, move to next stage
                stage = 'father_appearing';
                frame = 0;
            }
        }
        
        // Stage 2: Father appearing
        if (stage === 'father_appearing') {
            // Keep truck at stop position
            for (let i = 0; i < truck.length; i++) {
                const y = truckBaseY + i;
                if (y >= 0 && y < lines.length) {
                    let line = lines[y];
                    const start = truckStopX;
                    const end = Math.min(cols, truckStopX + truck[i].length);
                    if (end > start) {
                        const slice = truck[i].slice(0, end - start);
                        line = line.slice(0, start) + slice + line.slice(end);
                        lines[y] = line;
                    }
                }
            }
            
            // Fade in father (appear after a few frames)
            if (frame > 10) {
                for (let i = 0; i < father.length; i++) {
                    const y = fatherBaseY + i;
                    if (y >= 0 && y < lines.length) {
                        let line = lines[y];
                        const start = fatherX;
                        const end = Math.min(cols, fatherX + father[i].length);
                        if (end > start) {
                            const slice = father[i].slice(0, end - start);
                            line = line.slice(0, start) + slice + line.slice(end);
                            lines[y] = line;
                        }
                    }
                }
                
                if (frame > 30) {
                    stage = 'son_appearing';
                    frame = 0;
                }
            }
            frame++;
        }
        
        // Stage 3: Son appearing
        if (stage === 'son_appearing') {
            // Keep truck at stop position
            for (let i = 0; i < truck.length; i++) {
                const y = truckBaseY + i;
                if (y >= 0 && y < lines.length) {
                    let line = lines[y];
                    const start = truckStopX;
                    const end = Math.min(cols, truckStopX + truck[i].length);
                    if (end > start) {
                        const slice = truck[i].slice(0, end - start);
                        line = line.slice(0, start) + slice + line.slice(end);
                        lines[y] = line;
                    }
                }
            }
            
            // Keep father visible
            for (let i = 0; i < father.length; i++) {
                const y = fatherBaseY + i;
                if (y >= 0 && y < lines.length) {
                    let line = lines[y];
                    const start = fatherX;
                    const end = Math.min(cols, fatherX + father[i].length);
                    if (end > start) {
                        const slice = father[i].slice(0, end - start);
                        line = line.slice(0, start) + slice + line.slice(end);
                        lines[y] = line;
                    }
                }
            }
            
            // Fade in son next to house
            if (frame > 10) {
                for (let i = 0; i < son.length; i++) {
                    const y = sonBaseY + i;
                    if (y >= 0 && y < lines.length) {
                        let line = lines[y];
                        const start = sonX;
                        const end = Math.min(cols, sonX + son[i].length);
                        if (end > start) {
                            const slice = son[i].slice(0, end - start);
                            line = line.slice(0, start) + slice + line.slice(end);
                            lines[y] = line;
                        }
                    }
                }
                
                if (frame > 40) {
                    stage = 'complete';
                    setTimeout(() => {
                        addOutput('<span class="output-info">Thanks for visiting! Feel free to explore more.</span>');
                    }, 500);
                    return; // Stop animation
                }
            }
            frame++;
        }
        
        // Render all lines
        storyContainer.textContent = lines.join('\n');
        
        if (stage !== 'complete') {
            requestAnimationFrame(renderStoryFrame);
        }
    }
    
    // Start animation
    requestAnimationFrame(renderStoryFrame);
}

// Matrix rain background effect
function initMatrixBackground() {
    const matrixContainer = document.getElementById('matrixBackground');
    if (!matrixContainer) return;

    // Matrix characters (mix of alphanumeric and symbols)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');

    // Get container dimensions
    const container = document.querySelector('.terminal-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    
    // Create columns
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; 
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    matrixContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px monospace`;

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        // Color for matrix characters
        ctx.fillStyle = '#163f14';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }

    function resize() {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const newColumns = Math.floor(newWidth / fontSize);
        while (drops.length < newColumns) {
            drops.push(Math.random() * -100);
        }
        drops.splice(newColumns);
    }

    window.addEventListener('resize', resize);
    
    // Start animation
    setInterval(draw, 50);
}

