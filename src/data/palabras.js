// Categorías de palabras bíblicas organizadas por temas

export const CATEGORIAS_BIBLICAS = {
  mixto: {
    nombre: 'Mixto',
    emoji: '🎲',
    descripcion: 'Mezcla de todos los temas',
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
    palabras: [
      'Fe', 'Gracia', 'Salvación', 'Redención', 'Perdón', 'Amor',
      'Paz', 'Esperanza', 'Justicia', 'Misericordia', 'Santidad',
      'Gloria', 'Reino', 'Pacto', 'Promesa', 'Profecía', 'Milagro',
      'Oración', 'Adoración', 'Alabanza', 'Testimonio', 'Discípulo',
      'Apóstol', 'Evangelio', 'Mandamiento', 'Bendición'
    ]
  }
};

// Categorías de palabras normales (no bíblicas)
export const CATEGORIAS_NORMALES = {
  mixto: {
    nombre: 'Mixto',
    emoji: '🎲',
    descripcion: 'Mezcla de todos los temas',
    palabras: [
      'Pizza', 'Playa', 'Fútbol', 'Guitarra', 'Montaña', 'Helado',
      'Avión', 'Computadora', 'Perro', 'Fiesta', 'Música', 'Café',
      'Bicicleta', 'Teléfono', 'Libro', 'Cine', 'Doctor', 'Escuela'
    ]
  },

  comida: {
    nombre: 'Comida',
    emoji: '🍕',
    descripcion: 'Alimentos y bebidas',
    palabras: [
      'Pizza', 'Hamburguesa', 'Tacos', 'Sushi', 'Pasta', 'Ensalada',
      'Helado', 'Chocolate', 'Galleta', 'Pastel', 'Pollo', 'Carne',
      'Pescado', 'Arroz', 'Frijoles', 'Sopa', 'Pan', 'Queso',
      'Huevo', 'Fruta', 'Manzana', 'Plátano', 'Naranja', 'Uva',
      'Sandía', 'Café', 'Té', 'Jugo', 'Leche', 'Agua'
    ]
  },

  animales: {
    nombre: 'Animales',
    emoji: '🐶',
    descripcion: 'Animales comunes',
    palabras: [
      'Perro', 'Gato', 'León', 'Elefante', 'Tigre', 'Oso',
      'Mono', 'Jirafa', 'Cebra', 'Caballo', 'Vaca', 'Cerdo',
      'Gallina', 'Pato', 'Conejo', 'Ratón', 'Serpiente', 'Tortuga',
      'Pez', 'Tiburón', 'Delfín', 'Ballena', 'Águila', 'Loro',
      'Mariposa', 'Abeja', 'Araña', 'Hormiga', 'Lobo', 'Zorro'
    ]
  },

  deportes: {
    nombre: 'Deportes',
    emoji: '⚽',
    descripcion: 'Deportes y actividades',
    palabras: [
      'Fútbol', 'Baloncesto', 'Béisbol', 'Tenis', 'Golf', 'Natación',
      'Boxeo', 'Karate', 'Gimnasia', 'Atletismo', 'Voleibol', 'Rugby',
      'Hockey', 'Surf', 'Esquí', 'Patinaje', 'Ciclismo', 'Maratón',
      'Escalada', 'Yoga', 'Pesas', 'Crossfit', 'Carrera', 'Salto'
    ]
  },

  profesiones: {
    nombre: 'Profesiones',
    emoji: '👨‍⚕️',
    descripcion: 'Trabajos y oficios',
    palabras: [
      'Doctor', 'Enfermera', 'Maestro', 'Abogado', 'Ingeniero', 'Arquitecto',
      'Chef', 'Mesero', 'Policía', 'Bombero', 'Piloto', 'Astronauta',
      'Actor', 'Cantante', 'Músico', 'Pintor', 'Escritor', 'Fotógrafo',
      'Dentista', 'Veterinario', 'Jardinero', 'Carpintero', 'Mecánico', 'Electricista',
      'Plomero', 'Panadero', 'Carnicero', 'Granjero', 'Pescador', 'Minero'
    ]
  },

  lugares: {
    nombre: 'Lugares',
    emoji: '🏠',
    descripcion: 'Lugares comunes',
    palabras: [
      'Casa', 'Escuela', 'Hospital', 'Parque', 'Playa', 'Montaña',
      'Bosque', 'Desierto', 'Ciudad', 'Pueblo', 'Campo', 'Río',
      'Lago', 'Mar', 'Isla', 'Aeropuerto', 'Estación', 'Museo',
      'Teatro', 'Cine', 'Restaurante', 'Hotel', 'Supermercado', 'Tienda',
      'Biblioteca', 'Iglesia', 'Estadio', 'Gimnasio', 'Zoo', 'Circo'
    ]
  },

  objetos: {
    nombre: 'Objetos',
    emoji: '📱',
    descripcion: 'Objetos cotidianos',
    palabras: [
      'Teléfono', 'Computadora', 'Televisión', 'Radio', 'Reloj', 'Cámara',
      'Libro', 'Lápiz', 'Papel', 'Tijeras', 'Silla', 'Mesa',
      'Cama', 'Lámpara', 'Espejo', 'Llave', 'Bolsa', 'Zapato',
      'Camisa', 'Pantalón', 'Sombrero', 'Gafas', 'Paraguas', 'Maleta',
      'Cuchillo', 'Tenedor', 'Cuchara', 'Plato', 'Vaso', 'Taza'
    ]
  },

  transporte: {
    nombre: 'Transporte',
    emoji: '🚗',
    descripcion: 'Medios de transporte',
    palabras: [
      'Carro', 'Camión', 'Autobús', 'Taxi', 'Motocicleta', 'Bicicleta',
      'Avión', 'Helicóptero', 'Barco', 'Yate', 'Submarino', 'Tren',
      'Metro', 'Tranvía', 'Patineta', 'Patines', 'Scooter', 'Ambulancia',
      'Bombero', 'Policía', 'Cohete', 'Globo', 'Canoa', 'Kayak'
    ]
  },

  peliculas: {
    nombre: 'Películas',
    emoji: '🎬',
    descripcion: 'Películas famosas',
    palabras: [
      'Titanic', 'Avatar', 'Frozen', 'Shrek', 'Coco', 'Moana',
      'Matrix', 'Terminator', 'Jurassic Park', 'Star Wars', 'Batman', 'Superman',
      'Spiderman', 'Iron Man', 'Thor', 'Hulk', 'Toy Story', 'Nemo',
      'Rey León', 'Aladdin', 'Cenicienta', 'Blancanieves', 'Rapunzel', 'Encanto'
    ]
  }
};

