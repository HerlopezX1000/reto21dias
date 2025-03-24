// backend/config/database.js
const Database = require('better-sqlite3');
const path = require('path');

// Construye la ruta al archivo db.sqlite
const dbPath = path.resolve(__dirname, '..', 'database', 'db.sqlite');

try {
  const db = new Database(dbPath);
  console.log('Conexión a la base de datos SQLite establecida con éxito.');
  module.exports = db;
} catch (error) {
  console.error('Error al conectar a la base de datos SQLite:', error);
  process.exit(1); // Sale del proceso con error
}