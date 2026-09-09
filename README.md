# Los Peluches del Lado

Sitio web estático para "Lo Quieres, Te lo Vendo", un emprendimiento de compra y venta de peluches ubicado en Santiago de Chile. Proyecto hecho con HTML, CSS y JavaScript puro (vanilla), usando Bootstrap 5.3.8 vía CDN.

 > Este es un proyecto **frontend puro / mockup de curso**. No hay backend, base de datos ni persistencia real de datos (ver sección de Limitaciones Conocidas).

## Demo / Vista previa

Abre `index.html` directamente en el navegador. No requiere instalación ni servidor (aunque se recomienda usar un servidor local para evitar problemas de rutas relativas, ver "Cómo correrlo").

## Estructura del proyecto

```
LosPeluchesDelLado-master/
├── index.html                     # Página de inicio
├── PeluPrincipalAction.js         # Lógica compartida: carrusel, buscador, logo, validación de formulario
├── busquedaIndex.js               # Lógica del buscador específica de index.html
├── PeluPrincipalDesign.css        # Estilos globales del sitio
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
    ├── Videos/                    # Video promocional (Snoopy)
    └── Pruebas-Uso Opcional/      # Pruebas de diseño descartadas, no usadas en el sitio
```

## Funcionalidades

- **Carrusel de portada**: rota entre categorías (Pokémon, Snoopy, Anime) con flechas y clic en las imágenes laterales.
- **Buscador con autocompletado**: sugiere categorías (`snoopy`, `sonic`, `anime`, `pokemon`) mientras se escribe y redirige a la página de categoría correspondiente.
- **Catálogo por categoría**: páginas individuales por línea de producto, con precios en CLP.
- **Navegación por menú**: acceso a Productos, Ventas, Historial y Usuario desde cualquier página.
- **Formulario de usuario**: valida nombre, apellido, correo, ciudad y país con expresiones regulares antes de "enviar" (ver limitaciones).

## Cómo correrlo localmente

Por las rutas relativas entre páginas (`../../`) y los `fetch`/recursos, es mejor no abrir los archivos con doble clic sino levantar un servidor simple:

```bash
# desde la carpeta del proyecto
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Stack

- HTML5
- CSS3 (custom, sin preprocesador)
- JavaScript vanilla (sin frameworks ni build tools)
- Bootstrap 5.3.8 (CSS + JS bundle vía CDN)

## Limitaciones conocidas / Deuda técnica

Estas son observaciones de una revisión de código, documentadas para que quien continúe el proyecto sepa dónde está parado:

1. **`index.html` tiene un bug funcional real**: carga tanto `PeluPrincipalAction.js` como `busquedaIndex.js`, pero `PeluPrincipalAction.js` referencia ids (`barraBusqueda`, `.sugeregncias_busqueda`) que no existen en `index.html` (ahí se llaman `barraBusquedaIndex`, `.sugeregncias_busquedaIndex`). Esto provoca un `TypeError` en tiempo de ejecución que detiene el resto del script — **el carrusel y el logo clickeable no funcionan en la portada**.
2. **`PeluHistorial.html` no carga ningún `<script>`**: el buscador y las flechas de carrusel de esa página son puramente decorativos.
3. **Duplicación de lógica de búsqueda**: existen dos implementaciones casi idénticas del autocompletado (una en `PeluPrincipalAction.js`, otra en `busquedaIndex.js`) solo porque los ids no están unificados entre páginas.
4. **HTML inválido**: varias páginas tienen `<title>` seguido de un `<h1>` dentro de `<head>` (no permitido por la especificación). `Categoria_Snoopys.html` además deja un `<video>` sin cerrar, generando un `</div>` sin apertura correspondiente.
5. **Elemento placeholder olvidado**: `PeluUsuario.html` contiene `<a href="url" target="new"></a>`, un enlace de ejemplo sin completar.
6. **El formulario de usuario no persiste datos**: `validacion()` solo valida formato con regex; no hay `action`, `fetch` ni backend. Al pasar la validación, el formulario simplemente se envía a sí mismo (recarga de página) sin guardar nada.
7. **Catálogo duplicado**: `PeluDuctos.html` muestra todas las categorías en una sola página, mientras cada `Categoria_*.html` repite el mismo contenido a mano. Agregar o modificar un producto requiere editar en más de un lugar.
8. **Carpeta `PeluAssets/Pruebas-Uso Opcional/`** contiene ~11MB de pruebas de diseño descartadas que no se usan en el sitio — candidata a eliminarse o moverse fuera del repo.

## Próximos pasos sugeridos

- Unificar los ids del buscador entre todas las páginas para poder borrar `busquedaIndex.js` y usar un solo script.
- Generar el catálogo de productos desde una única fuente de datos (JSON o similar) en vez de HTML repetido.
- Decidir si el formulario de usuario necesita backend real o si se queda como mockup (y dejarlo explícito en el código).
- Validar el HTML con un linter (p. ej. el validador de W3C) para limpiar las etiquetas mal cerradas.

## Créditos

Grupo 8 de Jóvenes Vendedores — © 2026 Lo Quieres, Te lo Vendo. Todos los derechos reservados.
