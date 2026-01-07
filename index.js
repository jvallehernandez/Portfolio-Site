
const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');
const cursor = document.getElementById('cursor');

let commandHistory = [];
let historyIndex = -1;

const anim = {
    truck: {
      rafId: null,
      stop: null,          // function to stop loop
      showTruck: true,   
      mode: "drive"        // "drive" | "hidden"
    }
  };
  
const projects = {
    'aura': {
        name: 'Aura-App',
        tech: 'Kotlin, Android Studio',
        date: 'Dec. 2025',
        details: [
            'Collaborated with a three person team to build a fitness and nutrition app, where I developed the Edamam API connection to access 100,000+ common foods for meal search and nutrition data.',
            'Improved UI/UX elements and layouts to support a dark themed user experience.'
        ]
    },
    'bitfit': {
        name: 'BitFit Health Tracker-App',
        tech: 'Kotlin, Android Studio',
        date: 'Oct. 2025',
        details: [
            'Created an app that logs meals, calories, and hydration storing user entries with local storage.',
            'Developed a dashboard interface using RecyclerView and Kotlin adapter to aggregate entries and display summaries of health metrics.'
        ]
    },
    'wordle': {
        name: 'Wordle-App',
        tech: 'Kotlin, Android Studio',
        date: 'Sep. 2025',
        details: [
            'Built full Wordle game mechanics including input handling, guess evaluation, and tile updates using RecyclerView adapters.',
            'Designed UI components using RecyclerView and Kotlin adapters, to deliver responsive interactions and game feedback.'
        ]
    },
    'resume-fox': {
        name: 'Resume-Fox',
        tech: 'Python, Typescript, MongoDB, MySQL',
        date: 'Jul. 2025',
        details: [
            'Responsible for the backend file ingestion pipeline within a four-person team resume analysis project, by extracting text (PDF, DOCX, TXT, MD) files, then converting the parsed content into structured JSON. Implemented logic to save results into MongoDB and MySQL to support LLM processing.'
        ]
    },
    'cyber': {
        name: 'Cyber Sentinel Challenge - Correlation One (DoD Sponsored)',
        tech: 'Kali Linux',
        date: 'Jun. 2025',
        details: [
            'One of the selected participants in a national DoD-sponsored challenge, leveraging Splunk, Nessus, Nmap, Wireshark, and OSINT techniques to analyze threats, identify vulnerabilities, and perform reconnaissance in hands on simulation labs.'
        ]
    },
    'stock': {
        name: 'Real-Time Stock Market Tracker (Yahoo Finance)',
        tech: 'Python, MongoDB, PHP, JS',
        date: 'May 2025',
        details: [
            'Scraped livestock data using requests and BeautifulSoup, storing updates in MongoDB.',
            'Built a PHP-based dashboard with Javascript sorting for stocks by price, symbol, and volume.'
        ]
    },
    'weather': {
        name: 'Automated Weather Data Scraper & XHTML Converter',
        tech: 'Python, Java, MySQL',
        date: 'Dec. 2024',
        details: [
            'Scraped real-time weather data via curl, converted to XHTML using TagSoup, and parsed with Python.',
            'Built a live dashboard with PHP + MySQL, displaying weather forecasts from weather.gov',
            'Automated scraping loop every 6 hours and debugged performance issues using GNU Debugger.'
        ]
    },
    'interpreter': {
        name: 'Custom Language Interpreter & Parser',
        tech: 'C++',
        date: 'Jun. 2023',
        details: [
            'Designed and implemented a lexical analyzer and recursive-descent parser in C++.',
            'Integrated the full interpreter pipeline including tokenization, parsing, and execution.',
            'Applied concepts like operator overloading, control structures, and evaluated language specific implementation of types, syntax, and control logic.'
        ]
    },
    'bookstore': {
        name: 'Bookstore Management System',
        tech: 'PHP, MySQL, Javascript',
        date: 'Dec. 2022',
        details: [
            'Engineered a full-stack web application for managing books, customers and order workflows.',
            'Implemented secure CRUD operations and fine-tuned SQL joins to enhance database performance.',
            'Deployed the system to NJIT-hosted servers using FileZilla and improved UX with real-time Javascript alerts.'
        ]
    }
};

