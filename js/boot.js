// Boot sequence with fake Homebrew update

async function bootSequence() {
    commandInput.disabled = true;
    commandInput.placeholder = '';
    
    terminal.innerHTML = '';
    
    // Detect mobile device for faster typing speed
    const isMobile = window.innerWidth <= 768;
    
    const progressBarSpeed = isMobile ? 4 : 8;
    const regularTextSpeed = isMobile ? 3 : 6;
    const welcomeSpeed = isMobile ? 8 : 15;
    const helpHintSpeed = isMobile ? 8 : 15;
    
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
        const speed = isProgressBar ? progressBarSpeed : regularTextSpeed;
        await typeText(brewLines[i], 'output', speed);

        await new Promise(resolve => setTimeout(resolve, isMobile ? 10 : 20));
    }
    
    // Brief pause before transition (shorter on mobile)
    await new Promise(resolve => setTimeout(resolve, isMobile ? 50 : 100));
    
    // Clear terminal
    terminal.innerHTML = '';
    
    // Show prompt first (not typed)
    addOutput(`<span class="prompt">guest@josevalle:portfolio ~$</span> `);
    
    // Type welcome message with adjusted speed for mobile
    await typeText('Welcome to my portfolio! Explore at your own pace. Thanks for taking the time to explore my work.', 'output', welcomeSpeed);
    
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
    
    // Type help hint after a moment (after truck animation) with adjusted speed
    setTimeout(async () => {
        await typeText('Type "help" to see available commands.', 'output-info', helpHintSpeed);
    }, isMobile ? 300 : 500);
}

