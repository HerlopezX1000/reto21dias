import React from 'react';
import Header from '../components/Header';
import Footer from '../sections/Footer';
import '../styles/Retos.css';
import { Link } from 'react-router-dom';


const Reto10dias = () => {
  return (
    <div>
      <Header/>

      
      <section className='dias10'>
        <div className="contenedor">
          <div className="imagen-header">
            <img src="../../retos/dias10/10dias.jpg" alt="reto 10 dias" />
          </div>
          <h1>Inicias el camino que cambiara tu vida</h1>
          <div className="contenido">
            <div className="contenido-izquierda">
              <img src="../../retos/dias10/reto10.jpg" alt="reto diez dias" />
            </div>
            
            <div className="contenido-derecha">
              <h3>Reto 10 dias</h3>
              <p className='parrafo1'>El Reto de 10 Días con Herbalife Nutrition es para todos: hombres, mujeres, deportistas, mamás, estudiantes y cualquier persona que quiera verse y sentirse mejor. Es un plan rápido, fácil y 100% guiado, ideal para activar tu metabolismo, mejorar tu digestión y establecer hábitos saludables sin dietas extremas.</p>
              <h2>¿Que lograras?</h2>
              <p>✅ Más energía y vitalidad ⚡</p>
              <p>✅ Mejor digestión y control del apetito 🥗</p>
              <p>✅ Reducción de medidas y equilibrio en tu cuerpo ⚖</p>
              <p>✅ Acompañamiento y motivación en todo el proceso 🚀</p>
              <p>🔴 No importa tu edad ni tu objetivo, este reto es para ti. </p>
              <p className='p-final'>¡10 días pueden marcar la diferencia en tu vida! ¿Te unes? 💪</p>

              <Link to='/'>
                <button>Vover</button>
              </Link>

            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default Reto10dias
