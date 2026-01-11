import { FaHistory, FaTimes, FaTrash } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

export default function RestoreGameDialog({ onRestore, onNewGame, gameAge }) {
  const formatGameAge = (minutes) => {
    if (!minutes) return 'hace un momento';
    if (minutes < 1) return 'hace un momento';
    if (minutes < 60) return `hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} hora${hours !== 1 ? 's' : ''}`;

    const days = Math.floor(hours / 24);
    return `hace ${days} día${days !== 1 ? 's' : ''}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[70] p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full">
        {/* Icono */}
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
          <FaHistory className="text-white text-3xl" />
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-white mb-3 text-center">
          ¡Partida en Progreso!
        </h2>

        {/* Descripción */}
        <p className="text-purple-200/90 text-center mb-2">
          Detectamos una partida guardada {formatGameAge(gameAge)}.
        </p>
        <p className="text-purple-200/70 text-sm text-center mb-8">
          ¿Quieres continuar donde lo dejaste?
        </p>

        {/* Botones */}
        <div className="space-y-3">
          {/* Botón Continuar */}
          <button
            onClick={onRestore}
            className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <BsLightningChargeFill className="text-2xl" />
            Continuar Partida
          </button>

          {/* Botón Nueva Partida */}
          <button
            onClick={onNewGame}
            className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaTrash />
            Nueva Partida
          </button>
        </div>

        {/* Nota */}
        <p className="text-purple-200/50 text-xs text-center mt-4">
          Si inicias una nueva partida, se perderá el progreso guardado
        </p>
      </div>
    </div>
  );
}
