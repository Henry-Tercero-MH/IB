import { useAudio } from '../hooks/useAudio';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

export default function AudioControl() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200 group shadow-lg"
      aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
      title={isMuted ? 'Activar sonido' : 'Silenciar'}
    >
      {isMuted ? (
        <HiSpeakerXMark className="text-red-400 text-2xl" />
      ) : (
        <HiSpeakerWave className="text-purple-300 text-2xl group-hover:text-purple-200" />
      )}
    </button>
  );
}
