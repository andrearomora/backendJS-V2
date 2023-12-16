# Ecommerce Back End Coder House 2023 💻

Proyecto Final CoderHouse 2023. Ecommerce STACK -> Mongo, Express, Handlebars, Node.

# Descripción del Proyecto 📜:

* El proyecto se trata de una eccomerce para la venta de productos
* En este caso he desarrollado el ecommerce de SABIA CULTURA ECO, una tienda virtual de bolsas ecológicas radicada en Bogotá, Colombia.

# Instalación 🔌:

* Lanzar el comando "npm i" para instalaar todas las dependecias requeridas para el correcto funcionamiento del proyecto.
* Luego correr el proyecto con "nodemon src/app.js" (se debe contar con nodemon global o local)
* Una vez el proyecto esté en linea, se puede visualizar de manera local en la ruta http://127.0.0.1:8080

# Arquitectura de la aplicación: 

* Se usa el Modelo Vista Controlador
* Arquitectura de 3 capas con Controllers, Services Repositorys
* Se utiliza el patrón DAO (data access object) para diferentes métodos de persistencia
* Se utiliza el patrón DTO para evitar el envío de información sensible
* Se utiliza el patrón Factory.
* Se utiliza un módulo para el manejo de errores personalizado.
* Se utilizan Loggers

# APIs implementadas 📞:
* API para el manejo de los productos
* API Para el manejo de las categorías
* API para el manejo de los usuarios (Administrador,Usuario,Premium)
* API externas para la manejo de la autenticacion (login-github, uso de JWT)
* API para carrito de compras
* API para los tickets de una compra 
* Reestablecimiento de la contraseña del usuario a través de un mail con nodemailer

# Datos de interés 🏹: 
* Persistido en una base de datos no relacional (Mongo DB)
* Interfaz Gráfica de usuario con estilos en HTML, CSS, JS, Boostrap utilizando el motor de plantillas Handlebars
* Validaciones de autenticación
* Documentación con Swagger

# Datos del cursado 📚:
- **Año: 2023**
- **Comisión: 52135**
- **Del 20-05-2023 al 11-11-2023**
- **Profesor: Arturo Verbel de Leon**

# Tecnologías utilizadas 💻: 
* ![JavaScript](https://img.shields.io/badge/-JavaScript-222222?style=flat&logo=javascript)
* ![Node.js](https://img.shields.io/badge/-Node.js-222222?style=flat&logo=node.js&logoColor=339933)
* ![Git](https://img.shields.io/badge/-Git-222222?style=flat&logo=git&logoColor=F05032)
* ![MongoDB](https://img.shields.io/badge/-MongoDB-222222?style=flat&logo=MongoDB)
* ![Handlebars](https://img.shields.io/badge/-Handlebars-222222?style=flat&logo=Hbs)
* ![GITHUB](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
* ![HTML5](	https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
* ![EXPRESSJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
* ![BOOTSTRAP!](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
* ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)