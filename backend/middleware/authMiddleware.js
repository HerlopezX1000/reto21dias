// --- backend/middleware/authMiddleware.js ---
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT y el rol de admin
const verifyAdminToken = (req, res, next) => {
    console.log('\n--- Middleware verifyAdminToken Ejecutándose ---');

    // 1. Buscar el token en el encabezado 'Authorization'
    // Se espera un formato como: "Bearer <token>"
    const authHeader = req.headers.authorization || req.headers.Authorization; // Aceptar 'authorization' o 'Authorization'

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('[Auth Middleware] Error: No se encontró encabezado Authorization tipo Bearer.');
        // Si no hay encabezado o no empieza con "Bearer ", no está autorizado
        return res.status(401).json({ message: 'Acceso no autorizado. Se requiere token.' });
    }

    // 2. Extraer el token (quitar "Bearer ")
    const token = authHeader.split(' ')[1];
    console.log('[Auth Middleware] Token extraído (primeros chars):', token ? token.substring(0, 10) + '...' : 'Token vacío');

    if (!token) {
         console.log('[Auth Middleware] Error: Token vacío después de extraer "Bearer ".');
         return res.status(401).json({ message: 'Acceso no autorizado: Formato de token inválido.' });
    }

    // 3. Verificar el token con la clave secreta
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            // Este es un error del servidor, no debería pasar si .env está bien configurado
            console.error('[Auth Middleware] ¡ERROR CRÍTICO! JWT_SECRET no está definida en el entorno.');
            return res.status(500).json({ message: 'Error de configuración interna del servidor.' });
        }

        // jwt.verify lanza un error si el token es inválido (firma incorrecta, expirado, etc.)
        // Si es válido, devuelve el payload decodificado
        const decodedPayload = jwt.verify(token, secretKey);

        // 4. Token válido, verificar el rol dentro del payload
        console.log('[Auth Middleware] Token verificado. Payload:', decodedPayload);
        if (decodedPayload.role !== 'admin') {
            // El usuario está autenticado (token válido) pero no tiene el rol necesario
            console.log(`[Auth Middleware] Acceso denegado (Forbidden): Rol "${decodedPayload.role}" no es "admin". User ID: ${decodedPayload.id}`);
            return res.status(403).json({ message: 'Acceso prohibido. No tienes permisos de administrador.' });
        }

        // 5. ¡Éxito! El usuario es admin y el token es válido.
        // Opcional: Adjuntar la información del admin al objeto 'req' para usarla en el controlador
        req.admin = decodedPayload; 
        console.log(`[Auth Middleware] Acceso permitido para admin: ${req.admin.username} (ID: ${req.admin.id})`);

        // Llamar a next() para pasar al siguiente middleware o al controlador de la ruta
        next();

    } catch (error) {
        // Capturar errores de jwt.verify (TokenExpiredError, JsonWebTokenError)
        console.log('[Auth Middleware] Error en la verificación del token:', error.name, '-', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Acceso no autorizado: El token ha expirado.' });
        }
        // Cualquier otro error durante la verificación se considera token inválido
        return res.status(401).json({ message: 'Acceso no autorizado: Token inválido o corrupto.' });
    }
};

// Exportar el middleware para poder usarlo en otros archivos
module.exports = {
    verifyAdminToken
};
// --- FIN backend/middleware/authMiddleware.js ---