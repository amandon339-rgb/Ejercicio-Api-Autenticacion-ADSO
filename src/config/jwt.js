const jwt = require('jsonwebtoken');

// Funcion para generar un token de autenticacion
function generarToken(usuario) {

    return jwt.sign(
        {
            id: usuario.id,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

}

module.exports = { generarToken };