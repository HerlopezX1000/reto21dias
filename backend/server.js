// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
process.env.TZ = 'America/Bogota'; // Configura el servidor en GMT-5 (Colombia)

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const formRoutes = require('./routes/formRoutes');
const authRoutes = require('./routes/authRoutes'); 
app.use('/api', formRoutes);
app.use('/api/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
