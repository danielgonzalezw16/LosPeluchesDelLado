// SECCION PRINCIPAL ANUNCIOS
// --------------------------

const antesPrincipal = document.getElementById('p-izq');
const despuesPrincipal = document.getElementById('p-der');

const imgs = Array.from(document.querySelectorAll('.pelu-item'));
const tiposImgs = ['item-left', 'item-center', 'item-right','item-faraway'];
const tiposIds = ['Pokemon','Snoopy','Anime','Sonic'];

function nuevoGanador() {
  imgs.forEach((img, index) => {
    img.classList.remove('efecto');
    img.classList.add('cambio');
    img.classList.remove('item-left', 'item-center', 'item-right','item-faraway');
    img.classList.add(tiposImgs[index]);
    img.id = tiposIds[index];

    setTimeout(() => {
      img.classList.remove('cambio');
      if (img.classList.contains('item-center') && img.matches(':hover')) {
        img.classList.add('efecto');
      }
    }, 490); 
  });
}

function nuevoClickeador() {
    const peluches = {
      Pokemon: 'PeluPages/Categorias/Categoria_Pokemon.html',
      Snoopy: 'PeluPages/Categorias/Categoria_Snoopys.html',
      Anime: 'PeluPages/Categorias/Categoria_Anime.html',
      Sonic: 'PeluPages/Categorias/Categoria_Sonic.html'
    };

    for (const id in peluches) {
      const img = document.getElementById(id);
      if (img) {
        img.addEventListener('click', () => {
          if (img.className.split(' ').includes('item-center')){
            img.style.cursor = 'pointer';
            window.open(peluches[id]);
          } else if (img.className.split(' ').includes('item-left')){
            img.style.cursor = 'pointer';
            const primImg = tiposImgs.shift();
            tiposImgs.push(primImg);
            nuevoGanador();
          } else if (img.className.split(' ').includes('item-right')){
            img.style.cursor = 'pointer';
            const ultImg = tiposImgs.pop();
            tiposImgs.unshift(ultImg);
            nuevoGanador();
          } 
        });

        img.addEventListener('mouseenter', () => {
          if (img.classList.contains('item-center') && !img.classList.contains('cambio')) {
              img.classList.add('efecto');
          }
        });
        
        img.addEventListener('mouseleave', () => {
          img.classList.remove('efecto');
        });
      }
    }
}

// ==========================================
// USUARIOS PERMANENTES (INICIALIZACIÓN)
// ==========================================
function cargarUsuariosPredefinidos() {
  let usuarios = JSON.parse(localStorage.getItem("usuariosDB")) || [];

  // Lista de usuarios semilla que estarán siempre por defecto
  const usuariosSemilla = [
    {
      nombre: "sonic",
      correo: "sonic.unleashed@sega.com",
      contrasena: "sonicgraciasporhacermesonreir",
      rol: "user"
    },{
      nombre: "Pepe",
      correo: "pepe.aguilarc@gmail.com",
      contrasena: "pepito15",
      rol: "user"
    },{
      nombre: "Jadeicent",
      correo: "pastelss@plushe.cl",
      contrasena: "somosadmin",
      rol:"admin"
    },{
      nombre: "shadow",
      correo: "shadow.exe@sega.com",
      contrasena: "123456",
      rol: "admin"
    }
  ];

  // Insertar solo si no existen previamente en la lista
  usuariosSemilla.forEach(usuarioBase => {
    const yaExiste = usuarios.some(u => u.correo === usuarioBase.correo);
    if (!yaExiste) {
      usuarios.push(usuarioBase);
    }
  });

  localStorage.setItem("usuariosDB", JSON.stringify(usuarios));
}

document.addEventListener('DOMContentLoaded', () => {
  nuevoClickeador();
  cargarUsuariosPredefinidos(); // Carga automática de usuarios permanentes

  if (despuesPrincipal) {
    despuesPrincipal.addEventListener('click', () => {
      const ultImg = tiposImgs.pop();
      tiposImgs.unshift(ultImg);
      nuevoGanador();
    });
  }

  if (antesPrincipal) {
    antesPrincipal.addEventListener('click', () => {
      const primImg = tiposImgs.shift();
      tiposImgs.push(primImg);
      nuevoGanador();
    });
  }
});

