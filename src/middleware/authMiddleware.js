
const jwt = require('jsonwebtoken');

// Middleware para verificar el token de autenticacion
function verificarToken(req, res, next) {

    // Obtenemos el encabezado de autorizacion
    const authHeader = req.headers.authorization;

    // Comprobamos que se haya enviado el token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            mensaje: 'Acceso denegado. Debes proporcionar un token.'
        });
    }

    // Extraemos el token
    const token = authHeader.split(' ')[1];

    try {
        // Verificamos que el token sea valido
        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardamos los datos del usuario en la solicitud
        req.usuario = datosUsuario;

        // Permitimos continuar hacia la siguiente funcion
        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token invalido o vencido.'
        });
    }
}

module.exports = verificarToken;
