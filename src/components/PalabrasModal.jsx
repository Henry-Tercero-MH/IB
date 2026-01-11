import { useState } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

export default function PalabrasModal({ isOpen, onClose, palabras, onAgregar, onEliminar, onLimpiar }) {
  const [nuevaPalabra, setNuevaPalabra] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAgregar = (e) => {
    e.preventDefault();
    setError('');

    if (!nuevaPalabra.trim()) {
      setError('Por favor ingresa una palabra');
      return;
    }

    if (nuevaPalabra.trim().length < 3) {
      setError('La palabra debe tener al menos 3 caracteres');
      return;
    }

    const agregado = onAgregar(nuevaPalabra);
    if (agregado) {
      setNuevaPalabra('');
    } else {
      setError('Esta palabra ya existe');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-sm sm:max-w-xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 break-words">Palabras Personalizadas</h2>
            <p className="text-purple-200/70 text-xs sm:text-sm">Agrega tus propias palabras para el juego</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <FaTimes className="text-white text-lg sm:text-xl" />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <form onSubmit={handleAgregar} className="flex gap-2 sm:gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={nuevaPalabra}
                onChange={(e) => setNuevaPalabra(e.target.value)}
                placeholder="Escribe una palabra..."
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                maxLength={20}
              />
              {error && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <FaPlus /> Agregar
            </button>
          </form>
        </div>

        {/* Lista de palabras */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          {palabras.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-purple-200/50 text-base sm:text-lg">No hay palabras personalizadas aún</p>
              <p className="text-purple-200/30 text-xs sm:text-sm mt-2">Agrega tu primera palabra arriba</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <p className="text-purple-200/70 text-xs sm:text-sm">
                  {palabras.length} palabra{palabras.length !== 1 ? 's' : ''}
                </p>
                {palabras.length > 0 && (
                  <button
                    onClick={onLimpiar}
                    className="text-red-400 hover:text-red-300 text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <FaTrash /> Limpiar todo
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {palabras.map((palabra, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all group"
                  >
                    <span className="text-white font-medium break-words text-sm sm:text-base">{palabra}</span>
                    <button
                      onClick={() => onEliminar(palabra)}
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <FaTrash className="text-red-400 text-xs sm:text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm sm:text-base"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
