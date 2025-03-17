const express = require('express');
    const router = express.Router();
    const Formulario = require('../models/Formulario');

    router.post('/submit', async (req, res) => {
        try {
            const nuevoFormulario = new Formulario(req.body);
            await nuevoFormulario.save();
            res.status(201).send('Formulario guardado con éxito');
        } catch (err) {
            res.status(400).send(err);
        }
    });

    module.exports = router;