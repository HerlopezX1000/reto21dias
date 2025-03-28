// src/sections/Admin.jsx (futuro)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [registros, setRegistros] = useState([]);
    const [bloqueos, setBloqueos] = useState([]);
    const [nuevoBloqueo, setNuevoBloqueo] = useState({ fecha: '', horaInicio: '', horaFin: '' });

    useEffect(() => {
        const fetchData = async () => {
            const registrosRes = await axios.get('/registros');
            const bloqueosRes = await axios.get('/bloqueos');
            setRegistros(registrosRes.data);
            setBloqueos(bloqueosRes.data);
        };
        fetchData();
    }, []);

    const handleBloqueoSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/bloqueos', nuevoBloqueo);
        setNuevoBloqueo({ fecha: '', horaInicio: '', horaFin: '' });
        const bloqueosRes = await axios.get('/bloqueos');
        setBloqueos(bloqueosRes.data);
    };

    return (
        <div>
            <h2>Zona de Administración</h2>
            <h3>Horarios Agendados</h3>
            <ul>
                {registros.map(r => (
                    <li key={r.id}>{r.nombres} {r.apellidos} - {r.fechaAsesoria} {r.horaAsesoria}</li>
                ))}
            </ul>
            <h3>Bloquear Horarios</h3>
            <form onSubmit={handleBloqueoSubmit}>
                <label>Fecha: <input type="date" value={nuevoBloqueo.fecha} onChange={e => setNuevoBloqueo({...nuevoBloqueo, fecha: e.target.value})} /></label>
                <label>Hora Inicio (opcional): <input type="time" value={nuevoBloqueo.horaInicio} onChange={e => setNuevoBloqueo({...nuevoBloqueo, horaInicio: e.target.value})} /></label>
                <label>Hora Fin (opcional): <input type="time" value={nuevoBloqueo.horaFin} onChange={e => setNuevoBloqueo({...nuevoBloqueo, horaFin: e.target.value})} /></label>
                <button type="submit">Bloquear</button>
            </form>
            <h3>Bloqueos Activos</h3>
            <ul>
                {bloqueos.map(b => (
                    <li key={b.id}>{b.fecha} {b.horaInicio ? `${b.horaInicio} - ${b.horaFin}` : 'Día completo'}</li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;