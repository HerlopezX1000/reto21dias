import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import '../styles/navbar.css'

    function Navbar() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        return (
            <nav className="navbar">

                <div className="contenedor">
                    <div className="navbar-logo">
                        <img src="/logo.png" alt="Logo" className="logo" />
                    </div>
                    <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/video">Video</Link></li>
                        <li><Link to="/testimonials">Testimonios</Link></li>
                        <li><Link to="/information">Información</Link></li>
                        <li><Link to="/inscription">Inscripción</Link></li>
                    </ul>
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
                    <div className="navbar-toggle" onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </div>
                    </div>
            </nav>
        );
    }

    export default Navbar;