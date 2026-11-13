import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/animales'

export default function App() {
  const [animales, setAnimales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [consulta, setConsulta] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    async function cargarAnimales() {
      setCargando(true)
      setError('')
      try {
        const respuesta = await fetch(API_URL, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        if (!respuesta.ok) throw new Error(`La API respondió con estado ${respuesta.status}.`)
        const datos = await respuesta.json()
        if (!Array.isArray(datos)) throw new Error('La API no devolvió una lista de animales.')
        setAnimales(datos)
      } catch (e) {
        if (!controller.signal.aborted) {
          setError(`${e.message} Comprueba que Laravel y MySQL estén encendidos.`)
        }
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }
    cargarAnimales()
    return () => controller.abort()
  }, [consulta])

  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">REGISTRO DE ANIMALES</p>
          <h1>Conoce a nuestros animales<span>.</span></h1>
          <p className="subtitle">Todos los animales registrados, en un solo lugar.</p>
        </div>
        <button disabled={cargando} onClick={() => setConsulta(valor => valor + 1)}>
          {cargando ? 'Consultando…' : 'Actualizar lista'}
        </button>
      </header>
      <section className="panel" aria-labelledby="lista-titulo" aria-busy={cargando}>
        <div className="panel-heading">
          <h2 id="lista-titulo">Nuestros animales</h2>
          {!cargando && !error && <span className="badge">{animales.length} registros</span>}
        </div>
        <div role="status" aria-live="polite">
          {cargando && <p className="message">Cargando animales…</p>}
          {error && <p className="message error">{error}</p>}
          {!cargando && !error && animales.length === 0 && (
            <p className="message">Todavía no hay animales registrados.</p>
          )}
        </div>
        {!cargando && !error && animales.length > 0 && (
          <ul className="animals">
            {animales.map(animal => (
              <li key={animal.id} className="animal">
                <div className="avatar" aria-hidden="true">{animal.nombre.slice(0, 1).toUpperCase()}</div>
                <div className="animal-info">
                  <h3>{animal.nombre}</h3>
                  <p>{animal.especie} <span aria-hidden="true">·</span> {animal.raza}</p>
                </div>
                <span className="age">{animal.edad} {Number(animal.edad) === 1 ? 'año' : 'años'}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer>Un espacio para conocerlos mejor.</footer>
    </main>
  )
}