function addOutput(content, className = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = content;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function typeText(text, className = 'output', speed = 10) {
    return new Promise((resolve) => {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        terminal.appendChild(line);
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                line.textContent += text[index];
                index++;
                terminal.scrollTop = terminal.scrollHeight;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

const commands = {
    help: () => {
        addOutput(`<div class="output-section">
            <div class="output-title">Available Commands:</div>
            <ul class="output-list">
                <li><span class="output-item-title">help</span> - Display this help message</li>
                <li><span class="output-item-title">whoami</span> - Learn about me</li>
                <li><span class="output-item-title">projects</span> - List all projects</li>
                <li><span class="output-item-title">project [name]</span> - View detailed project info (e.g., project aura)</li>
                <li><span class="output-item-title">contact</span> - Get contact information</li>
                <li><span class="output-item-title">clear</span> - Clear the terminal</li>
                <li><span class="output-item-title">exit</span> - Close the terminal</li>
            </ul>
        </div>`);
    },

    whoami: () => {
        addOutput(`<div class="output-section">
            <div class="output-title">About Me</div>
            <div class="output-item">
                My name is Jose Valle. I design and build backend systems. I care about how systems work, how data flows, and how decisions
                can be explained by numbers rather than assumptions. I focus on building APIs, data pipelines, automation, and reliable systems that are simple, measurable, and intentional.
            </div>
        </div>`);
    },

    projects: () => {
        let projectsList = '<div class="output-section"><div class="output-title">My Projects:</div><ul class="output-list">';
        Object.keys(projects).forEach(key => {
            const project = projects[key];
            projectsList += `<li><span class="output-item-title">${project.name}</span> <span class="output-item-detail">(${project.tech}) - ${project.date}</span></li>`;
        });
        projectsList += '</ul><div class="output-info" style="margin-top: 1rem;">Type "project [name]" to view details. <br>Available: aura, bitfit, wordle, resume-fox, cyber, stock, weather, interpreter, bookstore</div></div>';
        addOutput(projectsList);
    },

    project: (args) => {
        if (!args || args.length === 0) {
            addOutput('<span class="output-error">Usage: project [name]</span>');
            addOutput('<span class="output-info">Available projects: aura, bitfit, wordle, resume-fox, cyber, stock, weather, interpreter, bookstore</span>');
            return;
        }

        const projectKey = args[0].toLowerCase();
        const project = projects[projectKey];

        if (!project) {
            addOutput(`<span class="output-error">Project "${args[0]}" not found.</span>`);
            addOutput('<span class="output-info">Type "projects" to see all available projects.</span>');
            return;
        }

        let projectHtml = `<div class="project-detail">
            <div class="project-detail-title">${project.name}</div>
            <div class="project-detail-tech">${project.tech} | ${project.date}</div>`;
        project.details.forEach(detail => {
            projectHtml += `<div class="project-detail-item">${detail}</div>`;
        });
        projectHtml += '</div>';
        addOutput(projectHtml);
    },

    contact: () => {
        addOutput(`<div class="output-section">
            <div class="output-title">Contact Information</div>
            <div class="output-item">
                <div class="output-item-title">Email:</div>
                <div class="output-item-detail">jv464@njit.edu</div>
            </div>
            <div class="output-item">
                <div class="output-item-title">LinkedIn:</div>
                <div class="output-item-detail">https://www.linkedin.com/in/j-valle1017/</div>
            </div>
            <div class="output-item">
                <div class="output-item-title">GitHub:</div>
                <div class="output-item-detail">github.com/jvallehernandez</div>
            </div>
        </div>`);
    },

    clear: () => {
        // Clear terminal and re-add truck animation container
        terminal.innerHTML = '';
        const truckContainer = document.createElement('div');
        truckContainer.className = 'truck-animation-container';
        truckContainer.id = 'truckAnimation';
        terminal.appendChild(truckContainer);
        startTruckAnimation();
    },

    exit: () => {
        addOutput('<span class="output-warning">Closing terminal...</span>');
        // Set flag to stop truck animation after it completes current pass
        anim.truck.shouldStopAfterPass = true;
        
        // Wait for truck to finish, then start exit story
        function checkAndStartExit() {
            if (anim.truck.rafId === null) {
                // Truck animation has finished, start exit story
                startExitStoryAnimation();
            } else {
                // Check again in a short while
                setTimeout(checkAndStartExit, 50);
            }
        }
        
        // Start checking after a brief delay
        setTimeout(checkAndStartExit, 100);
    }
};

function processCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    addOutput(`<span class="prompt">guest@josevalle:portfolio ~$</span> <span class="command-echo">${trimmed}</span>`);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    if (commands[command]) {
        commands[command](args);
    } else {
        addOutput(`<span class="output-error">Command not found: ${command}</span>`);
        addOutput('<span class="output-info">Type "help" to see available commands.</span>');
    }
}

commandInput.addEventListener('keydown', (e) => {
    const specialKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Escape', 'Meta', 'Control', 'Alt', 'Shift', 'CapsLock'];
    
    if (e.key === 'Enter') {
        const command = commandInput.value;
        processCommand(command);
        commandInput.value = '';
        historyIndex = commandHistory.length;
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
            historyIndex = Math.max(0, historyIndex - 1);
            commandInput.value = commandHistory[historyIndex] || '';
            updateCursorPosition();
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex] || '';
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
        updateCursorPosition();
    } else {
        if (!specialKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
            playKeySound();
        }
        setTimeout(updateCursorPosition, 0);
    }
});

let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    return audioContext;
}

function playKeySound() {
    const ctx = initAudioContext();
    if (!ctx) return;
    
    try {
        const now = ctx.currentTime;
        const duration = 0.02; 
        

        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11;
            b6 = white * 0.115926;
        }
        

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseSource.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.001);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        
        clickOsc.frequency.value = 1200;
        clickOsc.type = 'sine';
        
        clickGain.gain.setValueAtTime(0, now);
        clickGain.gain.linearRampToValueAtTime(0.08, now + 0.001);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.5);
        
        noiseSource.start(now);
        noiseSource.stop(now + duration);
        clickOsc.start(now);
        clickOsc.stop(now + duration * 0.5);
        
    } catch (e) {
        console.log('Error playing key sound:', e);
    }
}

