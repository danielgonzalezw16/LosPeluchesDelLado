# Manual de Usuario — Pastel Plushes

Bienvenido al manual oficial de uso de **Pastel Plushes** (*"Lo Quieres, Te lo Vendo"*), la plataforma web de compra y venta de peluches de colección en Santiago de Chile.

---

## 1. Requisitos y Acceso al Sistema

* **Navegadores compatibles:** Google Chrome, Microsoft Edge, Mozilla Firefox o Safari (versiones recientes).
* **Acceso en línea:** Ingresa a través de GitHub Pages en `https://danielgonzalezw16.github.io/LosPeluchesDelLado/`.
* **Acceso local:** Abre el archivo `index.html` directamente en tu navegador web.

> **Importante:** El sistema utiliza el almacenamiento local del navegador (`localStorage`) para gestionar sesiones, carritos de compra, catálogo e historial. Si limpias los datos de navegación, el sistema restaurará automáticamente los usuarios y productos iniciales.

---

## 2. Roles y Credenciales de Acceso

La plataforma cuenta con cuatro niveles de acceso: **Invitado**, **Cliente (`user`)**, **Vendedor (`vendedor`)** y **Administrador (`admin`)**.

Si creas una cuenta nueva mediante el formulario de registro, el sistema te asignará automáticamente el rol **Cliente**. Para probar los distintos perfiles disponibles, utiliza las siguientes credenciales:

| Rol | Nombre de Usuario | Correo Electrónico | Contraseña | Permisos Principales |
| :--- | :--- | :--- | :--- | :--- |
| **Cliente** | `sonic` | `sonic.unleashed@sega.com` | `sonicgraciasporhacermesonreir` | Catálogo, carrito, pagos, historial y perfil. |
| **Vendedor** | `Pepe` | `pepe.aguilarc@gmail.com` | `pepito15` | Gestión de órdenes y consulta de productos/stock. |
| **Vendedor** | `Juja` | `juja.juja@juja.ju` | `jujaneitor` | Gestión de órdenes y consulta de productos/stock. |
| **Administrador** | `Jadeicent` | `pastelss@plushe.cl` | `somosadmin` | Control total, agregar/eliminar productos y pruebas. |
| **Administrador** | `shadow` | `shadow.exe@sega.com` | `123456` | Control total, agregar/eliminar productos y pruebas. |

---

## 3. Guía de Uso por Perfil

### 3.1. Perfil Invitado (Sin sesión iniciada)

1. **Explorar el Carrusel Principal (`index.html`):**
   * Haz clic en las flechas laterales (`>`) o directamente sobre las imágenes de los costados para rotar entre las categorías **Pokémon**, **Snoopy**, **Anime** y **Sonic**.
   * Haz clic en la imagen central para abrir la página correspondiente a esa categoría.
2. **Buscador Inteligente:**
   * Escribe el nombre de una categoría en la barra `Buscar...` ubicada en la parte superior izquierda.
   * Selecciona una de las sugerencias desplegadas y presiona el ícono de la lupa para abrir la categoría en una nueva pestaña.
3. **Crear una Cuenta (`PeluCrearCuenta.html`):**
   * Haz clic en el botón **Crear Cuenta** en la esquina superior derecha.
   * Completa tu **Nombre de Usuario** (solo letras y espacios), **Contraseña**, **Confirmación de Contraseña** y **Correo Electrónico** válido (ej. `usuario@dominio.cl`).
   * Presiona **Crear Cuenta** para registrarte e iniciar sesión automáticamente.
4. **Iniciar Sesión (`PeluIniciar.html`):**
   * Haz clic en **Iniciar Sesión**, ingresa tu nombre de usuario o correo junto a tu contraseña y presiona **Iniciar Sesión**.

---

### 3.2. Perfil Cliente (`user`)

1. **Explorar Catálogo y Precios con IVA (`PeluDuctos.html`):**
   * Ingresa a la pestaña **Productos** en el menú principal.
   * Cada producto muestra su fotografía, nombre, precio total en pesos chilenos (CLP) y el desglose tributario: **IVA incluido (Neto + IVA 19%)**.
   * Presiona **Ver info** para revisar la ficha detallada del peluche o **Al Carro** para añadir una unidad a tu carrito personal.
