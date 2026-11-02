// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

// El test busca esta página por nombre dentro del proyecto (ignora node_modules y .git).
const NOMBRE_HTML = 'PeluDuctos.html'
// Si prefieres una ruta fija, escríbela aquí (relativa a la raíz del proyecto), por ejemplo:
// const RUTA_HTML = 'PeluPages/Principales/PeluDuctos.html'
const RUTA_HTML = null

function buscarArchivo(carpeta, nombre) {
  for (const entrada of readdirSync(carpeta, { withFileTypes: true })) {
    if (entrada.isDirectory()) {
      if (['node_modules', '.git'].includes(entrada.name)) continue
      const hallado = buscarArchivo(join(carpeta, entrada.name), nombre)
      if (hallado) return hallado
    } else if (entrada.name.toLowerCase() === nombre.toLowerCase()) {
      return join(carpeta, entrada.name)
    }
  }
  return null
}

let rutaCache = null
function rutaDelHtml() {
  if (RUTA_HTML) return resolve(process.cwd(), RUTA_HTML)
  const ruta = buscarArchivo(process.cwd(), NOMBRE_HTML)
  if (!ruta) {
    throw new Error(
      `No encontré "${NOMBRE_HTML}" dentro de ${process.cwd()}. Revisa el nombre o define RUTA_HTML.`
    )
  }
  return ruta
}

const usuarioNormal = { nombre: 'ana', correo: 'ana@ejemplo.cl', rol: 'cliente' }
const usuarioAdmin = { nombre: 'carlos', correo: 'carlos@ejemplo.cl', rol: 'admin' }

const iniciarSesion = (usuario) =>
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))

const leerProductosGuardados = () => JSON.parse(localStorage.getItem('productosDB'))

function cargarPagina() {
  rutaCache ??= rutaDelHtml()
  const html = readFileSync(rutaCache, 'utf-8')
  const doc = new DOMParser().parseFromString(html, 'text/html')
  document.body.innerHTML = doc.body.innerHTML

  // Ejecuta el <script> inline de la página (el que no tiene src)
  const codigo = [...doc.querySelectorAll('script:not([src])')]
    .map((s) => s.textContent)
    .join('\n')
  window.eval(codigo)
}

beforeEach(() => {
  localStorage.clear()
  window.alert = vi.fn()
  window.confirm = vi.fn(() => true)
  cargarPagina()
})

describe('obtenerProductos', () => {
  it('sin datos guardados, carga los 8 productos iniciales y los guarda', () => {
    const productos = window.obtenerProductos()
    expect(productos).toHaveLength(8)
    expect(leerProductosGuardados()).toHaveLength(8)
  })

  it('si ya hay productos guardados, devuelve esos', () => {
    const propios = [{ id: 99, categoria: 'Sonic', nombre: 'Tails', precio: 5000 }]
    localStorage.setItem('productosDB', JSON.stringify(propios))
    expect(window.obtenerProductos()).toEqual(propios)
  })

  it('si la lista guardada está vacía, vuelve a cargar los iniciales', () => {
    localStorage.setItem('productosDB', JSON.stringify([]))
    expect(window.obtenerProductos()).toHaveLength(8)
  })
})

describe('esAdmin', () => {
  it('es falso si no hay sesión iniciada', () => {
    expect(window.esAdmin()).toBeFalsy()
  })

  it('es verdadero si el rol es admin', () => {
    iniciarSesion(usuarioAdmin)
    expect(window.esAdmin()).toBe(true)
  })

  it('es verdadero para los nombres Jadeicent y shadow', () => {
    iniciarSesion({ nombre: 'Jadeicent', correo: 'a@a.cl', rol: 'cliente' })
    expect(window.esAdmin()).toBe(true)
    iniciarSesion({ nombre: 'shadow', correo: 'b@b.cl', rol: 'cliente' })
    expect(window.esAdmin()).toBe(true)
  })

  it('es falso para un usuario normal', () => {
    iniciarSesion(usuarioNormal)
    expect(window.esAdmin()).toBe(false)
  })
})

  it('usuario normal: oculta el panel admin y los botones de eliminar', () => {
    iniciarSesion(usuarioNormal)
    window.renderizarCatalogo()
    expect(
      document.getElementById('panelAdminAgregar').classList.contains('d-none')
    ).toBe(true)
    expect(document.querySelectorAll('.btn-danger')).toHaveLength(0)
  })

  it('admin: muestra el panel y un botón de eliminar por producto', () => {
    iniciarSesion(usuarioAdmin)
    window.renderizarCatalogo()
    expect(
      document.getElementById('panelAdminAgregar').classList.contains('d-none')
    ).toBe(false)
    expect(document.querySelectorAll('.btn-danger')).toHaveLength(8)
  })


