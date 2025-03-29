// src/sections/VerificationSuccess.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format, parse } from 'date-fns'; // Importar date-fns para formatear la fecha
import { es } from 'date-fns/locale'; // Importar el locale en español
import '../styles/VerificationSuccess.css';
import Footer from './Footer';
import Header from '../components/Header';

const VerificationSuccess = () => {
    // Usar useLocation para obtener los parámetros de la URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nombres = searchParams.get('nombres') || 'Usuario';
    const apellidos = searchParams.get('apellidos') || '';
    const fechaAsesoria = searchParams.get('fechaAsesoria') || 'una fecha no especificada';
    const horaAsesoria = searchParams.get('horaAsesoria') || 'una hora no especificada';

    // Formatear la fecha si es válida
    let fechaFormateada = fechaAsesoria;
    if (fechaAsesoria !== 'una fecha no especificada') {
        try {
            const fecha = parse(fechaAsesoria, 'yyyy-MM-dd', new Date());
            fechaFormateada = format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
        }
    }

    return (
        <div className='confirmado'>
            <Header />
            <section className="registro-confirmado">
                <div className="contenedor">
                    <div className="imagen">
                        <img src="..//registros/confirmado.jpg" alt="registro confirmado" />
                    </div>
                    <h3>¡Hola {nombres} {apellidos}! Tu correo ha sido verificado con éxito.</h3>
                    <p>Tu asesoría está programada para el {fechaFormateada} a las {horaAsesoria}.</p>
                    <p>Hemos enviado un correo de confirmación a tu dirección. Ahora estás listo(a) para comenzar tu reto.</p>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos a través de nuestras redes sociales o  <a href="https://wa.me/+573118006484" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i>
                     </a></p>
                    <p>¡Gracias por unirte a nosotros!</p>

                    <Link to="/">
                        <button>volver</button>
                    </Link>

                   
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default VerificationSuccess;