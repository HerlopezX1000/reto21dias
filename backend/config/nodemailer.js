// backend/config/nodemailer.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'Gmail', // 
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo
        pass: process.env.EMAIL_PASS, // Tu contraseña (¡usa variables de entorno!)
    },
});

module.exports = transporter;