import React from 'react';
import '../styles/Footer.css';

    function Footer() {
        return (
            <footer className="footer">
                {/* Contenido del footer */}
                <div className="contenedor">
                    <div className="izquierda">
                             <div className="navbar-social">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://wa.me/+573219777717" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                            </div>
                            <img src="/logo.png" alt="logo reto 21" />
                            </div>
                    <div className="derecha">
                             <p>&copy; {new Date().getFullYear()} Reto21dias.com</p>
                             <p>Elaborado @Herlopez</p>
                     </div>
                </div>
            </footer>
        );
    }

    export default Footer; // Asegúrate de que esta línea esté presente