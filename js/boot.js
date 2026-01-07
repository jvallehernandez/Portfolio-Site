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

