const express = require('express');

const router = express.Router();

// Importamos las funciones del controlador
const {
    register,
    login
} = require('../controllers/authController');

// Importamos el middleware de autenticacion
const verificarToken = require('../middleware/authMiddleware');

// Ruta para registrar usuarios
router.post('/register', register);

// Ruta para iniciar sesion
router.post('/login', login);

// Ruta protegida para consultar el perfil
router.get('/perfil', verificarToken, (req, res) => {

    res.status(200).json({
        mensaje: 'Acceso autorizado correctamente',
        usuario: req.usuario
    });

});

module.exports = router;