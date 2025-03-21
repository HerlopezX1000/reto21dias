import React from "react";
import '../styles/Retos.css';
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { Link } from "react-router-dom";

function Reto90dias () {
    return (
        <div>
            <Header/>

            <section className="dias90">
                <div className="contenedor">
                    <div className="imagen-header">
                        <img src="../../retos/reto90/reto90.jpg" alt="reto 90 dias" />
                    </div>

                    <h1>El reto que transformara tú vida</h1>

                    <div className="contenido">
                        <div className="contenido-izquierda">
                            <img src="../../retos/reto90/reto90dias.jpg" alt="Reto 90 dias" />

                        </div>
                        <div className="contenido-derecha">
                            <h3>Reto 90 dias</h3>
                            <p className="parrafo1">¿Y si en solo 90 días pudieras lograr la mejor versión de ti? Más energía, menos peso, mejor rendimiento y un bienestar que se nota desde adentro hacia afuera. Este reto es tu oportunidad para lograrlo.</p>
                            <p className="parrafo1">El Reto de 90 Días con Herbalife Nutrition es un programa estructurado para ayudarte a alcanzar tus objetivos de manera progresiva y sostenible. No es una dieta, es un cambio de hábitos con resultados visibles y duraderos.</p>

                            <h2>✨ ¿Qué puedes lograr en 90 días? ✨</h2>

                            <p>✅ Pérdida de peso saludable o aumento de masa muscular ⚖️</p>
                            <p>✅ Más energía y mejor rendimiento en tu día a día ⚡</p>
                            <p>✅ Digestión optimizada y metabolismo activo 🔥</p>
                            <p>✅ Cambio de hábitos para resultados duraderos 🍏</p>
                            <p>✅ Acompañamiento personalizado para mantenerte enfocado 🎯</p>

                            <p className="p-final">📢 Tu transformación empieza hoy. No esperes más, toma acción y descubre de lo que eres capaz en solo 90 días. ¡Inscríbete ya! 🚀</p>

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

export default Reto90dias;