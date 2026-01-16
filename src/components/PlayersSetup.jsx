import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaRandom } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const AVATARES = ['👤', '😊', '😎', '🤓', '😇', '🤩', '🥳', '🤠', '👨', '👩', '🧑', '👶', '👴', '👵', '🧔', '🧑‍🦰', '🧑‍🦱', '🧑‍🦲', '👨‍🦰', '👩‍🦰', '👧', '👦', '🧒', '👨‍🦳', '👩‍🦳', '🧓', '👱', '👱‍♀️', '🧔‍♀️', '👳'];
const NOMBRES_RANDOM = ['Pedro', 'María', 'Juan', 'Ana', 'David', 'Sara', 'José', 'Ruth', 'Daniel', 'Ester', 'Pablo', 'Rebeca', 'Moisés', 'Raquel', 'Isaías', 'Débora', 'Samuel', 'Miriam', 'Elías', 'Lea', 'Abraham', 'Isaac', 'Jacob', 'Noé', 'Eva', 'Adán', 'Salomón', 'Jonás', 'Job', 'Ezequiel'];

const createPlayers = (count) => Array.from({ length: count }, (_, i) => ({
  id: i + 1,
  nombre: `Jugador ${i + 1}`,
  avatar: AVATARES[i % AVATARES.length]
}));

export default function PlayersSetup({ isOpen, onClose, onStart, numPlayers, onChangeNumPlayers }) {
  const [players, setPlayers] = useState(() => createPlayers(numPlayers));

  // Sincronizar players cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPlayers(createPlayers(numPlayers));
    }
  }, [isOpen, numPlayers]);

  if (!isOpen) return null;

  const handleChangeName = (id, nombre) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, nombre } : p));
  };

  const handleChangeAvatar = (id, avatar) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, avatar } : p));
  };

  const handleRandomNames = () => {
    const shuffled = [...NOMBRES_RANDOM].sort(() => Math.random() - 0.5);
    setPlayers(prev => prev.map((p, i) => ({
      ...p,
      nombre: shuffled[i] || `Jugador ${i + 1}`
    })));
  };

  const handleRandomAvatars = () => {
    const shuffled = [...AVATARES].sort(() => Math.random() - 0.5);
    setPlayers(prev => prev.map((p, i) => ({
      ...p,
      avatar: shuffled[i % shuffled.length]
    })));
  };

  const handleAddPlayer = () => {
    const newId = players.length + 1;
    setPlayers(prev => [...prev, {
      id: newId,
      nombre: `Jugador ${newId}`,
      avatar: AVATARES[newId % AVATARES.length]
    }]);
    onChangeNumPlayers(players.length + 1);
  };

  const handleRemovePlayer = (id) => {
    if (players.length > 3) {
      setPlayers(prev => prev.filter(p => p.id !== id).map((p, i) => ({ ...p, id: i + 1 })));
      onChangeNumPlayers(players.length - 1);
    }
  };

  const handleStart = () => {
    onStart(players);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
      <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 break-words">Configurar Jugadores</h2>
              <p className="text-purple-200/70 text-xs sm:text-sm">Personaliza nombres y avatares</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRandomNames}
                className="px-2 py-1 sm:px-3 sm:py-2 bg-purple-500/30 hover:bg-purple-500/40 text-white rounded-lg transition-colors text-xs sm:text-sm flex items-center gap-2"
                title="Nombres aleatorios"
              >
                <FaRandom /> Nombres
              </button>
              <button
                onClick={handleRandomAvatars}
                className="px-2 py-1 sm:px-3 sm:py-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-colors text-xs sm:text-sm flex items-center gap-2"
                title="Avatares aleatorios"
              >
                <FaRandom /> Avatares
              </button>
            </div>
          </div>
        </div>

        {/* Lista de jugadores */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-6">
          <div className="space-y-2 sm:space-y-4">
            {players.map((player) => (
              <div key={player.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-2 sm:p-4 border border-white/10 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-4 w-full min-w-0">
                {/* Número */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-base">{player.id}</span>
                </div>

                {/* Avatar selector */}
                <div className="relative">
                  <select
                    value={player.avatar}
                    onChange={(e) => handleChangeAvatar(player.id, e.target.value)}
                    className="w-10 h-10 sm:w-16 sm:h-16 text-xl sm:text-3xl bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition-colors appearance-none text-center"
                  >
                    {AVATARES.map(avatar => (
                      <option key={avatar} value={avatar}>{avatar}</option>
                    ))}
                  </select>
                </div>

                {/* Nombre input */}
                <input
                  type="text"
                  value={player.nombre}
                  onChange={(e) => handleChangeName(player.id, e.target.value)}
                  placeholder={`Jugador ${player.id}`}
                  className="flex-1 px-2 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-xs sm:text-base break-words min-w-0"
                  maxLength={20}
                />

                {/* Botón eliminar */}
                {players.length > 3 && (
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="w-7 h-7 sm:w-10 sm:h-10 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <FaTrash className="text-red-400 text-xs sm:text-lg" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Botón agregar jugador - sin límite máximo */}
          <button
            onClick={handleAddPlayer}
            className="mt-2 sm:mt-4 w-full py-2 sm:py-4 bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 hover:border-purple-400/50 rounded-xl transition-all flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-base"
          >
            <FaPlus /> Agregar jugador
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm sm:text-base"
          >
            Cancelar
          </button>
          <button
            onClick={handleStart}
            className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <BsLightningChargeFill />
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
