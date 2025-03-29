// src/sections/VerificationError.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VerificationError.css'; // Opcional: para estilos
import Footer from './Footer';
import Header from '../components/Header';

const VerificationError = () => {
    return (

        <div className='no-confirmado'>
            <Header/>
                
                    <section className="error">
                    <div className='contenedor'>
                        <img src="..//registros/error.jpg" alt="" />
                        <p>El enlace que usaste es inválido o ya ha sido verificado.</p>
                        <p>Si ya verificaste tu correo, no necesitas hacer nada más. De lo contrario, por favor intenta registrarte nuevamente.</p>
                        <p>Para cualquier problema, contáctanos a través de  <a href="https://wa.me/+573118006484" target="_blank" rel="noopener noreferrer">
                              <i className="fab fa-whatsapp"></i>
                            </a> o nuestras redes sociales.</p>
                        <Link to="/">
                            <button>volver</button>
                        </Link>

                        </div>
                    </section>

                

            <Footer/>
        </div>
    );
};

export default VerificationError;