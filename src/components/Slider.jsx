import React, { useState, useEffect } from 'react';
    import '../styles/slider.CSS'; // Importa el archivo CSS

    function Slider() {
        const images = ['/slider/1.jpg', '/slider/2.jpg', '/slider/3.jpg'];
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const [isFadingOut, setIsFadingOut] = useState(false); // Nuevo estado

        const nextSlide = () => {
            setIsFadingOut(true); // Inicia el fade-out
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsFadingOut(false); // Reinicia el fade-in
            }, 500); // Espera 500ms (igual a la transición)
        };

        const prevSlide = () => {
            setIsFadingOut(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
                setIsFadingOut(false);
            }, 500);
        };

        useEffect(() => {
            const interval = setInterval(nextSlide, 6000); // Cambia cada 3 segundos

            return () => clearInterval(interval); // Limpia el intervalo
        }, []);

        return (
            <div className="slider">
                <button className="slider-prev" onClick={prevSlide}>&lt;</button>
                <img
                    src={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    className={isFadingOut ? 'fade-out' : ''} // Aplica la clase condicionalmente
                />
                <button className="slider-next" onClick={nextSlide}>&gt;</button>
            </div>
        );
    }

    export default Slider;