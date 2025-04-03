// backend/routes/formRoutes.js (ACTUALIZADO con Middleware)

// El middleware ya estaba importado, lo dejamos al principio
const authMiddleware = require('../middleware/authMiddleware'); 

const express = require('express');
const router = express.Router();
const {
    getRoot,
    getRegistros,        // <-- Protegeremos
    getBloqueos,         // <-- ¿Público o Admin? Lo dejamos público por ahora. ¡Confírmame si está bien!
    getHorariosOcupados, // <-- Público
    createRegistro,      // <-- Público
    verifyRegistro,      // <-- Público
    createBloqueo,       // <-- Protegeremos
    getBloqueosCompletos,// <-- Protegeremos
    updateRegistro,      // <-- Protegeremos
    deleteRegistro,      // <-- Protegeremos
} = require('../controllers/formController');

// --- Rutas Públicas (Sin Middleware) ---
router.get('/', getRoot); 
router.get('/bloqueos', getBloqueos); // Asumimos público, confírmame si es correcto
router.get('/horarios-ocupados', getHorariosOcupados);
router.post('/registros', createRegistro); 
router.get('/verify', verifyRegistro); 

// --- Rutas Protegidas para Administradores (CON Middleware) ---
router.get('/registros', 
    authMiddleware.verifyAdminToken, // <--- Middleware añadido
    getRegistros
);
router.put('/registros/:id', 
    authMiddleware.verifyAdminToken, // <--- Middleware añadido
    updateRegistro
);
router.delete('/registros/:id', 
    authMiddleware.verifyAdminToken, // <--- Middleware añadido
    deleteRegistro
);
router.post('/bloqueos', 
    authMiddleware.verifyAdminToken, // <--- Middleware añadido
    createBloqueo
);
router.get('/bloqueos-completos', 
    authMiddleware.verifyAdminToken, // <--- Middleware añadido
    getBloqueosCompletos
);

module.exports = router;