// src/sections/Inscription.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Inscription.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Formulario() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        sexo: '',
        ocupacion: '',
        pais: '',
        indiceMasaMuscular: '',
        edad: '',
        pesoActual: '',
        estatura: '',
        sufreDe: [],
        objetivo: [],
        recomendadoPor: '',
        idPatrocinador: '',
        fechaAsesoria: '',
        horaAsesoria: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value)) : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('/registros', formData); // Usa ruta relativa gracias al proxy
            console.log('Datos enviados correctamente:', response.data);
            setMessage('¡Registro exitoso! Tus datos han sido enviados.');
            setFormData({
                nombres: '',
                apellidos: '',
                correo: '',
                telefono: '',
                sexo: '',
                ocupacion: '',
                pais: '',
                indiceMasaMuscular: '',
                edad: '',
                pesoActual: '',
                estatura: '',
                sufreDe: [],
                objetivo: [],
                recomendadoPor: '',
                idPatrocinador: '',
                fechaAsesoria: '',
                horaAsesoria: '',
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setMessage('Error al enviar los datos. Por favor, intenta de nuevo.');
        }
    };

    // Resto del código (formulario) sigue igual...
    return (
        <section id="formulario" className="formulario-section">
            <h2>Formulario de Registro</h2>
            <div className="contenedor">
                <div className="derecha">
                    <h3>"Haz de cada día tu obra maestra"</h3>
                    <p className="nombre">John Wooden</p>
                    <div className="navbar-social">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://wa.me/+573219777717" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <img src="../../formulario.jpg" alt="imagen en el formulario" />
                </div>
                <form onSubmit={handleSubmit}>
                    {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
                    {/* Resto del formulario... */}
                    <h4>Datos personales</h4>
                    <div className="modulo">
                        <label>Nombres: <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required /></label>
                        <label>Apellidos: <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required /></label>
                    </div>
                    <div className="modulo">
                        <label>Correo Electrónico: <input type="email" name="correo" value={formData.correo} onChange={handleChange} required /></label>
                        <label>Teléfono: <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required /></label>
                    </div>
                    <label>Sexo:
                        <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                            <option value="">Selecciona</option>
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                            <option value="noDefinido">No Definido</option>
                        </select>
                    </label>
                    <div className="modulo">
                        <label>Ocupación: <input type="text" name="ocupacion" value={formData.ocupacion} onChange={handleChange} required /></label>
                        <label>País: <input type="text" name="pais" value={formData.pais} onChange={handleChange} required /></label>
                    </div>
                    <h4>Vamos a Calcular tu Índice de Masa Corporal</h4>
                    <div className="masa">
                        <label>Edad: <input type="number" name="edad" value={formData.edad} onChange={handleChange} required /></label>
                        <label>Peso Actual: <input type="number" name="pesoActual" value={formData.pesoActual} onChange={handleChange} required /></label>
                        <label>Estatura: <input type="number" name="estatura" value={formData.estatura} onChange={handleChange} required /></label>
                    </div>
                    <h4>Para personalizar tu plan, queremos conocerte mejor</h4>
                    <label>Sufres o has sufrido de lo siguiente:</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="sufreDe" value="estreñimiento" onChange={handleChange} /> Estreñimiento</label>
                        <label><input type="checkbox" name="sufreDe" value="anemia" onChange={handleChange} /> Anemia</label>
                        <label><input type="checkbox" name="sufreDe" value="gastritis" onChange={handleChange} />Gastritis</label>
                        <label><input type="checkbox" name="sufreDe" value="ulceras" onChange={handleChange} />Úlceras</label>
                        <label><input type="checkbox" name="sufreDe" value="artrosis" onChange={handleChange} />Artrosis o Artritis</label>
                        <label><input type="checkbox" name="sufreDe" value="fumador" onChange={handleChange} />Fumador</label>
                        <label><input type="checkbox" name="sufreDe" value="ansiedad" onChange={handleChange} />Ansiedad</label>
                        <label><input type="checkbox" name="sufreDe" value="Colesterol" onChange={handleChange} />Colesterol Alto</label>
                        <label><input type="checkbox" name="sufreDe" value="trigliceridos" onChange={handleChange} />Triglicéridos</label>
                        <label><input type="checkbox" name="sufreDe" value="hemorroides" onChange={handleChange} />Hemorroides</label>
                        <label><input type="checkbox" name="sufreDe" value="jaquecas" onChange={handleChange} />Jaquecas y Migraña</label>
                        <label><input type="checkbox" name="sufreDe" value="Colon" onChange={handleChange} />Colon Irritable</label>
                        <label><input type="checkbox" name="sufreDe" value="Insomnio" onChange={handleChange} />Insomnio</label>
                        <label><input type="checkbox" name="sufreDe" value="alergias" onChange={handleChange} />Alergias respiratorias</label>
                        <label><input type="checkbox" name="sufreDe" value="diabetes" onChange={handleChange} />Diabetes o antecedentes familiares</label>
                        <label><input type="checkbox" name="sufreDe" value="tensionArterial" onChange={handleChange} />Tensión Arterial o problemas del corazón</label>
                        <label><input type="checkbox" name="sufreDe" value="ninguno" onChange={handleChange} /> Ninguno</label>
                        <label>Otros: <input type="text" name="sufreDeOtros" value={formData.sufreDeOtros} onChange={handleChange} /></label>
                    </div>
                    <h4>Cuál es tu propósito al asumir este reto</h4>
                    <label>Dime cuál es tu objetivo y/o meta con el reto seleccionado:</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="objetivo" value="aumentoMasaMuscular" onChange={handleChange} /> Aumento de Masa Muscular</label>
                        <label><input type="checkbox" name="objetivo" value="perdidaPeso" onChange={handleChange} /> Pérdida de Peso</label>
                        <label><input type="checkbox" name="objetivo" value="energia" onChange={handleChange} /> Energía y Vitalidad</label>
                        <label><input type="checkbox" name="objetivo" value="digestion" onChange={handleChange} /> Digestión y Metabolismo</label>
                        <label><input type="checkbox" name="objetivo" value="calidadSueno" onChange={handleChange} /> Calidad de sueño y descanso</label>
                        <label><input type="checkbox" name="objetivo" value="refuerzo" onChange={handleChange} /> Refuerzo del sistema inmunológico</label>
                        <label><input type="checkbox" name="objetivo" value="piel" onChange={handleChange} /> Piel saludable y radiante</label>
                        <label><input type="checkbox" name="objetivo" value="estres" onChange={handleChange} /> Estrés y Estado de ánimo</label>
                        <label><input type="checkbox" name="objetivo" value="calidadSueno" onChange={handleChange} /> Control y mejora de la salud cardiovascular</label>
                        <label>Otros: <input type="text" name="objetivoOtros" value={formData.objetivoOtros} onChange={handleChange} /></label>
                    </div>
                    <h4>¿Habías sabido de nosotros antes?</h4>
                    <div className="modulo">
                        <label>¿Quién te recomendó esta oportunidad? (Opcional) <input type="text" name="recomendadoPor" value={formData.recomendadoPor} onChange={handleChange} /></label>
                        <label>ID de tu patrocinador (Opcional): <input type="text" name="idPatrocinador" value={formData.idPatrocinador} onChange={handleChange} /></label>
                    </div>
                    <h4>Agenda tu Asesoría Personalizada</h4>
                    <div className="modulo">
                        <label>Fecha de asesoría: <input type="date" name="fechaAsesoria" value={formData.fechaAsesoria} onChange={handleChange} required /></label>
                        <label>Hora de asesoría: <input type="time" name="horaAsesoria" value={formData.horaAsesoria} onChange={handleChange} required /></label>
                    </div>
                    <button type="submit">Finalizar Registro</button>
                </form>
            </div>
        </section>
    );
}

export default Formulario;