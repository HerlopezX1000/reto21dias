// src/sections/VerificationPending.jsx
import React from 'react';
import '../styles/VerificationPending.css'; // Opcional: crea este archivo para estilos
import Footer from './Footer';
import Header from '../components/Header';

const VerificationPending = () => {
    return (
        <div className="pendiente">
            <Header/>
            <section className="verificacion">
                <div className="contenedor">
                     <img src="..//registros/enviado.jpg" alt="registro enviado" />
                    <p>Por favor, revisa tu correo electrónico para verificar tu inscripción.</p>
                    <p>Te hemos enviado un enlace de verificación. Haz clic en él para completar tu registro.</p>
                    <p>Si no ves el correo en tu bandeja de entrada, revisa la carpeta de spam o correo no deseado.</p>
                    <p>Una vez verificado, recibirás una confirmación y podrás comenzar tu reto. </p>
                    <p>¡Estamos emocionados de tenerte con nosotros!</p>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default VerificationPending;