/**
 * mock-database.js — Herbario Electrónico UDLAP
 * ================================================
 * BASE DE DATOS MOCK CENTRALIZADA
 *
 * Este archivo contiene ÚNICAMENTE los datos de prueba del sistema.
 * Cuando se conecte Firebase/Firestore, estos datos dejan de usarse
 * y toda la información vendrá de la nube.
 *
 * COLECCIONES REPRESENTADAS:
 *   - PLANTAS_MOCK     → colección "specimens" en Firestore
 *   - TALLERES_MOCK    → colección "workshops" en Firestore
 *   - USUARIOS_MOCK    → colección "users" en Firestore
 *   - MATERIALES_MOCK  → colección "materials" en Firestore
 *
 * FORMATO DE IDs:
 *   numCatalogo  → "geno-espe-#####"  (4 letras género + 4 letras especie + número)
 *   occurrenceID → "UDLAP:herbarium:XXXXXXXX"  (8 dígitos hexadecimales)
 *
 * ÚLTIMA ACTUALIZACIÓN MOCK: 2025-01
 * ================================================
 */

/* ─────────────────────────────────────────────────────────────
   COLECCIÓN: specimens
   Equivale a los DarwinCore Archives exportados desde RDHM.
   Campos DwCA clave: occurrenceID, catalogNumber, family,
   genus, specificEpithet, recordedBy, eventDate, locality,
   stateProvince, country, habitat, occurrenceRemarks, imageURL.
───────────────────────────────────────────────────────────── */
const PLANTAS_MOCK = [
  {
    // ── Identificadores ──────────────────────────
    id: "UDLAP:herbarium:a3f1b2c4",
    occurrenceID: "UDLAP:herbarium:a3f1b2c4",
    numCatalogo: "heli-annu-00041",

    // ── Taxonomía ────────────────────────────────
    nombreComun: "Girasol",
    especie: "Helianthus annuus",
    genero: "Helianthus",
    familia: "Asteraceae",
    orden: "Asterales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",

    // ── Recolecta ─────────────────────────────────
    lugarRecolecta: "Rancho El Mirador",
    municipio: "Tehuacán",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 18.4647,
    longitud: -97.3923,
    altitud: "1850 msnm",
    fechaRecolecta: "2023-05-14",
    recolector: "Dra. Consuelo Vega",
    determinador: "Dra. Consuelo Vega",

    // ── Descripción ──────────────────────────────
    habitat: "Terreno abierto, suelo arcilloso, 1850 msnm",
    notas: "Planta cultivada semiconvertida en silvestre.",
    estadoConservacion: "LC",

    // ── Archivo ──────────────────────────────────
    imageURL: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=70",
    citasCount: 3,
    fechaRegistro: "2023-05-20"
  },
  {
    id: "UDLAP:herbarium:d7e2a891",
    occurrenceID: "UDLAP:herbarium:d7e2a891",
    numCatalogo: "boug-glab-00017",
    nombreComun: "Bugambilia",
    especie: "Bougainvillea glabra",
    genero: "Bougainvillea",
    familia: "Nyctaginaceae",
    orden: "Caryophyllales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Jardín Botánico BUAP",
    municipio: "Puebla",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 19.0414,
    longitud: -98.2063,
    altitud: "2150 msnm",
    fechaRecolecta: "2022-11-03",
    recolector: "Dr. Héctor Ramírez",
    determinador: "Dr. Héctor Ramírez",
    habitat: "Zona urbana, suelo calcáreo, 2150 msnm",
    notas: "Espécimen con brácteas color magenta intenso.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&q=70",
    citasCount: 1,
    fechaRegistro: "2022-11-10"
  },
  {
    id: "UDLAP:herbarium:f0c3d5e6",
    occurrenceID: "UDLAP:herbarium:f0c3d5e6",
    numCatalogo: "opun-ficu-00089",
    nombreComun: "Nopal",
    especie: "Opuntia ficus-indica",
    genero: "Opuntia",
    familia: "Cactaceae",
    orden: "Caryophyllales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Cerro de la Mitra",
    municipio: "San Andrés Cholula",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 19.0528,
    longitud: -98.3076,
    altitud: "2100 msnm",
    fechaRecolecta: "2023-08-22",
    recolector: "M.C. Sofía Landa",
    determinador: "Dra. Consuelo Vega",
    habitat: "Matorral xerófilo, suelo pedregoso, 2100 msnm",
    notas: "Con tunas maduras, espinas cortas y densas.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=70",
    citasCount: 7,
    fechaRegistro: "2023-08-30"
  },
  {
    id: "UDLAP:herbarium:b4a7c019",
    occurrenceID: "UDLAP:herbarium:b4a7c019",
    numCatalogo: "jaca-mimos-00052",
    nombreComun: "Jacaranda",
    especie: "Jacaranda mimosifolia",
    genero: "Jacaranda",
    familia: "Bignoniaceae",
    orden: "Lamiales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Av. Juárez, campus central UDLAP",
    municipio: "San Andrés Cholula",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 19.0564,
    longitud: -98.2853,
    altitud: "2145 msnm",
    fechaRecolecta: "2023-03-30",
    recolector: "Dr. Héctor Ramírez",
    determinador: "Dr. Héctor Ramírez",
    habitat: "Urbano, suelo franco-arenoso, 2145 msnm",
    notas: "Árbol en plena floración, flores violetas.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=400&q=70",
    citasCount: 12,
    fechaRegistro: "2023-04-05"
  },
  {
    id: "UDLAP:herbarium:e8f1a234",
    occurrenceID: "UDLAP:herbarium:e8f1a234",
    numCatalogo: "agav-salm-00033",
    nombreComun: "Maguey",
    especie: "Agave salmiana",
    genero: "Agave",
    familia: "Asparagaceae",
    orden: "Asparagales",
    clase: "Liliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Llanos de San Marcos",
    municipio: "Tepeaca",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 18.9778,
    longitud: -97.9109,
    altitud: "2320 msnm",
    fechaRecolecta: "2022-07-11",
    recolector: "M.C. Sofía Landa",
    determinador: "Dra. Consuelo Vega",
    habitat: "Pastizal semiárido, suelo rocoso, 2320 msnm",
    notas: "Roseta grande, hojas con espina terminal.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=70",
    citasCount: 5,
    fechaRegistro: "2022-07-20"
  },
  {
    id: "UDLAP:herbarium:c2b5d678",
    occurrenceID: "UDLAP:herbarium:c2b5d678",
    numCatalogo: "pine-mont-00061",
    nombreComun: "Pino ocote",
    especie: "Pinus montezumae",
    genero: "Pinus",
    familia: "Pinaceae",
    orden: "Pinales",
    clase: "Pinopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Parque Nacional La Malinche",
    municipio: "Huamantla",
    estadoMX: "Tlaxcala",
    pais: "México",
    latitud: 19.2374,
    longitud: -98.0097,
    altitud: "3100 msnm",
    fechaRecolecta: "2023-01-18",
    recolector: "Dr. Héctor Ramírez",
    determinador: "Dr. Héctor Ramírez",
    habitat: "Bosque de coníferas, 3100 msnm",
    notas: "Ramas con fascículos de 5 acículas.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=70",
    citasCount: 2,
    fechaRegistro: "2023-01-25"
  },
  {
    id: "UDLAP:herbarium:9a0e3b7f",
    occurrenceID: "UDLAP:herbarium:9a0e3b7f",
    numCatalogo: "lael-spec-00009",
    nombreComun: "Orquídea flor de mayo",
    especie: "Laelia speciosa",
    genero: "Laelia",
    familia: "Orchidaceae",
    orden: "Asparagales",
    clase: "Liliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Barranca de los Frailes",
    municipio: "Chignahuapan",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 19.8326,
    longitud: -98.0327,
    altitud: "2400 msnm",
    fechaRecolecta: "2022-04-05",
    recolector: "Dra. Consuelo Vega",
    determinador: "Dra. Consuelo Vega",
    habitat: "Bosque pino-encino, epífita sobre Quercus, 2400 msnm",
    notas: "Especie endémica de México. Protección especial NOM-059-SEMARNAT-2010.",
    estadoConservacion: "PR",
    imageURL: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=70",
    citasCount: 18,
    fechaRegistro: "2022-04-12"
  },
  {
    id: "UDLAP:herbarium:4d6f8a01",
    occurrenceID: "UDLAP:herbarium:4d6f8a01",
    numCatalogo: "quer-rugo-00077",
    nombreComun: "Encino",
    especie: "Quercus rugosa",
    genero: "Quercus",
    familia: "Fagaceae",
    orden: "Fagales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Sierra Negra",
    municipio: "Tlachichuca",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 18.9423,
    longitud: -97.2831,
    altitud: "2650 msnm",
    fechaRecolecta: "2023-09-07",
    recolector: "M.C. Sofía Landa",
    determinador: "Dr. Héctor Ramírez",
    habitat: "Bosque mesófilo, 2650 msnm",
    notas: "Hoja rugosa con nervaduras pronunciadas.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1542601906897-ecd2f72ddefb?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1542601906897-ecd2f72ddefb?w=400&q=70",
    citasCount: 4,
    fechaRegistro: "2023-09-15"
  },
  {
    id: "UDLAP:herbarium:7b2c4e5d",
    occurrenceID: "UDLAP:herbarium:7b2c4e5d",
    numCatalogo: "eyse-poly-00025",
    nombreComun: "Palo dulce",
    especie: "Eysenhardtia polystachya",
    genero: "Eysenhardtia",
    familia: "Fabaceae",
    orden: "Fabales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Cañada Cuicatlán",
    municipio: "San Juan Bautista Cuicatlán",
    estadoMX: "Oaxaca",
    pais: "México",
    latitud: 17.8012,
    longitud: -96.9536,
    altitud: "780 msnm",
    fechaRecolecta: "2022-10-19",
    recolector: "Dra. Consuelo Vega",
    determinador: "Dra. Consuelo Vega",
    habitat: "Selva baja caducifolia, suelo calizo, 780 msnm",
    notas: "Árbol con fluorescencia azul característica en agua.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=70",
    citasCount: 9,
    fechaRegistro: "2022-10-25"
  },
  {
    id: "UDLAP:herbarium:1e3a5c7b",
    occurrenceID: "UDLAP:herbarium:1e3a5c7b",
    numCatalogo: "ceib-pent-00048",
    nombreComun: "Ceiba",
    especie: "Ceiba pentandra",
    genero: "Ceiba",
    familia: "Malvaceae",
    orden: "Malvales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Parque Ecológico Yumká",
    municipio: "Centro",
    estadoMX: "Tabasco",
    pais: "México",
    latitud: 17.9869,
    longitud: -92.9088,
    altitud: "10 msnm",
    fechaRecolecta: "2023-02-28",
    recolector: "Dr. Héctor Ramírez",
    determinador: "Dra. Consuelo Vega",
    habitat: "Selva alta perennifolia, zona inundable, 10 msnm",
    notas: "Árbol de gran porte, tronco con aguijones cónicos.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=70",
    citasCount: 6,
    fechaRegistro: "2023-03-05"
  },
  {
    id: "UDLAP:herbarium:6f8d0b2e",
    occurrenceID: "UDLAP:herbarium:6f8d0b2e",
    numCatalogo: "pipe-auri-00035",
    nombreComun: "Hierba santa",
    especie: "Piper auritum",
    genero: "Piper",
    familia: "Piperaceae",
    orden: "Piperales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Huerta San Marcos",
    municipio: "Atlixco",
    estadoMX: "Puebla",
    pais: "México",
    latitud: 18.9066,
    longitud: -98.4362,
    altitud: "1720 msnm",
    fechaRecolecta: "2023-06-01",
    recolector: "M.C. Sofía Landa",
    determinador: "M.C. Sofía Landa",
    habitat: "Orilla de arroyo, sombra parcial, 1720 msnm",
    notas: "Olor anisado característico, hojas grandes.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=400&q=70",
    citasCount: 0,
    fechaRegistro: "2023-06-08"
  },
  {
    id: "UDLAP:herbarium:3c5e7a9f",
    occurrenceID: "UDLAP:herbarium:3c5e7a9f",
    numCatalogo: "tage-erec-00071",
    nombreComun: "Cempasúchil",
    especie: "Tagetes erecta",
    genero: "Tagetes",
    familia: "Asteraceae",
    orden: "Asterales",
    clase: "Magnoliopsida",
    division: "Tracheophyta",
    reino: "Plantae",
    lugarRecolecta: "Milpa Alta",
    municipio: "Milpa Alta",
    estadoMX: "CDMX",
    pais: "México",
    latitud: 19.1898,
    longitud: -99.0207,
    altitud: "2240 msnm",
    fechaRecolecta: "2022-10-25",
    recolector: "Dra. Consuelo Vega",
    determinador: "Dra. Consuelo Vega",
    habitat: "Zona agrícola, cultivo tradicional, 2240 msnm",
    notas: "Recolectada para estudios de polinizadores.",
    estadoConservacion: "LC",
    imageURL: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80",
    imagenThumb: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=70",
    citasCount: 11,
    fechaRegistro: "2022-11-01"
  }
];

