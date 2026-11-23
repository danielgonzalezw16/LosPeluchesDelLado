// ==========================================
// LISTA Y DETALLE DE PRODUCTOS Y ÓRDENES
// ==========================================

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
));
const clp = n => "$" + Number(n).toLocaleString("es-CL");
const desglosarIva = total => {
  const neto = Math.round(Number(total) / 1.19);
  const iva = Number(total) - neto;
  return { neto, iva, total: Number(total) };
};

function mostrarError(msg) {
  console.error("[PeluGestion] " + msg);
  const tbody = document.getElementById("tabla-body");
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="alert alert-danger mb-0">${esc(msg)}</div></td></tr>`;
  } else {
    alert(msg);
  }
}

// ---------- PRODUCTOS (STOCK REAL Y PRECIOS ACTUALIZADOS) ----------
async function iniciarProductos() {
  if (!tienePermiso("ver_productos")) {
    mostrarError("Tu rol no tiene permiso para ver los productos.");
    return;
  }

  const productos = typeof obtenerProductos === "function" ? obtenerProductos() : (typeof PRODUCTOS !== "undefined" ? PRODUCTOS : null);
  if (!productos) {
    mostrarError("No se cargó datos.js (revisa la ruta del <script> en el HTML).");
    return;
  }

  const tbody = document.getElementById("tabla-body");
  const buscador = document.getElementById("filtro");

  function pintar(lista) {
    tbody.innerHTML = lista.length
      ? lista.map(p => {
        const { neto, iva, total } = desglosarIva(p.precio);
        const stockReal = Math.min(50, Math.max(0, Number(p.stock ?? 0)));
        return `
        <tr>
          <td>${p.id}</td>
          <td>${esc(p.nombre)}</td>
          <td>${esc(p.categoria)}</td>
          <td>
            <strong>${clp(total)}</strong>
            <small class="text-muted d-block">Neto: ${clp(neto)} | IVA (19%): ${clp(iva)}</small>
          </td>
          <td>${stockReal > 0
              ? `<span class="badge bg-success">${stockReal} / 50</span>`
              : `<span class="badge bg-danger">Agotado</span>`}</td>
          <td><button class="btn btn-sm btn-cafe-claro" data-id="${p.id}">Ver detalle</button></td>
        </tr>`;
      }).join("")
      : `<tr><td colspan="6" class="text-center">Sin resultados</td></tr>`;
  }

  function verDetalle(id) {
    const listaActual = typeof obtenerProductos === "function" ? obtenerProductos() : productos;
    const p = listaActual.find(x => x.id === id);
    if (!p) return;
    const { neto, iva, total } = desglosarIva(p.precio);
    const stockReal = Math.min(50, Math.max(0, Number(p.stock ?? 0)));
    document.getElementById("modal-titulo").textContent = p.nombre;
    document.getElementById("modal-cuerpo").innerHTML = `
      <div class="row">
        <div class="col-md-5">
          <img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" class="img-fluid rounded" onerror="this.src='../../PeluAssets/Iconos/Logo.png'">
        </div>
        <div class="col-md-7">
          <p><b>Categoría:</b> ${esc(p.categoria)}</p>
          <p><b>Precio Neto:</b> ${clp(neto)}</p>
          <p><b>IVA (19%):</b> ${clp(iva)}</p>
          <p><b>Precio Total (IVA inc.):</b> ${clp(total)}</p>
          <p><b>Stock actual:</b> ${stockReal > 0 ? stockReal + ' unidades (máx. 50)' : '<span class="text-danger fw-bold">Agotado</span>'}</p>
          <p><b>Descripción:</b> ${esc(p.descripcion || p.nombre)}</p>
        </div>
      </div>`;
    new bootstrap.Modal(document.getElementById("modal-detalle")).show();
  }

  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button[data-id]");
    if (btn) verDetalle(Number(btn.dataset.id));
  });

  buscador.addEventListener("input", () => {
    const q = buscador.value.trim().toLowerCase();
    const listaActual = typeof obtenerProductos === "function" ? obtenerProductos() : productos;
    pintar(listaActual.filter(p =>
      p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)));
  });

  pintar(productos);
}

// ---------- ÓRDENES (VENTAS REALES Y DETALLE) ----------
async function iniciarOrdenes() {
  if (!tienePermiso("ver_ordenes")) {
    mostrarError("Tu rol no tiene permiso para ver las órdenes.");
    return;
  }

  const ordenes = typeof obtenerOrdenes === "function" ? obtenerOrdenes() : (typeof ORDENES !== "undefined" ? ORDENES : null);
  const productos = typeof obtenerTodosProductos === "function" ? obtenerTodosProductos() : (typeof PRODUCTOS !== "undefined" ? PRODUCTOS : []);
  if (!ordenes) {
    mostrarError("No se cargó datos.js (revisa la ruta del <script> en el HTML).");
    return;
  }

  const nombreProducto = item => item.nombre || (productos.find(p => p.id === item.productoId) || {}).nombre || ("Producto #" + (item.productoId || ""));
  const totalOrden = o => o.items.reduce((s, i) => s + Number(i.cantidad) * Number(i.precio), 0);
  const colorEstado = { "Pendiente": "warning", "En preparación": "info", "Entregada": "success" };

  const tbody = document.getElementById("tabla-body");
  const filtro = document.getElementById("filtro");

  function pintar(lista) {
    const ordenadas = [...lista].reverse();
    tbody.innerHTML = ordenadas.length
      ? ordenadas.map(o => {
        const { neto, iva, total } = desglosarIva(totalOrden(o));
        return `
        <tr>
          <td>#${o.id}</td>
          <td>${esc(o.fecha)}</td>
          <td>${esc(o.cliente)}</td>
          <td><span class="badge bg-${colorEstado[o.estado] || "secondary"}">${esc(o.estado)}</span></td>
          <td>
            <strong>${clp(total)}</strong>
            <small class="text-muted d-block">Neto: ${clp(neto)} | IVA: ${clp(iva)}</small>
          </td>
          <td><button class="btn btn-sm btn-cafe-claro" data-id="${o.id}">Ver detalle</button></td>
        </tr>`;
      }).join("")
      : `<tr><td colspan="6" class="text-center">Sin resultados</td></tr>`;
  }

  function verDetalle(id) {
    const listaActual = typeof obtenerOrdenes === "function" ? obtenerOrdenes() : ordenes;
    const o = listaActual.find(x => x.id === id);
    if (!o) return;
    const { neto, iva, total } = desglosarIva(totalOrden(o));
    document.getElementById("modal-titulo").textContent = "Orden #" + o.id;
    document.getElementById("modal-cuerpo").innerHTML = `
      <p><b>Fecha:</b> ${esc(o.fecha)}</p>
      <p><b>Cliente:</b> ${esc(o.cliente)} (${esc(o.correo)})</p>
      <p><b>Estado:</b> ${esc(o.estado)}</p>
      ${o.metodoPago ? `<p><b>Medio de Pago:</b> ${esc(o.metodoPago)}</p>` : ""}
      ${o.entrega ? `<p><b>Entrega:</b> ${esc(o.entrega)}</p>` : ""}
      <table class="table table-sm">
        <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead>
        <tbody>
          ${o.items.map(i => `
            <tr>
              <td>${esc(nombreProducto(i))}</td>
              <td>${i.cantidad}</td>
              <td>${clp(i.precio)}</td>
              <td>${clp(Number(i.cantidad) * Number(i.precio))}</td>
            </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr><td colspan="3" class="text-end">Neto</td><td>${clp(neto)}</td></tr>
          <tr><td colspan="3" class="text-end">IVA (19%)</td><td>${clp(iva)}</td></tr>
          <tr><th colspan="3" class="text-end">Total (IVA inc.)</th><th>${clp(total)}</th></tr>
        </tfoot>
      </table>`;
    new bootstrap.Modal(document.getElementById("modal-detalle")).show();
  }

  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button[data-id]");
    if (btn) verDetalle(Number(btn.dataset.id));
  });

  filtro.addEventListener("input", () => {
    const q = filtro.value.trim().toLowerCase();
    const listaActual = typeof obtenerOrdenes === "function" ? obtenerOrdenes() : ordenes;
    pintar(listaActual.filter(o =>
      String(o.id).includes(q) ||
      o.cliente.toLowerCase().includes(q) ||
      o.estado.toLowerCase().includes(q)));
  });

  pintar(ordenes);
}

document.addEventListener("DOMContentLoaded", () => {
  const vista = document.body.dataset.vista;
  if (typeof tienePermiso !== "function") {
    mostrarError("No se cargó permisos.js (revisa la ruta del <script> en el HTML).");
    return;
  }
  if (vista === "productos") iniciarProductos();
  else if (vista === "ordenes") iniciarOrdenes();
  else mostrarError('Falta data-vista="productos" o data-vista="ordenes" en el <body>.');
});