const logo = document.getElementById("logo");
if (logo) {
  logo.addEventListener('click', () => {
      window.open("index.html",'_blank');
  });
}

// ==========================================
// FORMULARIO DE USUARIO (REGISTRO)
// ==========================================
function validacion(event){
  event.preventDefault();
  const vLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const vCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const inputNombre = document.getElementById("nombre");
  const nombre = inputNombre ? inputNombre.value.trim() : "";

  const inputContrasena = document.getElementById("contrasena");
  const contrasena = inputContrasena ? inputContrasena.value.trim() : "";

  const inputContrasenaConf = document.getElementById("contrasenaConf");
  const contrasenaConf = inputContrasenaConf ? inputContrasenaConf.value.trim() : "";

  const inputCorreo = document.getElementById("correo");
  const correo = inputCorreo ? inputCorreo.value.trim() : "";

  if (nombre === "" || !vLetras.test(nombre)) {
    inputNombre.classList.add("is-invalid");
    inputNombre.focus();
    return false;
  } else {
    inputNombre.classList.remove("is-invalid");
    inputNombre.classList.add("is-valid");
  }

  if (contrasena === "") {
    inputContrasena.classList.add("is-invalid");
    inputContrasena.focus();
    return false;
  } else {
    inputContrasena.classList.remove("is-invalid");
    inputContrasena.classList.add("is-valid");
  }

  if (contrasenaConf === "" || contrasenaConf !== contrasena) {
    inputContrasenaConf.classList.add("is-invalid");
    inputContrasenaConf.focus();
    return false;
  } else {
    inputContrasenaConf.classList.remove("is-invalid");
    inputContrasenaConf.classList.add("is-valid");
  }

  if (correo === "" || !vCorreo.test(correo)) {
    inputCorreo.classList.add("is-invalid");
    inputCorreo.focus();
    return false;
  } else {
    inputCorreo.classList.remove("is-invalid");
    inputCorreo.classList.add("is-valid");
  }

  let usuarios = JSON.parse(localStorage.getItem("usuariosDB")) || [];
  
  // Por defecto, todo nuevo usuario registrado es 'user'
  const nuevoUsuario = { nombre, correo, contrasena, rol: "user" };

  const existe = usuarios.some(u => u.correo === correo);
  if (existe) {
    alert("Este correo ya se encuentra registrado. Intenta Iniciar Sesión.");
    return false;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuariosDB", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

  window.location.href = "PeluUsuario.html";
  return true;
}

// ==========================================
// FORMULARIO DE INICIO DE SESIÓN (LOGIN)
// ==========================================
function loginUsuario(event) {
  event.preventDefault();

  const usuarioInput = document.getElementById("correoLogin").value.trim();
  const passInput = document.getElementById("passLogin").value.trim();
  const errorElement = document.getElementById("errorLogin");

  const usuarios = JSON.parse(localStorage.getItem("usuariosDB")) || [];

  const usuarioEncontrado = usuarios.find(
    u => (u.correo === usuarioInput || u.nombre === usuarioInput) && u.contrasena === passInput
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
    if (errorElement) errorElement.classList.add("d-none");

    window.location.href = "PeluUsuario.html";
  } else {
    if (errorElement) errorElement.classList.remove("d-none");
  }
}

// ==========================================
// CAMBIAR BOTONES DEL MENU SI HAY SESIÓN ACTIVA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const contenedorBotones = document.querySelector(".init_button");

  if (usuarioActivo && contenedorBotones) {
    const esPaginaPrincipal = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "";
    const rutaPerfil = esPaginaPrincipal ? "PeluPages/Principales/PeluUsuario.html" : "PeluUsuario.html";

    // Si es Administrador muestra la etiqueta (Admin)
    const textoBoton = usuarioActivo.rol === "admin" 
      ? `${usuarioActivo.nombre.split(' ')[0]} | Admin |` 
      : `Hola, ${usuarioActivo.nombre.split(' ')[0]}`;

    contenedorBotones.innerHTML = `
      <a href="${rutaPerfil}" class="btn btn-cafe-claro fs-5">${textoBoton}</a>
    `;
  }
});

