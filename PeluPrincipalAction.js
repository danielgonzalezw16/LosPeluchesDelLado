// SECCION PRINCIPAL ANUNCIOS
// --------------------------

// Son las Constantes para Ambos Botones
const antesPrincipal = document.getElementById('p-izq');
const despuesPrincipal = document.getElementById('p-der');

// Es la lista para las imagenes y guardar el orden
const imgs = Array.from(document.querySelectorAll('.pelu-item'));
const tiposImgs = ['item-left', 'item-center', 'item-right','item-faraway'];

// Lista para los Ids y cambiar su funcion
const tiposIds = ['Pokemon','Snoopy','Anime','Sonic'];

// Es la funcion para Actualizar cada vez que cambian de posicion
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

// Funcion para Actualizar el Click en las imagenes
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

document.addEventListener('DOMContentLoaded', () => {
  nuevoClickeador();

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

  // Obtenemos o creamos la base de datos local
  let usuarios = JSON.parse(localStorage.getItem("usuariosDB")) || [];
  const nuevoUsuario = { nombre, correo, contrasena };

  // Comprobar si ya existe el correo
  const existe = usuarios.some(u => u.correo === correo);
  if (existe) {
    alert("Este correo ya se encuentra registrado. Intenta iniciar sesión.");
    return false;
  }

  // Guardar usuario en la lista
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuariosDB", JSON.stringify(usuarios));

  // Iniciar sesión activa con el nuevo usuario
  localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

  alert("¡Registro exitoso! Redirigiendo a tu perfil...");
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

  // Buscar coincidencia por nombre o por correo
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
    const esPaginaPrincipal = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    const rutaPerfil = esPaginaPrincipal ? "PeluPages/Principales/PeluUsuario.html" : "PeluUsuario.html";

    contenedorBotones.innerHTML = `
      <a href="${rutaPerfil}" class="btn btn-cafe-claro fs-5">Hola, ${usuarioActivo.nombre.split(' ')[0]}</a>
    `;
  }
});
