// Main initialization - startup

// Start boot sequence on page load (wait for DOM to be ready)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSequence);
} else {
    bootSequence();
}

