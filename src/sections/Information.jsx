import React from 'react';
import '../styles/Information.css';

function Information() {
  return (
    <div className="information">
      {/* Contenido de la sección de información */}
      <div className="contenedor">
        <h2>El reto que cambiara tu vida</h2>
        <div className="retos">
          <div className="reto">
            <img src="../public/retos/10dias.jpg" alt="reto 10 dias" />
            <p>Inicia tu camino al existo con el reto 10 días. un paso a la vez</p>
            <button>Saber Más</button>
          </div>

          <div className="reto">
            <img src="../public/retos/reto21.png" alt="reto 21 dias" />
            <p>Estas a mitad de Caminio a lograr tus metas en salud y bienestar</p>
            <button>Saber Más</button>
          </div>

          <div className="reto">
            <img src="../public/retos/90dias.jpg" alt="reto 90 dias" />
            <p>Has llegado a la transformación total de tu vida. ¡Felicidades!</p>
            <button>Saber Más</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information; // Esta es la línea crucial