describe('guardarNuevoProducto', () => {
  function llenarFormulario({
    nombre = 'Pikachu Gigante',
    categoria = 'Pokemon',
    precio = '25000',
    imagen = '',
  } = {}) {
    document.getElementById('adminNombre').value = nombre
    document.getElementById('adminCategoria').value = categoria
    document.getElementById('adminPrecio').value = precio
    document.getElementById('adminImagen').value = imagen
  }

  it('agrega el producto, avisa, limpia el formulario y actualiza el catálogo', () => {
    iniciarSesion(usuarioAdmin)
    llenarFormulario()
    const evento = { preventDefault: vi.fn() }

    window.guardarNuevoProducto(evento)

    expect(evento.preventDefault).toHaveBeenCalled()
    const guardados = leerProductosGuardados()
    expect(guardados).toHaveLength(9)
    expect(guardados.at(-1)).toMatchObject({
      nombre: 'Pikachu Gigante',
      categoria: 'Pokemon',
      precio: 25000,
    })
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Pikachu Gigante')
    )
    expect(document.getElementById('adminNombre').value).toBe('')
    expect(document.querySelectorAll('.producto-card')).toHaveLength(9)
  })

  it('usa el logo por defecto cuando no se indica imagen', () => {
    llenarFormulario({ imagen: '' })
    window.guardarNuevoProducto({ preventDefault: vi.fn() })
    expect(leerProductosGuardados().at(-1).imagen).toBe(
      '../../PeluAssets/Iconos/Logo.png'
    )
  })

  it('respeta la imagen indicada', () => {
    llenarFormulario({ imagen: '../../PeluAssets/Peluches/pikachu.png' })
    window.guardarNuevoProducto({ preventDefault: vi.fn() })
    expect(leerProductosGuardados().at(-1).imagen).toBe(
      '../../PeluAssets/Peluches/pikachu.png'
    )
  })

describe('eliminarProductoAdmin', () => {
  it('elimina el producto si el admin confirma', () => {
    window.obtenerProductos()
    window.eliminarProductoAdmin(1)
    const ids = leerProductosGuardados().map((p) => p.id)
    expect(ids).toHaveLength(7)
    expect(ids).not.toContain(1)
  })

  it('no elimina nada si el admin cancela', () => {
    window.confirm = vi.fn(() => false)
    window.obtenerProductos()
    window.eliminarProductoAdmin(1)
    expect(leerProductosGuardados()).toHaveLength(8)
  })
})

describe('agregarAlCarro', () => {
  const clave = `carritoPeluches_${usuarioNormal.correo}`

  it('sin sesión, pide iniciar sesión y no crea ningún carrito', () => {
    window.agregarAlCarro('Eevee', 29000, 'eevee.png')
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('iniciar sesión')
    )
    expect(localStorage.getItem(clave)).toBeNull()
  })

  it('con sesión, agrega el producto al carrito del usuario', () => {
    iniciarSesion(usuarioNormal)
    window.agregarAlCarro('Eevee', 29000, 'eevee.png')
    const carrito = JSON.parse(localStorage.getItem(clave))
    expect(carrito).toEqual([
      {
        nombre: 'Eevee',
        precio: 29000,
        imagen: 'eevee.png',
        cantidad: 1,
        seleccionado: true,
      },
    ])
  })

  it('si el producto ya está en el carrito, suma la cantidad', () => {
    iniciarSesion(usuarioNormal)
    window.agregarAlCarro('Eevee', 29000, 'eevee.png')
    window.agregarAlCarro('Eevee', 29000, 'eevee.png')
    const carrito = JSON.parse(localStorage.getItem(clave))
    expect(carrito).toHaveLength(1)
    expect(carrito[0].cantidad).toBe(2)
  })

  it('cada usuario tiene su propio carrito', () => {
    iniciarSesion(usuarioNormal)
    window.agregarAlCarro('Eevee', 29000, 'eevee.png')
    iniciarSesion(usuarioAdmin)
    window.agregarAlCarro('Snorlax', 23000, 'snorlax.png')

    expect(JSON.parse(localStorage.getItem(clave))).toHaveLength(1)
    expect(
      JSON.parse(localStorage.getItem(`carritoPeluches_${usuarioAdmin.correo}`))
    ).toHaveLength(1)
  })
})})
