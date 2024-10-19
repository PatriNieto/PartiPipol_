

import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
    <div>HomePage</div>

    <Link
    to="/evento-crear">
    <button>Crear Evento</button>
    </Link>


    <Link
    to="/artista-crear">
    <button>Crear Artista</button>
    </Link>

    </>
  )
}

export default HomePage