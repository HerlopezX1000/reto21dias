const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    correo: String,
    telefono: String,
    sexo: String,
    ocupacion: String,
    pais: String,
    indiceMasaMuscular: String,
    edad: Number,
    pesoActual: Number,
    estatura: Number,
    sufreDe: [String], // Array de strings para las selecciones múltiples
    sufreDeOtros: String, // Campo para "Otros: ¿Cuál?" en "Sufres o has sufrido de lo siguiente"
    objetivo: [String], // Array de strings para las selecciones múltiples
    objetivoOtros: String, // Campo para "Otros: ¿Cuál?" en "Dime cuál es tu objetivo"
    recomendadoPor: String,
    idPatrocinador: String,
    fechaAsesoria: Date, // Cambiado a Date para manejar fechas correctamente
    horaAsesoria: String, // Podrías usar Date también si necesitas más precisión
});

module.exports = mongoose.model('Formulario', formularioSchema);