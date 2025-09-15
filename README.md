# Proyecto Login con Docker

## Descripción
La idea fue armar una app de login (frontend + backend + base de datos) y correr todo con contenedores.  

### 1. Construir las imágenes

No hace falta que vos armes cada imagen a mano, porque todo está definido en `docker-compose.yml`.  
El comando que usamos es:

```bash
docker-compose up --build
```

En caso de querer apagarlos :

```bash
docker-compose down
```

En nuestro caso, utilizamos mucho el docker desktop que es mucho mas visual y amigable.

### 2. Construir las imágenes

Para acceder a los diferentes URLS y puertos lo detalle de la siguiente manera :

•	Frontend (formulario login):
 http://localhost:8080
•	Backend QA:
 http://localhost:3000/login
•	Backend PROD:
http://localhost:3001/login

El frontend está apuntado por defecto al backend de QA, que en caso de querer ca,biarlo deberiamos acceder al apps.js donde se maneja la logica del front con el back y alli modificarlo 


### 3. Conectarse a las bases de datos 

Como menciona la consigna ambos entornos (QA Y PROD) manejan sus propias bases de datos y kes asigne en el docker compose :

	•	DB QA
		Host: localhost
		Puerto: 5432
		Usuario: postgres
		Password: postgres
		DB: postgres

	•	DB PROD
		Host: localhost
		Puerto: 5433
		Usuario: postgres
		Password: postgres
		DB: postgres

Esta parte tambien probe si en el caso de las contrasenas y usuarios funcionaba cada uno para qa y prod para verificar que funcionaba por lo que accedi a ambas bases y le agregue un usuario diferente a qa y despues me fije en prod si aparecia.utilice los siguientes comandos: 

```bash
docker exec -it db-qa psql -U postgres -d postgres -c "SELECT * FROM users;"
```

```bash
docker exec -it db-prod psql -U postgres -d postgres -c "SELECT * FROM users;"
```

### 4. Verificaciones 

en esta espata me dedique a verificar si cuando levanataba los contendores con sus respectivas bases diferentes de qa y prod y iniciaba la pagina web me dejaba ingresar con un usuario registrado en QA y no en prod y si me dejo. Despues intente hacer lo mismo en PROD con dicho usario y no me dejaba, devolviendome error.
