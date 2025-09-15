# Imagen base de Nginx, la elegi porque es simple y tiene muchas funciones ya predeterminadas. 
FROM nginx:alpine

# Copiar los archivos estáticos al directorio que Nginx va a usar, agarra la carpeta local frontend , 
#y la guarda en la carpeta dentro del contenedor. 
COPY . /usr/share/nginx/html

# Exponer puerto 80, el contendeor va a utilizar el puerto 80 internamente. 
EXPOSE 80