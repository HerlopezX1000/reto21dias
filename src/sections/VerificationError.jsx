// src/sections/VerificationError.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VerificationError.css'; // Opcional: para estilos
import Footer from './Footer';
import Header from '../components/Header';

const VerificationError = () => {
    return (

        <div>
            <Header/>
                <section className="verification-error-section">
                    <h2>Error en la Verificación</h2>
                    <p>El enlace que usaste es inválido o ya ha sido verificado.</p>
                    <p>Si ya verificaste tu correo, no necesitas hacer nada más. De lo contrario, por favor intenta registrarte nuevamente.</p>
                    <p>Para cualquier problema, contáctanos a través de WhatsApp o nuestras redes sociales.</p>
                </section>

            <Footer/>
        </div>
    );
};

export default VerificationError;