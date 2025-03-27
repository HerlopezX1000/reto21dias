// src/sections/VerificationSuccess.jsx
import React from 'react';
import '../styles/VerificationSuccess.css'; // Opcional: para estilos

const VerificationSuccess = () => {
    return (
        <section className="verification-success-section">
            <h2>¡Registro Confirmado!</h2>
            <p>¡Bienvenido(a)! Tu correo ha sido verificado con éxito.</p>
            <p>Hemos enviado un correo de confirmación a tu dirección. Ahora estás listo(a) para comenzar tu reto.</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos a través de nuestras redes sociales o WhatsApp.</p>
            <p>¡Gracias por unirte a nosotros!</p>
        </section>
    );
};

export default VerificationSuccess;