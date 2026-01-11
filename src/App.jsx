import { useState, useEffect } from 'react';
import './index.css';
import { FaUserSecret, FaUsers, FaEye, FaCog } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import shapes from './assets/shapes.svg';
import { useAudio } from './hooks/useAudio';
import { usePalabras } from './hooks/usePalabras';
import { useGameState } from './hooks/useGameState';
import AudioControl from './components/AudioControl';
import PalabrasModal from './components/PalabrasModal';
import InstallPWA from './components/InstallPWA';
import RestoreGameDialog from './components/RestoreGameDialog';
import { CATEGORIAS, DIFICULTADES } from './data/palabras';

function App() {
  // Hook de persistencia
  const { gameState, updateGameState, resetGame, clearSavedGame, hasSavedGame, gameAge } = useGameState();

  // Estado local para modales
  const [showPalabrasModal, setShowPalabrasModal] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  // Hooks
  const { playSound } = useAudio();
  const {
    palabrasPersonalizadas,
    agregarPalabra,
    eliminarPalabra,
    limpiarPalabras,
    obtenerPalabras,
    tienePalabrasPersonalizadas
  } = usePalabras();

  // Mostrar diálogo de restauración al cargar si hay partida guardada
  useEffect(() => {
    // Usar setTimeout para evitar setState síncrono en el effect
    const timer = setTimeout(() => {
      if (hasSavedGame && gameState.step !== 'setup') {
        setShowRestoreDialog(true);
      }
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo al montar - ejecutar una vez

  // Handlers con persistencia
  const handleStart = () => {
    if (gameState.numPlayers < 3 || gameState.numImpostores < 1 || gameState.numImpostores >= gameState.numPlayers) return;

    const palabrasDisponibles = obtenerPalabras(gameState.categoria, gameState.dificultad);

    if (palabrasDisponibles.length === 0) {
      alert('No hay palabras disponibles. Agrega palabras personalizadas primero.');
      return;
    }

    playSound('gameStart');

    const palabraElegida = palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)];
    const cartasArr = Array(gameState.numImpostores).fill({ rol: 'impostor' }).concat(
      Array(gameState.numPlayers - gameState.numImpostores).fill({ rol: 'palabra', palabra: palabraElegida })
    );

    updateGameState({
      palabra: palabraElegida,
      cartas: shuffle(cartasArr),
      current: 0,
      step: 'cartas'
    });
  };

  const handleNext = () => {
    playSound('nextPlayer');

    if (gameState.current < gameState.cartas.length - 1) {
      updateGameState({ current: gameState.current + 1 });
    } else {
      playSound('gameEnd');
      updateGameState({ step: 'listo' });
    }
  };

  const handleReset = () => {
    playSound('buttonClick');
    resetGame();
  };

  const handleRestoreGame = () => {
    setShowRestoreDialog(false);
    playSound('buttonClick');
  };

  const handleNewGame = () => {
    setShowRestoreDialog(false);
    clearSavedGame();
    playSound('buttonClick');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 py-10 px-4 relative overflow-hidden">
      <AudioControl />
      <InstallPWA />

      {/* Diálogo de restauración */}
      {showRestoreDialog && (
        <RestoreGameDialog
          onRestore={handleRestoreGame}
          onNewGame={handleNewGame}
          gameAge={gameAge}
        />
      )}

      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <img src={shapes} alt="Background Shapes" className="w-full h-full object-cover opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <FaUserSecret className="text-amber-400 text-xl" />
            <span className="text-amber-200 text-sm font-medium tracking-wide">JUEGO BÍBLICO</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            Impostor <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-blue-300">Bíblico</span>
          </h1>
          <p className="text-purple-200/70 text-lg">Descubre quién es el impostor entre ustedes</p>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {gameState.step === 'setup' && (
            <div className="flex flex-col gap-6">
              {/* Selección de Categoría */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-semibold text-white flex items-center gap-2">
                    📚 Categoría de palabras
                  </label>
                  {gameState.categoria === 'personalizado' && (
                    <button
                      onClick={() => setShowPalabrasModal(true)}
                      className="text-sm px-3 py-1 bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FaCog /> Gestionar
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(CATEGORIAS).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => {
                        updateGameState({ categoria: key });
                        playSound('buttonClick');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        gameState.categoria === key
                          ? 'bg-purple-500/30 border-purple-400 scale-105'
                          : 'bg-white/5 border-white/10 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{cat.emoji}</div>
                      <div className="text-white font-semibold text-sm">{cat.nombre}</div>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      updateGameState({ categoria: 'personalizado' });
                      playSound('buttonClick');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      gameState.categoria === 'personalizado'
                        ? 'bg-purple-500/30 border-purple-400 scale-105'
                        : 'bg-white/5 border-white/10 hover:border-purple-400/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">✏️</div>
                    <div className="text-white font-semibold text-sm">Personalizado</div>
                    {tienePalabrasPersonalizadas && (
                      <div className="text-purple-300 text-xs mt-1">
                        ({palabrasPersonalizadas.length})
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Selección de Dificultad */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <label className="text-lg font-semibold text-white mb-4 block">
                  🎯 Nivel de dificultad
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(DIFICULTADES).map(([key, dif]) => (
                    <button
                      key={key}
                      onClick={() => {
                        updateGameState({ dificultad: key });
                        playSound('buttonClick');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        gameState.dificultad === key
                          ? 'bg-purple-500/30 border-purple-400 scale-105'
                          : 'bg-white/5 border-white/10 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{dif.emoji}</div>
                      <div className="text-white font-semibold text-sm">{dif.nombre}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card de jugadores */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <FaUsers className="text-white text-lg" />
                  </div>
                  <label className="text-lg font-semibold text-white">
                    Número de jugadores
                  </label>
                </div>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={gameState.numPlayers}
                  onChange={(e) => updateGameState({ numPlayers: Math.min(10, Math.max(3, parseInt(e.target.value) || 3)) })}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white text-xl font-bold focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all placeholder-purple-200/50"
                />
                <p className="text-purple-200/60 text-sm mt-2">Mínimo 3 jugadores</p>
              </div>

              {/* Card de impostores */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <FaUserSecret className="text-white text-lg" />
                  </div>
                  <label className="text-lg font-semibold text-white">
                    Número de impostores
                  </label>
                </div>
                <input
                  type="number"
                  min="1"
                  max={gameState.numPlayers - 1}
                  value={gameState.numImpostores}
                  onChange={(e) => updateGameState({ numImpostores: Math.min(gameState.numPlayers - 1, Math.max(1, parseInt(e.target.value) || 1)) })}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white text-xl font-bold focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:outline-none transition-all placeholder-amber-200/50"
                />
                <p className="text-purple-200/60 text-sm mt-2">Al menos 1 impostor</p>
              </div>

              {/* Botón de iniciar */}
              <button
                onClick={handleStart}
                className="mt-4 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <BsLightningChargeFill className="text-2xl group-hover:rotate-12 transition-transform" />
                Iniciar juego
              </button>
            </div>
          )}

          {gameState.step === 'cartas' && (
            <CardReveal
              palabra={gameState.palabra}
              carta={gameState.cartas[gameState.current]}
              jugador={gameState.current + 1}
              total={gameState.cartas.length}
              onNext={handleNext}
            />
          )}

          {gameState.step === 'listo' && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl border border-green-400/30 px-12 py-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <FaEye className="text-white text-3xl" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-3">¡Listos para jugar!</h2>
                <p className="text-lg text-purple-200/90 mb-6 max-w-md">
                  Todos han visto su carta. Es hora de descubrir quién es el impostor.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Nueva partida
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de palabras personalizadas */}
      <PalabrasModal
        isOpen={showPalabrasModal}
        onClose={() => setShowPalabrasModal(false)}
        palabras={palabrasPersonalizadas}
        onAgregar={agregarPalabra}
        onEliminar={eliminarPalabra}
        onLimpiar={limpiarPalabras}
      />
    </div>
  );
}

// Componente para el efecto de destapar carta
function CardReveal({ palabra, carta, jugador, total, onNext }) {
  const [reveal, setReveal] = useState(false);
  const { playSound } = useAudio();

  const handlePress = () => {
    setReveal(true);
    playSound('cardReveal');
  };

  const handleRelease = () => {
    setReveal(false);
    playSound('cardFlip');
  };

  const esImpostor = carta.rol === 'impostor';

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Badge del jugador */}
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/40 rounded-full backdrop-blur-sm">
        <span className="text-white/80 text-sm font-medium">Jugador</span>
        <span className="text-white text-2xl font-bold">{jugador}</span>
        <span className="text-white/60 text-sm">de {total}</span>
      </div>

      {/* Carta interactiva */}
      <div className="relative">
        <div
          className="w-72 h-[450px] flex items-center justify-center cursor-pointer relative select-none group"
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
        >
          {/* Card tapada */}
          {!reveal && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-3xl shadow-2xl border-4 border-purple-400/50 z-10 transition-all duration-300 group-hover:scale-105 group-active:scale-95">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                  <FaEye className="text-white text-2xl" />
                </div>
                <span className="text-white text-lg font-bold text-center block mb-2">
                  Presiona para ver
                </span>
                <span className="text-purple-100 text-sm">tu carta secreta</span>
                <span className="mt-6 text-4xl block animate-bounce">👆</span>
              </div>
            </div>
          )}

          {/* Card destapada */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl shadow-2xl border-4 transition-all duration-300 ${
            esImpostor
              ? 'bg-gradient-to-br from-red-600 via-red-500 to-orange-600 border-red-400/50'
              : 'bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 border-emerald-400/50'
          } ${reveal ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="text-center p-8">
              {esImpostor && (
                <FaUserSecret className="text-white/80 text-6xl mb-4 mx-auto" />
              )}
              <span className={`text-white text-5xl font-black tracking-wide uppercase ${reveal ? 'animate-pulse' : ''}`}>
                {esImpostor ? 'Impostor' : palabra}
              </span>
              {!esImpostor && (
                <p className="text-white/70 text-sm mt-4 font-medium">Palabra secreta</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instrucción */}
      <p className="text-purple-200/70 text-sm text-center max-w-xs">
        Mantén presionada la carta para revelarla. Asegúrate de que nadie más pueda verla.
      </p>

      {/* Botón siguiente */}
      <button
        onClick={onNext}
        className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {jugador < total ? 'Siguiente jugador →' : '¡Comenzar! 🎮'}
      </button>
    </div>
  );
}

// Función shuffle para mezclar cartas
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default App;
