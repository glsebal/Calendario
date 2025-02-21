# Calendario Digital

Aplicación web de calendario digital desarrollada con React y Express, diseñada para gestionar notas y eventos con persistencia de datos en PostgreSQL.

## Características
- Frontend en React con diseño responsivo
- Backend en Express
- Base de datos PostgreSQL
- Diseño personalizado con colores cálidos
- Gestión de notas por fecha
- Almacenamiento persistente

## Requisitos Previos
- Node.js 18 o superior
- PostgreSQL 12 o superior
- npm o yarn

## Instalación Local

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd calendario-digital
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar la base de datos:
- Crear una base de datos PostgreSQL
- Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
```

4. Ejecutar las migraciones:
```bash
npm run db:push
```

5. Iniciar la aplicación:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

## Despliegue en la Nube

### Opción 1: Render.com

1. Crear una cuenta en [Render](https://render.com)
2. Conectar tu repositorio de GitHub
3. Crear un nuevo Web Service
4. Configurar las variables de entorno:
   - `DATABASE_URL`: URL de tu base de datos PostgreSQL
5. Desplegar la aplicación

### Opción 2: Railway.app

1. Crear una cuenta en [Railway](https://railway.app)
2. Crear un nuevo proyecto
3. Agregar un servicio PostgreSQL
4. Conectar tu repositorio de GitHub
5. Railway configurará automáticamente las variables de entorno
6. Desplegar la aplicación

## Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
