// SECCION PRINCIPAL BUSQUEDA INDEX
// --------------------------------
const busqIndex = document.getElementById("busquedaIndex");
const textIndex = document.getElementById("barraBusquedaIndex");
const listaSugerenciasIndex = document.querySelector(".sugerencias_busquedaIndex");

// Lista de elementos disponibles para buscar en el Index
const sugerenciasBusquedaIndex = [
    'Snoopy',
    'Sonic',
    'Anime',
    'Pokemon'
];

// 1. Evento mientras el usuario escribe en tiempo real
textIndex.addEventListener("input", function() {
    const valorIndex = textIndex.value.trim().toLowerCase();
    
    // Limpiamos la lista anterior
    listaSugerenciasIndex.innerHTML = "";

    if (valorIndex === "") {
        listaSugerenciasIndex.style.display = "none";
        return;
    }

    // Filtramos las coincidencias
    const coincidenciasIndex = sugerenciasBusquedaIndex.filter(termino => 
        termino.toLowerCase().includes(valorIndex)
    );

    // Si hay coincidencias, las mostramos
    if (coincidenciasIndex.length > 0) {
        listaSugerenciasIndex.style.display = "block";
        
        coincidenciasIndex.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            
            // Al hacer clic en una sugerencia, se rellena el input y se oculta la lista
            li.addEventListener("click", function() {
                textIndex.value = item;
                listaSugerenciasIndex.style.display = "none";
            });

            listaSugerenciasIndex.appendChild(li);
        });
    } else {
        listaSugerenciasIndex.style.display = "none";
    }
});

// Ocultar sugerencias si se hace clic fuera de la búsqueda
document.addEventListener("click", function(eventoIndex) {
    if (!busqIndex.contains(eventoIndex.target)) {
        listaSugerenciasIndex.style.display = "none";
    }
});

// 2. Manejo del envío del formulario (Submit)
busqIndex.addEventListener("submit", function(eventoIndex) {
    eventoIndex.preventDefault();

    const valorIndex = textIndex.value.trim().toLowerCase();
    listaSugerenciasIndex.style.display = "none";

    // Al estar en el index.html principal, la ruta comienza directo desde PeluPages
    if (valorIndex === 'snoopy') {
        window.open("PeluPages/Categorias/Categoria_Snoopys.html", '_blank');
    } else if (valorIndex === 'sonic') {
        window.open("PeluPages/Categorias/Categoria_Sonic.html", '_blank');
    } else if (valorIndex === 'anime') {
        window.open("PeluPages/Categorias/Categoria_Anime.html", '_blank');
    } else if (valorIndex === 'pokemon') {
        window.open("PeluPages/Categorias/Categoria_Pokemon.html", '_blank');
    }
});