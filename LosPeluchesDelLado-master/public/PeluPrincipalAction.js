// SECCION PRINCIPAL ANUNCIOS
// --------------------------
// Son las Constantes para Ambos Botones
const antesPrincipal = document.getElementById('p-izq');
const despuesPrincipal = document.getElementById('p-der');

// Es la lista para las imagenes y guardar el orden
const imgs = Array.from(document.querySelectorAll('.pelu-item'));
const tiposImgs = ['item-left', 'item-center', 'item-right','item-faraway'];

// Lista para los Ids y cambiar su funcion
const tiposIds = ['Pokemon','Snoopy','Anime','Sonic']

// Es la funcion para Actualizar cada vez que cambian de posicion
function nuevoGanador() {
  imgs.forEach((img, index) => {

    img.classList.remove('efecto')
    // Agregamos 'cambio' a la clase para que se sepa que esta en transicion
    img.classList.add('cambio');

    // Quitamos todas las clases que haya
    img.classList.remove('item-left', 'item-center', 'item-right','item-faraway');

    // Ponemos la nueva clase que esta ahora, en el Array
    img.classList.add(tiposImgs[index]);

    // Cambiamos el ID de la imagen por su ID real
    img.id=tiposIds[index];

    setTimeout(() => {
      img.classList.remove('cambio');
      // Por si pone el mouse al medio mientras aun esta en transicion, el matches es para saber si esta
      // pasando lo del parentesis, en este caso ':hover', que es si tienes el mouse encima
      if (img.classList.contains('item-center') && img.matches(':hover')) {
                img.classList.add('efecto');
      }
    }, 490); 
  });
}

// Funcion para Actualizar el Click en las imagenes
function nuevoClickeador() {
    // Diccionario para las imagenes
    const peluches = {
      Pokemon: 'PeluPages/Categorias/Categoria_Pokemon.html',
      Snoopy: 'PeluPages/Categorias/Categoria_Snoopys.html',
      Anime: 'PeluPages/Categorias/Categoria_Anime.html',
      Sonic: 'PeluPages/Categorias/Categoria_Sonic.html'
    };

    // Ciclo para el URL de las imagenes
    for (const id in peluches) {
      const img = document.getElementById(id);
      if (img) {
        img.addEventListener('click', () => {
        if (img.className.split(' ').includes('item-center')){
          img.style.cursor = 'pointer'; // para que se vea clickeable
          
            window.open(peluches[id]);
          

        } else if (img.className.split(' ').includes('item-left')){
            img.style.cursor = 'pointer';
            
              const primImg = tiposImgs.shift(); //Para ver la primera
              tiposImgs.push(primImg); //Para colocar el elemento al final
              nuevoGanador();
            

        } else if (img.className.split(' ').includes('item-right')){
            img.style.cursor = 'pointer';
            
              const ultImg = tiposImgs.pop(); // pop es para ver la ultima
              tiposImgs.unshift(ultImg); // Agrega un elemento al principio
              nuevoGanador();
            } 
        });

        // Para si el mouse esta encima
        img.addEventListener('mouseenter', () => {
          if (img.classList.contains('item-center') && !img.classList.contains('cambio')) {
              img.classList.add('efecto');
          }
        });
        
        // Para si el mouse esta fuera
        img.addEventListener('mouseleave', () => {
          img.classList.remove('efecto');
        });
      }
    };
   
};

document.addEventListener('DOMContentLoaded', () => {


  nuevoClickeador();
  

  // Evento para cuando se mueve a la derecha
  despuesPrincipal.addEventListener('click', () => {
    // Sacamos la ultima para ponerla al principio
    const ultImg = tiposImgs.pop(); // pop es para ver la ultima
    tiposImgs.unshift(ultImg); // Agrega un elemento al principio
    nuevoGanador();
    
  });

  // Evento para la flecha Izquierda (Retroceder)
  antesPrincipal.addEventListener('click', () => {
    // Quitamos la primera para ponerla al final
    const primImg = tiposImgs.shift(); //Para ver la primera
    tiposImgs.push(primImg); //Para colocar el elemento al final
    nuevoGanador();
    
  });
  
});

const logo = document.getElementById("logo");

logo.addEventListener('click', () => {
    window.open("index.html",'_blank');
});

// formulario del usuario
function validacion(event){
  event.preventDefault();
  const vLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const vCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const inputNombre = document.getElementById("nombre");
  const nombre = inputNombre.value.trim();

  const inputContrasena = document.getElementById("contrasena");
  const contrasena = inputContrasena.value.trim();

  const inputContrasenaConf = document.getElementById("contrasenaConf");
  const contrasenaConf = inputContrasenaConf.value.trim();

  const inputCorreo = document.getElementById("correo");
  const correo = inputCorreo.value.trim();

  if (nombre === "" || !vLetras.test(nombre)) {
    inputNombre.classList.add("is-invalid"); // muestra el mensaje de error en html
    inputNombre.focus();
    return false;
  } else {
    inputNombre.classList.remove("is-invalid");
    inputNombre.classList.add("is-valid"); //muestra el check verde
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

  return true;
}


