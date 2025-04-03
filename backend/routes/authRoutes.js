// --- backend/routes/authRoutes.js ---
const express = require('express');
const router = express.Router();

// Importar el controlador de autenticación recién creado
// Ajusta la ruta si tu archivo authController.js está en otro lugar relativo a routes/
const authController = require('../controllers/authController'); 

// Definir la ruta POST para /admin/login y asignarle la función del controlador
// La ruta completa será POST /api/auth/admin/login porque el prefijo /api/auth lo ponemos en server.js
router.post('/admin/login', authController.loginAdmin);

// Aquí podrías añadir otras rutas relacionadas con autenticación en el futuro
// ej: router.post('/admin/forgot-password', authController.forgotPassword);

module.exports = router; // Exportar el router
// --- FIN backend/routes/authRoutes.js ---