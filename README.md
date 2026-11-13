
# API de Autenticación de Usuarios

## 1. Descripción del proyecto

Este proyecto consiste en el desarrollo de una API REST para la autenticación y gestión básica de usuarios, utilizando Node.js y Express.

La API permite registrar usuarios, iniciar sesión y consultar un perfil protegido mediante tokens JWT.

## 2. Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- bcryptjs
- JSON Web Token (JWT)
- dotenv
- Nodemon

## 3. Estructura del proyecto

```text
Ejercicio-Api-Autenticacion/
│
├── docs/
├── src/
│   ├── config/
│   │   └── jwt.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── users.json
│   └── routes/
│       └── authRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 4. Instalación

Se necesita tener instalado Node.js.

Descargar las dependencias del proyecto ejecutando:

```bash
npm install
```

En Windows PowerShell también se puede utilizar:

```powershell
npm.cmd install
```

## 5. Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
JWT_SECRET=REEMPLAZAR_POR_UNA_CLAVE_SECRETA_SEGURA
```

La clave secreta debe ser privada y no debe publicarse en repositorios.

## 6. Ejecución del servidor

Para iniciar el servidor en modo desarrollo:

```powershell
npm.cmd run dev
```

El servidor se ejecuta en:

http://localhost:3000

## 7. Servicios de la API

### 7.1 Consultar estado de la API

Método: GET

Endpoint:

`http://localhost:3000/`

Permite comprobar que el servidor está funcionando.

### 7.2 Registrar usuarios

Método: POST

Endpoint:

`http://localhost:3000/api/auth/register`

Datos requeridos:

```json
{
  "nombre": "Usuario Prueba",
  "email": "usuario@correo.com",
  "password": "Prueba1234"
}
```

Validaciones:

- Todos los campos son obligatorios.
- El correo debe tener un formato válido.
- La contraseña debe tener mínimo 8 caracteres.
- No se permiten correos duplicados.
- Las contraseñas se almacenan utilizando bcryptjs.

### 7.3 Iniciar sesión

Método: POST

Endpoint:

`http://localhost:3000/api/auth/login`

Datos requeridos:

```json
{
  "email": "usuario@correo.com",
  "password": "Prueba1234"
}
```

Cuando las credenciales son correctas, la API genera un token JWT con vigencia de una hora.

### 7.4 Consultar perfil de usuario

Método: GET

Endpoint:

`http://localhost:3000/api/auth/perfil`

Esta ruta está protegida mediante autenticación JWT.

Se debe enviar el siguiente encabezado:

`Authorization: Bearer TOKEN_JWT`

Si el token es válido, el sistema permite consultar los datos del usuario autenticado.

## 8. Seguridad

El proyecto implementa:

- Cifrado de contraseñas mediante bcryptjs.
- Autenticación mediante tokens JWT.
- Verificación de tokens mediante middleware.
- Protección de rutas privadas.
- Variables de entorno para almacenar información sensible.
- Validación de datos recibidos.

## 9. Almacenamiento

Los usuarios se almacenan localmente en el archivo:

`src/models/users.json`

Las contraseñas se guardan mediante hash, no como texto legible.

Este almacenamiento es una solución sencilla para el ejercicio académico; para un entorno productivo se recomienda utilizar una base de datos.

## 10. Pruebas realizadas

Se realizaron pruebas de:

1. Registro exitoso de usuarios.
2. Cifrado de contraseñas.
3. Rechazo de usuarios duplicados.
4. Validación de campos obligatorios.
5. Validación del formato del correo.
6. Validación de longitud de contraseña.
7. Inicio de sesión exitoso.
8. Rechazo de contraseñas incorrectas.
9. Rechazo de solicitudes sin token.
10. Rechazo de tokens inválidos.
11. Acceso autorizado mediante token JWT.

## 11. Autor

Proyecto académico desarrollado como parte de la formación del programa de Análisis y Desarrollo de Software (ADSO) del SENA.
