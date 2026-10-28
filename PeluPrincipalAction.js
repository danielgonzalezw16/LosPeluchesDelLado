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
      correo: "sonic@gmail.com",
      contrasena: "sonyc",
      rol: "user"
    },
    {
      nombre: "shadow",
      correo: "shodow.exe@gmail.com",
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
