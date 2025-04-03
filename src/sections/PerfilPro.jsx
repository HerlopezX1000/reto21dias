import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PerfilPro.css';

const PerfilPro = () => {
    
  return (
    <div >
      <section className='perfil' id='perfilpro'>
      <h2>Una oportunidad para tu vida</h2>
            <div className="contenedor">
                <div className="presentacion">
                  <img src="../coaching.png" alt="perfil coaching" />                 
                  <p className="descripcion-perfil">Especialista en nutrición y bienestar, con amplia 
                    experiencia en el uso de productos Herbalife
                     para optimizar la salud y el rendimiento físico. 
                     Apasionado por guiar a otros hacia un estilo
                      de vida saludable mediante planes personalizados
                       que combinan nutrición equilibrada, 
                       suplementos de alta calidad y hábitos sostenibles.                        
                         comprometido con empoderar a mis clientes 
                         para alcanzar sus objetivos de peso, energía y 
                         vitalidad, utilizando el respaldo científico y
                          la eficacia comprobada de Herbalife.</p>
                </div>
                <div className="video-coaching">
                <iframe
                        width="600"
                        height="350"
                        src="https://www.youtube.com/embed/M4rexjO8a9U?si=InB5_UEsQ4qA8fAp" // Reemplaza con tu ID
                        title="Video Promocional"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
      </section>
    </div>
  )
}

export default PerfilPro
