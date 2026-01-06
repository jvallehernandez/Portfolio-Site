
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

const skills = {
    'Languages': ['Kotlin', 'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'PHP', 'SQL'],
    'Frameworks & Tools': ['Android Studio', 'MongoDB', 'MySQL', 'Git', 'Linux', 'Splunk', 'Nessus', 'Nmap', 'Wireshark'],
    'Technologies': ['REST APIs', 'Web Scraping', 'Database Design', 'Cybersecurity', 'OSINT', 'File Processing']
};

const interests = [
    'Mobile App Development',
    'Cybersecurity & Ethical Hacking',
    'Full-Stack Development',
    'Data Engineering',
    'System Design',
    'Open Source Contributions'
];

function addOutput(content, className = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = content;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

// Helper function to type text with animation
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
                <li><span class="output-item-title">skills</span> - Display technical skills</li>
                <li><span class="output-item-title">interests</span> - Show my interests</li>
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
                I'm a passionate developer with experience in mobile app development, cybersecurity, and full-stack engineering.<br>
                I enjoy building practical applications and solving complex problems through code.<br>
                Currently exploring new technologies and always eager to learn and contribute to meaningful projects.
            </div>
        </div>`);
    },

    projects: () => {
        let projectsList = '<div class="output-section"><div class="output-title">My Projects:</div><ul class="output-list">';
        Object.keys(projects).forEach(key => {
            const project = projects[key];
            projectsList += `<li><span class="output-item-title">${project.name}</span> <span class="output-item-detail">(${project.tech}) - ${project.date}</span></li>`;
        });
        projectsList += '</ul><div class="output-info" style="margin-top: 1rem;">Type "project [name]" to view details. Available: aura, bitfit, wordle, resume-fox, cyber, stock, weather, interpreter, bookstore</div></div>';
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

    skills: () => {
        const section = document.createElement('div');
        section.className = 'output-section';
        
        const title = document.createElement('div');
        title.className = 'output-title';
        title.textContent = 'Technical Skills';
        section.appendChild(title);
        
        Object.keys(skills).forEach(category => {
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'output-item-title';
            categoryTitle.style.marginTop = '1rem';
            categoryTitle.textContent = category + ':';
            section.appendChild(categoryTitle);
            
            const grid = document.createElement('div');
            grid.className = 'skills-grid';
            skills[category].forEach(skill => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = skill;
                grid.appendChild(tag);
            });
            section.appendChild(grid);
        });
        
        terminal.appendChild(section);
        terminal.scrollTop = terminal.scrollHeight;
    },

    interests: () => {
        let interestsList = '<div class="output-section"><div class="output-title">Interests</div><ul class="output-list">';
        interests.forEach(interest => {
            interestsList += `<li>${interest}</li>`;
        });
        interestsList += '</ul></div>';
        addOutput(interestsList);
    },

    contact: () => {
        addOutput(`<div class="output-section">
            <div class="output-title">Contact Information</div>
            <div class="output-item">
                <div class="output-item-title">Email:</div>
                <div class="output-item-detail">[Your email here]</div>
            </div>
            <div class="output-item">
                <div class="output-item-title">LinkedIn:</div>
                <div class="output-item-detail">[Your LinkedIn here]</div>
            </div>
            <div class="output-item">
                <div class="output-item-title">GitHub:</div>
                <div class="output-item-detail">[Your GitHub here]</div>
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

    addOutput(`<span class="prompt">visitor@portfolio:~$</span> <span class="command-echo">${trimmed}</span>`);

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
    }
});

terminal.addEventListener('click', () => {
    commandInput.focus();
});

setTimeout(() => {
    addOutput('<span class="output-info">Type "help" to see available commands.</span>');
}, 500);
