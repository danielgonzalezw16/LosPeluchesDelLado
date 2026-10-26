import { useState, useRef, useEffect } from 'react'

const imagenes = [
  { id: 'Pokemon', src: '/PeluAssets/Imagenes/Pokemon_plushes.png', alt: 'poke-plushes', url: '/PeluPages/Categorias/Categoria_Pokemon.html' },
  { id: 'Snoopy',  src: '/PeluAssets/Imagenes/Snoopy_plushes.png',  alt: 'snoopy-plushes', url: '/PeluPages/Categorias/Categoria_Snoopys.html' },
  { id: 'Anime',   src: '/PeluAssets/Imagenes/Anime_Plushes.jpg',   alt: 'anime-plushes',  url: '/PeluPages/Categorias/Categoria_Anime.html' },
  { id: 'Sonic',   src: '/PeluAssets/Imagenes/Sonic_Plushes.png',   alt: 'sonic-plushes',  url: '/PeluPages/Categorias/Categoria_Sonic.html' },
]

// Posición respecto al centro: 0 = centro, 1 = derecha, 2 = lejos, 3 = izquierda
const clasePorPosicion = ['item-center', 'item-right', 'item-faraway', 'item-left']

export default function Carrusel() {
  const [centro, setCentro] = useState(1)       // Snoopy al centro, como en tu HTML
  const [cambio, setCambio] = useState(false)   // true durante los 490 ms de transición
  const [hover, setHover] = useState(null)      // id de la imagen bajo el mouse
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  // paso = +1 (flecha derecha / clic en imagen derecha), -1 (izquierda)
  const mover = (paso) => {
    setCentro((c) => (c + paso + imagenes.length) % imagenes.length)
    setCambio(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCambio(false), 490)
  }

  const clicImagen = (img, pos) => {
    if (pos === 0) window.open(img.url)   // centro: abre la categoría
    else if (pos === 1) mover(1)          // derecha: avanza
    else if (pos === 3) mover(-1)         // izquierda: retrocede
  }

  return (
    <div className="principal-plushes">
      <button id="p-izq" className="pelu-arrow" onClick={() => mover(-1)}>{'<'}</button>

      <div className="dinamismo">
        {imagenes.map((img, i) => {
          const pos = (i - centro + imagenes.length) % imagenes.length
          const clases = [
            'pelu-item',
            clasePorPosicion[pos],
            cambio ? 'cambio' : '',
            pos === 0 && hover === img.id && !cambio ? 'efecto' : '',
          ].filter(Boolean).join(' ')

          return (
            <img
              key={img.id}
              id={img.id}
              className={clases}
              src={img.src}
              alt={img.alt}
              style={{ cursor: pos === 2 ? 'default' : 'pointer' }}
              onClick={() => clicImagen(img, pos)}
              onMouseEnter={() => setHover(img.id)}
              onMouseLeave={() => setHover(null)}
            />
          )
        })}
      </div>

      <button id="p-der" className="pelu-arrow" onClick={() => mover(1)}>{'>'}</button>
    </div>
  )
}