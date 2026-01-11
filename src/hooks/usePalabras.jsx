import { useState, useEffect } from 'react';
import { CATEGORIAS, getPalabrasPorDificultad } from '../data/palabras';

export function usePalabras() {
  const [palabrasPersonalizadas, setPalabrasPersonalizadas] = useState(() => {
    const saved = localStorage.getItem('palabrasPersonalizadas');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cuando cambien las palabras personalizadas
  useEffect(() => {
    localStorage.setItem('palabrasPersonalizadas', JSON.stringify(palabrasPersonalizadas));
  }, [palabrasPersonalizadas]);

  // Agregar palabra personalizada
  const agregarPalabra = (palabra) => {
    const palabraTrimmed = palabra.trim();
    if (palabraTrimmed && !palabrasPersonalizadas.includes(palabraTrimmed)) {
      setPalabrasPersonalizadas(prev => [...prev, palabraTrimmed]);
      return true;
    }
    return false;
  };

  // Eliminar palabra personalizada
  const eliminarPalabra = (palabra) => {
    setPalabrasPersonalizadas(prev => prev.filter(p => p !== palabra));
  };

  // Limpiar todas las palabras personalizadas
  const limpiarPalabras = () => {
    setPalabrasPersonalizadas([]);
  };

  // Obtener palabras según categoría y dificultad
  const obtenerPalabras = (categoria, dificultad) => {
    if (categoria === 'personalizado') {
      return palabrasPersonalizadas.length > 0 ? palabrasPersonalizadas : [];
    }

    if (categoria === 'todas') {
      // Mezclar todas las categorías
      const todasPalabras = Object.keys(CATEGORIAS)
        .flatMap(key => getPalabrasPorDificultad(key, dificultad));
      // Eliminar duplicados
      return [...new Set(todasPalabras)];
    }

    return getPalabrasPorDificultad(categoria, dificultad);
  };

  return {
    palabrasPersonalizadas,
    agregarPalabra,
    eliminarPalabra,
    limpiarPalabras,
    obtenerPalabras,
    tienePalabrasPersonalizadas: palabrasPersonalizadas.length > 0
  };
}
