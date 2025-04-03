// --- backend/controllers/authController.js (USANDO sqlite3 con callbacks) ---
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Importar la conexión 'db' configurada con la LIBRERÍA 'sqlite3'
const db = require('../config/database'); // Asumiendo que este archivo exporta la conexión 'sqlite3'

const loginAdmin = async (req, res) => { // Mantenemos async por bcrypt.compare, aunque la query sea con callback
    const { username, password } = req.body;
    console.log('\n--- Intento de Login Recibido ---');
    console.log('Username recibido:', username);
    console.log('Password recibido:', password ? '****** (recibido)' : 'FALTA CONTRASEÑA');

    if (!username || !password) {
        console.log('Error Login: Falta username o password.');
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // --- LÓGICA CON sqlite3 (callbacks) ---
    const sql = 'SELECT * FROM administradores WHERE username = ?';
    console.log(`Ejecutando SQL: ${sql} con username: ${username}`);

    // db.get de sqlite3 recibe: SQL, parámetros, callback(error, fila_resultado)
    db.get(sql, [username], async (err, admin) /* 'admin' aquí es la fila encontrada o undefined */ => { 
        // Este código se ejecuta DESPUÉS de que la consulta a la BD termine
        if (err) {
            // Si hubo un error en la consulta SQL misma
            console.error("Error en DB query (db.get):", err.message);
            return res.status(500).json({ message: 'Error interno del servidor al consultar la base de datos' });
        }

        // --- LOGS PARA DEPURAR ---
        // Con sqlite3, si no encuentra fila, 'admin' será undefined, no {}
        console.log('Resultado de la búsqueda en BD (admin):', JSON.stringify(admin)); 
        // --- FIN LOGS ---

        if (!admin) { // Si no se encontró la fila (admin es undefined)
             console.log(`Fallo Login: Usuario admin "${username}" no encontrado en BD.`);
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // --- MÁS LOGS ---
        const hashFromDb = admin.password; // Accedemos a la columna 'password' de la fila encontrada
        console.log('Hash extraído de la BD (admin.password):', hashFromDb ? hashFromDb.substring(0, 15) + '...' : '¡HASH ES NULL/UNDEFINED EN LA FILA!');
        // --- FIN MÁS LOGS ---
        
        // Asegurarse que ambos argumentos existen antes de llamar a compare
        if (!password || !hashFromDb) {
             console.error('Error Crítico Login: Faltan datos para bcrypt.compare. Password:', !!password, 'Hash:', !!hashFromDb);
             // Devolver error 500 porque algo salió mal recuperando los datos
             return res.status(500).json({ message: 'Error interno del servidor: datos incompletos para comparación'}); 
        }

        // A partir de aquí, el resto puede seguir dentro del callback o usar try/catch para bcrypt
        try {
            // 2. Comparar contraseña (bcrypt.compare sigue siendo async -> await)
            console.log('Intentando bcrypt.compare...');
            const isMatch = await bcrypt.compare(password, hashFromDb);
            console.log('Resultado de bcrypt.compare (isMatch):', isMatch);

            if (!isMatch) {
                console.log(`Fallo Login: Contraseña incorrecta para user "${username}".`);
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // 3. Generar JWT 
            console.log(`Login Exitoso para user "${username}". Generando JWT...`);
            const payload = { id: admin.id, username: admin.username, role: admin.role };
            const secretKey = process.env.JWT_SECRET;
             if (!secretKey) {
                 console.error("JWT_SECRET no definida en .env local");
                 return res.status(500).json({ message: 'Error de config del servidor'});
            }
            const options = { expiresIn: '1h' };
            const token = jwt.sign(payload, secretKey, options);

            // 4. Enviar respuesta
            res.json({
                message: "Login exitoso",
                token: token,
                admin: { id: admin.id, username: admin.username, nombre: admin.nombre, role: admin.role }
             });

        } catch (bcryptError) { // Capturar error específico de bcrypt.compare u otros errores sync/async aquí dentro
             console.error("Error durante bcrypt.compare o generación de JWT:", bcryptError);
             res.status(500).json({ message: 'Error interno del servidor durante la autenticación' });
        }
    }); // --- Fin del callback de db.get ---
};

module.exports = { loginAdmin };
// --- FIN backend/controllers/authController.js (USANDO sqlite3) ---