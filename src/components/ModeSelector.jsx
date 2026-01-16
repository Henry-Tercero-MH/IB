import { useState } from 'react';

export default function ModeSelector({ onSelectMode }) {
  const [hoveredPill, setHoveredPill] = useState(null);
  const [selectedPill, setSelectedPill] = useState(null);

  const handleSelect = (mode) => {
    setSelectedPill(mode);
    // Animación antes de cambiar
    setTimeout(() => {
      onSelectMode(mode);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Efecto de lluvia de código Matrix */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 text-xs font-mono animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 20 }, () =>
              String.fromCharCode(0x30A0 + Math.random() * 96)
            ).join('\n')}
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className={`relative z-10 text-center transition-all duration-700 ${selectedPill ? 'scale-110 opacity-0' : ''}`}>
        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-wider">
          IMPOSTOR
        </h1>
        <p className="text-green-400 text-sm md:text-base mb-8 font-mono">
          &gt; Elige tu destino_
        </p>

        {/* Imagen de Morfeo en pantalla completa */}
        <div className="fixed inset-0 z-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src="https://www.elcohetealaluna.com/wp-content/uploads/2024/11/TheMatrix-LaurenceFishburneasMorpheus-BluePillRedPill-HollywoodMovieArtPoster_54b03b03-84c6-414a-83e8-7068d9450732.jpg"
            alt="Morfeo"
            className="w-full h-full object-cover brightness-75 blur-[1px]"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
        {/* Capa de contenido principal sobre la imagen */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full">

        {/* Texto de Morfeo */}
        <p className="text-white/80 text-sm md:text-lg mb-8 max-w-md mx-auto font-light italic">
          "Esta es tu última oportunidad. Después de esto, no hay vuelta atrás..."
        </p>

        {/* Las dos píldoras/manos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Píldora Roja - Normal */}
          <button
            onClick={() => handleSelect('normal')}
            onMouseEnter={() => setHoveredPill('normal')}
            onMouseLeave={() => setHoveredPill(null)}
            className={`group relative transition-all duration-500 ${
              hoveredPill === 'normal' ? 'scale-110' : hoveredPill === 'biblico' ? 'scale-90 opacity-50' : ''
            } ${selectedPill === 'normal' ? 'animate-pulse-fast scale-125' : ''}`}
          >
            {/* ...eliminado emoji de mano... */}

            {/* Píldora */}
            <div className={`
              w-24 h-12 md:w-32 md:h-14 rounded-full
              bg-gradient-to-r from-red-600 via-red-500 to-red-400
              shadow-lg shadow-red-500/50
              flex items-center justify-center
              transform group-hover:scale-110 transition-all
              border-2 border-red-300/30
              ${hoveredPill === 'normal' ? 'shadow-red-500/80 shadow-2xl' : ''}
            `}>
              <span className="text-white font-bold text-sm md:text-base drop-shadow-lg">NORMAL</span>
            </div>

            {/* Etiqueta */}
            <p className={`
              mt-4 text-white text-xs md:text-sm font-mono transition-all
              ${hoveredPill === 'normal' ? 'opacity-100' : 'opacity-60'}
            `}>
              🎮 Palabras cotidianas
            </p>

            {/* Descripción al hover */}
            <div className={`
              absolute -bottom-16 left-1/2 transform -translate-x-1/2
              bg-red-900/80 backdrop-blur-sm px-4 py-2 rounded-lg
              text-white text-xs whitespace-nowrap
              transition-all duration-300
              ${hoveredPill === 'normal' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}>
              Comida, deportes, películas...
            </div>
          </button>

          {/* Separador */}
          <div className="text-white/30 text-2xl font-light hidden md:block">ó</div>
          <div className="text-white/30 text-lg font-light md:hidden">- ó -</div>

          {/* Píldora Azul - Bíblico */}
          <button
            onClick={() => handleSelect('biblico')}
            onMouseEnter={() => setHoveredPill('biblico')}
            onMouseLeave={() => setHoveredPill(null)}
            className={`group relative transition-all duration-500 ${
              hoveredPill === 'biblico' ? 'scale-110' : hoveredPill === 'normal' ? 'scale-90 opacity-50' : ''
            } ${selectedPill === 'biblico' ? 'animate-pulse-fast scale-125' : ''}`}
          >
            {/* ...eliminado emoji de mano... */}

            {/* Píldora */}
            <div className={`
              w-24 h-12 md:w-32 md:h-14 rounded-full
              bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
              shadow-lg shadow-blue-500/50
              flex items-center justify-center
              transform group-hover:scale-110 transition-all
              border-2 border-blue-300/30
              ${hoveredPill === 'biblico' ? 'shadow-blue-500/80 shadow-2xl' : ''}
            `}>
              <span className="text-white font-bold text-sm md:text-base drop-shadow-lg">BÍBLICO</span>
            </div>

            {/* Etiqueta */}
            <p className={`
              mt-4 text-white text-xs md:text-sm font-mono transition-all
              ${hoveredPill === 'biblico' ? 'opacity-100' : 'opacity-60'}
            `}>
              ✝️ Palabras de la Biblia
            </p>

            {/* Descripción al hover */}
            <div className={`
              absolute -bottom-16 left-1/2 transform -translate-x-1/2
              bg-blue-900/80 backdrop-blur-sm px-4 py-2 rounded-lg
              text-white text-xs whitespace-nowrap
              transition-all duration-300
              ${hoveredPill === 'biblico' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}>
              Personajes, lugares, eventos...
            </div>
          </button>
        </div>

        {/* Texto adicional */}
        <p className="text-white/40 text-xs mt-16 font-mono">
          Toca una cápsula para comenzar
        </p>
      </div>

      {/* Efecto de flash al seleccionar */}
      {selectedPill && (
        <div className={`
          absolute inset-0 z-20 animate-flash
          ${selectedPill === 'normal' ? 'bg-red-500' : 'bg-blue-500'}
        `}></div>
      )}
      {/* Cerramos el div de contenido principal */}
      </div>
    </div>
  );
}
