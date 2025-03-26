// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./config/database'); // Importa la conexión a la base de datos
const transporter = require('./config/nodemailer'); // Importa Nodemailer (si usaste config/nodemailer.js)
const nodemailer = require('nodemailer'); // Importa Nodemailer (si no usaste config/nodemailer.js)
const dotenv = require('dotenv'); // Importa dotenv
dotenv.config(); // Carga las variables de entorno

app.use(cors());
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

        // Configura el mensaje de correo para el usuario (ya existente)
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Registro Exitoso',
            text: `¡Hola ${nombres} ${apellidos}! Gracias por registrarte.`,
            // html: `<p>¡Hola ${nombres} ${apellidos}!</p><p>Gracias por registrarte.</p>`, // Opcional: usar HTML
        };

        // Configura el mensaje de correo para ti
        const mailOptionsToYou = {
            from: process.env.EMAIL_USER,
            to: 'herlopez@gmail.com', // Reemplaza con tu correo personal
            subject: 'Nuevo Registro en el Formulario',
            html: `
                <h2>Nuevo Registro Recibido</h2>
                <p><strong>Nombre:</strong> ${nombres} ${apellidos}</p>
                <p><strong>Correo:</strong> ${correo}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Sexo:</strong> ${sexo}</p>
                <p><strong>Ocupación:</strong> ${ocupacion}</p>
                <p><strong>País:</strong> ${pais}</p>
                <p><strong>Índice de Masa Muscular:</strong> ${indiceMasaMuscular || 'No especificado'}</p>
                <p><strong>Edad:</strong> ${edad}</p>
                <p><strong>Peso Actual:</strong> ${pesoActual} kg</p>
                <p><strong>Estatura:</strong> ${estatura} cm</p>
                <p><strong>Sufre de:</strong> ${sufreDeString || 'Ninguno'}</p>
                <p><strong>Objetivo:</strong> ${objetivoString || 'Ninguno'}</p>
                <p><strong>Recomendado por:</strong> ${recomendadoPor || 'No especificado'}</p>
                <p><strong>ID Patrocinador:</strong> ${idPatrocinador || 'No especificado'}</p>
                <p><strong>Fecha de Asesoría:</strong> ${fechaAsesoria}</p>
                <p><strong>Hora de Asesoría:</strong> ${horaAsesoria}</p>
            `,
        };

        // Envía el correo al usuario
        transporter.sendMail(mailOptionsUser, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo al usuario:', error);
            } else {
                console.log('Correo enviado al usuario:', info.response);
            }
        });

        // Envía el correo a ti
        transporter.sendMail(mailOptionsToYou, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo a tu dirección:', error);
            } else {
                console.log('Correo enviado a tu dirección:', info.response);
            }
        });

        // Respuesta al frontend
        res.status(200).json({ message: 'Registro creado con éxito. Correo enviado.', id: info.lastInsertRowid });
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