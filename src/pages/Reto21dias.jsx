import React from "react";
import '../styles/Retos.css';
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { Link } from "react-router-dom";

function Reto21dias () {
    return (
        <div>
            <Header/>

            <section className="dias30">
                <div className="contenedor">
                    <div className="imagen-header">
                        <img src="../../retos/reto21/reto21.jpg" alt="reto 21 dias" />

                    </div>

                    <h1>Un día a la vez llegamos a la meta</h1>

                    <div className="contenido">
                        <div className="contenido-izquierda">
                            <img src="../../retos/reto21/reto21dias.jpg" alt="reto 21 dias" />
                        </div>

                        <div className="contenido-derecha">
                            <h3>Reto 21 dias</h3>
                            <p className="parrafo1">¿Te imaginas despertar con más energía, sentirte más ligero y ver cambios reales en solo 21 días? 💥
                            El Reto de 21 Días con Herbalife Nutrition está diseñado para ayudarte a mejorar tu alimentación, acelerar tu metabolismo y transformar tu bienestar sin dietas estrictas ni sacrificios extremos. Es fácil, práctico y pensado para cualquier estilo de vida.</p>
                            <h2>¿Que lograras?</h2>
                            <p>✨ ¿Qué puedes lograr en 21 días? ✨</p>
                            <p>✅ Más energía y mejor rendimiento en tu día a día ⚡</p>
                            <p>✅ Menos hinchazón y mejor digestión 🥗</p>
                            <p>✅ Pérdida de peso o tonificación según tu objetivo ⚖</p>
                            <p>✅ Menos antojos y una mejor relación con la comida 🍏</p>
                            <p>✅ Acompañamiento y motivación para garantizar tu éxito 🚀</p>
                            <p className="p-final">🔴 No lo pienses más. Toma acción hoy y descubre lo que 21 días pueden hacer por ti. ¡Este es tu momento! 💪</p>
                            
                            <Link to='/'>
                                <button>Volver</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            






            <Footer/>
        </div>
    );
};

export default Reto21dias;