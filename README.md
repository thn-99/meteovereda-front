# Servicio Frontend servicio Meteorología



##Despliegue Automatizado(FTP necesario)
Para desplegarlo de forma automática, simplemente clonamos el repositorio de GitHub.
Vamos a **Actions** del repositorio y editamos el action **CI**
En el archivo editamos la ruta en la que queremos que se ubiquen los archivos y la dirección del servidor ftp

Vamos a la configuración del repositorio y a Secrets
Añadimos dos secrets:
**ftp_username** (usuario ftp)

**ftp_password** (contrseña ftp)

y ejecutamos la Action


##Despliegue Manual
Para desplegarlo en un servidor(linux) instalamos apache:

En nuestro ordenador instalamos npm.
Descargamos el repositorio y hacemos:
``npm install``
``npm run build ``

Subimos el contenido de la carpeta build a la carpeta publica que hayamos configurado con apache
y copiamos el **.htaccess**

En caso de un hosting, hacemos lo mismo.
