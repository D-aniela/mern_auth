# mongo_connection_setup
# Devtree

**Devtree** es un proyecto inicial que utiliza **Express**, **TypeScript**, y **MongoDB** para construir una API básica. Este proyecto sirve como una base para aprender y desarrollar aplicaciones con estas tecnologías.

## Características
- Servidor Express configurado con TypeScript.
- Conexión a MongoDB utilizando Mongoose.
- Gestión de variables de entorno con `dotenv`.
- Scripts útiles para desarrollo y producción.

---

## Requisitos
- Node.js (v18.18.2 o superior).
- MongoDB.
- npm (gestor de paquetes).

---

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd devtree
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias:
   ```bash
   MONGODB_URI=mongodb://<usuario>:<contraseña>@<host>:<puerto>/<nombre_base_datos>
   PORT=3000
   ```

---

# Uso
### Modo desarrollo
Ejecuta el servidor en modo desarrollo con nodemon:
   ```bash
   npm run dev
   ```

### Construcción del Proyecto
Compila el código TypeScript a JavaScript:
   ```
   npm run build
   ```

### Producción
Inicia el servidor en producción:
   ```
   npm start
   ```
---
## Dependencias
### Dependencias principales:
- colors: Permite agregar estilos en la salida de consola.
- dotenv: Gestión de variables de entorno.
- express: Framework de servidor web.
- mongoose: ODM para MongoDB.
### Dependencias de desarrollo:
- nodemon: Reinicio automático del servidor en desarrollo.
- ts-node: Ejecuta archivos TypeScript directamente.
- typescript: Lenguaje de programación tipado.

---

## Estructura del proyecto

   ```
   devtree/
├── dist/                   # Archivos compilados (generado al ejecutar `npm run build`)
├── src/                    # Código fuente
|   ├──config
|       ├──db.ts
│   ├── index.ts            # Punto de entrada principal
│   ├── router.ts           # Rutas del servidor
│   ├── server.ts           # Configuración del servidor
├── .env                    # Variables de entorno (no se incluye en el repositorio)
├── package-lock.json       
├── package.json            # Configuración del proyecto y dependencias
├── tsconfig.json           # Configuración de TypeScript
├── README.md               # Documentación del proyecto

```