2. **Gestionar el Carrito y Realizar Compras (`PeluVentas.html`):**
   * Haz clic en el ícono del **Carrito** en la barra superior derecha.
   * **Paso 1 — Selección y Cantidades:**
     * Marca o desmarca la casilla izquierda de cada producto para incluirlo o excluirlo de la compra actual.
     * Usa los botones `-` y `+` para ajustar la cantidad de unidades, o el botón rojo de papelera para eliminar el artículo del carrito.
     * En cada tarjeta podrás visualizar el subtotal junto con su desglose de **Neto** e **IVA**.
   * **Paso 2 — Modalidad de Entrega:**
     * Selecciona **Despacho a domicilio** (completando calle, número/depto, comuna, ciudad y referencia opcional) o **Retiro en sucursal** (eligiendo la tienda en el listado).
   * **Paso 3 — Resumen de IVA y Datos de Pago:**
     * Verifica el cuadro resumen con el monto **Neto**, **IVA (19%)** y **Total a pagar (IVA incluido)**.
     * Ingresa el nombre y apellido del titular, selecciona el tipo de tarjeta (**Débito** o **Crédito**), escribe los 16 dígitos de la tarjeta y el código de seguridad **CVV/CVC** (3 o 4 dígitos).
     * Haz clic en **Procesar Venta**. Los artículos seleccionados se descontarán del carrito y pasarán a tu historial.
3. **Consultar Historial de Compras (`PeluHistorial.html`):**
   * Haz clic en **Historial** en el menú de navegación.
   * Visualizarás todas tus compras ordenadas desde la más reciente, detallando los peluches comprados, fecha y hora, **Total Pagado**, desglose de **Neto e IVA (19%)**, y los últimos 4 dígitos de la tarjeta utilizada.

---

### 3.3. Perfil Vendedor (`vendedor`)

Al iniciar sesión como vendedor, el menú superior habilita las vistas operativas de gestión:

1. **Lista de Órdenes (`PeluListaOrdenes.html`):**
   * Accede desde la pestaña **Órdenes** en la barra de navegación.
   * Usa el campo de búsqueda superior para filtrar por **N° de orden**, **nombre del cliente** o **estado** (*Pendiente*, *En preparación*, *Entregada*).
   * En la columna de monto verás el total de la orden junto con su desglose de **Neto** e **IVA**.
   * Presiona **Ver detalle** en cualquier orden para abrir la ventana modal con los datos del cliente, productos solicitados, cantidades y el desglose financiero completo.
2. **Lista de Productos e Inventario (`PeluListaProductos.html`):**
   * Accede desde la pestaña **Productos** o mediante el botón flotante **📚 Lista de Productos** en la esquina inferior derecha.
   * Filtra productos por nombre o categoría, revisa su precio con desglose de IVA y verifica disponibilidad mediante las etiquetas de **Stock** (verde con unidades disponibles o rojo si está **Agotado**).
   * Presiona **Ver detalle** para consultar la ficha técnica e imagen del producto.

---

### 3.4. Perfil Administrador (`admin`)

El administrador dispone de todas las funciones anteriores más herramientas de administración del catálogo y diagnóstico:

1. **Agregar Productos al Catálogo (`PeluDuctos.html`):**
   * Al ingresar a **Productos**, se desplegará en la parte superior el **Panel Admin: Agregar Nuevo Producto**.
   * Completa el **Nombre del Producto**, **Categoría** (*Anime*, *Pokemon*, *Sonic*, *Snoopys*), **Precio con IVA ($)** y opcionalmente la ruta de imagen.
   * Presiona **➕ Guardar Producto** para publicarlo inmediatamente en la tienda.
2. **Eliminar Productos del Catálogo (`PeluDuctos.html`):**
   * En la parte inferior de cada tarjeta de producto aparecerá el botón **🗑️ Eliminar (Admin)**. Al presionarlo y confirmar la alerta, el artículo se eliminará del catálogo.
3. **Panel de Pruebas Unitarias:**
   * En la esquina inferior derecha de la pantalla encontrarás el botón flotante **🧪 Ejecutar Pruebas Unitarias**.
   * Al hacer clic, el sistema evaluará automáticamente tres escenarios de validación del registro de usuarios (éxito total, fallo único y múltiples fallos simultáneos) y mostrará un panel desplegable con el diagnóstico técnico de cada prueba.

---

## 4. Preguntas Frecuentes y Solución de Problemas

* **Aparece el mensaje *"Debes iniciar sesión para ver tu carrito / agregar productos"*:**
  El carrito y el historial son privados por cuenta. Inicia sesión con tu usuario antes de añadir productos o abrir la vista de pagos.
* **No tengo permiso para entrar a Órdenes o Lista de Productos:**
  Estas secciones están protegidas según el rol del usuario (`permisos.js`). Asegúrate de haber iniciado sesión con una cuenta de **Vendedor** o **Administrador**.
* **El total del carrito dice `$0` teniendo productos agregados:**
  Verifica que la casilla de verificación (checkbox) a la izquierda de cada peluche en el carrito esté marcada. Solo se cobran los productos seleccionados.