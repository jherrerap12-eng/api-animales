# API de animales y frontend React

Proyecto de examen: API REST con Laravel 12 y MySQL, sin autenticación, y una interfaz React para listar animales.

## Requisitos

- PHP 8.2 y las extensiones requeridas por Laravel, incluyendo pdo_mysql.
- Composer.
- MySQL (por ejemplo, desde XAMPP).
- Node.js 24 y npm para el frontend.

## Instalar la API

Desde la carpeta de este README:

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
```

Crea la base de datos en MySQL:

```sql
CREATE DATABASE examen_animales CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Configura en `.env` tu usuario, contraseña y puerto de MySQL. Después:

```powershell
php artisan config:clear
php artisan migrate
php artisan serve
```

La API local estará en http://127.0.0.1:8000/api/animales.

## Instalar React

En una segunda terminal, desde la carpeta de este README:

```powershell
cd frontend-animales
npm.cmd ci
npm.cmd run dev
```

Abre la URL que muestre Vite, normalmente http://localhost:5173. Mantén Laravel y MySQL encendidos. La base de datos empieza vacía: crea animales con POST para verlos en la lista.

Para compilar React:

```powershell
npm.cmd run build
```

## Endpoints

Envía `Accept: application/json`. Para POST y PUT, usa también `Content-Type: application/json`.

| Método | Ruta | Operación |
| --- | --- | --- |
| GET | /api/animales | Listar |
| POST | /api/animales | Crear |
| GET | /api/animales/{id} | Consultar |
| PUT | /api/animales/{id} | Actualizar |
| DELETE | /api/animales/{id} | Eliminar |

Ejemplo de cuerpo para crear o actualizar:

```json
{"nombre":"Luna","especie":"Perro","raza":"Labrador","edad":3}
```

Los cuatro campos son obligatorios. Edad debe ser un entero entre 0 y 200. Los errores de validación devuelven estado 422.

## Entrega

La descripción y el fragmento de React para el PDF están en `frontend-animales/CONSUMO-REACT.md`. Entrega también las seis capturas solicitadas y la portada.

Los archivos `.env`, las dependencias y la compilación están excluidos mediante `.gitignore`. Las migraciones crean la estructura de la base; los registros locales de MySQL no se suben al repositorio. Subir el código a GitHub no publica los servidores Laravel ni React.
