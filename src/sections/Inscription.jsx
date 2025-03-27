// src/sections/Inscription.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Agrega useNavigate
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
        sufreDeOtros: '',
        objetivoOtros: '',
        politicas: false,
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirigir

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' 
                ? (name === 'politicas' 
                    ? checked 
                    : checked 
                        ? [...prevData[name], value] 
                        : prevData[name].filter((item) => item !== value))
                : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Limpiar mensaje previo

        // Validar que se acepten las políticas de privacidad
        if (!formData.politicas) {
            setMessage('Debes aceptar las políticas de privacidad para continuar.');
            return;
        }

        try {
            const response = await axios.post('/registros', formData);
            console.log('Datos enviados correctamente:', response.data);
            // Reiniciar el formulario
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
                sufreDeOtros: '',
                objetivoOtros: '',
                politicas: false,
            });
            // Redirigir a la nueva página en lugar de mostrar mensaje
            navigate('/verification-pending');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setMessage('Error al enviar los datos. Por favor, intenta de nuevo.');
        }
    };

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
                    {message && (
                        <p className={message.includes('Error') ? 'error-message' : 'success-message'}>
                            {message}
                        </p>
                    )}
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
                        <label><input type="checkbox" name="sufreDe" value="estreñimiento" checked={formData.sufreDe.includes('estreñimiento')} onChange={handleChange} /> Estreñimiento</label>
                        <label><input type="checkbox" name="sufreDe" value="anemia" checked={formData.sufreDe.includes('anemia')} onChange={handleChange} /> Anemia</label>
                        <label><input type="checkbox" name="sufreDe" value="gastritis" checked={formData.sufreDe.includes('gastritis')} onChange={handleChange} />Gastritis</label>
                        <label><input type="checkbox" name="sufreDe" value="ulceras" checked={formData.sufreDe.includes('ulceras')} onChange={handleChange} />Úlceras</label>
                        <label><input type="checkbox" name="sufreDe" value="artrosis" checked={formData.sufreDe.includes('artrosis')} onChange={handleChange} />Artrosis o Artritis</label>
                        <label><input type="checkbox" name="sufreDe" value="fumador" checked={formData.sufreDe.includes('fumador')} onChange={handleChange} />Fumador</label>
                        <label><input type="checkbox" name="sufreDe" value="ansiedad" checked={formData.sufreDe.includes('ansiedad')} onChange={handleChange} />Ansiedad</label>
                        <label><input type="checkbox" name="sufreDe" value="Colesterol" checked={formData.sufreDe.includes('Colesterol')} onChange={handleChange} />Colesterol Alto</label>
                        <label><input type="checkbox" name="sufreDe" value="trigliceridos" checked={formData.sufreDe.includes('trigliceridos')} onChange={handleChange} />Triglicéridos</label>
                        <label><input type="checkbox" name="sufreDe" value="hemorroides" checked={formData.sufreDe.includes('hemorroides')} onChange={handleChange} />Hemorroides</label>
                        <label><input type="checkbox" name="sufreDe" value="jaquecas" checked={formData.sufreDe.includes('jaquecas')} onChange={handleChange} />Jaquecas y Migraña</label>
                        <label><input type="checkbox" name="sufreDe" value="Colon" checked={formData.sufreDe.includes('Colon')} onChange={handleChange} />Colon Irritable</label>
                        <label><input type="checkbox" name="sufreDe" value="Insomnio" checked={formData.sufreDe.includes('Insomnio')} onChange={handleChange} />Insomnio</label>
                        <label><input type="checkbox" name="sufreDe" value="Cancer" checked={formData.sufreDe.includes('Cancer')} onChange={handleChange} />Cancer</label>
                        <label><input type="checkbox" name="sufreDe" value="alergias" checked={formData.sufreDe.includes('alergias')} onChange={handleChange} />Alergias respiratorias</label>
                        <label><input type="checkbox" name="sufreDe" value="diabetes" checked={formData.sufreDe.includes('diabetes')} onChange={handleChange} />Diabetes o antecedentes familiares</label>
                        <label><input type="checkbox" name="sufreDe" value="tensionArterial" checked={formData.sufreDe.includes('tensionArterial')} onChange={handleChange} />Tensión Arterial o problemas del corazón</label>
                        <label><input type="checkbox" name="sufreDe" value="Saludable" checked={formData.sufreDe.includes('Saludable')} onChange={handleChange} /> Saludable</label>
                        <label>Otros: <input type="text" name="sufreDeOtros" value={formData.sufreDeOtros} onChange={handleChange} /></label>
                    </div>
                    <h4>Cuál es tu propósito al asumir este reto</h4>
                    <label>Dime cuál es tu objetivo y/o meta con el reto seleccionado:</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="objetivo" value="aumentoMasaMuscular" checked={formData.objetivo.includes('aumentoMasaMuscular')} onChange={handleChange} /> Aumento de Masa Muscular</label>
                        <label><input type="checkbox" name="objetivo" value="perdidaPeso" checked={formData.objetivo.includes('perdidaPeso')} onChange={handleChange} /> Pérdida de Peso</label>
                        <label><input type="checkbox" name="objetivo" value="energia" checked={formData.objetivo.includes('energia')} onChange={handleChange} /> Energía y Vitalidad</label>
                        <label><input type="checkbox" name="objetivo" value="digestion" checked={formData.objetivo.includes('digestion')} onChange={handleChange} /> Digestión y Metabolismo</label>
                        <label><input type="checkbox" name="objetivo" value="calidadSueno" checked={formData.objetivo.includes('calidadSueno')} onChange={handleChange} /> Calidad de sueño y descanso</label>
                        <label><input type="checkbox" name="objetivo" value="refuerzo" checked={formData.objetivo.includes('refuerzo')} onChange={handleChange} /> Refuerzo del sistema inmunológico</label>
                        <label><input type="checkbox" name="objetivo" value="piel" checked={formData.objetivo.includes('piel')} onChange={handleChange} /> Piel saludable y radiante</label>
                        <label><input type="checkbox" name="objetivo" value="estres" checked={formData.objetivo.includes('estres')} onChange={handleChange} /> Estrés y Estado de ánimo</label>
                        <label><input type="checkbox" name="objetivo" value="saludCardiovascular" checked={formData.objetivo.includes('saludCardiovascular')} onChange={handleChange} /> Control y mejora de la salud cardiovascular</label>
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
                    <div className="opt-in">
                        <label>
                            <input 
                                type="checkbox" 
                                name="politicas" 
                                checked={formData.politicas} 
                                onChange={handleChange} 
                                required 
                            />
                            <p>Acepta Nuestras </p>
                            <Link to="/Politicas"><p className='nuestras-politicas'>Políticas de Privacidad</p></Link>
                        </label>
                    </div>
                    <button type="submit">Registrarme</button>
                </form>
            </div>
        </section>
    );
}

export default Formulario;