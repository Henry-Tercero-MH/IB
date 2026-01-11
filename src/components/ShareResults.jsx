import { useState } from 'react';
import { FaShareAlt, FaWhatsapp, FaTwitter, FaFacebook, FaCopy, FaCheck, FaQrcode } from 'react-icons/fa';
import QRCode from 'qrcode';

export default function ShareResults({ isOpen, onClose, gameData }) {
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const { buenosGanaron, palabra, totalJugadores, impostores, votosCorrectos } = gameData;

  // Generar texto para compartir
  const generateShareText = () => {
    const emoji = buenosGanaron ? '🏆' : '😈';
    const resultado = buenosGanaron ? 'LOS BUENOS GANARON' : 'LOS IMPOSTORES GANARON';

    return `${emoji} IMPOSTOR BÍBLICO ${emoji}

${resultado}

📖 Palabra: ${palabra}
👥 Jugadores: ${totalJugadores}
🎭 Impostores: ${impostores}
✅ Votos correctos: ${votosCorrectos}/${totalJugadores}

¡Juega conmigo! 🎮`;
  };

  const shareText = generateShareText();
  const appUrl = window.location.origin;

  // Copiar al portapapeles
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Compartir en WhatsApp
  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + appUrl)}`;
    window.open(url, '_blank');
  };

  // Compartir en Twitter
  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank');
  };

  // Compartir en Facebook
  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  // Generar QR Code
  const handleGenerateQR = async () => {
    try {
      const qr = await QRCode.toDataURL(appUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#6b21a8',
          light: '#ffffff'
        }
      });
      setQrCode(qr);
      setShowQR(true);
    } catch (err) {
      console.error('Error al generar QR:', err);
    }
  };

  // Compartir usando Web Share API (móviles)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Impostor Bíblico',
          text: shareText,
          url: appUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error al compartir:', err);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Compartir Resultados</h2>
              <p className="text-purple-200/70 text-sm">Comparte tu victoria con amigos</p>
            </div>
            <FaShareAlt className="text-purple-300 text-2xl" />
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Vista previa del texto */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
            <pre className="text-white text-sm whitespace-pre-wrap font-mono">{shareText}</pre>
          </div>

          {/* Botones de compartir */}
          <div className="space-y-3 mb-6">
            {/* Web Share API (móviles) */}
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <FaShareAlt />
                Compartir
              </button>
            )}

            {/* WhatsApp */}
            <button
              onClick={shareWhatsApp}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp
            </button>

            {/* Twitter */}
            <button
              onClick={shareTwitter}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <FaTwitter className="text-xl" />
              Twitter
            </button>

            {/* Facebook */}
            <button
              onClick={shareFacebook}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <FaFacebook className="text-xl" />
              Facebook
            </button>

            {/* Copiar al portapapeles */}
            <button
              onClick={handleCopy}
              className={`w-full py-3 ${copied ? 'bg-green-600' : 'bg-white/10 hover:bg-white/20'} text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95`}
            >
              {copied ? <FaCheck /> : <FaCopy />}
              {copied ? 'Copiado' : 'Copiar texto'}
            </button>

            {/* QR Code */}
            <button
              onClick={handleGenerateQR}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <FaQrcode />
              Generar QR
            </button>
          </div>

          {/* QR Code display */}
          {showQR && qrCode && (
            <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col items-center animate-scale-in">
              <img src={qrCode} alt="QR Code" className="w-full max-w-[250px]" />
              <p className="text-purple-900 text-sm mt-2 font-medium">Escanea para jugar</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
