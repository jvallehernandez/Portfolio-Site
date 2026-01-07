// Audio and sound effects

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