function updateCursorPosition() {
    const input = commandInput;
    const cursor = document.getElementById('cursor');
    
    const style = window.getComputedStyle(input);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${style.fontSize} ${style.fontFamily}`;
    
    const text = input.value.substring(0, input.selectionStart);
    const textWidth = context.measureText(text).width;
    
    cursor.style.left = textWidth + 'px';
}

commandInput.addEventListener('input', updateCursorPosition);
commandInput.addEventListener('keyup', updateCursorPosition);
commandInput.addEventListener('click', updateCursorPosition);

terminal.addEventListener('mousedown', (e) => {
    if (e.target === commandInput || e.target.closest('.terminal-input-line')) {
        return;
    }
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.getRangeAt(0).collapsed) {
        return;
    }
    
    setTimeout(() => {
        const newSelection = window.getSelection();
        if (newSelection.toString().trim() === '') {
            commandInput.focus();
        }
    }, 0);
});

updateCursorPosition();

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const easternTime = new Date(now.toLocaleString('en-US', {
        timeZone: 'America/New_York'
    }));
    
    const hours = String(easternTime.getHours()).padStart(2, '0');
    const minutes = String(easternTime.getMinutes()).padStart(2, '0');
    const seconds = String(easternTime.getSeconds()).padStart(2, '0');
    
    // Get day name, day number, and month
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = dayNames[easternTime.getDay()];
    const dayNumber = easternTime.getDate();
    const monthName = monthNames[easternTime.getMonth()];
    
    clockElement.textContent = `${dayName} ${monthName} ${dayNumber} ${hours}:${minutes}:${seconds} EST`;
}

updateClock();
setInterval(updateClock, 1000);

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
    const FPS = 24;                    // ← slow & readable
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

// Boot sequence with fake Homebrew update
async function bootSequence() {
    commandInput.disabled = true;
    commandInput.placeholder = 'System booting...';
    
    terminal.innerHTML = '';
    
    // Fake Homebrew update lines (10-18 lines, realistic but short)
    const brewLines = [
        '==> Updating Homebrew...',
        '==> Upgrading 3 outdated packages:',
        '  python@3.12.5 -> python@3.12.6',
        '  node@20.11.0 -> node@20.12.0',
        '  git@2.43.0 -> git@2.43.1',
        '',
        '==> Downloading python@3.12.6',
        '######################################################################## 100.0%',
        '==> Installing python@3.12.6',
        '==> Downloading node@20.12.0',
        '######################################################################## 100.0%',
        '==> Installing node@20.12.0',
        '==> Downloading git@2.43.1',
        '######################################################################## 100.0%',
        '==> Installing git@2.43.1',
        '',
        '==> Summary',
        '  🍺  /opt/homebrew/Cellar/python/3.12.6',
        '  🍺  /opt/homebrew/Cellar/node/20.12.0',
        '  🍺  /opt/homebrew/Cellar/git/2.43.1',
        '',
        '==>System ready. Launching portfolio terminal...',
    ];
    
    for (let i = 0; i < brewLines.length; i++) {
        // Use faster typing for progress bars, slower for regular text
        const isProgressBar = brewLines[i].includes('##');
        const speed = isProgressBar ? 8 : 6; // Visible character-by-character typing
        await typeText(brewLines[i], 'output', speed);
        // Small delay between lines
        await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    // Brief pause before transition
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Clear terminal
    terminal.innerHTML = '';
    
    // Show prompt first (not typed)
    addOutput(`<span class="prompt">guest@josevalle:portfolio ~$</span> `);
    
    // Type welcome message with same speed as intro (15ms per character)
    await typeText('Welcome to my portfolio! Type \'help\' to get started.', 'output', 15);
    
    // Add truck animation container between welcome and help
    const truckContainer = document.createElement('div');
    truckContainer.className = 'truck-animation-container';
    truckContainer.id = 'truckAnimation';
    terminal.appendChild(truckContainer);
    
    // Start truck animation
    startTruckAnimation();
    
    // Initialize matrix background
    initMatrixBackground();
    
    // Re-enable input and focus
    commandInput.disabled = false;
    commandInput.placeholder = '';
    commandInput.focus();
    
    // Type help hint after a moment (after truck animation) with same speed
    setTimeout(async () => {
        await typeText('Type "help" to see available commands.', 'output-info', 15);
    }, 500);
}

// Start boot sequence on page load
bootSequence();
