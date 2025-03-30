// backend/routes/formRoutes.js

const express = require('express');
const router = express.Router();
const {
    getRoot,
    getRegistros,
    getBloqueos,
    getHorariosOcupados,
    createRegistro,
    verifyRegistro,
    createBloqueo,
    getBloqueosCompletos,
    updateRegistro,
    deleteRegistro,
} = require('../controllers/formController');

// Rutas relacionadas con el formulario y los registros
router.get('/', getRoot);
router.get('/registros', getRegistros);
router.put('/registros/:id', updateRegistro);
router.delete('/registros/:id', deleteRegistro);
router.get('/bloqueos', getBloqueos);
router.get('/horarios-ocupados', getHorariosOcupados);
router.post('/registros', createRegistro);
router.get('/verify', verifyRegistro);
router.post('/bloqueos', createBloqueo);
router.get('/bloqueos-completos', getBloqueosCompletos);

module.exports = router;