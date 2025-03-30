// backend/config/nodemailer.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    host: 'mail.r21gt.com', // Servidor SMTP de Banahost
    port: 465, // Puerto SMTP recomendado por Banahost para SSL/TLS
    secure: true, // Usar SSL/TLS (requerido para el puerto 465)
    auth: {
        user: process.env.EMAIL_USER, // registros@r21gt.com
        pass: process.env.EMAIL_PASS, // La contraseña de tu correo
    },
    // Aumentar el tiempo de espera para la conexión (opcional)
    connectionTimeout: 10000, // 10 segundos
    greetingTimeout: 10000, // 10 segundos
});

// Verificar la conexión con el servidor SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error('Error al conectar con el servidor SMTP:', error);
    } else {
        console.log('Conexión con el servidor SMTP exitosa:', success);
    }
});

module.exports = transporter;