const fs = require('fs');
const path = require('path');

// Ubicacion del archivo donde guardaremos los usuarios
const rutaUsuarios = path.join(__dirname, 'users.json');

// Funcion para leer los usuarios
function obtenerUsuarios() {
    const contenido = fs.readFileSync(rutaUsuarios, 'utf8');

    return JSON.parse(contenido.replace(/^\uFEFF/, ''));
}

// Funcion para guardar los usuarios
function guardarUsuarios(usuarios) {
    fs.writeFileSync(
        rutaUsuarios,
        JSON.stringify(usuarios, null, 2),
        'utf8'
    );
}

// Exportamos las funciones para utilizarlas en otros archivos
module.exports = {
    obtenerUsuarios,
    guardarUsuarios
};