// hashScript.js (CORREGIDO)
const bcrypt = require('bcrypt');

// --- ¡IMPORTANTE! Reemplaza esto con la contraseña que elegiste ---
const plainPassword = 'Reto21DiasColombiaGT'; // Esto ya lo tienes bien
// ----------------------------------------------------------------

const placeholderOriginal = 'LA_CONTRASEÑA_SEGURA_QUE_ELEGISTE'; // Usamos el placeholder original para la comprobación
const saltRounds = 10; // Factor de coste (10-12 es bueno)

// --- CORRECCIÓN EN EL IF ---
// Comparamos con el placeholder original, no con tu contraseña real
if (!plainPassword || plainPassword === placeholderOriginal) {
  console.error(`\nERROR: Edita el archivo hashScript.js y reemplaza '${placeholderOriginal}' con la contraseña real que escogiste.\n`);
  process.exit(1);
}
// --- FIN DE LA CORRECCIÓN ---

console.log(`\nGenerando hash para la contraseña: "${plainPassword}"`); // Muestra la contraseña para confirmar

bcrypt.hash(plainPassword, saltRounds)
  .then(hash => {
    console.log("\n================ HASH GENERADO ================");
    console.log("BCrypt Hash:", hash); 
    console.log("==============================================");
    console.log("\n¡IMPORTANTE! Copia la línea del hash (la que empieza con $2b$...) la necesitarás para el comando INSERT.\n");
  })
  .catch(err => {
    console.error("\nError al generar el hash:", err);
    process.exit(1);
  });