import React from 'react';
import '../styles/Footer.css';

    function Footer() {
        return (
            <footer className="footer">
                {/* Contenido del footer */}
                <p>&copy; {new Date().getFullYear()} Mi Sitio Web</p>
            </footer>
        );
    }

    export default Footer; // Asegúrate de que esta línea esté presente