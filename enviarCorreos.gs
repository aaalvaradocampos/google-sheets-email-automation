/**
 * Google Apps Script: Automated Customized Email Sender
 * Author: ESIT / Automation Script
 * Description: Sends personalized HTML emails to list of recipients in Google Sheets,
 * skipping previously contacted users and adding tutors in BCC.
 */

function enviarCorreosServicioSocial() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // === CONFIGURACIÓN GENERAL ===
  var HOJAS_OBJETIVO = ["Pestaña1", "Pestaña2", "Pestaña3"]; // Nombres de las pestañas
  var FILA_INICIO = 6; // Fila donde inician los datos del estudiante
  
  var COLUMNA_CORREO = 3;  // Columna C (3)
  var COLUMNA_HORAS = 68;  // Columna BP (68)
  
  // Correos de los tutores en Copia Oculta (BCC)
  var tutoresBcc = "tutor1@ejemplo.com, tutor2@ejemplo.com, tutor3@ejemplo.com";
  
  // Modo de prueba: true para enviar a correo de prueba, false para envío real
  var MODO_PRUEBA = false; 
  var correoPrueba = "admin@ejemplo.com";
  
  // Lista de correos omitidos/ya procesados
  var correosExcluidos = [
    "estudiante_ya_notificado1@ejemplo.com",
    "estudiante_ya_notificado2@ejemplo.com"
  ];
  
  var asunto = "Aviso Importante: Período Extemporáneo de Servicio Social";
  
  // Plantilla del correo en formato HTML
  var plantillaHTML = "Estimado estudiante:<br><br>" +
    "Reciba un cordial saludo.<br><br>" +
    "En el marco del cumplimiento del Servicio Social, le recordamos la necesidad de completar las horas requeridas.<br><br>" +
    "Como resultado de la verificación de los registros, hemos identificado que a la fecha cuentas con <strong>{{HORAS}} horas registradas</strong>.<br><br>" +
    "Se ha establecido un período extemporáneo para completar la documentación respectiva.<br><br>" +
    "Requisitos de entrega:<ul>" +
    "<li>Informe final de Servicio Social.</li>" +
    "<li>Carta de satisfacción emitida por la entidad receptora.</li>" +
    "<li>Video final.</li></ul>" +
    "Agradecemos tu compromiso para culminar este proceso.<br><br>" +
    "Cordialmente,<br>" +
    "<strong>Coordinación de Servicio Social</strong>";

  var correosEnviados = 0;

  // Recorrer las pestañas configuradas
  for (var h = 0; h < HOJAS_OBJETIVO.length; h++) {
    var nombreHoja = HOJAS_OBJETIVO[h];
    var hoja = spreadsheet.getSheetByName(nombreHoja);
    
    if (hoja) {
      var ultimaFila = hoja.getLastRow();
      
      for (var i = FILA_INICIO; i <= ultimaFila; i++) {
        var correoEstudiante = hoja.getRange(i, COLUMNA_CORREO).getValue().toString().trim();
        var horasRegistradas = hoja.getRange(i, COLUMNA_HORAS).getValue();
        
        // Validación de formato básico de correo
        if (correoEstudiante && correoEstudiante.indexOf("@") !== -1) {
          
          // Verificar lista de exclusión
          if (correosExcluidos.indexOf(correoEstudiante) === -1) {
            
            var mensajeFinal = plantillaHTML.replace("{{HORAS}}", horasRegistradas);
            
            if (MODO_PRUEBA) {
              GmailApp.sendEmail(correoPrueba, "[PRUEBA] " + asunto, "", { htmlBody: mensajeFinal });
              Logger.log("Modo Prueba: Correo simulado para " + correoEstudiante);
              return;
            } else {
              GmailApp.sendEmail(correoEstudiante, asunto, "", {
                htmlBody: mensajeFinal,
                bcc: tutoresBcc
              });
              correosEnviados++;
            }
          } else {
             Logger.log("Correo omitido intencionalmente: " + correoEstudiante);
          }
        }
      }
    }
  }
  
  Logger.log("Proceso completado. Correos enviados: " + correosEnviados);
}