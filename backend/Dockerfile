# Imagen base con Node.js, ya que elegi hacerlo con javascript esxpress y necesita de node.js para correrlo . con la version 18 alcanza
FROM node:18

# Crear carpeta de la app dentro del contenedor, el unico objetivo por la que la cree es para que los comandos que siguen
#encuentren todo dentro de la misma carpeta.
WORKDIR /app

# Copiar package.json y package-lock.json primero, la idea es que en caso que se modifiquen archivos como el server
# reutilize la capa creada para las dependencias y no vuelva a descargar todo porque detecto que hubo un cambio. 
COPY package*.json ./

# Instalar dependencias, definidas en el copy anterior. sino tendria que hacerlo manual cada vez. 
RUN npm install

# Copiar el resto del codigo que tengo local en la app que defini antes. 
COPY . .

# Exponer puerto 3000 
EXPOSE 3000

# Comando para que cuando arranco el contendeor automaticamente me levante el server 
CMD ["npm", "start"]