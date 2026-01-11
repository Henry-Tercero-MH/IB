import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

// Contexto de Audio
const AudioContext = createContext();

// URLs de sonidos de ejemplo usando Freesound (libre de derechos)
// En producción, deberías usar tus propios archivos de audio
const SOUNDS = {
  // Usaremos síntesis de audio simple con Web Audio API para los efectos
  cardReveal: null,  // Se creará dinámicamente
  cardFlip: null,
  nextPlayer: null,
  gameStart: null,
  gameEnd: null,
  buttonClick: null,
};

// Función para crear sonidos sintéticos simples
const createSyntheticSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  return {
    play: () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch(type) {
        case 'cardReveal':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case 'cardFlip':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        case 'nextPlayer':
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.15);
          break;
        case 'gameStart':
          // Acorde ascendente
          [261.63, 329.63, 392.00].forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
            osc.start(audioContext.currentTime + i * 0.1);
            osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
          });
          return;
        case 'gameEnd':
          // Fanfarria simple
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
            gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.4);
            osc.start(audioContext.currentTime + i * 0.15);
            osc.stop(audioContext.currentTime + i * 0.15 + 0.4);
          });
          return;
        case 'buttonClick':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.05);
          break;
        default:
          break;
      }
    }
  };
};

// Provider de Audio
export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('audioMuted');
    return saved ? JSON.parse(saved) : false;
  });

  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('audioVolume');
    return saved ? parseFloat(saved) : 0.5;
  });

  // Inicializar sonidos sintéticos
  useEffect(() => {
    Object.keys(SOUNDS).forEach(key => {
      SOUNDS[key] = createSyntheticSound(key);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('audioMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('audioVolume', volume.toString());
  }, [volume]);

  const playSound = useCallback((soundName) => {
    if (isMuted || !SOUNDS[soundName]) return;

    try {
      SOUNDS[soundName].play();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const changeVolume = useCallback((newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  const value = {
    isMuted,
    volume,
    playSound,
    toggleMute,
    changeVolume,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

// Hook para usar el audio
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
