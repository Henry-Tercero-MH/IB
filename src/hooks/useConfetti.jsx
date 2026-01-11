import confetti from 'canvas-confetti';

export function useConfetti() {
  // Confetti básico
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Confetti de victoria
  const fireVictoryConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  // Confetti de derrota (colores oscuros)
  const fireDefeatConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#991b1b', '#7f1d1d', '#450a0a', '#292524']
    });
  };

  // Explosión de estrellas
  const fireStars = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  // Lluvia de emojis personalizados
  const fireEmojis = (emojis = ['🎉', '✨', '🎊']) => {
    const scalar = 2;
    const emoji = confetti.shapeFromText({ text: emojis[Math.floor(Math.random() * emojis.length)], scalar });

    confetti({
      particleCount: 30,
      spread: 100,
      scalar,
      shapes: [emoji],
      origin: { y: 0.4 }
    });
  };

  // Explosión completa de celebración
  const fireCelebration = () => {
    fireVictoryConfetti();
    setTimeout(() => fireStars(), 500);
    setTimeout(() => fireEmojis(['🏆', '⭐', '✨']), 1000);
  };

  return {
    fireConfetti,
    fireVictoryConfetti,
    fireDefeatConfetti,
    fireStars,
    fireEmojis,
    fireCelebration
  };
}
