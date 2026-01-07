
const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');
const cursor = document.getElementById('cursor');

let commandHistory = [];
let historyIndex = -1;

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
        terminal.innerHTML = '';
    },

    exit: () => {
        addOutput('<span class="output-warning">Closing terminal...</span>');
        setTimeout(() => {
            addOutput('<span class="output-info">Thanks for visiting! Feel free to explore more.</span>');
        }, 500);
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
        const duration = 0.02; // Very short click, 20ms
        

        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        // Generate pink noise (more natural than white noise)
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
        
        // Envelope for noise (sharp attack, quick decay)
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.001);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        // Add a brief high-frequency tone for the click
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        
        clickOsc.frequency.value = 1200;
        clickOsc.type = 'sine';
        
        clickGain.gain.setValueAtTime(0, now);
        clickGain.gain.linearRampToValueAtTime(0.08, now + 0.001);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.5);
        
        // Start both sounds
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
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

function startTruckAnimation() {
    const container = document.getElementById("truckAnimation");
    if (!container) return;
  
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
      if (now - lastTime < FRAME_TIME) {
        requestAnimationFrame(renderFrame);
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
  
      // Movement
      pos += 1;
      roadOffset += 2;               
  
      if (pos > cols) {
        pos = -truck[2].length;
      }
  
      requestAnimationFrame(renderFrame);
    }
  
    requestAnimationFrame(renderFrame);
  }  

setTimeout(() => {
    addOutput('<span class="output-info">Type "help" to see available commands.</span>');
    startTruckAnimation();
}, 500);
