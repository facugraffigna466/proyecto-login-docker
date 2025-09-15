# Decisiones - Etapa 1

### Elección de la aplicación
Elegí hacer un login simple porque es algo que se entiende rápido y sirve para mostrar cómo se arma un sistema básico con frontend, backend y base de datos. No necesito mil cosas, con usuario y contraseña ya alcanza para probar que todo se conecta.

### Backend
Usé Node.js con Express. ¿Por qué? Porque es liviano, fácil de levantar y en pocos archivos ya tenés una API andando. También porque con Docker no necesito instalar nada raro en mi compu, la imagen de Node ya trae todo.

### Base de datos
Me fui con PostgreSQL. Podría haber usado MySQL porque ya lo tengo en mi máquina, pero Postgres me parece más estándar para estas pruebas y se lleva bien con Docker. Además puedo levantar dos instancias distintas (una para QA y otra para PROD) sin complicarme.

### Frontend
Acá la idea no es hacer un super diseño, sino algo funcional. Puse HTML + JS pelado, con un formulario de usuario/contraseña y un fetch que llama al backend. Después lo sirvo con Nginx porque es lo más práctico para servir estáticos.

### En resumen
La idea es tener algo chico pero completo: un login que muestra cómo se conecta todo entre sí. Con eso ya puedo practicar Docker, volúmenes, variables de entorno y levantar QA/PROD sin que sea un quilombo.

# Decisiones - Etapa 2

### Dockerfile Backend
Para el backend usé la imagen oficial de Node.js (node:18).  
La idea fue:
1. Poner el `WORKDIR /app` adentro del contenedor.
2. Copiar los package.json y hacer `npm install`.
3. Copiar el resto de los archivos (server.js y db.js).
4. Exponer el puerto 3000 porque ahí corre Express.
5. Dejar como comando por defecto `npm start`.

Así cualquier máquina puede levantar el backend igual, no importa si tiene Node instalado o no.

### Dockerfile Frontend
Para el frontend usé la imagen de Nginx, en su versión chiquita (alpine).  
Lo único que hice fue copiar el `index.html` y el `app.js` a la carpeta que Nginx sirve por defecto (`/usr/share/nginx/html`).  
Exponemos el puerto 80 y listo, ya se puede abrir en el navegador.

### Base de datos
Para la base de datos no armé Dockerfile porque aprovecho la imagen oficial de Postgres. Es más seguro y confiable. La configuración la voy a hacer en el docker-compose, levantando dos instancias: QA y PROD.

### Resumen
En esta etapa dejé cada parte de la app lista para funcionar en contenedores separados. Probé levantar backend y frontend por separado con `docker run` y confirmé que responden. La DB todavía no la levanté, eso lo hago en la próxima etapa con docker-compose.