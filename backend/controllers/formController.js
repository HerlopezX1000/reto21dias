// backend/controllers/formController.js

// --- Dependencias ---
const db = require('../config/database');
const transporter = require('../config/nodemailer');
const crypto = require('crypto');

// --- Funciones Ayudantes Limpias (Promisify) ---
function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(`Error DB All (${sql}):`, err.message); // Log de error básico
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                console.error(`Error DB Get (${sql}):`, err.message);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                console.error(`Error DB Run (${sql}):`, err.message);
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
}
// --- Fin Funciones Ayudantes ---

// --- Controladores ---

const getRoot = (req, res) => {
    res.send('¡Hola desde el backend!');
};

const getRegistros = async (req, res) => {
    try {
        const sql = 'SELECT * FROM registros WHERE verified = 1';
        const registros = await dbAll(sql);
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener registros.' });
    }
};

const getBloqueos = async (req, res) => {
    try {
        const sql = 'SELECT DISTINCT fecha FROM bloqueos WHERE horaInicio IS NULL';
        const rows = await dbAll(sql);
        // Asegurarse que rows sea un array aunque esté vacío
        const fechasBloqueadas = Array.isArray(rows) ? rows.map(row => row.fecha) : [];
        res.json(fechasBloqueadas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener fechas bloqueadas.' });
    }
};

const getHorariosOcupados = async (req, res) => {
    const { fecha } = req.query;
    if (!fecha) { return res.status(400).json({ error: 'Falta el parámetro fecha.' }); }
    try {
        const sqlCitas = 'SELECT horaAsesoria FROM registros WHERE fechaAsesoria = ? AND verified = 1';
        const rowsCitas = await dbAll(sqlCitas, [fecha]);
        const ocupadosCitas = Array.isArray(rowsCitas) ? rowsCitas.map(row => row.horaAsesoria) : [];

        const sqlBloqueos = `SELECT horaInicio, horaFin FROM bloqueos WHERE fecha = ? AND horaInicio IS NOT NULL AND horaFin IS NOT NULL`;
        const bloqueos = await dbAll(sqlBloqueos, [fecha]);

        const horariosPermitidos = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00',  '18:00', '19:00', '20:00'];
        let ocupados = [...ocupadosCitas];
        if (Array.isArray(bloqueos)) {
            bloqueos.forEach(bloqueo => {
                const inicio = horariosPermitidos.indexOf(bloqueo.horaInicio);
                const fin = horariosPermitidos.indexOf(bloqueo.horaFin);
                if (inicio !== -1 && fin !== -1) {
                    for (let i = inicio; i <= fin; i++) {
                        if (i < horariosPermitidos.length && !ocupados.includes(horariosPermitidos[i])) {
                            ocupados.push(horariosPermitidos[i]);
                        }
                    }
                }
            });
        }

        const sqlDiaBloqueado = 'SELECT COUNT(*) as count FROM bloqueos WHERE fecha = ? AND horaInicio IS NULL';
        const diaBloqueado = await dbGet(sqlDiaBloqueado, [fecha]);
        if (diaBloqueado && diaBloqueado.count > 0) {
            ocupados = [...horariosPermitidos];
        }
        res.json(ocupados);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener horarios ocupados.' });
    }
};

const createRegistro = async (req, res) => {
    try {
        const {
            nombres = '', apellidos = '', correo = '', telefono = '', sexo = '', ocupacion = '', pais = '',
            indiceMasaMuscular = null, edad = 0, pesoActual = 0, estatura = 0, sufreDe = [], objetivo = [],
            recomendadoPor = null, idPatrocinador = null, fechaAsesoria = '', horaAsesoria = '',
            sufreDeOtros = '', objetivoOtros = ''
        } = req.body;

        if (!nombres || !apellidos || !correo || !fechaAsesoria || !horaAsesoria) {
             return res.status(400).json({ error: 'Faltan campos obligatorios.' });
        }
        // Combinar campos
        const sufreDeArray = Array.isArray(sufreDe) ? sufreDe : []; if (sufreDeOtros) sufreDeArray.push(sufreDeOtros.trim()); const sufreDeString = sufreDeArray.join(', ');
        const objetivoArray = Array.isArray(objetivo) ? objetivo : []; if (objetivoOtros) objetivoArray.push(objetivoOtros.trim()); const objetivoString = objetivoArray.join(', ');

        // Verificar disponibilidad
        const sqlCheckRegistro = 'SELECT COUNT(*) as count FROM registros WHERE fechaAsesoria = ? AND horaAsesoria = ? AND verified = 1';
        const resultCheck = await dbGet(sqlCheckRegistro, [fechaAsesoria, horaAsesoria]);
        if (resultCheck && resultCheck.count > 0) { return res.status(400).json({ error: 'El horario seleccionado ya está ocupado.' }); }
        const sqlCheckBloqueo = `SELECT COUNT(*) as count FROM bloqueos WHERE fecha = ? AND (horaInicio IS NULL OR (horaInicio <= ? AND horaFin >= ?))`;
        const bloqueoResult = await dbGet(sqlCheckBloqueo, [fechaAsesoria, horaAsesoria, horaAsesoria]);
        if (bloqueoResult && bloqueoResult.count > 0) { return res.status(400).json({ error: 'El horario seleccionado está bloqueado.' }); }

        // Insertar (Asegurando que coincida con la ESTRUCTURA REAL de tu tabla)
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const sqlInsert = `
            INSERT INTO registros (
                nombres, apellidos, correo, telefono, sexo, ocupacion, pais,
                indiceMasaMuscular, edad, pesoActual, estatura, sufreDe, objetivo,
                recomendadoPor, idPatrocinador, fechaAsesoria, horaAsesoria,
                verified, verificationToken
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
        `;
        // 
        const paramsInsert = [
            nombres, apellidos, correo, telefono, sexo, ocupacion, pais,
            indiceMasaMuscular, edad, pesoActual, estatura,
            sufreDeString, objetivoString, // 
            recomendadoPor, idPatrocinador, fechaAsesoria, horaAsesoria,
            verificationToken
        ];
        const info = await dbRun(sqlInsert, paramsInsert);

        // Enviar correo de verificación (con backticks ` ` para html)
        const verificationLink = `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/verify?token=${verificationToken}`;
        const mailOptionsVerification = {
            from: process.env.EMAIL_USER, to: correo, subject: 'Verifica tu Registro',
            html: `
                <h2>¡Gracias por registrarte, ${nombres} ${apellidos}!</h2>
                <p>Para completar tu registro por favor, haz clic en el siguiente enlace:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>Si no solicitaste este registro, ignora este correo.</p>
            `,
        };
        transporter.sendMail(mailOptionsVerification).catch(err => console.error('Error asíncrono enviando correo verificación:', err)); // Mejor manejo del error async

        // Enviar respuesta éxito (no esperar el correo)
        res.status(200).json({ message: 'Registro creado. Por favor, verifica tu correo.', id: info.lastID });

    } catch (error) {
        console.error('[createRegistro] Catch - Error:', error);
        res.status(500).json({ error: 'Error interno al procesar el registro.' });
    }
};

// Verificar el correo del usuario (Lógica: SELECT antes de UPDATE, backticks ` `)
const verifyRegistro = async (req, res) => {
    const { token } = req.query;
    const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!token) { return res.redirect(`${frontendBaseUrl}/verification-error?reason=no_token`); }
    try {
        // 1. Buscar ANTES
        const sqlSelect = 'SELECT * FROM registros WHERE verificationToken = ? AND verified = 0';
        const registro = await dbGet(sqlSelect, [token]);
        if (!registro) { return res.redirect(`${frontendBaseUrl}/verification-error?reason=invalid_or_used`); }

        // 2. Actualizar DESPUÉS
        const sqlUpdate = 'UPDATE registros SET verified = 1, verificationToken = NULL WHERE verificationToken = ? AND verified = 0';
        const infoUpdate = await dbRun(sqlUpdate, [token]);
        if (infoUpdate.changes === 0) { return res.redirect(`${frontendBaseUrl}/verification-error?reason=update_failed`); }

        // 3. Enviar correos usando datos del 'registro' obtenido ANTES (con backticks ` `)
        const mailOptionsUser = {
            from: process.env.EMAIL_USER, to: registro.correo, subject: 'Registro Confirmado',
            html: `<h2>¡Hola ${registro.nombres} ${registro.apellidos}!</h2><p>Tu registro ha sido confirmado. ¡Bienvenido!</p><p>Hemos agendado tu asesoría para el <strong>${registro.fechaAsesoria}</strong> a las <strong>${registro.horaAsesoria}</strong>.</p><p>Si necesitas reprogramar o tienes alguna pregunta, no dudes en contactarnos a travez de nuestras redes sociales o por WhatsApp (+57) 3118006434.</p>`,
        };
        const mailOptionsToYou = {
            from: process.env.EMAIL_USER, to: process.env.ADMIN_EMAIL || 'r21diasherbalife@gmail.com', subject: 'Nuevo Registro Verificado R21',

            html: `<h1>Nuevo Registro Verificado</h1>
                
                <h2>Datos Personales</h2>
                <p><strong>Nombre:</strong> ${registro.nombres} ${registro.apellidos}</p>
                <p><strong>Correo:</strong> ${registro.correo}</p>
                <p><strong>Teléfono:</strong> ${registro.telefono}</p>
                <p><strong>Sexo:</strong> ${registro.sexo}</p>
                <p><strong>Ocupación:</strong> ${registro.ocupacion}</p>
                <p><strong>País:</strong> ${registro.pais}</p>
                <h2>Indice de Masa Muscular</h2>
                
                <p><strong>Índice de Masa Muscular:</strong> ${registro.indiceMasaMuscular || 'No especificado'}</p>
                <p><strong>Edad:</strong> ${registro.edad}</p>
                <p><strong>Peso Actual:</strong> ${registro.pesoActual} kg</p>
                <p><strong>Estatura:</strong> ${registro.estatura} cm</p>
                <h2>Estado de Salud</h2>
                <p><strong>Sufre de:</strong> ${registro.sufreDe || 'Ninguno'}</p>
                <p><strong>Objetivo:</strong> ${registro.objetivo || 'Ninguno'}</p>
                <h2>Recomendado por</h2>
                <p><strong>Recomendado por:</strong> ${registro.recomendadoPor || 'No especificado'}</p>
                <p><strong>ID Patrocinador:</strong> ${registro.idPatrocinador || 'No especificado'}</p>
                <h2>Fecha de Asesoría</h2>
                <p><strong>Fecha de Asesoría:</strong> ${registro.fechaAsesoria}</p>
                <p><strong>Hora de Asesoría:</strong> ${registro.horaAsesoria}</p>`, // Tu HTML completo aquí
        };
        transporter.sendMail(mailOptionsUser).catch(err => console.error('Error asíncrono enviando correo usuario:', err));
        transporter.sendMail(mailOptionsToYou).catch(err => console.error('Error asíncrono enviando correo admin:', err));

        // 4. Redirigir a éxito (con backticks ` `)
        const successUrl = `${frontendBaseUrl}/verification-success?nombres=${encodeURIComponent(registro.nombres)}&apellidos=${encodeURIComponent(registro.apellidos)}&fechaAsesoria=${encodeURIComponent(registro.fechaAsesoria)}&horaAsesoria=${encodeURIComponent(registro.horaAsesoria)}`;
        res.redirect(successUrl);

    } catch (error) {
        console.error('[verifyRegistro] Catch - Error:', error);
        res.redirect(`${frontendBaseUrl}/verification-error?reason=server_error`);
    }
};

