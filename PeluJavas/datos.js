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
    imagen: "../../PeluAssets/Imagenes/Anime_Plushes.jpg"
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
    imagen: "../../PeluAssets/Imagenes/Pokemon_plushes.png"
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
      { productoId: 1, cantidad: 2, precio: 26500 },
      { productoId: 2, cantidad: 1, precio: 25000 }
    ]
  },
  {
    id: 1002,
    fecha: "2026-11-20",
    cliente: "Carlos Rojas",
    correo: "carlos.r@correo.cl",
    estado: "En preparación",
    items: [
      { productoId: 4, cantidad: 3, precio: 29000 }
    ]
  },
  {
    id: 1003,
    fecha: "2026-11-22",
    cliente: "Ana Pérez",
    correo: "ana.p@correo.cl",
    estado: "Pendiente",
    items: [
      { productoId: 3, cantidad: 1, precio: 10000 },
      { productoId: 1, cantidad: 1, precio: 26500 }
    ]
  }
];

// ==========================================
// ÓRDENES COMPARTIDAS (localStorage)
// El carrito escribe aquí al comprar y el vendedor/admin lee de aquí.
// Si aún no hay nada guardado, se parte con las órdenes de ejemplo.
// ==========================================
const CLAVE_ORDENES = "ordenesDB";

function obtenerOrdenes() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_ORDENES));
    if (Array.isArray(guardadas)) return guardadas;
  } catch (e) { /* datos corruptos: se reinicia abajo */ }
  localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ORDENES));
  return ORDENES.slice();
}

// orden = { cliente, correo, items: [{ productoId, cantidad, precio }] }
function guardarOrden(orden) {
  const ordenes = obtenerOrdenes();
  const siguienteId = ordenes.reduce((max, o) => Math.max(max, o.id), 1000) + 1;
  const nueva = {
    id: siguienteId,
    fecha: new Date().toLocaleDateString("sv-SE"), // AAAA-MM-DD en hora local
    estado: "Pendiente",
    ...orden
  };
  ordenes.push(nueva);
  localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ordenes));
  return nueva;
}
