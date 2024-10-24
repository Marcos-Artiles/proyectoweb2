Descripción del Proyecto
  Este proyecto es una aplicación web de administración de parqueos, desarrollada con React en el frontend y Laravel en el backend. El sistema permite a los usuarios registrarse, iniciar sesión, y gestionar su perfil. La base de datos utilizada es PostgreSQL.

Funcionalidades Activas
  •	Registro de Usuarios: Los usuarios pueden registrarse en la plataforma con los campos de correo, contraseña, matrícula y color del carro. Esta información es almacenada en una tabla en PostgreSQL.\n
  •	Inicio de Sesión: Implementación de un sistema de autenticación con tokens de acceso generados mediante Laravel Sanctum. El usuario puede iniciar sesión, y se guarda un token en el local storage del navegador.
  •	Perfil de Usuario: Los usuarios autenticados pueden acceder a su perfil, donde se muestra su correo, matrícula, color del carro y plaza de estacionamiento asignada. También pueden actualizar estos datos.
  •	Cierre de Sesión: Los usuarios pueden cerrar sesión, lo que revoca el token de acceso y los desconecta del sistema.
  •	Validación de Acceso: Las rutas protegidas, como el perfil de usuario, solo son accesibles si el usuario ha iniciado sesión.

Requisitos
  •	Node.js (v14 o superior)
  •	Composer (para dependencias de Laravel)
  •	PostgreSQL (v12 o superior)
  •	PHP (v7.4 o superior)
  •	Servidor Web (como Apache o Nginx)


Instrucciones para Ejecutar el Proyecto
  1.	 Clonar el Repositorio
    •	git clone https://github.com/tu_usuario/proyecto_parqueo.git
    •	cd proyecto_parqueo

2.Configuración del Backend (Laravel)
•	En el directorio backend/, ejecutar los siguientes comandos:
composer install
cp .env.example .env
php artisan key:generate
•	Configurar el archivo .env para conectar con la base de datos PostgreSQL, asegurándote de modificar las variables DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME y DB_PASSWORD.
•	Migrar las tablas a la base de datos:
php artisan migrate
3. Configuración del Frontend (React)
•	En el directorio frontend/, ejecutar los siguientes comandos:
npm install
cp .env.example .env
•	Configurar la variable BASE_URL en el archivo .env del frontend con la URL del backend, por ejemplo:
BASE_URL=http://127.0.0.1:8000
4. Publicar Configuración de CORS
•	En el directorio backend/, publica la configuración de CORS para habilitar peticiones entre el frontend y el backend:
php artisan vendor:publish --tag=cors
5. Iniciar los Servidores
•	Backend: En el directorio backend/, iniciar el servidor de Laravel:
php artisan serve
•	Frontend: En el directorio frontend/, iniciar el servidor de React:
npm start

6. Acceso al Proyecto
•	Frontend: http://localhost:3000
•	Backend: http://127.0.0.1:8000
Próximas Funcionalidades
•	Gestión de plazas de parqueo.
•	Implementación de un panel de administrador para monitorear el sistema.
