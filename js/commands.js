// Command definitions and processing

let commandHistory = [];
let historyIndex = -1;

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

