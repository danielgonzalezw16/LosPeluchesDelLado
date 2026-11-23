// ==========================================
// CONTROL DE ACCESO POR ROL (permisos.js)
// Cargar en TODAS las páginas, antes de los demás scripts:
//   <script src="permisos.js"></script>   (o ../../permisos.js en subcarpetas)
// ==========================================

// 1) Qué puede hacer cada rol
const PERMISOS = {
  admin: ["*"], // todo
  user: [
    "productos", "ver_detalle_producto",
    "comprar", "ver_carrito", "ver_mis_pedidos", "editar_perfil"
  ],
  vendedor: [
     "ver_productos", "ver_detalle_producto",
    "ver_ordenes", "ver_detalle_orden"
  ],
  invitado: [ // visitante sin sesión
    "ver_productos", "ver_detalle_producto"
  ]
};

function obtenerUsuarioActivo() {
  try {
    return JSON.parse(localStorage.getItem("usuarioLogueado"));
  } catch (e) {
    return null;
  }
}

function tienePermiso(permiso) {
  const usuario = obtenerUsuarioActivo();
  const rol = usuario ? usuario.rol : "invitado";
  const lista = PERMISOS[rol] || [];
  return lista.includes("*") || lista.includes(permiso);
}

// 2) Ocultar (eliminar del DOM) todo lo que el rol no puede ver.
// En el HTML marca cada elemento con data-permiso="nombre_permiso".
// Se pueden listar varios separados por coma (basta con tener uno).
function aplicarPermisosEnVista() {
  document.querySelectorAll("[data-permiso]").forEach(el => {
    const requeridos = el.dataset.permiso.split(",").map(p => p.trim());
    if (!requeridos.some(tienePermiso)) {
      el.remove();
    }
  });
}

// 3) Proteger páginas completas (evita entrar escribiendo la URL).
// En cada página restringida agrega en <body>:  data-requiere="permiso"
function protegerPagina() {
  const requerido = document.body.dataset.requiere;
  if (!requerido) return;

  if (!tienePermiso(requerido)) {
    alert("No tienes permiso para acceder a esta sección.");
    const enSubCarpeta = window.location.pathname.includes("/PeluPages/");
    window.location.href = enSubCarpeta ? "../../index.html" : "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  protegerPagina();
  aplicarPermisosEnVista();
});
