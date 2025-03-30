// src/sections/Inscription.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, parse } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
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

    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [fechasBloqueadas, setFechasBloqueadas] = useState([]);
    const navigate = useNavigate();

    const horariosPermitidosColombia = [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '14:00', '15:00', '16:00',  '17:00', '18:00', '19:00', '20:00'
    ];

    const ajustarHorariosALocal = (horarios, fecha) => {
        try {
            return horarios.map(hora => {
                const fechaColombia = `${fecha}T${hora}:00-05:00`;
                const zonedDate = utcToZonedTime(fechaColombia, Intl.DateTimeFormat().resolvedOptions().timeZone);
                return format(zonedDate, 'HH:mm');
            });
        } catch (error) {
            console.error('Error al ajustar horarios:', error);
            return horarios.map(hora => {
                const [hours, minutes] = hora.split(':').map(Number);
                const date = new Date(`${fecha}T${hora}:00-05:00`);
                const offsetColombia = -5 * 60;
                const offsetLocal = date.getTimezoneOffset();
                const diffMinutes = offsetLocal - offsetColombia;
                date.setMinutes(date.getMinutes() - diffMinutes);
                return format(date, 'HH:mm');
            });
        }
    };

    useEffect(() => {
        const fetchFechasBloqueadas = async () => {
            try {
                const response = await axios.get('/bloqueos'); // Cambiamos /fechas-bloqueadas por /bloqueos
                console.log('Fechas bloqueadas recibidas:', response.data);
                if (Array.isArray(response.data)) {
                    setFechasBloqueadas(response.data);
                } else {
                    console.error('La respuesta de /bloqueos no es un array:', response.data);
                    setFechasBloqueadas([]);
                }
            } catch (error) {
                console.error('Error al obtener fechas bloqueadas:', error);
                setFechasBloqueadas([]);
            }
        };
        fetchFechasBloqueadas();
    }, []);

    useEffect(() => {
        if (formData.fechaAsesoria) {
            const fetchHorariosOcupados = async () => {
                try {
                    const response = await axios.get('/horarios-ocupados', {
                        params: { fecha: formData.fechaAsesoria }
                    });
                    console.log('Horarios ocupados recibidos:', response.data);
                    if (Array.isArray(response.data)) {
                        setHorariosOcupados(response.data);
                    } else {
                        console.error('La respuesta de /horarios-ocupados no es un array:', response.data);
                        setHorariosOcupados([]);
                    }
                } catch (error) {
                    console.error('Error al obtener horarios ocupados:', error);
                    setHorariosOcupados([]);
                }
            };
            fetchHorariosOcupados();
        }
    }, [formData.fechaAsesoria]);

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

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setFormData((prevData) => ({
                ...prevData,
                fechaAsesoria: formattedDate,
                horaAsesoria: '',
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                fechaAsesoria: '',
                horaAsesoria: '',
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.politicas) {
            alert('Debes aceptar las políticas de privacidad para continuar.');
            return;
        }

        try {
            const response = await axios.post('/registros', formData);
            console.log('Datos enviados correctamente:', response.data);
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
            navigate('/verification-pending');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert(error.response?.data?.error || 'Error al enviar los datos. Por favor, intenta de nuevo.');
        }
    };

    const horariosDisponibles = horariosPermitidosColombia.filter(hora => !horariosOcupados.includes(hora));
    const horariosDisponiblesLocal = formData.fechaAsesoria ? ajustarHorariosALocal(horariosDisponibles, formData.fechaAsesoria) : [];

    const isDateDisabled = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return fechasBloqueadas.includes(formattedDate);
    };

    return (
        <section id="formulario" className="formulario-section">
            <h2>Formulario de Registro</h2>
            <div className="contenedor">
                <div className="derecha">
                    <h3>"Haz de cada día tu obra maestra"</h3>
                    <p className="nombre">John Wooden</p>
                    <div className="navbar-social">
                        <a href="https://www.facebook.com/r21globalteam" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/r21globalteam/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.youtube.com/@R21GlobalTeam" target="_blank" rel="noopener noreferrer">
                                 <i class="fa-brands fa-youtube"></i>
                        </a>
                        <a href="http://www.tiktok.com/@r21globalteam" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-tiktok"></i>
                        </a>
                        <a href="https://wa.me/+573118006484" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <img src="../../formulario.jpg" alt="imagen en el formulario" />
                </div>
                <form onSubmit={handleSubmit}>
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
                        <label>Fecha de asesoría:
                            <DatePicker
                                selected={formData.fechaAsesoria ? parse(formData.fechaAsesoria, 'yyyy-MM-dd', new Date()) : null}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                excludeDates={fechasBloqueadas.map(date => parse(date, 'yyyy-MM-dd', new Date()))}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Selecciona una fecha"
                                wrapperClassName='date-picker-wrapper'
                                className='date-picker-input'
                                locale={es}
                                required
                            />
                        </label>
                        <label>Hora de asesoría:
                            <select
                                name="horaAsesoria"
                                value={formData.horaAsesoria}
                                onChange={handleChange}
                                required
                                disabled={!formData.fechaAsesoria}
                            >
                                <option value="">Selecciona un horario</option>
                                {horariosPermitidosColombia.map((hora, index) => {
                                    const horaLocal = formData.fechaAsesoria ? ajustarHorariosALocal([hora], formData.fechaAsesoria)[0] : hora;
                                    const isDisabled = horariosOcupados.includes(hora);
                                    return (
                                        <option
                                            key={hora}
                                            value={hora}
                                            disabled={isDisabled}
                                        >
                                            {horaLocal} (Hora local) {isDisabled ? '(Ocupado)' : ''}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
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
                    <button type="submit" disabled={!formData.politicas}>
                        Registrarme
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Formulario;