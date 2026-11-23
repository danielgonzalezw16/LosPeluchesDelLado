// ==========================================
// DATOS DE EJEMPLO (reemplaza a los archivos .json)
// Cargar antes de PeluGestion.js
// ==========================================

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Pikachu Sonriente",
    categoria: "Pokemon",
    precio: 12990,
    stock: 15,
    descripcion: "Peluche suave de Pikachu, 30 cm, relleno hipoalergénico.",
    imagen: "../../PeluAssets/Imagenes/Pokemon_plushes.png"
  },
  {
    id: 2,
    nombre: "Snoopy Dormilón",
    categoria: "Snoopy",
    precio: 14990,
    stock: 8,
    descripcion: "Snoopy acostado sobre su casita, 35 cm.",
    imagen: "../../PeluAssets/Imagenes/Snoopy_plushes.png"
  },
  {
    id: 3,
    nombre: "Sonic Clásico",
    categoria: "Sonic",
    precio: 16990,
    stock: 0,
    descripcion: "Sonic de pie con zapatillas rojas, 40 cm.",
    imagen: "../../PeluAssets/Imagenes/Sonic_Plushes.png"
  },
  {
    id: 4,
    nombre: "Peluche Anime Kawaii",
    categoria: "Anime",
    precio: 11990,
    stock: 22,
    descripcion: "Personaje kawaii edición pastel, 25 cm.",
    imagen: "../../PeluAssets/Imagenes/Anime_Plushes.jpg"
  }
];

const ORDENES = [
  {
    id: 1001,
    fecha: "2026-11-18",
    cliente: "María González",
    correo: "maria.g@correo.cl",
    estado: "Entregada",
    items: [
      { productoId: 1, cantidad: 2, precio: 12990 },
      { productoId: 2, cantidad: 1, precio: 14990 }
    ]
  },
  {
    id: 1002,
    fecha: "2026-11-20",
    cliente: "Carlos Rojas",
    correo: "carlos.r@correo.cl",
    estado: "En preparación",
    items: [
      { productoId: 4, cantidad: 3, precio: 11990 }
    ]
  },
  {
    id: 1003,
    fecha: "2026-11-22",
    cliente: "Ana Pérez",
    correo: "ana.p@correo.cl",
    estado: "Pendiente",
    items: [
      { productoId: 3, cantidad: 1, precio: 16990 },
      { productoId: 1, cantidad: 1, precio: 12990 }
    ]
  }
];
