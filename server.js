require('dotenv').config();

const express = require('express');

// Importamos las rutas de autenticacion
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para recibir datos JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API de autenticacion funcionando correctamente',
        proyecto: 'Ejercicio API de Autenticacion',
        estado: 'Activo'
    });
});

// Conectamos las rutas de autenticacion
app.use('/api/auth', authRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});