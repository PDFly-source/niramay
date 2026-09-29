// lib/soundscapes.ts - 100% Offline Ambient Sound Synthesizer via Web Audio API
// Generates continuous, calming soundscapes: Rain Sounds, Flowing River, and Gentle Bamboo Flute

export type SoundTrackId = "rain" | "river" | "flute";

export interface SoundTrack {
  id: SoundTrackId;
  nameEn: string;
  nameAs: string;
  icon: string;
  descEn: string;
  descAs: string;
}

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: "rain",
    nameEn: "Assam Monsoon Rain",
    nameAs: "বৰদৈচিলা আৰু বৰষুণৰ টোপাল",
    icon: "🌧️",
    descEn: "Gentle rhythmic rainfall on tin roof and broad foliage",
    descAs: "টিনপাত আৰু গছৰ পাতত পৰা শান্ত বৰষুণৰ ছন্দ",
  },
  {
    id: "river",
    nameEn: "Brahmaputra Stream",
    nameAs: "নৈৰ মৃদু কলকলনি",
    icon: "🌊",
    descEn: "Soothing flow of river water and bubbling eddies",
    descAs: "শান্ত পাহাৰীয়া জুৰি আৰু নৈৰ কলকল ধ্বনি",
  },
  {
    id: "flute",
    nameEn: "Bamboo Flute & Wind",
    nameAs: "বাঁহীৰ সুৰ আৰু বতাহ",
    icon: "🎋",
    descEn: "Pentatonic meditative flute notes echoing in tranquil breeze",
    descAs: "গভীৰ নিদ্ৰা আৰু মানসিক প্ৰশান্তিৰ বাবে বাঁহীৰ ধ্যানমগ্ন সুৰ",
  },
];

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning = false;
  private currentTrack: SoundTrackId = "rain";
  private activeNodes: (AudioNode | number)[] = [];
  private volume = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
  }

  setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  getVolume(): number {
    return this.volume;
  }

  getTrack(): SoundTrackId {
    return this.currentTrack;
  }

  getIsPlaying(): boolean {
    return this.isRunning;
  }

  play(track: SoundTrackId) {
    this.initContext();
    this.stop();

    this.currentTrack = track;
    this.isRunning = true;
    this.notify();

    if (track === "rain") {
      this.playRain();
    } else if (track === "river") {
      this.playRiver();
    } else if (track === "flute") {
      this.playFlute();
    }
  }

  stop() {
    this.isRunning = false;
    for (const node of this.activeNodes) {
      if (typeof node === "number") {
        window.clearInterval(node);
        window.clearTimeout(node);
      } else {
        try {
          (node as any).stop?.();
          (node as any).disconnect?.();
        } catch {
          // ignore
        }
      }
    }
    this.activeNodes = [];
    this.notify();
  }

  // Synthesize rain using pink-filtered white noise and randomized droplet pops
  private playRain() {
    if (!this.ctx || !this.masterGain) return;

    // Buffer for pink noise (2 seconds looped)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass to simulate sound of rainfall
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, filter, gain);
  }

  // Synthesize flowing river using resonant modulated lowpass filter
  private playRiver() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = "bandpass";
    filter1.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter1.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // LFO for wave modulation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.3, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter1.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.75, this.ctx.currentTime);

    noise.connect(filter1);
    filter1.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();
    this.activeNodes.push(noise, filter1, lfo, lfoGain, gain);
  }

  // Synthesize meditative Assamese bamboo flute notes in pentatonic scale
  private playFlute() {
    if (!this.ctx || !this.masterGain) return;

    // Background wind base
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const wind = this.ctx.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
    wind.connect(windFilter);
    windFilter.connect(this.masterGain);
    wind.start();
    this.activeNodes.push(wind, windFilter);

    // Pentatonic scale frequencies (Raag Bhupali notes: Sa, Re, Ga, Pa, Dha)
    const notes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];

    const playNote = () => {
      if (!this.ctx || !this.masterGain || !this.isRunning) return;

      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Sine wave with slight vibrato
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const vibrato = this.ctx.createOscillator();
      vibrato.frequency.setValueAtTime(5.2, this.ctx.currentTime);
      const vibratoGain = this.ctx.createGain();
      vibratoGain.gain.setValueAtTime(3.5, this.ctx.currentTime);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      const now = this.ctx.currentTime;
      const duration = 2.8 + Math.random() * 1.5;

      // Soft envelope
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(0.25, now + 0.6);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      vibrato.start(now);
      osc.start(now);
      vibrato.stop(now + duration);
      osc.stop(now + duration);
    };

    playNote();
    const interval = window.setInterval(() => {
      if (this.isRunning) {
        playNote();
      }
    }, 4200);

    this.activeNodes.push(interval);
  }
}

export const soundscapeEngine = typeof window !== "undefined" ? new SoundscapeEngine() : (null as any);
