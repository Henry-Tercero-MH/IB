import { useState, useEffect } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { HiDevicePhoneMobile } from 'react-icons/hi2';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Verificar si ya está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone ||
                         document.referrer.includes('android-app://');

    if (isStandalone) {
      return; // Ya está instalado, no mostrar prompt
    }

    // Para navegadores que soportan beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Verificar si el usuario ya rechazó antes
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000); // Mostrar después de 3 segundos
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Para iOS, mostrar después de un tiempo si no está instalado
    if (isIOSDevice && !isStandalone) {
      const dismissed = localStorage.getItem('pwa-install-dismissed-ios');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIOS) {
      localStorage.setItem('pwa-install-dismissed-ios', 'true');
    } else {
      localStorage.setItem('pwa-install-dismissed', 'true');
    }
  };

  if (!showPrompt) return null;

  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
        <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Instalar en iOS</h3>
            <button
              onClick={() => {
                setShowIOSInstructions(false);
                handleDismiss();
              }}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <FaTimes className="text-white text-xl" />
            </button>
          </div>

          <div className="space-y-4 text-purple-200">
            <p className="text-sm">Para instalar esta app en tu iPhone o iPad:</p>

            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Toca el botón <strong>Compartir</strong> en Safari (cuadrado con flecha hacia arriba)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Desplázate y toca <strong>"Agregar a pantalla de inicio"</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Toca <strong>"Agregar"</strong> en la esquina superior derecha</span>
              </li>
            </ol>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-purple-200/70">La app aparecerá en tu pantalla de inicio y funcionará como una aplicación nativa</p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowIOSInstructions(false);
              handleDismiss();
            }}
            className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-6 border border-white/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <HiDevicePhoneMobile className="text-white text-2xl" />
          </div>

          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1">Instalar App</h3>
            <p className="text-purple-100 text-sm mb-4">
              Instala Impostor Bíblico para acceder rápidamente y jugar sin conexión.
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaDownload /> Instalar
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Ahora no
              </button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <FaTimes className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
