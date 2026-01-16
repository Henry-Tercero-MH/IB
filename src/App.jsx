import { useState, useEffect } from 'react';
import './index.css';
import { FaUserSecret, FaUsers, FaEye, FaCog, FaCheckCircle, FaTimesCircle, FaTrophy, FaShareAlt } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import { MdHowToVote } from 'react-icons/md';
import shapes from './assets/shapes.svg';
import { useAudio } from './hooks/useAudio';
import { usePalabras } from './hooks/usePalabras';
import { useGameState } from './hooks/useGameState';
import { useConfetti } from './hooks/useConfetti';
import AudioControl from './components/AudioControl';
import PalabrasModal from './components/PalabrasModal';
import InstallPWA from './components/InstallPWA';
import RestoreGameDialog from './components/RestoreGameDialog';
import PlayersSetup from './components/PlayersSetup';
import ShareResults from './components/ShareResults';
import ModeSelector from './components/ModeSelector';
import { MODOS_JUEGO, DIFICULTADES, getCategoriasPorModo } from './data/palabras';

function App() {
  // Hook de persistencia
  const { gameState, updateGameState, resetGame, clearSavedGame, hasSavedGame, gameAge } = useGameState();

  // Estado local para modales y pantallas
  const [showPalabrasModal, setShowPalabrasModal] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [showPlayersSetup, setShowPlayersSetup] = useState(false);
  const [showShareResults, setShowShareResults] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [showModeSelector, setShowModeSelector] = useState(!gameState.modo || gameState.step === 'setup');

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

    const palabrasDisponibles = obtenerPalabras(gameState.categoria, gameState.dificultad, gameState.modo);

    if (palabrasDisponibles.length === 0) {
      alert('No hay palabras disponibles. Agrega palabras personalizadas primero.');
      return;
    }

    playSound('buttonClick');
    setShowPlayersSetup(true);
  };

  const handleStartWithPlayers = (players) => {
    setShowPlayersSetup(false);
    playSound('gameStart');

    const palabrasDisponibles = obtenerPalabras(gameState.categoria, gameState.dificultad, gameState.modo);
    const palabraElegida = palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)];
    const cartasArr = Array(gameState.numImpostores).fill({ rol: 'impostor' }).concat(
      Array(gameState.numPlayers - gameState.numImpostores).fill({ rol: 'palabra', palabra: palabraElegida })
    );

    updateGameState({
      palabra: palabraElegida,
      cartas: shuffle(cartasArr),
      current: 0,
      step: 'cartas',
      players: players
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

  const handleStartVoting = () => {
    playSound('buttonClick');
    updateGameState({
      step: 'votacion',
      votos: [],
      timerSeconds: 180 // 3 minutos por defecto
    });
  };

  const handleVote = (votedPlayer) => {
    const newVotos = [...(gameState.votos || []), votedPlayer];

    if (newVotos.length >= gameState.numPlayers) {
      // Todos votaron, ir a resultados
      updateGameState({
        votos: newVotos,
        step: 'resultados'
      });
      playSound('gameEnd');
    } else {
      updateGameState({ votos: newVotos });
      playSound('buttonClick');
    }
  };

  const handleSkipVoting = () => {
    playSound('buttonClick');
    updateGameState({ step: 'resultados' });
  };

  const handleReset = () => {
    playSound('buttonClick');
    resetGame();
    setShowModeSelector(true);
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

  const handleModeSelect = (modo) => {
    playSound('gameStart');
    updateGameState({ modo, categoria: 'mixto' });
    setShowModeSelector(false);
  };

  // Mostrar selector de modo Matrix
  if (showModeSelector && gameState.step === 'setup') {
    return <ModeSelector onSelectMode={handleModeSelect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 animate-gradient py-10 px-4 relative overflow-hidden">
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

      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <img src={shapes} alt="Background Shapes" className="w-full h-full object-cover opacity-5" />
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header - Dinámico según el modo */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 mb-4 px-4 py-2 ${gameState.modo === 'biblico' ? 'bg-amber-500/20 border-amber-500/30' : 'bg-green-500/20 border-green-500/30'} border rounded-full backdrop-blur-sm`}>
            {gameState.modo === 'biblico' ? (
              <FaUserSecret className="text-amber-400 text-xl" />
            ) : (
              <span className="text-xl">🎮</span>
            )}
            <span className={`${gameState.modo === 'biblico' ? 'text-amber-200' : 'text-green-200'} text-sm font-medium tracking-wide`}>
              {gameState.modo === 'biblico' ? 'JUEGO BÍBLICO' : 'JUEGO NORMAL'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            Impostor <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gameState.modo === 'biblico' ? 'from-amber-300 via-purple-300 to-blue-300' : 'from-green-300 via-blue-300 to-purple-300'}`}>
              {gameState.modo === 'biblico' ? 'Bíblico' : 'Normal'}
            </span>
          </h1>
          <p className="text-purple-200/70 text-lg">Descubre quién es el impostor entre ustedes</p>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {gameState.step === 'setup' && (
            <div className="flex flex-col gap-6">
              {/* Indicador del modo actual con botón para cambiar */}
              <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{MODOS_JUEGO[gameState.modo]?.emoji}</span>
                  <div>
                    <p className="text-white font-bold">Modo {MODOS_JUEGO[gameState.modo]?.nombre}</p>
                    <p className="text-purple-200/60 text-xs">{MODOS_JUEGO[gameState.modo]?.descripcion}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModeSelector(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  🔄 Cambiar
                </button>
              </div>

              {/* Selección de Categoría - Dinámico según modo */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-base md:text-lg font-semibold text-white flex items-center gap-2 break-words">
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
                  {Object.entries(getCategoriasPorModo(gameState.modo)).map(([key, cat]) => (
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
                      <div className="text-white font-semibold text-xs md:text-sm break-words text-center w-full">{cat.nombre}</div>
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
                    <div className="text-white font-semibold text-xs md:text-sm break-words text-center w-full">Personalizado</div>
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
                <label className="text-base md:text-lg font-semibold text-white mb-4 block break-words">
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
                      <div className="text-white font-semibold text-xs md:text-sm break-words text-center w-full">{dif.nombre}</div>
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
                  <label className="text-base md:text-lg font-semibold text-white break-words">
                    Número de jugadores
                  </label>
                </div>
                <input
                  type="number"
                  min="3"
                  value={gameState.numPlayers}
                  onChange={(e) => updateGameState({ numPlayers: Math.max(3, parseInt(e.target.value) || 3) })}
                  className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg md:text-xl font-bold focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all placeholder-purple-200/50"
                />
                <p className="text-purple-200/60 text-sm mt-2">Mínimo 3 jugadores</p>
              </div>

              {/* Card de impostores */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <FaUserSecret className="text-white text-lg" />
                  </div>
                  <label className="text-base md:text-lg font-semibold text-white break-words">
                    Número de impostores
                  </label>
                </div>
                <input
                  type="number"
                  min="1"
                  max={gameState.numPlayers - 1}
                  value={gameState.numImpostores}
                  onChange={(e) => updateGameState({ numImpostores: Math.min(gameState.numPlayers - 1, Math.max(1, parseInt(e.target.value) || 1)) })}
                  className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg md:text-xl font-bold focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:outline-none transition-all placeholder-amber-200/50"
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
              player={gameState.players?.[gameState.current]}
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
                <div className="flex gap-3">
                  <button
                    onClick={handleStartVoting}
                    className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                  >
                    <MdHowToVote className="text-xl" />
                    Iniciar votación
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Nueva partida
                  </button>
                </div>
              </div>
            </div>
          )}

          {gameState.step === 'votacion' && (
            <VotingPhase
              numPlayers={gameState.numPlayers}
              votos={gameState.votos || []}
              timerSeconds={gameState.timerSeconds}
              onVote={handleVote}
              onSkip={handleSkipVoting}
              players={gameState.players || []}
            />
          )}

          {gameState.step === 'resultados' && (
            <ResultsPhase
              cartas={gameState.cartas}
              votos={gameState.votos || []}
              numPlayers={gameState.numPlayers}
              palabra={gameState.palabra}
              onReset={handleReset}
              players={gameState.players || []}
              onShare={(data) => {
                setShareData(data);
                setShowShareResults(true);
              }}
            />
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

      {/* Modal de configuración de jugadores */}
      <PlayersSetup
        isOpen={showPlayersSetup}
        onClose={() => setShowPlayersSetup(false)}
        onStart={handleStartWithPlayers}
        numPlayers={gameState.numPlayers}
        onChangeNumPlayers={(num) => updateGameState({ numPlayers: num })}
      />

      {/* Modal de compartir resultados */}
      {shareData && (
        <ShareResults
          isOpen={showShareResults}
          onClose={() => setShowShareResults(false)}
          gameData={shareData}
        />
      )}
    </div>
  );
}

// Componente para el efecto de destapar carta
function CardReveal({ palabra, carta, jugador, total, onNext, player }) {
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
        {player?.avatar && (
          <span className="text-2xl">{player.avatar}</span>
        )}
        <span className="text-white text-xl font-bold">
          {player?.nombre || `Jugador ${jugador}`}
        </span>
        <span className="text-white/60 text-sm">({jugador} de {total})</span>
      </div>

      {/* Carta interactiva */}
      <div className="relative">
        <div
          className="w-64 sm:w-72 h-[400px] sm:h-[450px] flex items-center justify-center cursor-pointer relative select-none group transition-all duration-300"
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
        >
          {/* Card tapada */}
          {!reveal && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-3xl shadow-2xl border-4 border-purple-400/50 z-10 transition-all duration-300 group-hover:scale-105 group-active:scale-95 animate-glow-pulse">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce">
                  <FaEye className="text-white text-2xl" />
                </div>
                <span className="text-white text-lg font-bold text-center block mb-2">
                  Presiona para ver
                </span>
                <span className="text-purple-100 text-sm">tu carta secreta</span>
                <span className="mt-6 text-4xl block animate-float">👆</span>
              </div>
            </div>
          )}

          {/* Card destapada - MISMO COLOR para todos, nadie puede ver quién es impostor */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl shadow-2xl border-4 transition-all duration-500 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 border-purple-400/50 ${reveal ? 'opacity-100 scale-100 animate-bounce-in' : 'opacity-0 scale-90'}`}>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                {esImpostor ? (
                  <FaUserSecret className="text-white text-3xl" />
                ) : (
                  <span className="text-3xl">📖</span>
                )}
              </div>
              <span className={`text-white text-3xl sm:text-4xl font-black ${reveal ? 'animate-scale-in' : ''}`}>
                {esImpostor ? 'IMPOSTOR' : palabra}
              </span>
              <p className="text-white/70 text-sm mt-4 font-medium">
                {esImpostor ? 'No tienes palabra' : 'Tu palabra secreta'}
              </p>
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

// Componente para la fase de votación
function VotingPhase({ numPlayers, votos, timerSeconds, onVote, onSkip, players }) {
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const { playSound } = useAudio();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          playSound('gameEnd');
          return 0;
        }
        if (prev <= 10) {
          playSound('buttonClick');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, playSound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const votosRestantes = numPlayers - votos.length;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Timer */}
      <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-purple-400/30 px-8 py-4">
        <div className="text-center">
          <p className="text-purple-200/70 text-sm mb-1">Tiempo de discusión</p>
          <p className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Título */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Fase de Votación</h2>
        <p className="text-purple-200/80">
          {votosRestantes > 0 ? `Faltan ${votosRestantes} voto${votosRestantes !== 1 ? 's' : ''}` : '¡Todos votaron!'}
        </p>
      </div>

      {/* Grid de jugadores */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {Array.from({ length: numPlayers }, (_, i) => {
          const player = players[i];
          return (
            <button
              key={i}
              onClick={() => onVote(i + 1)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all hover:scale-105 active:scale-95"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{player?.avatar || '👤'}</div>
                <p className="text-white font-bold text-lg">{player?.nombre || `Jugador ${i + 1}`}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Contador de votos */}
      {votos.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <p className="text-purple-200/70 text-sm text-center">
            Votos registrados: {votos.length} de {numPlayers}
          </p>
        </div>
      )}

      {/* Botón para saltar */}
      <button
        onClick={onSkip}
        className="mt-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Ver resultados sin votar
      </button>
    </div>
  );
}

// Componente para los resultados
function ResultsPhase({ cartas, votos, numPlayers, palabra, onReset, players, onShare }) {
  const { playSound } = useAudio();
  const { fireCelebration, fireDefeatConfetti } = useConfetti();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
      playSound('gameEnd');
    }, 500);
    return () => clearTimeout(timer);
  }, [playSound]);

  // Encontrar índices de los impostores
  const impostorIndices = cartas
    .map((carta, idx) => carta.rol === 'impostor' ? idx + 1 : null)
    .filter(idx => idx !== null);

  // Contar votos
  const voteCount = {};
  votos.forEach(voto => {
    voteCount[voto] = (voteCount[voto] || 0) + 1;
  });

  // Jugador más votado
  const mostVoted = Object.entries(voteCount).sort((a, b) => b[1] - a[1])[0];
  const mostVotedPlayer = mostVoted ? parseInt(mostVoted[0]) : null;

  // Verificar si los buenos ganaron
  const buenosGanaron = mostVotedPlayer && impostorIndices.includes(mostVotedPlayer);

  // Disparar confetti cuando se muestran los resultados
  useEffect(() => {
    if (showResults) {
      if (buenosGanaron) {
        fireCelebration();
      } else {
        fireDefeatConfetti();
      }
    }
  }, [showResults, buenosGanaron, fireCelebration, fireDefeatConfetti]);

  return (
    <div className={`flex flex-col items-center gap-6 ${showResults ? 'animate-slide-up' : 'opacity-0'}`}>
      {/* Resultado principal */}
      <div className={`bg-gradient-to-br ${buenosGanaron ? 'from-green-400/20 to-emerald-500/20 border-green-400/30' : 'from-red-400/20 to-orange-500/20 border-red-400/30'} backdrop-blur-sm rounded-3xl border px-12 py-12 flex flex-col items-center animate-bounce-in`}>
        <div className={`w-20 h-20 bg-gradient-to-br ${buenosGanaron ? 'from-green-400 to-emerald-500' : 'from-red-400 to-orange-500'} rounded-full flex items-center justify-center mb-6 ${showResults ? 'animate-bounce' : ''}`}>
          {buenosGanaron ? (
            <FaTrophy className="text-white text-3xl" />
          ) : (
            <FaUserSecret className="text-white text-3xl" />
          )}
        </div>
        <h2 className={`text-4xl font-bold text-white mb-3 ${showResults ? 'animate-scale-in' : ''}`}>
          {buenosGanaron ? '¡Los buenos ganaron!' : '¡Los impostores ganaron!'}
        </h2>
        <p className="text-lg text-purple-200/90 mb-6 text-center max-w-md">
          {buenosGanaron
            ? 'El impostor fue descubierto correctamente'
            : 'Los impostores lograron engañar a todos'}
        </p>
      </div>

      {/* Palabra secreta */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <p className="text-purple-200/70 text-sm text-center mb-2">La palabra secreta era</p>
        <p className="text-white text-3xl font-bold text-center">{palabra}</p>
      </div>

      {/* Revelación de impostores */}
      <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30 w-full max-w-md">
        <div className="text-center mb-4">
          <FaUserSecret className="text-red-400 text-4xl mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white mb-2">
            {impostorIndices.length > 1 ? 'Los Impostores' : 'El Impostor'}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {impostorIndices.map(idx => {
              const player = players[idx - 1];
              return (
                <div key={idx} className="bg-red-500/30 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                  {player?.avatar && <span>{player.avatar}</span>}
                  <span>{player?.nombre || `Jugador ${idx}`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estadísticas de votación */}
      {votos.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 w-full max-w-md">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Resultados de votación</h3>
          <div className="space-y-3">
            {Object.entries(voteCount)
              .sort((a, b) => b[1] - a[1])
              .map(([player, count]) => {
                const playerNum = parseInt(player);
                const isImpostor = impostorIndices.includes(playerNum);
                const playerData = players[playerNum - 1];
                return (
                  <div key={player} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      {playerData?.avatar && <span className="text-xl">{playerData.avatar}</span>}
                      <span className="text-white font-bold">{playerData?.nombre || `Jugador ${player}`}</span>
                      {isImpostor && (
                        <FaUserSecret className="text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-200/70">{count} voto{count !== 1 ? 's' : ''}</span>
                      {playerNum === mostVotedPlayer && (
                        isImpostor ? (
                          <FaCheckCircle className="text-green-400" />
                        ) : (
                          <FaTimesCircle className="text-red-400" />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-purple-200/70 text-sm text-center">
              Total de votos: {votos.length} de {numPlayers}
            </p>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => {
            const votosCorrectos = Object.entries(voteCount).filter(([player]) => {
              const playerNum = parseInt(player);
              return impostorIndices.includes(playerNum);
            }).reduce((sum, [, count]) => sum + count, 0);

            onShare({
              buenosGanaron,
              palabra,
              totalJugadores: numPlayers,
              impostores: impostorIndices.length,
              votosCorrectos
            });
          }}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FaShareAlt />
          Compartir
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Nueva partida
        </button>
      </div>
    </div>
  );
}

// Función shuffle  epara mezclar cartas
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default App;
