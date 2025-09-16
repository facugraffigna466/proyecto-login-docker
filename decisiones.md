# Decisiones del Proyecto Docker tp2 

En ste archivo me voy a disponer a dejar contatado como fui tomando las desiciones del trabajo practico 2.

##  Elección de la aplicación y tecnología utilizada

En este caso le pedi a Chatgpt que me ayude a crear un login basico y rapido, asi entendia correctamente la logica de los contenedores mas que armar una pagina super compleja. Me suguiro una estructura confromada por. 

 **Frontend:** HTML + JS básico, con un formulario que manda usuario/contraseña al backend.Este mismo no tiene ningun estilo. 
 **Backend:** Node.js con Express ya que es rápido de levantar, simple para manejar rutas es decir la /login y conectarse a la base de datos.  
 **Base de datos:** PostgreSQL robusta, muy usada en entornos reales, y se integra bien con Docker.

 ## Eleccion de imagen base y justificación

**Frontend:**
En este caso, cuando chatgpt me sugirio uilizar nginx especificamente la imagen `nginx:alpine` . Como me encontre un poco perdido en la crecaion de la imgen en base a nginx me guie por esta pagina web https://www.datacamp.com/es/tutorial/nginx-docker donde explicaba como estaba conformada con un ejemplo sensillo que coincidia con el mio, ya que nuestro front es super basico. lo unico que hice fue agregarele el puerto del contenedo. 

**Backend:**
Para el caso del back utilice la imagen de node:18 que es la que me sugirio chatgpt para aplicaciones express por lo que le pedi que me de una estructura del mismo y me suguirio la siguiente estructura. 

 Imagen base oficial de Node 18
FROM node:18
 Crear y setear el directorio de trabajo dentro del contenedor
WORKDIR /app
 Copiar los archivos de dependencias primero (para optimizar cache de Docker)
COPY package*.json ./
 Instalar dependencias
RUN npm install
 Copiar el resto del código de la app
COPY . .
 Exponer el puerto donde corre la app (ej: 3000)
EXPOSE 3000
 Comando para ejecutar la aplicación
CMD ["node", "server.js"]

**Base de datos:**
Con respecto a la base de datos utilice la predeterminada de postgres. ya esta lista (la utilizo en el docker compose)

## Elección de base de datos y justificación

La base de datos fue un tema mas complejo ya que antes de largarme a codear primero le pregunte a chatgpt si mysql me la sugeria y me dijo que no, que en casos de practicos de la actualidad se utiliza postgres por lo que decidi inclinarme a ella y de paso aprender otra forma. admeas me sugurio que la de postgres era mas liviana. 

## Estructura y justificación del Dockerfile

Para la justificacion de este paso me voy a disponer a pegar el codigo que documente. en el mismo esta claro la expliacion. 

 Imagen base de Nginx, la elegi porque es simple y tiene muchas funciones ya predeterminadas. 
FROM nginx:alpine

 Copiar los archivos estáticos al directorio que Nginx va a usar, agarra la carpeta local frontend , 
 y la guarda en la carpeta dentro del contenedor. 
COPY . /usr/share/nginx/html

Exponer puerto 80, el contendeor va a utilizar el puerto 80 internamente. 
EXPOSE 80

Imagen base con Node.js, ya que elegi hacerlo con javascript esxpress y necesita de node.js para correrlo . con la version 18 alcanza
FROM node:18

 Crear carpeta de la app dentro del contenedor, el unico objetivo por la que la cree es para que los comandos que siguen
#encuentren todo dentro de la misma carpeta.
WORKDIR /app

 Copiar package.json y package-lock.json primero, la idea es que en caso que se modifiquen archivos como el server
 reutilize la capa creada para las dependencias y no vuelva a descargar todo porque detecto que hubo un cambio. 
COPY package*.json ./

 Instalar dependencias, definidas en el copy anterior. sino tendria que hacerlo manual cada vez. 
RUN npm install

 Copiar el resto del codigo que tengo local en la app que defini antes. 
COPY . .

 Exponer puerto 3000 
EXPOSE 3000

Comando para que cuando arranco el contendeor automaticamente me levante el server 
CMD ["npm", "start"]


## Configuración de QA y PROD 

En este caso me surgio un problema. No emtendi que cada entorno debia tener su porpoia base de datos, por lo que le pregunte a chatgpt y me dijo que cuando armara el docker compose deberia deifinir doa bckends y alli ambos estaran dirigidos a bases diferntes. despues lo probe practicamente como aclare en el .README y lo entendi. 

pero basicamente los diagrame asi

Cuando vos hacés un login en http://localhost:3000/login, ese request va al contenedor backend-qa.Ese backend lee su variable y encuentra : 

DB_HOST=db-qa
DB_PORT=5432 

y lo mismo para el de PROD pero con  http://localhost:3001/login

##  Estrategia de persistencia de datos

tambien para los volumenes lo dividi en QA y PROD

db-qa:
  image: postgres:15
  volumes:
    - pgdata_qa:/var/lib/postgresql/data

db-prod:
  image: postgres:15
  volumes:
    - pgdata_prod:/var/lib/postgresql/data

##  Evidencias 

Frontend en navegador funcionando correctamente. 

<img width="1078" height="685" alt="image" src="https://github.com/user-attachments/assets/b0ca7ab9-22f6-4581-a85b-9bbee2beab09" />


QA (3000): hacer login con un usuario valido (soloqa / 12345) 

<img width="1280" height="629" alt="image" src="https://github.com/user-attachments/assets/7015ee97-9de4-4d82-93bd-371db07c72bf" />


QA (3000): hacer login con un usuario invalido (soloprod / 12345) 

<img width="1280" height="631" alt="image" src="https://github.com/user-attachments/assets/145ec0c6-2de9-44aa-8e07-bdc9e6f7f3e9" />


verificacion de la persistencia de datos con volumenes tras un compose down y up 

<img width="1280" height="293" alt="image" src="https://github.com/user-attachments/assets/ae431ea7-595f-4e95-9aad-dc8fe7ee5646" />

<img width="1280" height="362" alt="image" src="https://github.com/user-attachments/assets/f3a3bb43-a479-4d10-886a-c710a4355cd8" />


verifiacion de los puertos corriendo correctamente 

<img width="1280" height="277" alt="image" src="https://github.com/user-attachments/assets/cda8c33b-a3a1-4bfa-b40e-ebcf42c2f0d6" />


verificacion de produccion conctado con la base de datos 

 facundograffigna@MacBook-Air-de-Facundo proyecto-login-docker % docker exec -it backend-prod printenv | grep DB_HOST
DB_HOST=db-prod
