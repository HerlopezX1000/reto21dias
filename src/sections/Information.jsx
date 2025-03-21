import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../styles/Information.css';

function Information() {
    return (
        <div className="information" id='information'>
            <div className="contenedor">
                <h2>El reto que cambiara tu vida</h2>
                <div className="retos">
                    <div className="reto">
                        <img src="/retos/10dias.jpg" alt="reto 10 dias" />
                        <p>Inicia tu camino al existo con el reto 10 días. un paso a la vez</p>

                        <Link to="/reto10dias"> {/* Usa Link con "L" mayúscula y envuelve el botón */}
                            <button>Saber Más</button>
                        </Link>
                    </div>

                    <div className="reto">
                        <img src="/retos/reto21.jpg" alt="reto 21 dias" />
                        <p>Estas a mitad de Caminio a lograr tus metas en salud y bienestar</p>

                        <Link to="/reto21dias"> {/* Usa Link con "L" mayúscula y envuelve el botón */}
                            <button>Saber Más</button>
                        </Link>
                    </div>

                    <div className="reto">
                        <img src="/retos/90dias.jpg" alt="reto 90 dias" />
                        <p>Has llegado a la transformación total de tu vida. ¡Felicidades!</p>
                        <Link to="/reto90dias">
                             <button>Saber Más</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;