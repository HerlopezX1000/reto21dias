// backend/controllers/formController.js

const db = require('../config/database');
const transporter = require('../config/nodemailer');
const crypto = require('crypto');

// Ruta de prueba
const getRoot = (req, res) => {
    res.send('¡Hola desde el backend!');
};

// Obtener todos los registros verificados
const getRegistros = (req, res) => {
    try {
        const registros = db.prepare('SELECT * FROM registros WHERE verified = 1').all();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener fechas bloqueadas
const getBloqueos = (req, res) => {
    try {
        const stmt = db.prepare('SELECT DISTINCT fecha FROM bloqueos WHERE horaInicio IS NULL');
        const fechasBloqueadas = stmt.all().map(row => row.fecha);
        res.json(fechasBloqueadas);
    } catch (error) {
        console.error('Error al obtener fechas bloqueadas:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener horarios ocupados para una fecha específica
const getHorariosOcupados = (req, res) => {
    const { fecha } = req.query;
    try {
        const stmtCitas = db.prepare('SELECT horaAsesoria FROM registros WHERE fechaAsesoria = ? AND verified = 1');
        const ocupadosCitas = stmtCitas.all(fecha).map(row => row.horaAsesoria);

        const stmtBloqueos = db.prepare(`
            SELECT horaInicio, horaFin FROM bloqueos 
            WHERE fecha = ? AND horaInicio IS NOT NULL AND horaFin IS NOT NULL
        `);
        const bloqueos = stmtBloqueos.all(fecha);

        const horariosPermitidos = [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
        ];

        let ocupados = [...ocupadosCitas];
        bloqueos.forEach(bloqueo => {
            const inicio = horariosPermitidos.indexOf(bloqueo.horaInicio);
            const fin = horariosPermitidos.indexOf(bloqueo.horaFin);
            for (let i = inicio; i <= fin; i++) {
                if (!ocupados.includes(horariosPermitidos[i])) {
                    ocupados.push(horariosPermitidos[i]);
                }
            }
        });

        const diaBloqueado = db.prepare('SELECT COUNT(*) as count FROM bloqueos WHERE fecha = ? AND horaInicio IS NULL').get(fecha);
        if (diaBloqueado.count > 0) {
            ocupados = [...horariosPermitidos];
        }

        res.json(ocupados);
    } catch (error) {
        console.error('Error al obtener horarios ocupados:', error);
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo registro (enviar formulario)
const createRegistro = (req, res) => {
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

        const checkStmt = db.prepare('SELECT COUNT(*) as count FROM registros WHERE fechaAsesoria = ? AND horaAsesoria = ? AND verified = 1');
        const result = checkStmt.get(fechaAsesoria, horaAsesoria);
        if (result.count > 0) {
            return res.status(400).json({ error: 'El horario seleccionado ya está ocupado. Por favor, elige otro.' });
        }

        const checkBloqueo = db.prepare(`
            SELECT COUNT(*) as count FROM bloqueos 
            WHERE fecha = ? 
            AND (horaInicio IS NULL OR (horaInicio <= ? AND horaFin >= ?))
        `);
        const bloqueoResult = checkBloqueo.get(fechaAsesoria, horaAsesoria, horaAsesoria);
        if (bloqueoResult.count > 0) {
            return res.status(400).json({ error: 'El horario seleccionado está bloqueado por el administrador.' });
        }

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
};

// Verificar el correo del usuario
const verifyRegistro = (req, res) => {
    const { token } = req.query;

    try {
        const stmt = db.prepare('UPDATE registros SET verified = 1 WHERE verificationToken = ? AND verified = 0');
        const info = stmt.run(token);

        if (info.changes === 0) {
            return res.redirect('http://localhost:5173/verification-error');
        }

        const registro = db.prepare('SELECT * FROM registros WHERE verificationToken = ?').get(token);

        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: registro.correo,
            subject: 'Registro Confirmado',
            html: `
                <h2>¡Hola ${registro.nombres} ${registro.apellidos}!</h2>
                <p>Tu registro ha sido confirmado. ¡Bienvenido!</p>
                <p>Hemos agendado tu asesoría para el <strong>${registro.fechaAsesoria}</strong> a las <strong>${registro.horaAsesoria}</strong>.</p>
                <p>Si necesitas reprogramar o tienes alguna pregunta, no dudes en contactarnos.</p>
            `,
        };

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

        res.redirect(`http://localhost:5173/verification-success?nombres=${encodeURIComponent(registro.nombres)}&apellidos=${encodeURIComponent(registro.apellidos)}&fechaAsesoria=${encodeURIComponent(registro.fechaAsesoria)}&horaAsesoria=${encodeURIComponent(registro.horaAsesoria)}`);
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.redirect('http://localhost:5173/verification-error');
    }
};

// Crear un nuevo bloqueo
const createBloqueo = (req, res) => {
    try {
        const { fecha, horaInicio, horaFin } = req.body;
        const stmt = db.prepare('INSERT INTO bloqueos (fecha, horaInicio, horaFin) VALUES (?, ?, ?)');
        const info = stmt.run(fecha, horaInicio || null, horaFin || null);
        res.status(200).json({ message: 'Bloqueo creado con éxito', id: info.lastInsertRowid });
    } catch (error) {
        console.error('Error al crear bloqueo:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los bloqueos (para el administrador)
const getBloqueosCompletos = (req, res) => {
    try {
        const bloqueos = db.prepare('SELECT * FROM bloqueos').all();
        res.json(bloqueos);
    } catch (error) {
        console.error('Error al obtener bloqueos:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro
const updateRegistro = (req, res) => {
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
};

// Eliminar un registro
const deleteRegistro = (req, res) => {
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
};

module.exports = {
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
};