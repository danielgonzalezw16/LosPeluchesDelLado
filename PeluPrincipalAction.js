// SECCION PRINCIPAL ANUNCIOS
// --------------------------
// Son las Constantes para Ambos Botones
const antesPrincipal = document.getElementById('p-izq');
const despuesPrincipal = document.getElementById('p-der');

// Es la lista para las imagenes y guardar el orden
const imgs = Array.from(document.querySelectorAll('.pelu-item'));
const tiposImgs = ['item-left', 'item-center', 'item-right'];

// Lista para los Ids y cambiar su funcion
const tiposIds = ['Pokemon','Snoopy','Anime']

// Es la funcion para Actualizar cada vez que cambian de posicion
function nuevoGanador() {
  imgs.forEach((img, index) => {

    img.classList.remove('efecto')
    // Agregamos 'cambio' a la clase para que se sepa que esta en transicion
    img.classList.add('cambio');

    // Quitamos todas las clases que haya
    img.classList.remove('item-left', 'item-center', 'item-right');

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
      Anime: 'PeluPages/Categorias/Categoria_Anime.html'
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
function validacion(){
  const vLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const vCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const ciudad = document.getElementById("ciudad").value.trim();
  const pais = document.getElementById("pais").value.trim();
  


  if (nombre === "" || !vLetras.test(nombre) ) {
    alert("Ingrese un nombre válido");
    document.getElementById("nombre").focus();
    return false;

  } else if (apellido === "" || !vLetras.test(apellido) ) {
    alert("ingrese un apellido válido");
    document.getElementById("apellido").focus();
    return false; 

  } else if (correo === "" || !vCorreo.test(correo)) {
    alert("ingrese un correo válido");
    document.getElementById("correo").focus();
    return false; 

  } else if (ciudad.trim() === "" || !vLetras.test(ciudad) ) {
    alert("ingrese un ciudad válido");
    document.getElementById("ciudad").focus();
    return false; 

  } else if (pais.trim() === "" || !vLetras.test(pais) ) {
    alert("ingrese un pais válido");
    document.getElementById("pais").focus();
    return false; 
  }
  return true;
}