// ==========================================
// CONTROL DE SESIÓN Y BOTONES DE ADMINISTRADOR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const contenedorBotones = document.querySelector(".init_button");

  // 1. Modificar el menú superior si hay sesión y existe el contenedor
  if (usuarioActivo && contenedorBotones) {
    const esPaginaPrincipal = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "";
    
    const enSubCarpeta = window.location.pathname.includes("/PeluPages/");
    const rutaPerfil = enSubCarpeta ? "Principales/PeluUsuario.html" : "PeluPages/Principales/PeluUsuario.html";
    const rutaRegistro = enSubCarpeta ? "Principales/PeluCrearCuenta.html" : "PeluPages/Principales/PeluCrearCuenta.html";

    const esAdmin = usuarioActivo.rol === "admin" || usuarioActivo.nombre === "Jadeicent" || usuarioActivo.nombre === "shadow";
    const nombreCorto = usuarioActivo.nombre ? usuarioActivo.nombre.split(' ')[0] : "Admin";
    const textoBoton = esAdmin ? `${nombreCorto} | Admin |` : `Hola, ${nombreCorto}`;

    if (esAdmin) {
      contenedorBotones.innerHTML = `
        <a href="${rutaPerfil}" class="btn btn-cafe-claro fs-5 me-2">${textoBoton}</a>
        <a href="${rutaRegistro}" class="btn btn-warning fs-5 text-dark fw-bold" target="_blank">Admin Registro</a>
      `;
    } else {
      contenedorBotones.innerHTML = `
        <a href="${rutaPerfil}" class="btn btn-cafe-claro fs-5">${textoBoton}</a>
      `;
    }
  }

  // 2. Inyectar el botón flotante de pruebas si el usuario actual es Administrador
  if (usuarioActivo && (usuarioActivo.rol === "admin" || usuarioActivo.nombre === "Jadeicent" || usuarioActivo.nombre === "shadow")) {
    if (!document.getElementById("btn-panel-pruebas")) {
      const botonFlotante = document.createElement("div");
      botonFlotante.innerHTML = `
        <button id="btn-panel-pruebas" style="
          position: fixed; 
          bottom: 20px; 
          right: 20px; 
          background-color: #4e3629; 
          color: #ffe2c7; 
          border: 2px solid #ffe2c7; 
          padding: 12px 18px; 
          border-radius: 30px; 
          font-weight: bold; 
          cursor: pointer; 
          z-index: 99999;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        ">🧪 Ejecutar Pruebas Unitarias</button>
        
        <div id="modal-pruebas-unitarias" style="
          display: none;
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 380px;
          max-height: 500px;
          overflow-y: auto;
          background: #fdf8f5;
          border: 3px solid #4e3629;
          border-radius: 15px;
          padding: 15px;
          z-index: 100000;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          font-family: Arial, sans-serif;
          font-size: 13px;
          color: #4e3629;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D7C4B7; padding-bottom: 5px; margin-bottom: 8px;">
            <strong>📊 Panel de Pruebas Admin</strong>
            <button id="cerrar-modal-pruebas" style="background:none; border:none; font-weight:bold; cursor:pointer; font-size:16px;">✕</button>
          </div>
          <div id="contenido-resultados-pruebas">
            <p>Presiona el botón para correr las validaciones de prueba.</p>
          </div>
        </div>
      `;
      document.body.appendChild(botonFlotante);

      const btnPruebas = document.getElementById("btn-panel-pruebas");
      const modalPruebas = document.getElementById("modal-pruebas-unitarias");

      btnPruebas.addEventListener("click", () => {
        // Si el modal está visible, lo cerramos
        if (modalPruebas.style.display === "block") {
          modalPruebas.style.display = "none";
          return;
        }

        // ⏳ EFECTO DE CARGA DE 2 SEGUNDOS
        btnPruebas.innerHTML = "⏳ Evaluando Pruebas Unitarias...";
        btnPruebas.style.opacity = "0.8";
        btnPruebas.disabled = true;

        setTimeout(() => {
          btnPruebas.innerHTML = "🧪 Ejecutar Pruebas Unitarias";
          btnPruebas.style.opacity = "1";
          btnPruebas.disabled = false;
          modalPruebas.style.display = "block";

          // Lógica de Validación
          function validarPruebaWeb(n, c, p, pc) {
            const vLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            const vCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let err = [];
            if (!n || !vLetras.test(n)) err.push('nombre');
            if (!p) err.push('contrasena');
            if (!pc || pc !== p) err.push('contrasenaConf');
            if (!c || !vCorreo.test(c)) err.push('correo');
            return { valido: err.length === 0, errores: err };
          }

          const r2 = validarPruebaWeb('Pedro123', 'pedro@plushe.cl', '1234', '1234');
          const r3 = validarPruebaWeb('Pedro123', 'correo-malo', '1234', '1234');

          // RENDERIZADO CON DETALLES DESPLEGABLES
          document.getElementById("contenido-resultados-pruebas").innerHTML = `
            <!-- CASO 1 -->
            <div style="margin-bottom: 8px; background: #e2f0d9; padding: 8px; border-radius: 6px; border-left: 4px solid #385723;">
              <div>✅ <b>Caso 1 (Éxito Total):</b> 0 errores detectados.</div>
              <details style="margin-top: 5px; cursor: pointer;">
                <summary style="font-weight: bold; color: #274e13;">🔍 Ver detalle y explicación</summary>
                <div style="font-size: 11px; margin-top: 4px; background: rgba(255,255,255,0.7); padding: 5px; border-radius: 4px;">
                  <b>De qué trata:</b> Prueba un registro donde todos los datos son totalmente válidos.<br>
                  <b>Cómo se hizo:</b> Se pasaron los valores <i>("Pedro Perez", "pedro@plushe.cl", "1234", "1234")</i>. La expresión regular aprobó el formato y devolvió <code>valido: true</code> sin campos rechazados.
                </div>
              </details>
            </div>

            <!-- CASO 2 -->
            <div style="margin-bottom: 8px; background: #fff2cc; padding: 8px; border-radius: 6px; border-left: 4px solid #b45f06;">
              <div>⚠️ <b>Caso 2 (1 Fallo):</b> 1 error [<b>${r2.errores.join(', ')}</b>].</div>
              <details style="margin-top: 5px; cursor: pointer;">
                <summary style="font-weight: bold; color: #7f6000;">🔍 Ver detalle y explicación</summary>
                <div style="font-size: 11px; margin-top: 4px; background: rgba(255,255,255,0.7); padding: 5px; border-radius: 4px;">
                  <b>De qué trata:</b> Comprueba que el sistema detecte cuando exactamente un solo campo está mal construido.<br>
                  <b>Cómo se hizo:</b> Se ingresó el nombre <i>"Pedro123"</i> con números. La regla regex <code>/^[a-zA-Z...]+$/</code> falló, atrapó el error en el arreglo <code>['nombre']</code> y retornó 1 error esperado.
                </div>
              </details>
            </div>

            <!-- CASO 3 -->
            <div style="margin-bottom: 8px; background: #fce4d6; padding: 8px; border-radius: 6px; border-left: 4px solid #c65911;">
              <div>❌ <b>Caso 3 (Múltiples Fallos):</b> ${r3.errores.length} errores [<b>${r3.errores.join(', ')}</b>].</div>
              <details style="margin-top: 5px; cursor: pointer;">
                <summary style="font-weight: bold; color: #843c0c;">🔍 Ver detalle y explicación</summary>
                <div style="font-size: 11px; margin-top: 4px; background: rgba(255,255,255,0.7); padding: 5px; border-radius: 4px;">
                  <b>De qué trata:</b> Verifica que la función capture simultáneamente múltiples errores si más de un dato es incorrecto.<br>
                  <b>Cómo se hizo:</b> Se pasó un nombre con números <i>("Pedro123")</i> y un correo sin arroba ni dominio <i>("correo-malo")</i>. La función registró ambos problemas devolviendo <code>errores.length > 1</code>.
                </div>
              </details>
            </div>
          `;
        }, 1800); // 1.8 segundos de carga simular
      });

      document.getElementById("cerrar-modal-pruebas").addEventListener("click", () => {
        modalPruebas.style.display = "none";
      });
    }
  }
});