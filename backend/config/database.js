// backend/config/database.js
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

// Construye la ruta al archivo db.sqlite
const dbPath = process.env.DB_PATH || path.resolve(__dirname, '..', 'database', 'db.sqlite');

try {
  // Inicializar la base de datos con la opción verbose para depuración
  const db = new Database(dbPath, { verbose: console.log });
  console.log('Conexión a la base de datos SQLite establecida con éxito.');

  // Crear la tabla bloqueos si no existe
  const createBloqueosTable = `
    CREATE TABLE IF NOT EXISTS bloqueos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha TEXT NOT NULL,
      horaInicio TEXT,
      horaFin TEXT
    )
  `;
  db.exec(createBloqueosTable);

  // Crear la tabla registros si no existe
  const createRegistrosTable = `
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      correo TEXT NOT NULL,
      telefono TEXT NOT NULL,
      sexo TEXT NOT NULL,
      ocupacion TEXT NOT NULL,
      pais TEXT NOT NULL,
      indiceMasaMuscular TEXT,
      edad INTEGER NOT NULL,
      pesoActual REAL NOT NULL,
      estatura REAL NOT NULL,
      sufreDe TEXT,
      objetivo TEXT,
      recomendadoPor TEXT,
      idPatrocinador TEXT,
      fechaAsesoria TEXT NOT NULL,
      horaAsesoria TEXT NOT NULL,
      verified INTEGER DEFAULT 0,
      verificationToken TEXT,
      sufreDeOtros TEXT,
      objetivoOtros TEXT
    )
  `;
  db.exec(createRegistrosTable);

  // Insertar una fecha bloqueada de ejemplo si la tabla bloqueos está vacía (opcional, para pruebas)
  const countBloqueos = db.prepare('SELECT COUNT(*) as count FROM bloqueos').get().count;
  if (countBloqueos === 0) {
    const insertBloqueo = db.prepare('INSERT INTO bloqueos (fecha, horaInicio, horaFin) VALUES (?, ?, ?)');
    insertBloqueo.run('2025-04-01', null, null);
    console.log('Fecha bloqueada de ejemplo insertada: 2025-04-01');
  }

  module.exports = db;
} catch (error) {
  console.error('Error al conectar a la base de datos SQLite:', error);
  process.exit(1); // Sale del proceso con error
}