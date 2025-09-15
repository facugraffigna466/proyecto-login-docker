# Proyecto Login con Docker

## Descripción
Esto es un login básico hecho para practicar Docker. La app tiene 3 partes:
- **Frontend:** HTML + JS con un formulario.
- **Backend:** API en Node.js con Express que valida login.
- **Base de datos:** PostgreSQL con una tabla `users`.

Cuando mando usuario y contraseña desde el front, el backend chequea en la base de datos si existe y me responde "Login exitoso" o "Usuario o contraseña inválidos".

## Cómo está armado
- Carpeta `frontend/` → index.html y app.js (se sirve con Nginx).
- Carpeta `backend/` → server.js, db.js y package.json (API en Node).
- Carpeta `db-init/` → init.sql para crear tabla y usuarios de prueba.

## Usuarios de prueba
- admin / 1234
- test / qwerty

## Próximos pasos
Más adelante esto va a correr todo junto con Docker Compose, con dos entornos: QA y PROD, cada uno con su propia base de datos.

# Proyecto Login con Docker

## Etapa 2 – Containerizar componentes

### Imágenes
- **backend-login** → Node.js con Express, puerto 3000.
- **frontend-login** → Nginx sirviendo index.html y app.js, puerto 80.

### Cómo construir las imágenes
Desde la raíz del proyecto:
```bash
docker build -t backend-login ./backend
docker build -t frontend-login ./frontend