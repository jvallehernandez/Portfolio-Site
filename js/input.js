// Input handling and event listeners

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

