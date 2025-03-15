import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import '../styles/navbar.css'

    function Navbar() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
        };

        return (
            <nav className="navbar">

                <div className="contenedor">
                    <div className="navbar-logo">
                        <img src="/logo.png" alt="Logo Veterinaria Zona Animal" className="logo" />
                    </div>
                    <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="#" onClick={closeMenu}>Inicio</a></li>
                        <li><a href="#video" onClick={closeMenu}>Video</a></li>
                        <li><a href="#information" onClick={closeMenu}>Retos</a></li>    
                        <li><a href="#testimonials"onClick={closeMenu}>Testimonios</a></li>                       
                        <li><a href="#formulario" onClick={closeMenu}>Inscripción</a></li>
                    </ul>
                    <div className="navbar-social">

                    <Link to="#" >
                         <button>Inicia Sesión</button>
                     </Link>
                       
                        
                    </div>
                    <div className="navbar-toggle" onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </div>
                    </div>
            </nav>
        );
    }

    export default Navbar;