// Modos de juego
export const MODOS_JUEGO = {
  biblico: {
    nombre: 'Bíblico',
    emoji: '✝️',
    descripcion: 'Palabras de la Biblia',
    categorias: CATEGORIAS_BIBLICAS
  },
  normal: {
    nombre: 'Normal',
    emoji: '🎮',
    descripcion: 'Palabras cotidianas',
    categorias: CATEGORIAS_NORMALES
  }
};

// Exportar CATEGORIAS como alias para compatibilidad (por defecto bíblico)
export const CATEGORIAS = CATEGORIAS_BIBLICAS;

// Niveles de dificultad
export const DIFICULTADES = {
  facil: {
    nombre: 'Fácil',
    emoji: '😊',
    descripcion: 'Palabras cortas y conocidas'
  },
  medio: {
    nombre: 'Medio',
    emoji: '🤔',
    descripcion: 'Balance de palabras'
  },
  dificil: {
    nombre: 'Difícil',
    emoji: '😰',
    descripcion: 'Palabras largas y complejas'
  }
};

// Función para obtener categorías según el modo
export const getCategoriasPorModo = (modo) => {
  return MODOS_JUEGO[modo]?.categorias || CATEGORIAS_BIBLICAS;
};

// Función para obtener palabras según dificultad
export const getPalabrasPorDificultad = (categorias, categoria, dificultad) => {
  const palabras = categorias[categoria]?.palabras || [];

  switch(dificultad) {
    case 'facil':
      return palabras.filter(p => p.length <= 8).slice(0, 15);
    case 'medio':
      return palabras;
    case 'dificil':
      return palabras.filter(p => p.length >= 6);
    default:
      return palabras;
  }
};

// Función para obtener todas las palabras de todas las categorías
export const getAllPalabras = (categorias) => {
  const todasPalabras = Object.values(categorias).flatMap(cat => cat.palabras);
  return [...new Set(todasPalabras)];
};