// Crear un nuevo bloqueo
const createBloqueo = async (req, res) => {
    try {
        const { fecha, horaInicio, horaFin } = req.body;
        if (!fecha) { return res.status(400).json({ error: 'La fecha es obligatoria.' }); }
        const sql = 'INSERT INTO bloqueos (fecha, horaInicio, horaFin) VALUES (?, ?, ?)';
        const params = [fecha, horaInicio || null, horaFin || null];
        const info = await dbRun(sql, params);
        res.status(200).json({ message: 'Bloqueo creado con éxito', id: info.lastID });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al crear el bloqueo.' });
    }
};

// Obtener todos los bloqueos (para el administrador)
const getBloqueosCompletos = async (req, res) => {
    try {
        const sql = 'SELECT * FROM bloqueos ORDER BY fecha, horaInicio';
        const bloqueos = await dbAll(sql);
        res.json(bloqueos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener bloqueos completos.' });
    }
};

// Actualizar un registro (Usando solo columnas existentes)
const updateRegistro = async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) { return res.status(400).json({ error: 'ID de registro inválido.'}); }
    try {
        const { /* ... extraer todos los campos del body ... */
             sufreDe = [], objetivo = [], sufreDeOtros = '', objetivoOtros = '' } = req.body;
        // Combinar campos
        const sufreDeArray = Array.isArray(sufreDe) ? sufreDe : []; if (sufreDeOtros) sufreDeArray.push(sufreDeOtros.trim()); const sufreDeString = sufreDeArray.join(', ');
        const objetivoArray = Array.isArray(objetivo) ? objetivo : []; if (objetivoOtros) objetivoArray.push(objetivoOtros.trim()); const objetivoString = objetivoArray.join(', ');

        const sql = `
            UPDATE registros
            SET nombres = ?, apellidos = ?, correo = ?, telefono = ?, sexo = ?,
                ocupacion = ?, pais = ?, indiceMasaMuscular = ?, edad = ?,
                pesoActual = ?, estatura = ?, sufreDe = ?, objetivo = ?,
                recomendadoPor = ?, idPatrocinador = ?, fechaAsesoria = ?, horaAsesoria = ?
            WHERE id = ?
        `;
        // Asegurar que el orden y número de params coincida con los '?' del SET y el WHERE
        const params = [
            nombres, apellidos, correo, telefono, sexo, ocupacion, pais, indiceMasaMuscular, edad,
            pesoActual, estatura, sufreDeString, objetivoString, recomendadoPor, idPatrocinador,
            fechaAsesoria, horaAsesoria,
            id
        ];
        const info = await dbRun(sql, params);
        if (info.changes > 0) {
            res.json({ message: 'Registro actualizado con éxito', id: id });
        } else {
            res.status(404).json({ error: 'Registro no encontrado o sin cambios.' });
        }
    } catch (error) {
        console.error('[updateRegistro] Catch - Error:', error);
        res.status(500).json({ error: 'Error interno al actualizar el registro.' });
    }
};

// Eliminar un registro
const deleteRegistro = async (req, res) => {
     const { id } = req.params;
     if (isNaN(parseInt(id))) { return res.status(400).json({ error: 'ID de registro inválido.'}); }
    try {
        const sql = 'DELETE FROM registros WHERE id = ?';
        const info = await dbRun(sql, [id]);
        if (info.changes > 0) {
            res.json({ message: 'Registro eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno al eliminar el registro.' });
    }
};

// Exportar todas las funciones
module.exports = {
    getRoot, getRegistros, getBloqueos, getHorariosOcupados, createRegistro,
    verifyRegistro, createBloqueo, getBloqueosCompletos, updateRegistro, deleteRegistro,
};