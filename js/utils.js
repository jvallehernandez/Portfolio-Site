// Utility functions for terminal output and UI

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

