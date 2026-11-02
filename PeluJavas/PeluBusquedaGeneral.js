// SECCION PRINCIPAL BUSQUEDA GENERAL
// ----------------------------------
const busq = document.querySelector(".busqueda");
const text = document.getElementById("barraBusqueda");
const listaSugerencias = document.querySelector(".sugerencias_busqueda");
// Elementos que Podriamos Buscar
const sugerenciasBusqueda = [
  'Snoopy',
  'Sonic',
  'Anime',
  'Pokemon'
];

// Evento de Escritura en Tiempo Real
text.addEventListener("input", function() {
    const valor = text.value.trim().toLowerCase();
    
    // Limpiar Lista
    listaSugerencias.innerHTML = "";

    if (valor === "") {
        listaSugerencias.style.display = "none";
        return;
    }

    // Filtrar Coincidencias
    const coincidencias = sugerenciasBusqueda.filter(termino => 
        termino.toLowerCase().includes(valor)
    );

    // Si hay Coincidencias, Mostramos
    if (coincidencias.length > 0) {
        listaSugerencias.style.display = "block";
        
        coincidencias.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            
            // Haces clic Sugerencia, se rellena y oculta la lista
            li.addEventListener("click", function() {
                text.value = item;
                listaSugerencias.style.display = "none";
            });

            listaSugerencias.appendChild(li);
        });
    } else {
        listaSugerencias.style.display = "none";
    }
});

// Ocultar sugerencias si se hace clic fuera de la búsqueda
document.addEventListener("click", function(evento) {
    if (!busq.contains(evento.target)) {
        listaSugerencias.style.display = "none";
    }
});

// Manejamons el Envio
busq.addEventListener("submit", function(evento) {
    // Ya sabemos, pero que no este vacio
    evento.preventDefault();

    const valor = text.value.trim().toLowerCase();
    listaSugerencias.style.display = "none";

if (valor === 'snoopy') {
        window.open("../../PeluPages/Categorias/Categoria_Snoopys.html", '_blank');
    } else if (valor === 'sonic') {
        window.open("../../PeluPages/Categorias/Categoria_Sonic.html", '_blank');
    } else if (valor === 'anime') {
        window.open("../../PeluPages/Categorias/Categoria_Anime.html", '_blank');
    } else if (valor === 'pokemon') {
        window.open("../../PeluPages/Categorias/Categoria_Pokemon.html", '_blank');
    }
});