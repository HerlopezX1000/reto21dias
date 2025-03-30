import React from "react";
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { Link } from 'react-router-dom';



const Politicas = () => {
  return (
    <div>
        <Header/>

        <section className="politicas-privacidad">
            <div className="contenedor">
              <h3 style={{textAlign: "center", fontSize: "18px"}}>Nuestras politicas de privacidad y manejo de datos</h3>
              <p style={{textAlign: "justify"}}>En R21GT (en adelante, "nosotros", "nuestro" o "el Sitio"), valoramos y respetamos la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, utilizamos, protegemos y, en ciertos casos, compartimos la información personal que nos proporcionas al visitar nuestro sitio web www.r21gt.com o al interactuar con nuestros servicios. Nuestro objetivo es ofrecerte una experiencia personalizada para mejorar tu estado de salud, ánimo y estabilidad emocional a través de los productos de Herbalife Nutrition, y para ello necesitamos manejar tus datos de manera responsable.

Al utilizar este sitio web, aceptas las prácticas descritas en esta Política de Privacidad. Si no estás de acuerdo con estas políticas, te recomendamos no utilizar nuestros servicios.

1. Información que recopilamos
Recopilamos información personal que nos proporcionas voluntariamente al interactuar con nuestro sitio web. Esto incluye, pero no se limita a:

Datos personales: Nombre completo, dirección de correo electrónico, número de teléfono, edad, sexo y dirección postal (si aplica), proporcionados a través del formulario de registro.
Información de salud: Detalles sobre tu estado de salud, peso, altura, hábitos alimenticios, nivel de actividad física y otros factores relacionados con tu bienestar emocional y físico, recopilados durante la valoración corporal.
Datos técnicos: Dirección IP, tipo de navegador, sistema operativo, y otros datos generados automáticamente al navegar en nuestro sitio.
2. Finalidad de la recopilación de datos
Utilizamos tu información personal para los siguientes propósitos:

Evaluar tu estado de salud y estabilidad emocional mediante una valoración corporal personalizada.
Recomendarte la formulación adecuada de productos Herbalife Nutrition basada en tus necesidades específicas.
Enviarte información sobre planes de control de salud, promociones, actualizaciones de productos o servicios relacionados con R21GT, siempre que hayas dado tu consentimiento.
Mejorar nuestro sitio web y personalizar tu experiencia como usuario.
Cumplir con obligaciones legales o regulatorias, cuando sea necesario.
3. Cómo protegemos tu información
Nos comprometemos a proteger tu información personal mediante medidas de seguridad técnicas y organizativas adecuadas, como:

Encriptación de datos sensibles durante la transmisión y almacenamiento.
Acceso restringido a tu información solo para personal autorizado que necesite procesarla para cumplir con los fines descritos.
Actualización constante de nuestras medidas de seguridad para prevenir accesos no autorizados, pérdida o alteración de datos.
Sin embargo, ningún sistema es completamente infalible, por lo que no podemos garantizar la seguridad absoluta de tu información en casos de ataques cibernéticos u otros eventos fuera de nuestro control.

4. Compartición de tu información
No vendemos ni alquilamos tu información personal a terceros. Solo compartimos tus datos en los siguientes casos:

Con distribuidores autorizados de Herbalife Nutrition que participen en la elaboración de tu plan personalizado, bajo estrictos acuerdos de confidencialidad.
Cuando sea requerido por la ley o para responder a procesos legales (por ejemplo, órdenes judiciales).
Con proveedores de servicios (como empresas de hosting o procesadores de pagos) que nos ayudan a operar el sitio, siempre bajo contratos que garantizan la protección de tus datos.
5. Tus derechos
Dependiendo de tu ubicación, puedes tener derechos sobre tu información personal, incluyendo:

Acceder a los datos que tenemos sobre ti.
Solicitar la corrección de datos inexactos o incompletos.
Pedir la eliminación de tu información personal, salvo que estemos obligados a conservarla por motivos legales.
Retirar tu consentimiento para el uso de tus datos en cualquier momento (esto no afectará la legalidad del procesamiento previo).
Para ejercer estos derechos, contáctanos a través de [insertar correo electrónico o formulario de contacto].

6. Uso de cookies y tecnologías similares
Utilizamos cookies y otras tecnologías de seguimiento para mejorar tu experiencia en el sitio, analizar el tráfico y personalizar contenido. Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. Para más detalles, consulta nuestra [Política de Cookies] (si decides incluir una).

7. Menores de edad
Nuestro sitio está dirigido a personas de todas las edades. Si recopilamos datos de menores de edad, lo hacemos con el consentimiento expreso de sus padres o tutores legales, cuando así lo requiera la ley aplicable.

8. Cambios a esta Política de Privacidad
Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o en la legislación. Te notificaremos sobre modificaciones significativas mediante un aviso en nuestro sitio web o por correo electrónico, si nos has proporcionado tu dirección.

9. Contacto
Si tienes preguntas, inquietudes o deseas ejercer tus derechos relacionados con esta Política de Privacidad, puedes contactarnos en:

Correo electrónico: [insertar correo]
Dirección postal: [insertar dirección, si aplica]
Formulario de contacto: Disponible en www.r21gt.com/contacto</p>
            </div>
        </section>


        <Footer/>
      
    </div>
  )
}

export default Politicas


