// ==========================================
// DATOS DE EJEMPLO
// ==========================================
const CATEGORIAS_INICIALES = [
  { nombre: "Anime", imagen: "../../PeluAssets/Peluches/Yuji Itadori.png" },
  { nombre: "Pokemon", imagen: "../../PeluAssets/Peluches/eevee.png" },
  { nombre: "Sonic", imagen: "../../PeluAssets/Peluches/sonic pequeño.png" },
  { nombre: "Snoopys", imagen: "../../PeluAssets/Peluches/snoopy rosa.png" }
];

function obtenerCategorias() {
  try {
    const guardadas = JSON.parse(localStorage.getItem("categoriasDB"));
    if (Array.isArray(guardadas) && guardadas.length > 0) {
      return guardadas;
    }
  } catch (e) {}
  localStorage.setItem("categoriasDB", JSON.stringify(CATEGORIAS_INICIALES));
  return CATEGORIAS_INICIALES.slice();
}

function guardarCategorias(lista) {
  localStorage.setItem("categoriasDB", JSON.stringify(lista));
}

const PRODUCTOS_INICIALES = [
  {
    id: 1,
    categoria: "Anime",
    nombre: "Jujutsu kaisen - Yuji Itadori",
    precio: 26500,
    stock: 15,
    eliminado: false,
    descripcion: "Peluche suave de Yuji Itadori, 30 cm, relleno hipoalergénico.",
    imagen: "../../PeluAssets/Peluches/Yuji Itadori.png",
    detalle: "detalle_itadori.html"
  },
  {
    id: 2,
    categoria: "Anime",
    nombre: "Jujutsu kaisen - Gojo Satoru",
    precio: 28000,
    stock: 12,
    eliminado: false,
    descripcion: "Peluche de Gojo Satoru, 30 cm, relleno suave.",
    imagen: "../../PeluAssets/Peluches/Gojo Satoru.png",
    detalle: "detalle_gojo.html"
  },
  {
    id: 3,
    categoria: "Pokemon",
    nombre: "Eevee",
    precio: 29000,
    stock: 22,
    eliminado: false,
    descripcion: "Peluche Eevee, 25 cm.",
    imagen: "../../PeluAssets/Peluches/eevee.png",
    detalle: "detalle_eevee.html"
  },
  {
    id: 4,
    categoria: "Pokemon",
    nombre: "Snorlax",
    precio: 23000,
    stock: 10,
    eliminado: false,
    descripcion: "Peluche Snorlax, 35 cm.",
    imagen: "../../PeluAssets/Peluches/snorlax.png",
    detalle: "detalle_snorlax.html"
  },
  {
    id: 5,
    categoria: "Sonic",
    nombre: "Sonic Pequeño",
    precio: 10000,
    stock: 8,
    eliminado: false,
    descripcion: "Sonic Pequeño, 10 cm.",
    imagen: "../../PeluAssets/Peluches/sonic pequeño.png",
    detalle: "detalle_sonic.html"
  },
  {
    id: 6,
    categoria: "Sonic",
    nombre: "Shadow Batman",
    precio: 15000,
    stock: 5,
    eliminado: false,
    descripcion: "Shadow edición Batman, 20 cm.",
    imagen: "../../PeluAssets/Peluches/shadow Batman.png",
    detalle: "detalle_shadow.html"
  },
  {
    id: 7,
    categoria: "Snoopys",
    nombre: "Snoopy Rosa",
    precio: 25000,
    stock: 8,
    eliminado: false,
    descripcion: "Snoopy Rosa, 35 cm.",
    imagen: "../../PeluAssets/Peluches/snoopy rosa.png",
    detalle: "detalle_snoopy_rosa.html"
  },
  {
    id: 8,
    categoria: "Snoopys",
    nombre: "Snoopy el Piloto-Mecánico",
    precio: 29000,
    stock: 6,
    eliminado: false,
    descripcion: "Snoopy el Piloto-Mecánico, 35 cm.",
    imagen: "../../PeluAssets/Peluches/snoopy mecanico.png",
    detalle: "detalle_snoopy_piloto.html"
  }
];

function obtenerTodosProductos() {
  try {
    const guardados = JSON.parse(localStorage.getItem("productosDB"));
    if (Array.isArray(guardados) && guardados.length > 0) {
      return guardados.map(p => ({
        ...p,
        precio: Math.max(0, Number(p.precio || 0)),
        stock: Math.min(50, Math.max(0, Number(p.stock !== undefined ? p.stock : 50))),
        eliminado: Boolean(p.eliminado),
        descripcion: p.descripcion || p.nombre
      }));
    }
  } catch (e) {}
  localStorage.setItem("productosDB", JSON.stringify(PRODUCTOS_INICIALES));
  return PRODUCTOS_INICIALES.slice();
}

// Devuelve solo los productos activos (no eliminados) para catálogo y vendedor
function obtenerProductos() {
  return obtenerTodosProductos().filter(p => !p.eliminado);
}

function guardarProductos(lista) {
  const normalizada = lista.map(p => ({
    ...p,
    precio: Math.max(0, Number(p.precio || 0)),
    stock: Math.min(50, Math.max(0, Number(p.stock !== undefined ? p.stock : 0))),
    eliminado: Boolean(p.eliminado)
  }));
  localStorage.setItem("productosDB", JSON.stringify(normalizada));
}

function descontarStock(itemsComprados) {
  const productos = obtenerTodosProductos();
  itemsComprados.forEach(item => {
    const prod = productos.find(
      p => p.nombre.toLowerCase() === String(item.nombre || "").toLowerCase() || p.id === item.productoId
    );
    if (prod) {
      prod.stock = Math.max(0, Number(prod.stock) - Number(item.cantidad));
    }
  });
  guardarProductos(productos);
}

const PRODUCTOS = obtenerProductos();

const ORDENES = [
  {
    id: 1001,
    fecha: "2026-11-18",
    cliente: "María González",
    correo: "maria.g@correo.cl",
    estado: "Entregada",
    items: [
      { productoId: 1, nombre: "Jujutsu kaisen - Yuji Itadori", cantidad: 2, precio: 26500 },
      { productoId: 7, nombre: "Snoopy Rosa", cantidad: 1, precio: 25000 }
    ]
  },
  {
    id: 1002,
    fecha: "2026-11-20",
    cliente: "Carlos Rojas",
    correo: "carlos.r@correo.cl",
    estado: "En preparación",
    items: [
      { productoId: 3, nombre: "Eevee", cantidad: 3, precio: 29000 }
    ]
  },
  {
    id: 1003,
    fecha: "2026-11-22",
    cliente: "Ana Pérez",
    correo: "ana.p@correo.cl",
    estado: "Pendiente",
    items: [
      { productoId: 5, nombre: "Sonic Pequeño", cantidad: 1, precio: 10000 },
      { productoId: 1, nombre: "Jujutsu kaisen - Yuji Itadori", cantidad: 1, precio: 26500 }
    ]
  }
];

const CLAVE_ORDENES = "ordenesDB";

function obtenerOrdenes() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_ORDENES));
    if (Array.isArray(guardadas)) return guardadas;
  } catch (e) {}
  localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ORDENES));
  return ORDENES.slice();
}

function guardarOrden(orden) {
  const ordenes = obtenerOrdenes();
  const siguienteId = ordenes.reduce((max, o) => Math.max(max, o.id), 1000) + 1;
  const nueva = {
    id: siguienteId,
    fecha: new Date().toLocaleDateString("sv-SE"),
    estado: "Pendiente",
    ...orden
  };
  ordenes.push(nueva);
  localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ordenes));
  return nueva;
}
