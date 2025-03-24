// backend/server.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/database'); // Importa la conexión a la base de datos

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});

app.get('/registros', (req, res) => {
    try {
        const registros = db.prepare('SELECT * FROM registros').all();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/registros', (req, res) => {
    try {
        const {
            nombres = '',
            apellidos = '',
            correo = '',
            telefono = '',
            sexo = '',
            ocupacion = '',
            pais = '',
            indiceMasaMuscular = null,
            edad = 0,
            pesoActual = 0,
            estatura = 0,
            sufreDe = [],
            objetivo = [],
            recomendadoPor = null,
            idPatrocinador = null,
            fechaAsesoria = '',
            horaAsesoria = '',
            sufreDeOtros = '',
            objetivoOtros = '',
        } = req.body;

        const sufreDeArray = Array.isArray(sufreDe) ? sufreDe : [];
        if (sufreDeOtros) sufreDeArray.push(sufreDeOtros);
        const sufreDeString = sufreDeArray.join(', ');

        const objetivoArray = Array.isArray(objetivo) ? objetivo : [];
        if (objetivoOtros) objetivoArray.push(objetivoOtros);
        const objetivoString = objetivoArray.join(', ');

        const stmt = db.prepare(`
            INSERT INTO registros (
                nombres, apellidos, correo, telefono, sexo, ocupacion, pais, 
                indiceMasaMuscular, edad, pesoActual, estatura, sufreDe, objetivo, 
                recomendadoPor, idPatrocinador, fechaAsesoria, horaAsesoria
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
            nombres,
            apellidos,
            correo,
            telefono,
            sexo,
            ocupacion,
            pais,
            indiceMasaMuscular,
            edad,
            pesoActual,
            estatura,
            sufreDeString,
            objetivoString,
            recomendadoPor,
            idPatrocinador,
            fechaAsesoria,
            horaAsesoria
        );

        res.status(200).json({ message: 'Registro creado con éxito', id: info.lastInsertRowid });
    } catch (error) {
        console.error('Error al crear el registro:', error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/registros/:id', (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombres = '',
            apellidos = '',
            correo = '',
            telefono = '',
            sexo = '',
            ocupacion = '',
            pais = '',
            indiceMasaMuscular = null,
            edad = 0,
            pesoActual = 0,
            estatura = 0,
            sufreDe = [],
            objetivo = [],
            recomendadoPor = null,
            idPatrocinador = null,
            fechaAsesoria = '',
            horaAsesoria = '',
        } = req.body;

        const sufreDeString = Array.isArray(sufreDe) ? sufreDe.join(', ') : sufreDe;
        const objetivoString = Array.isArray(objetivo) ? objetivo.join(', ') : objetivo;

        const stmt = db.prepare(`
            UPDATE registros 
            SET nombres = ?, apellidos = ?, correo = ?, telefono = ?, sexo = ?, 
                ocupacion = ?, pais = ?, indiceMasaMuscular = ?, edad = ?, 
                pesoActual = ?, estatura = ?, sufreDe = ?, objetivo = ?, 
                recomendadoPor = ?, idPatrocinador = ?, fechaAsesoria = ?, horaAsesoria = ?
            WHERE id = ?
        `);

        const info = stmt.run(
            nombres,
            apellidos,
            correo,
            telefono,
            sexo,
            ocupacion,
            pais,
            indiceMasaMuscular,
            edad,
            pesoActual,
            estatura,
            sufreDeString,
            objetivoString,
            recomendadoPor,
            idPatrocinador,
            fechaAsesoria,
            horaAsesoria,
            id
        );

        if (info.changes) {
            res.json({ message: 'Registro actualizado con éxito', id, ...req.body });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el registro:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/registros/:id', (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('DELETE FROM registros WHERE id = ?');
        const info = stmt.run(id);

        if (info.changes) {
            res.json({ message: 'Registro eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});