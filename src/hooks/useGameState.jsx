import { useState, useEffect } from 'react';

const GAME_STATE_KEY = 'impostorBiblico_gameState';

/**
 * Hook personalizado para manejar el estado del juego con persistencia en localStorage
 */
export function useGameState() {
  // Cargar estado inicial desde localStorage
  const loadGameState = () => {
    try {
      const saved = localStorage.getItem(GAME_STATE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verificar que el estado guardado tenga la estructura correcta
        if (parsed && parsed.step) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Error loading game state:', error);
    }
    return null;
  };

  const initialState = loadGameState() || {
    step: 'setup',
    numPlayers: 5,
    numImpostores: 1,
    palabra: '',
    cartas: [],
    current: 0,
    categoria: 'mixto',
    dificultad: 'medio',
    modo: 'biblico', // 'biblico' o 'normal'
    timestamp: Date.now()
  };

  const [gameState, setGameState] = useState(initialState);

  // Guardar en localStorage cada vez que cambie el estado
  useEffect(() => {
    try {
      const stateToSave = {
        ...gameState,
        timestamp: Date.now()
      };
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Error saving game state:', error);
    }
  }, [gameState]);

  // Función para actualizar el estado
  const updateGameState = (updates) => {
    setGameState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Función para resetear completamente el juego
  const resetGame = () => {
    const resetState = {
      step: 'setup',
      numPlayers: 5,
      numImpostores: 1,
      palabra: '',
      cartas: [],
      current: 0,
      categoria: 'mixto',
      dificultad: 'medio',
      modo: 'biblico',
      timestamp: Date.now()
    };
    setGameState(resetState);
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(resetState));
  };

  // Función para limpiar la partida guardada
  const clearSavedGame = () => {
    localStorage.removeItem(GAME_STATE_KEY);
    resetGame();
  };

  // Verificar si hay una partida guardada
  const hasSavedGame = () => {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (!saved) return false;

    try {
      const parsed = JSON.parse(saved);
      // Considerar que hay partida guardada si no está en setup
      return parsed && parsed.step !== 'setup';
    } catch {
      return false;
    }
  };

  // Obtener tiempo transcurrido desde la última partida
  const getGameAge = () => {
    if (!gameState.timestamp) return null;
    const ageInMinutes = Math.floor((Date.now() - gameState.timestamp) / 1000 / 60);
    return ageInMinutes;
  };

  return {
    gameState,
    updateGameState,
    resetGame,
    clearSavedGame,
    hasSavedGame: hasSavedGame(),
    gameAge: getGameAge()
  };
}
