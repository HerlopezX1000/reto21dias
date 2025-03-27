// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./config/database');
const transporter = require('./config/nodemailer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

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

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const stmt = db.prepare(`
            INSERT INTO registros (
                nombres, apellidos, correo, telefono, sexo, ocupacion, pais, 
                indiceMasaMuscular, edad, pesoActual, estatura, sufreDe, objetivo, 
                recomendadoPor, idPatrocinador, fechaAsesoria, horaAsesoria, 
                verified, verificationToken
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
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
            verificationToken
        );

        const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;
        const mailOptionsVerification = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Verifica tu Registro',
            html: `
                <h2>¡Gracias por registrarte, ${nombres} ${apellidos}!</h2>
                <p>Por favor, haz clic en el siguiente enlace para verificar tu correo:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>Si no solicitaste este registro, ignora este correo.</p>
            `,
        };

        transporter.sendMail(mailOptionsVerification, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo de verificación:', error);
            } else {
                console.log('Correo de verificación enviado:', info.response);
            }
        });

        res.status(200).json({ message: 'Registro creado. Por favor, verifica tu correo.', id: info.lastInsertRowid });
    } catch (error) {
        console.error('Error al crear el registro:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta /verify actualizada para redirigir
app.get('/verify', (req, res) => {
    const { token } = req.query;

    try {
        const stmt = db.prepare('UPDATE registros SET verified = 1 WHERE verificationToken = ? AND verified = 0');
        const info = stmt.run(token);

        if (info.changes === 0) {
            // Redirigir a la página de error si el token no es válido o ya fue usado
            return res.redirect('http://localhost:5173/verification-error'); // Ajusta el puerto si es diferente
        }

        // Obtener los datos del registro verificado
        const registro = db.prepare('SELECT * FROM registros WHERE verificationToken = ?').get(token);

        // Enviar correo de bienvenida al usuario
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: registro.correo,
            subject: 'Registro Confirmado',
            text: `¡Hola ${registro.nombres} ${registro.apellidos}! Tu registro ha sido confirmado. ¡Bienvenido!`,
        };

        // Enviar correo al administrador (tú)
        const mailOptionsToYou = {
            from: process.env.EMAIL_USER,
            to: 'herlopez@gmail.com',
            subject: 'Nuevo Registro Verificado',
            html: `
                <h2>Nuevo Registro Verificado</h2>
                <p><strong>Nombre:</strong> ${registro.nombres} ${registro.apellidos}</p>
                <p><strong>Correo:</strong> ${registro.correo}</p>
                <p><strong>Teléfono:</strong> ${registro.telefono}</p>
                <p><strong>Sexo:</strong> ${registro.sexo}</p>
                <p><strong>Ocupación:</strong> ${registro.ocupacion}</p>
                <p><strong>País:</strong> ${registro.pais}</p>
                <p><strong>Índice de Masa Muscular:</strong> ${registro.indiceMasaMuscular || 'No especificado'}</p>
                <p><strong>Edad:</strong> ${registro.edad}</p>
                <p><strong>Peso Actual:</strong> ${registro.pesoActual} kg</p>
                <p><strong>Estatura:</strong> ${registro.estatura} cm</p>
                <p><strong>Sufre de:</strong> ${registro.sufreDe || 'Ninguno'}</p>
                <p><strong>Objetivo:</strong> ${registro.objetivo || 'Ninguno'}</p>
                <p><strong>Recomendado por:</strong> ${registro.recomendadoPor || 'No especificado'}</p>
                <p><strong>ID Patrocinador:</strong> ${registro.idPatrocinador || 'No especificado'}</p>
                <p><strong>Fecha de Asesoría:</strong> ${registro.fechaAsesoria}</p>
                <p><strong>Hora de Asesoría:</strong> ${registro.horaAsesoria}</p>
            `,
        };

        // Enviar ambos correos
        transporter.sendMail(mailOptionsUser, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo al usuario:', error);
            } else {
                console.log('Correo de bienvenida enviado:', info.response);
            }
        });

        transporter.sendMail(mailOptionsToYou, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo al administrador:', error);
            } else {
                console.log('Correo enviado al administrador:', info.response);
            }
        });

        // Redirigir a la página de éxito
        res.redirect('http://localhost:5173/verification-success'); // Ajusta el puerto si es diferente
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.redirect('http://localhost:5173/verification-error'); // Redirigir a error en caso de fallo
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