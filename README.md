# Los Peluches del Lado

Sitio web estático para Pastel Plushes, un emprendimiento de compra y venta de peluches ubicado en Santiago de Chile. Proyecto hecho con HTML, CSS y JavaScript puro (vanilla), usando Bootstrap 5.3.8 vía CDN.

 > Este es un proyecto **frontend puro / mockup de curso**. No hay backend, base de datos ni persistencia real de datos (ver sección de Limitaciones Conocidas).

## Demo / Vista previa

Abre `index.html` directamente en el navegador. No requiere instalación ni servidor (aunque se recomienda usar un servidor local para evitar problemas de rutas relativas, ver "Cómo correrlo").

## Estructura del proyecto

```
LosPeluchesDelLado-master/
├── index.html                     # Página de inicio
├── PeluPrincipalAction.js         # Lógica compartida: carrusel, logo, validación de formulario
├── PeluPrincipalDesign.css        # Estilos globales del sitio
|── PeluDesigns/
    |── Busqueda.css               # Estilos del buscador en general, menos para index.html
|── PeluJavas/
    ├── PeluBusquedaIndex.js       # Lógica del buscador específica de index.html
    ├── PeluBusquedaGeneral.js     # Lógica del buscador para Categorias*.html y PeluPrincipales*.html
├── PeluPages/
│   ├── Principales/
│   │   ├── PeluDuctos.html        # Catálogo de productos (todas las categorías)
│   │   ├── PeluVentas.html        # Página de ventas
│   │   ├── PeluHistorial.html     # Historial de ventas
│   │   └── PeluUsuario.html       # Formulario de registro/datos de usuario
│   └── Categorias/
│       ├── Categoria_Anime.html
│       ├── Categoria_Pokemon.html
│       ├── Categoria_Snoopys.html
│       └── Categoria_Sonic.html
└── PeluAssets/
    ├── Fondos/                    # Imágenes de fondo
    ├── Iconos/                    # Logo y favicon
    ├── Imagenes/                  # Imágenes del carrusel principal
    ├── Peluches/                  # Fotos de producto
    ├── Videos/                    # Video promocional (Snoopy, Sonic)
    └── Pruebas-Uso Opcional/      # Pruebas de diseño descartadas, no usadas en el sitio
```

## Funcionalidades

- **Carrusel de portada**: rota entre categorías (Pokémon, Snoopy, Anime, Sonic) con flechas y clic en las imágenes laterales.
- **Buscador con autocompletado**: sugiere categorías (`Snoopy`, `Sonic`, `Anime`, `Pokemon`) mientras se escribe y redirige a la página de categoría correspondiente.
- **Catálogo por categoría**: páginas individuales por línea de producto, con precios en CLP.
- **Navegación por menú**: acceso a Productos, Ventas, Historial y Usuario desde cualquier página.
- **Formulario de usuario**: valida nombre, apellido, correo, ciudad y país con expresiones regulares antes de "enviar" (ver limitaciones).

## Cómo correrlo localmente

Generamos un código URL a través de GitHub en Pages
'''
https://danielgonzalezw16.github.io/LosPeluchesDelLado/
'''

## Stack

- HTML5
- CSS3 (custom, sin preprocesador)
- JavaScript vanilla (sin frameworks ni build tools)
- Bootstrap 5.3.8 (CSS + JS bundle vía CDN)

## Limitaciones conocidas / Deuda técnica

Estas son observaciones de una revisión de código, documentadas para que quien continúe el proyecto sepa dónde está parado:

1. **`PeluHistorial.html` no carga ningún `<script>`**: el buscador y las flechas de carrusel de esa página son puramente decorativos.
2. **Duplicación de lógica de búsqueda**: existen dos implementaciones casi idénticas del autocompletado (una en `BusquedaIndex.js`, otra en `BusquedaGeneral.js`) solo porque los ids no están unificados entre páginas.
3. **HTML inválido**: `Categoria_Snoopys.html` y `Categoria_Sonic.html` deja un `<video>` sin cerrar, generando un `</div>` sin apertura correspondiente.
4. **El formulario de usuario no persiste datos**: `validacion()` solo valida formato con regex; no hay `action`, `fetch` ni backend. Al pasar la validación, el formulario simplemente se envía a sí mismo (recarga de página) sin guardar nada.
5. **Catálogo duplicado**: `PeluDuctos.html` muestra todas las categorías en una sola página, mientras cada `Categoria_*.html` repite el mismo contenido a mano. Agregar o modificar un producto requiere editar en más de un lugar.
6. **Carpeta `PeluAssets/Pruebas-Uso Opcional/`** contiene ~11MB de pruebas de diseño descartadas que no se usan en el sitio — candidata a eliminarse o moverse fuera del repo a futuro.

## Próximos pasos sugeridos

- Unificar los ids del buscador entre todas las páginas para poder borrar `Busqueda*.js` y usar un solo script.
- Generar el catálogo de productos desde una única fuente de datos (JSON o similar) en vez de HTML repetido.
- Decidir si el formulario de usuario necesita backend real o si se queda como mockup (y dejarlo explícito en el código).
- Validar el HTML con un linter (p. ej. el validador de W3C) para limpiar las etiquetas mal cerradas.

## Créditos

Grupo 8 de Jóvenes Vendedores — © 2026 Lo Quieres, Te lo Vendo. Todos los derechos reservados.
