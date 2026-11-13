# Consumo de la API con React

El frontend está en `api-animales/frontend-animales`.

## Ejecutar

Mantén MySQL encendido. En una terminal dentro de `api-animales`, ejecuta `php artisan serve`. En otra terminal dentro de `frontend-animales`, ejecuta `npm.cmd install` si faltan dependencias y después `npm.cmd run dev`. Abre la URL que imprima Vite (normalmente http://localhost:5173).

La página consulta http://127.0.0.1:8000/api/animales y muestra nombre, especie, raza y edad. El botón Actualizar lista repite la consulta. También contempla carga, errores y una lista vacía.

## Descripción para el PDF

Se utiliza useState para guardar la lista de animales. useEffect inicia la consulta cuando se monta el componente. fetch envía una solicitud GET a la URL real de la API local y la respuesta se convierte a JSON después de verificar su estado. setAnimales actualiza el estado, lo que hace que React muestre los registros. map transforma cada animal en un elemento de lista. Cada elemento usa el id como key, una clave única y estable que ayuda a React a identificar los registros al actualizar la interfaz. La implementación completa también muestra mensajes de carga y error y permite volver a consultar los datos.

## Fragmento para el PDF (15 líneas)

Este ejemplo reducido ilustra el consumo; la interfaz completa está en src/App.jsx.

```jsx
import { useEffect, useState } from 'react';
export default function Animales() {
  const [animales, setAnimales] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/animales')
      .then(r => {
        if (!r.ok) throw new Error('No se pudo consultar la API');
        return r.json();
      })
      .then(setAnimales)
      .catch(e => setError(e.message));
  }, []);
  return <main>{error || <ul>{animales.map(a => <li key={a.id}>{a.nombre} - {a.especie}</li>)}</ul>}</main>;
}
```