/* ─────────────────────────────────────────────────────────────
   COLECCIÓN: workshops
   Talleres pasados y próximos del herbario.
───────────────────────────────────────────────────────────── */
const TALLERES_MOCK = [
  {
    id: "ws-001",
    titulo: "Técnicas de Herborización",
    descripcion: "Taller práctico sobre colecta, prensado y montaje de especímenes botánicos para herbario.",
    fecha: "2025-03-15",
    hora: "10:00",
    duracion: "4 horas",
    lugar: "Laboratorio de Botánica, UDLAP - Edificio CUL 3",
    instructor: "Dra. Consuelo Vega",
    cupoMax: 20,
    cupoActual: 18,
    estado: "pasado",
    galeria: [
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=75",
      "https://images.unsplash.com/photo-1542601906897-ecd2f72ddefb?w=600&q=75"
    ]
  },
  {
    id: "ws-002",
    titulo: "Identificación de Cactáceas Mexicanas",
    descripcion: "Aprende a identificar las principales especies de cactáceas presentes en Puebla y el altiplano.",
    fecha: "2025-05-08",
    hora: "09:00",
    duracion: "3 horas",
    lugar: "Jardín Botánico UDLAP",
    instructor: "Dr. Héctor Ramírez",
    cupoMax: 15,
    cupoActual: 9,
    estado: "proximo",
    registroURL: "https://registro.udlap.mx/talleres/ws-002",
    galeria: []
  },
  {
    id: "ws-003",
    titulo: "Darwin Core y Digitalización de Colecciones",
    descripcion: "Introducción al estándar Darwin Core Archive y cómo digitalizar registros botánicos para la Red de Herbarios Mexicanos.",
    fecha: "2025-06-20",
    hora: "11:00",
    duracion: "5 horas",
    lugar: "Sala de Cómputo, UDLAP - Edificio TEC",
    instructor: "M.C. Sofía Landa",
    cupoMax: 25,
    cupoActual: 3,
    estado: "proximo",
    registroURL: "https://registro.udlap.mx/talleres/ws-003",
    galeria: []
  },
  {
    id: "ws-004",
    titulo: "Plantas Medicinales del Valle de Puebla",
    descripcion: "Recorrido etnobotánico e identificación de plantas medicinales utilizadas por comunidades locales.",
    fecha: "2024-11-02",
    hora: "08:00",
    duracion: "6 horas",
    lugar: "Campus UDLAP y alrededores",
    instructor: "Dra. Consuelo Vega",
    cupoMax: 12,
    cupoActual: 12,
    estado: "pasado",
    galeria: [
      "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&q=75",
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&q=75"
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   COLECCIÓN: users
   Usuarios del sistema con roles y permisos.
   En Firestore el documento ID = firebase auth UID.
───────────────────────────────────────────────────────────── */
const USUARIOS_MOCK = [
  {
    uid: "mock-admin-001",
    nombre: "Consuelo Vega",
    email: "consuelo.vega@udlap.mx",
    matricula: "126543",
    rol: "admin",
    activo: true
  },
  {
    uid: "mock-dev-001",
    nombre: "Sofía Landa",
    email: "sofia.landa@udlap.mx",
    matricula: "198731",
    rol: "developer",
    activo: true
  },
  {
    uid: "mock-user-001",
    nombre: "Héctor Ramírez",
    email: "hector.ramirez@udlap.mx",
    matricula: "204892",
    rol: "user",
    activo: true
  }
];

/* ─────────────────────────────────────────────────────────────
   COLECCIÓN: materials
   Materiales descargables para usuarios con sesión iniciada.
───────────────────────────────────────────────────────────── */
const MATERIALES_MOCK = [
  {
    id: "mat-001",
    titulo: "Guía de Herborización UDLAP",
    descripcion: "Manual completo para la colecta y procesamiento de especímenes botánicos.",
    tipo: "PDF",
    url: "#",
    fecha: "2024-08-15"
  },
  {
    id: "mat-002",
    titulo: "Etiquetas para Prácticas de Campo",
    descripcion: "Plantillas imprimibles de etiquetas de herbario con formato UDLAP.",
    tipo: "PDF",
    url: "#",
    fecha: "2024-09-01"
  },
  {
    id: "mat-003",
    titulo: "Guía de Laboratorio de Botánica",
    descripcion: "Protocolos de laboratorio para estudiantes del curso de Botánica General.",
    tipo: "PDF",
    url: "#",
    fecha: "2025-01-10"
  },
  {
    id: "mat-004",
    titulo: "Claves Dicotómicas: Familias de Puebla",
    descripcion: "Clave de identificación para las familias botánicas más comunes del estado de Puebla.",
    tipo: "PDF",
    url: "#",
    fecha: "2024-12-20"
  }
];

/* ─────────────────────────────────────────────────────────────
   MAPA DE COLORES POR FAMILIA BOTÁNICA
   Usado en badges, acentos y etiquetas visuales.
───────────────────────────────────────────────────────────── */
const FAMILIA_COLORES = {
  "Asteraceae":    { bg: "#fff4d6", text: "#92610a", border: "#f5c842" },
  "Nyctaginaceae": { bg: "#fce4ef", text: "#8c1a45", border: "#e8607a" },
  "Cactaceae":     { bg: "#e8f5e9", text: "#1b5e20", border: "#66bb6a" },
  "Bignoniaceae":  { bg: "#ede7f6", text: "#4527a0", border: "#9575cd" },
  "Asparagaceae":  { bg: "#e0f2f1", text: "#004d40", border: "#4db6ac" },
  "Pinaceae":      { bg: "#e8f5e9", text: "#1b5e20", border: "#81c784" },
  "Orchidaceae":   { bg: "#fce4ec", text: "#880e4f", border: "#f48fb1" },
  "Fagaceae":      { bg: "#fbe9e7", text: "#bf360c", border: "#ff8a65" },
  "Fabaceae":      { bg: "#f1f8e9", text: "#33691e", border: "#aed581" },
  "Malvaceae":     { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7" },
  "Piperaceae":    { bg: "#e0f7fa", text: "#006064", border: "#4dd0e1" },
  "_default":      { bg: "#f5f5f5", text: "#424242", border: "#bdbdbd" }
};

/* ─────────────────────────────────────────────────────────────
   USUARIO MOCK ACTIVO (simula sesión iniciada)
   Cambia `rolActivo` para probar distintos permisos:
     "guest"     → sin sesión
     "user"      → sesión normal
     "admin"     → acceso al panel de control
     "developer" → acceso al panel de control
───────────────────────────────────────────────────────────── */
const SESION_MOCK = {
  activa: false,
  rolActivo: "guest",
  usuario: null
  // Para probar sesión, cambia a:
  // activa: true,
  // rolActivo: "admin",
  // usuario: USUARIOS_MOCK[0]
};
