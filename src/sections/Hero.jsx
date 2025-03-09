import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider'; // Importa Slider aquí

function Hero() {
    return (
        <header id="hero" className="hero">
            <div className="contenedor hero-content">
                <div className="hero-logo">
                    <img src="/logo.png" alt="Logo" className="logo" />
                </div>
                <Navbar />
                <div className="hero-social">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://wa.me/tunumerodewhatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>
            </div>
            <div className= "slider-section" >
                <Slider/>
            </div>
        </header>
    );
}

export default Hero;