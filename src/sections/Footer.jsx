import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

    function Footer() {
        return (
            <footer className="footer">
                {/* Contenido del footer */}
                <div className="contenedor">
                    <div className="izquierda">
                             <div className="navbar-social">
                                <a href="https://www.facebook.com/r21globalteam" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com/r21globalteam/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.youtube.com/@R21GlobalTeam" target="_blank" rel="noopener noreferrer">
                                      <i class="fa-brands fa-youtube"></i>
                                </a>
                                <a href="http://www.tiktok.com/@r21globalteam" target="_blank" rel="noopener noreferrer">
                                      <i class="fa-brands fa-tiktok"></i>
                                </a>
                                <a href="https://wa.me/+573118006484" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                            </div>
                            <img src="/logo.png" alt="logo reto 21" />
                    </div>
                    <div className="politicasDatos">
                        <Link to="/politicas">
                              <p>politicas y condiciones</p>
                        </Link>
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