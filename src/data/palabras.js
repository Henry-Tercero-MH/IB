// Categorías de palabras bíblicas organizadas por temas

export const CATEGORIAS = {
  mixto: {
    nombre: 'Mixto',
    emoji: '🎲',
    descripcion: 'Mezcla de todos los temas',
    color: 'purple',
    palabras: [
      'Jonás', 'Arca', 'Maná', 'Goliat', 'Egipto', 'Pentecostés', 'Babel',
      'Betania', 'Cordero', 'Pascua', 'Sinaí', 'Éxodo', 'David', 'Salomón',
      'Apocalipsis', 'Galilea', 'Belén', 'Nazaret', 'Samaria'
    ]
  },

  personajes: {
    nombre: 'Personajes',
    emoji: '👤',
    descripcion: 'Personas de la Biblia',
    color: 'blue',
    palabras: [
      'Moisés', 'Abraham', 'Isaac', 'Jacob', 'José', 'David', 'Salomón',
      'Daniel', 'Jonás', 'Elías', 'Eliseo', 'Ezequiel', 'Isaías', 'Jeremías',
      'Pedro', 'Pablo', 'Juan', 'Santiago', 'Mateo', 'Lucas', 'Marcos',
      'María', 'Marta', 'Rut', 'Ester', 'Sara', 'Rebeca', 'Raquel',
      'Goliat', 'Faraón', 'Herodes', 'Pilato', 'Judas', 'Tomás'
    ]
  },

  lugares: {
    nombre: 'Lugares',
    emoji: '📍',
    descripcion: 'Ciudades y lugares bíblicos',
    color: 'green',
    palabras: [
      'Jerusalén', 'Belén', 'Nazaret', 'Galilea', 'Judea', 'Samaria',
      'Egipto', 'Canaán', 'Babilonia', 'Nínive', 'Sodoma', 'Gomorra',
      'Jericó', 'Betania', 'Capernaúm', 'Getsemaní', 'Calvario', 'Gólgota',
      'Sinaí', 'Horeb', 'Carmelo', 'Sion', 'Edén', 'Babel'
    ]
  },

  eventos: {
    nombre: 'Eventos',
    emoji: '⚡',
    descripcion: 'Sucesos importantes',
    color: 'amber',
    palabras: [
      'Creación', 'Diluvio', 'Éxodo', 'Pascua', 'Pentecostés', 'Navidad',
      'Crucifixión', 'Resurrección', 'Ascensión', 'Bautismo', 'Transfiguración',
      'Última Cena', 'Caída', 'Torre de Babel', 'Mar Rojo', 'Zarza Ardiente',
      'Diez Plagas', 'Maná', 'Tablas de la Ley', 'Arca del Pacto'
    ]
  },

  objetos: {
    nombre: 'Objetos',
    emoji: '🏺',
    descripcion: 'Objetos y símbolos',
    color: 'orange',
    palabras: [
      'Arca', 'Cruz', 'Corona', 'Espada', 'Copa', 'Pan', 'Vino',
      'Aceite', 'Incienso', 'Mirra', 'Altar', 'Templo', 'Tabernáculo',
      'Arca del Pacto', 'Maná', 'Vara de Aarón', 'Piedras', 'Túnica',
      'Sandalia', 'Cayado', 'Honda', 'Trompeta', 'Lámpara', 'Candelabro'
    ]
  },

  animales: {
    nombre: 'Animales',
    emoji: '🐑',
    descripcion: 'Animales mencionados',
    color: 'emerald',
    palabras: [
      'Cordero', 'León', 'Serpiente', 'Paloma', 'Águila', 'Oveja',
      'Cabra', 'Burro', 'Camello', 'Pez', 'Leviatán', 'Behemot',
      'Cuervo', 'Golondrina', 'Langosta', 'Rana', 'Mosca', 'Buey',
      'Caballo', 'Lobo', 'Zorro', 'Gallo', 'Dragón'
    ]
  },

  libros: {
    nombre: 'Libros',
    emoji: '📖',
    descripcion: 'Libros de la Biblia',
    color: 'indigo',
    palabras: [
      'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio',
      'Josué', 'Jueces', 'Rut', 'Samuel', 'Reyes', 'Crónicas',
      'Esdras', 'Nehemías', 'Ester', 'Job', 'Salmos', 'Proverbios',
      'Eclesiastés', 'Cantar', 'Isaías', 'Jeremías', 'Lamentaciones',
      'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós', 'Abdías',
      'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo',
      'Zacarías', 'Malaquías', 'Mateo', 'Marcos', 'Lucas', 'Juan',
      'Hechos', 'Romanos', 'Corintios', 'Gálatas', 'Efesios',
      'Filipenses', 'Colosenses', 'Tesalonicenses', 'Timoteo', 'Tito',
      'Filemón', 'Hebreos', 'Santiago', 'Pedro', 'Juan', 'Judas',
      'Apocalipsis'
    ]
  },

  conceptos: {
    nombre: 'Conceptos',
    emoji: '✨',
    descripcion: 'Conceptos espirituales',
    color: 'violet',
    palabras: [
      'Fe', 'Gracia', 'Salvación', 'Redención', 'Perdón', 'Amor',
      'Paz', 'Esperanza', 'Justicia', 'Misericordia', 'Santidad',
      'Gloria', 'Reino', 'Pacto', 'Promesa', 'Profecía', 'Milagro',
      'Oración', 'Adoración', 'Alabanza', 'Testimonio', 'Discípulo',
      'Apóstol', 'Evangelio', 'Mandamiento', 'Bendición'
    ]
  }
};

// Función para obtener palabras según dificultad
export const getPalabrasPorDificultad = (categoria, dificultad) => {
  const palabras = CATEGORIAS[categoria].palabras;

  switch(dificultad) {
    case 'facil':
      // Palabras más cortas y conocidas
      return palabras.filter(p => p.length <= 8).slice(0, 15);
    case 'medio':
      // Todas las palabras
      return palabras;
    case 'dificil':
      // Palabras más largas y menos comunes
      return palabras.filter(p => p.length >= 6);
    default:
      return palabras;
  }
};

// Función para obtener todas las palabras de todas las categorías
export const getAllPalabras = () => {
  const todasPalabras = Object.values(CATEGORIAS).flatMap(cat => cat.palabras);
  // Eliminar duplicados
  return [...new Set(todasPalabras)];
};

// Niveles de dificultad
export const DIFICULTADES = {
  facil: {
    nombre: 'Fácil',
    emoji: '😊',
    descripcion: 'Palabras cortas y conocidas',
    color: 'green'
  },
  medio: {
    nombre: 'Medio',
    emoji: '🤔',
    descripcion: 'Balance de palabras',
    color: 'yellow'
  },
  dificil: {
    nombre: 'Difícil',
    emoji: '😰',
    descripcion: 'Palabras largas y complejas',
    color: 'red'
  }
};
