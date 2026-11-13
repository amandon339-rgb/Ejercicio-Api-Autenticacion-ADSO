
const bcrypt = require('bcryptjs');

const {
    obtenerUsuarios,
    guardarUsuarios
} = require('../models/userModel');

// Funcion para registrar usuarios
async function register(req, res) {

    try {

        // 1. Recibimos los datos enviados por el usuario
        const { nombre, email, password } = req.body;

        // 2. Verificamos que los campos esten completos
        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        // 3. Normalizamos los datos
        const nombreLimpio = nombre.trim();
        const emailLimpio = email.trim().toLowerCase();

        if (!nombreLimpio || !emailLimpio || password.length < 8) {
            return res.status(400).json({
                mensaje: 'El nombre y correo son obligatorios y la contraseña debe tener al menos 8 caracteres'
            });
        }
// Validamos el formato del correo electronico
const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!formatoEmail.test(emailLimpio)) {
    return res.status(400).json({
        mensaje: 'El formato del correo electronico no es valido'
    });
}

        // 4. Consultamos los usuarios existentes
        const usuarios = obtenerUsuarios();

        // 5. Comprobamos que el correo no este registrado
        const usuarioExiste = usuarios.find(
            usuario => usuario.email === emailLimpio
        );

        if (usuarioExiste) {
            return res.status(409).json({
                mensaje: 'Este correo ya se encuentra registrado'
            });
        }

        // 6. Encriptamos la contraseña
        const passwordEncriptada = await bcrypt.hash(password, 10);

        // 7. Creamos el nuevo usuario
        const nuevoUsuario = {
            id: usuarios.length > 0
                ? Math.max(...usuarios.map(usuario => usuario.id)) + 1
                : 1,
            nombre: nombreLimpio,
            email: emailLimpio,
            password: passwordEncriptada
        };

        // 8. Guardamos el usuario
        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        // 9. Respondemos que el registro fue exitoso
        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email
            }
        });

    } catch (error) {

        console.error('Error al registrar usuario:', error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });

    }

}

// Funcion para iniciar sesion
async function login(req, res) {

    try {

        // Recibimos correo y contraseña
        const { email, password } = req.body;

        // Verificamos que los campos esten completos
        if (!email || !password) {
            return res.status(400).json({
                mensaje: 'Correo y contraseña son obligatorios'
            });
        }

        // Consultamos los usuarios registrados
        const usuarios = obtenerUsuarios();

        // Buscamos el usuario por su correo
        const usuario = usuarios.find(
            usuario => usuario.email === email.trim().toLowerCase()
        );

        // Verificamos si existe
        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Comparamos la contraseña ingresada con el hash almacenado
        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        // Si la contraseña no coincide
        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Generamos el token JWT
        const { generarToken } = require('../config/jwt');

const token = generarToken(usuario);

        // Respondemos con el token
        return res.status(200).json({
            mensaje: 'Inicio de sesion exitoso',
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {

        console.error('Error al iniciar sesion:', error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });

    }

}

// Exportamos ambas funciones
module.exports = {
    register,
    login
};