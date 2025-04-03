// Importar la librería sqlite3 y activar el modo 'verbose' para logs
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Necesario para construir la ruta al archivo DB

// --- Asegúrate de definir dbPath correctamente ---
// Necesitas definir la ruta a tu archivo .sqlite.
// Asumiendo que este archivo (database.js) está en 'backend/config/'
// y el archivo de base de datos está en 'backend/database/db.sqlite'
const dbPath = path.resolve(__dirname, '../database/db.sqlite');
// -----------------------------------------------

let db; // Declarar db aquí para que esté disponible para exportar

try {
    // Conectar a la base de datos (o crearla si no existe)
    // La conexión es asíncrona, usamos un callback
    db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            // Si hay un error al conectar, registrarlo y salir
            console.error('Error al conectar a la base de datos SQLite:', err.message);
            process.exit(1); // Sale del proceso con error
        } else {
            console.log('Conexión a la base de datos SQLite establecida con éxito.');
            // Una vez conectados, ejecutar la configuración inicial (crear tablas, etc.)
            runInitialSetup();
        }
    });

} catch (error) {
    // Capturar errores síncronos si la creación del objeto Database falla (raro)
    console.error('Error inesperado al intentar inicializar la base de datos:', error);
    process.exit(1);
}

// Función para ejecutar la configuración inicial de forma serializada (en orden)
function runInitialSetup() {
    db.serialize(() => {
        console.log('Ejecutando configuración inicial de la base de datos...');

        // 1. Crear la tabla bloqueos si no existe
        const createBloqueosTable = `
            CREATE TABLE IF NOT EXISTS bloqueos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fecha TEXT NOT NULL,
                horaInicio TEXT,
                horaFin TEXT
            )
        `;
        // db.run ejecuta SQL sin devolver filas, usa callback para errores
        db.run(createBloqueosTable, (err) => {
            if (err) {
                return console.error('Error al crear tabla bloqueos:', err.message);
            }
            console.log('Tabla bloqueos asegurada/creada.');

            // 2. Crear la tabla registros si no existe (solo si bloqueos se creó bien)
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
            db.run(createRegistrosTable, (err) => {
                if (err) {
                    return console.error('Error al crear tabla registros:', err.message);
                }
                console.log('Tabla registros asegurada/creada.');

                // 3. Verificar si hay bloqueos e insertar ejemplo si está vacía (solo si registros se creó bien)
                const sqlCount = 'SELECT COUNT(*) as count FROM bloqueos';
                // db.get obtiene una sola fila, usa callback (err, row)
                db.get(sqlCount, [], (err, row) => {
                    if (err) {
                        return console.error('Error al contar bloqueos:', err.message);
                    }

                    // Si el conteo es 0, insertar la fila de ejemplo
                    if (row && row.count === 0) {
                        console.log('Tabla bloqueos vacía, insertando ejemplo.');
                        const insertBloqueo = 'INSERT INTO bloqueos (fecha, horaInicio, horaFin) VALUES (?, ?, ?)';
                        // Los parámetros se pasan como un array
                        db.run(insertBloqueo, ['2025-04-01', null, null], function(err) { // function() regular para poder usar this.lastID si se necesita
                            if (err) {
                                return console.error('Error al insertar bloqueo de ejemplo:', err.message);
                            }
                            console.log(`Fecha bloqueada de ejemplo insertada. ID: ${this.lastID}`);
                        });
                    } else {
                        console.log('Tabla bloqueos ya tiene datos o no se pudo leer el count.');
                    }
                });
            });
        });
        console.log('Configuración inicial de base de datos solicitada (operaciones en cola).');
    });
}

// Exportar el objeto db para que otros módulos puedan usarlo
// Nota: Las operaciones en otros módulos sobre 'db' serán asíncronas
module.exports = db;