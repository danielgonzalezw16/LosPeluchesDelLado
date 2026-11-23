// ==========================================
// DATOS DE EJEMPLO (reemplaza a los archivos .json)
// Cargar antes de PeluGestion.js
// ==========================================

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Yuji Itadori",
    categoria: "Anime",
    precio: 26500,
    stock: 15,
    descripcion: "Peluche suave de Yuji Itadori, 30 cm, relleno hipoalergénico.",
    imagen: "../../PeluAssets/Imagenes/Pokemon_plushes.png"
  },
  {
    id: 2,
    nombre: "Snoopy Rosa",
    categoria: "Snoopy",
    precio: 25000,
    stock: 8,
    descripcion: "Snoopy Rosa, 35 cm.",
    imagen: "../../PeluAssets/Imagenes/Snoopy_plushes.png"
  },
  {
    id: 3,
    nombre: "Sonic Pequeño",
    categoria: "Sonic",
    precio: 10000,
    stock: 0,
    descripcion: "Sonic Pequeño, 10 cm.",
    imagen: "../../PeluAssets/Imagenes/Sonic_Plushes.png"
  },
  {
    id: 4,
    nombre: "Eevee",
    categoria: "Pokemon",
    precio: 29000,
    stock: 22,
    descripcion: "Eevee, 25 cm.",
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
