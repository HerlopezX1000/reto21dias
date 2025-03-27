// src/sections/VerificationPending.jsx
import React from 'react';
import '../styles/VerificationPending.css'; // Opcional: crea este archivo para estilos

const VerificationPending = () => {
    return (
        <section className="verification-pending-section">
            <h2>¡Registro Enviado!</h2>
            <p>Por favor, revisa tu correo electrónico para verificar tu inscripción.</p>
            <p>Te hemos enviado un enlace de verificación. Haz clic en él para completar tu registro.</p>
            <p>Si no ves el correo en tu bandeja de entrada, revisa la carpeta de spam o correo no deseado.</p>
            <p>Una vez verificado, recibirás una confirmación y podrás comenzar tu reto. ¡Estamos emocionados de tenerte con nosotros!</p>
        </section>
    );
};

export default VerificationPending;