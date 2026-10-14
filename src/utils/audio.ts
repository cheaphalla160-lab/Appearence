/**
 * Audio manager providing Web Audio API synthesized background music (BGM),
 * sound effects (SFX), and Web Speech API text-to-speech (TTS).
 * 100% self-contained: no external MP3 dependencies that could fail to load.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: any = null;
  private bgmGainNode: GainNode | null = null;
  private bgmMasterVolume: number = 0.18;
  private isMuted: boolean = false;
  private ttsVoice: SpeechSynthesisVoice | null = null;
  private ttsPitch: number = 1.05; // Slightly cheerful pitch for kids
  private ttsRate: number = 0.92;

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize speech synthesis voices
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoice();
        };
        this.initVoice();
      }
    }
  }

  private initAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private initVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural sounding English voices suitable for primary learners
    const preferredVoices = [
      'Google US English',
      'Samantha',
      'Karen',
      'Victoria',
      'Daniel',
      'Microsoft Zira',
      'en-US',
      'en-GB',
    ];

    for (const name of preferredVoices) {
      const found = voices.find(v => v.name.includes(name) || v.lang.startsWith(name));
      if (found) {
        this.ttsVoice = found;
        return;
      }
    }
    // Fallback to any English voice
    const anyEn = voices.find(v => v.lang.startsWith('en'));
    if (anyEn) {
      this.ttsVoice = anyEn;
    }
  }

  // --- Web Audio SFX (Sound Effects) ---

  // Cheerful chime when student answers correctly
  playSuccessSound() {
    if (this.isMuted) return;
    try {
      this.initAudioContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Arpeggio: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.38);
      });
    } catch {
      // AudioContext could be blocked prior to user interaction
    }
  }

  // Soft encouraging boing sound for gentle retry
  playIncorrectSound() {
    if (this.isMuted) return;
    try {
      this.initAudioContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.22);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Ignore
    }
  }

  // Crisp little pop sound on buttons / tiles
  playPopSound() {
    if (this.isMuted) return;
    try {
      this.initAudioContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  // Celebratory fanfare when completing a level
  playFanfareSound() {
    if (this.isMuted) return;
    try {
      this.initAudioContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Fanfare: G4, C5, E5, G5, (short pause), C6
      const notes = [
        { freq: 392.0, time: 0, dur: 0.12 },
        { freq: 523.25, time: 0.12, dur: 0.12 },
        { freq: 659.25, time: 0.24, dur: 0.12 },
        { freq: 783.99, time: 0.36, dur: 0.25 },
        { freq: 659.25, time: 0.65, dur: 0.12 },
        { freq: 1046.5, time: 0.78, dur: 0.6 },
      ];

      notes.forEach(({ freq, time, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.linearRampToValueAtTime(0.25, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  // --- Playful Procedural Background Music (BGM) ---
  // Generates warm, sweet, gentle marimba/ukulele-style melodic patterns in C major / F major
  startBgm() {
    if (this.isBgmPlaying) return;
    this.initAudioContext();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    const melody = [
      261.63, 329.63, 392.0, 523.25, // C4, E4, G4, C5
      329.63, 392.0, 440.0, 392.0,  // E4, G4, A4, G4
      349.23, 440.0, 523.25, 440.0, // F4, A4, C5, A4
      392.0, 329.63, 293.66, 261.63 // G4, E4, D4, C4
    ];
    let noteIdx = 0;

    const playBgmStep = () => {
      if (!this.isBgmPlaying || !this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;

      // Play soft marimba note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.type = 'sine';
      const freq = melody[noteIdx % melody.length];
      osc.frequency.setValueAtTime(freq, now);

      const noteVol = this.bgmMasterVolume * 0.45;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(noteVol, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);

      // Play soft bass root on beat 0, 4, 8, 12
      if (noteIdx % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        const bassFreq = (noteIdx % 8 === 0) ? 130.81 : 174.61; // C3 or F3
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(this.bgmMasterVolume * 0.35, now);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.65);
      }

      noteIdx++;
    };

    // 240ms per eighth note = gentle and relaxed 125 BPM
    this.bgmInterval = setInterval(playBgmStep, 260);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  isBgmActive(): boolean {
    return this.isBgmPlaying;
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  getMute(): boolean {
    return this.isMuted;
  }

  // --- Speech Synthesis (Read-aloud / TTS) ---
  speak(text: string, options?: { rate?: number; pitch?: number; onEnd?: () => void; onBoundary?: (charIndex: number) => void }) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';

    if (this.ttsVoice) {
      utterance.voice = this.ttsVoice;
    }
    utterance.rate = options?.rate ?? this.ttsRate;
    utterance.pitch = options?.pitch ?? this.ttsPitch;

    if (options?.onEnd) {
      utterance.onend = options.onEnd;
    }
    if (options?.onBoundary) {
      utterance.onboundary = (e) => {
        options.onBoundary?.(e.charIndex);
      };
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundService();
