/**
 * ====================================================================
 * A DOMICILIO - BACKEND GOOGLE APPS SCRIPT
 * Sistema de Gestión Gastronómica, Comandas y Menú en Línea
 * 
 * Programador / Propietario: ANDY Paz
 * Cuenta Oficial: elchichote@gmail.com
 * Fecha: 17 de Octubre de 2026
 * ====================================================================
 */

// Nombres de Pestañas en Google Sheets
const HOJA_MENU = "Menu_Platillos";
const HOJA_PEDIDOS = "Pedidos_Comanda";
const HOJA_CLIENTES = "Clientes_Comensales";
const HOJA_CHAT = "Mensajes_Chat";
const HOJA_CONFIG = "Configuracion";

// Carpeta en Google Drive para Fotos de Platos
const CARPETA_DRIVE_FOTOS = "Fotos_Platos_ADomicilio";

// ID Oficial del Libro ERP en Google Sheets
const SPREADSHEET_ID = "1nHy2HPQEqdum2g1pXAyz6eJECVX4zgIPAt8J5JZqsRA";

/**
 * Obtiene la referencia a la hoja de cálculo (activo o por ID de Google Drive)
 */
function obtenerSpreadsheet() {
  try {
    const act = SpreadsheetApp.getActiveSpreadsheet();
    if (act) return act;
  } catch (e) {}
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

/**
 * Endpoint Principal GET: Lectura de datos
 */
function doGet(e) {
  try {
    const accion = e && e.parameter && e.parameter.accion ? e.parameter.accion : 'obtenerMenu';
    const ss = obtenerSpreadsheet();

    // 1. Obtener Menú Completo de Platos
    if (accion === 'obtenerMenu') {
      const hoja = asegurarHoja(ss, HOJA_MENU, [
        "ID_Plato", "Nombre", "Categoria", "Descripcion", "Precio_USD", "Disponibilidad", "URL_Foto", "Extras_JSON", "Fecha_Actualizacion"
      ]);
      const data = hoja.getDataRange().getValues();
      const platos = [];

      for (let i = 1; i < data.length; i++) {
        const fila = data[i];
        if (!fila[0]) continue; // Fila vacía
        
        let extras = [];
        try {
          if (fila[7]) extras = JSON.parse(fila[7]);
        } catch (err) {
          extras = [];
        }

        platos.push({
          id: String(fila[0]),
          nombre: String(fila[1]),
          categoria: String(fila[2]),
          descripcion: String(fila[3]),
          precio: parseFloat(fila[4]) || 0,
          disponible: String(fila[5]).toLowerCase() === 'true' || String(fila[5]).toLowerCase() === 'disponible',
          foto: String(fila[6]),
          extras: extras,
          fecha: fila[8] ? String(fila[8]) : ''
        });
      }

      return responderJSON({ exito: true, platos: platos, total: platos.length });
    }

    // 2. Obtener Parámetros de Configuración
    if (accion === 'obtenerConfig') {
      const hoja = asegurarHoja(ss, HOJA_CONFIG, ["Clave", "Valor", "Descripcion", "Fecha_Modificacion"]);
      const data = hoja.getDataRange().getValues();
      const config = {};

      for (let i = 1; i < data.length; i++) {
        if (data[i][0]) {
          config[String(data[i][0])] = String(data[i][1]);
        }
      }

      return responderJSON({ exito: true, config: config });
    }

    // 3. Sincronizar Bandeja Global de Chat para Admin (todos los comensales)
    if (accion === 'sincronizarChatGlobal') {
      const desdeTimestamp = parseInt(e && e.parameter && e.parameter.desdeTimestamp, 10) || 0;
      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const data = hoja.getDataRange().getValues();
      const mensajes = [];

      for (let i = 1; i < data.length; i++) {
        const fila = data[i];
        if (!fila[0]) continue;

        // Omitir mensajes marcados como eliminados (Soft Delete)
        const esEliminado = String(fila[7] || '').toLowerCase() === 'si' || String(fila[7] || '').toLowerCase() === 'eliminado';
        if (esEliminado) continue;

        let ts = 0;
        try {
          ts = new Date(fila[1]).getTime() || 0;
        } catch (err) {
          ts = 0;
        }

        if (ts >= desdeTimestamp || desdeTimestamp === 0) {
          mensajes.push({
            id: String(fila[0]),
            fecha: String(fila[1]),
            timestamp: ts,
            clienteId: String(fila[2]),
            clienteNombre: String(fila[3]),
            emisor: String(fila[4]),
            mensaje: String(fila[5]),
            leido: String(fila[6]).toLowerCase() === 'si'
          });
        }
      }

      return responderJSON({ exito: true, mensajes: mensajes, servidorHora: Date.now() });
    }

    // 4. Obtener Historial de Chat de un Cliente Específico (Comensal Móvil)
    if (accion === 'obtenerHistorialChat') {
      const clienteId = String((e && e.parameter && e.parameter.clienteId) || '').trim().toLowerCase();
      const desdeTimestamp = parseInt(e && e.parameter && e.parameter.desdeTimestamp, 10) || 0;
      if (!clienteId) return responderJSON({ exito: false, mensaje: 'Falta clienteId' });

      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const data = hoja.getDataRange().getValues();
      const mensajes = [];

      for (let i = 1; i < data.length; i++) {
        const fila = data[i];
        const msgClienteId = String(fila[2] || '').trim().toLowerCase();
        if (msgClienteId === clienteId || msgClienteId === 'cli_general') {
          // Omitir si fue eliminado
          const esEliminado = String(fila[7] || '').toLowerCase() === 'si' || String(fila[7] || '').toLowerCase() === 'eliminado';
          if (esEliminado) continue;

          let ts = 0;
          try {
            ts = new Date(fila[1]).getTime() || 0;
          } catch (err) {
            ts = 0;
          }

          if (ts >= desdeTimestamp || desdeTimestamp === 0) {
            mensajes.push({
              id: String(fila[0]),
              fecha: String(fila[1]),
              timestamp: ts,
              clienteId: String(fila[2]),
              clienteNombre: String(fila[3]),
              emisor: String(fila[4]),
              mensaje: String(fila[5]),
              leido: String(fila[6]).toLowerCase() === 'si'
            });
          }
        }
      }

      return responderJSON({ exito: true, mensajes: mensajes, servidorHora: Date.now() });
    }

    // 5. Obtener Comensales Online en Vivo (Memoria Ultrarrápida CacheService)
    if (accion === 'obtenerPresenciaActiva') {
      const cache = CacheService.getScriptCache();
      let tabla = {};
      try {
        const raw = cache.get("adomicilio_tabla_presencia_global");
        if (raw) tabla = JSON.parse(raw);
      } catch (err) {
        tabla = {};
      }

      const ahora = Date.now();
      const comensalesOnline = [];

      for (const id in tabla) {
        if (ahora - tabla[id].ts <= 35000) {
          comensalesOnline.push({ clienteId: id, ...tabla[id] });
        }
      }

      return responderJSON({ exito: true, totalOnline: comensalesOnline.length, comensales: comensalesOnline });
    }

    // 4. Obtener Comandas / Pedidos Registrados (Ordenados de más reciente a más antigua)
    if (accion === 'obtenerComandas') {
      const hoja = asegurarHoja(ss, HOJA_PEDIDOS, [
        "ID_Comanda", "Fecha_Hora", "Cliente_Nombre", "Cliente_Telefono", "Direccion_Entrega", "Detalle_Platos", "Extras_Seleccionados", "Notas_Cocina", "Total_USD", "Estado_Pedido"
      ]);
      const data = hoja.getDataRange().getValues();
      const comandas = [];
      const limite = (e && e.parameter && parseInt(e.parameter.limite, 10)) > 0 ? parseInt(e.parameter.limite, 10) : 100;

      // Recorrer desde la última fila hacia la primera (más reciente a más antigua)
      for (let i = data.length - 1; i >= 1; i--) {
        const fila = data[i];
        if (!fila[0]) continue; // Fila vacía

        comandas.push({
          idComanda: String(fila[0]),
          fechaHora: String(fila[1]),
          clienteNombre: String(fila[2]),
          clienteTelefono: String(fila[3]),
          direccionEntrega: String(fila[4]),
          detallePlatos: String(fila[5]),
          extrasSeleccionados: String(fila[6]),
          notasCocina: String(fila[7]),
          totalUSD: parseFloat(fila[8]) || 0,
          estadoPedido: String(fila[9] || 'Pendiente')
        });

        if (comandas.length >= limite) break;
      }

      return responderJSON({ exito: true, comandas: comandas, total: comandas.length });
    }

    // 5. Inicializar y Sembrar Estructura Automáticamente
    if (accion === 'inicializarHojas') {
      inicializarEstructuraCompleta(ss);
      const carpetas = crearCarpetasDrive();
      return responderJSON({ exito: true, mensaje: 'Hojas, datos base y carpetas de Google Drive inicializadas con éxito.', carpetas: carpetas });
    }

    // 6. Crear / Verificar Carpetas de Google Drive
    if (accion === 'crearCarpetasDrive') {
      const carpetas = crearCarpetasDrive();
      return responderJSON({ exito: true, carpetas: carpetas });
    }

    return responderJSON({ exito: false, mensaje: 'Acción GET desconocida: ' + accion });
  } catch (error) {
    return responderJSON({ exito: false, error: error.message });
  }
}

/**
 * Endpoint Principal POST: Escritura, Actualizaciones y Fotos
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // Bloqueo atómico de 15 segundos
    
    let datos = {};
    if (e.postData && e.postData.contents) {
      try {
        datos = JSON.parse(e.postData.contents);
      } catch (err) {
        datos = e.parameter || {};
      }
    } else {
      datos = e.parameter || {};
    }

    const accion = datos.accion || (e.parameter ? e.parameter.accion : '');
    const ss = obtenerSpreadsheet();

    // 1. Guardar o Editar Plato del Menú
    if (accion === 'guardarPlato') {
      const hoja = asegurarHoja(ss, HOJA_MENU, [
        "ID_Plato", "Nombre", "Categoria", "Descripcion", "Precio_USD", "Disponibilidad", "URL_Foto", "Extras_JSON", "Fecha_Actualizacion"
      ]);
      const data = hoja.getDataRange().getValues();
      const idPlato = datos.id || ('PL-' + new Date().getTime().toString().slice(-5));
      const extrasJson = typeof datos.extras === 'object' ? JSON.stringify(datos.extras) : (datos.extras || '[]');
      const fechaNow = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");

      let filaExistente = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(idPlato)) {
          filaExistente = i + 1;
          break;
        }
      }

      if (filaExistente > 0) {
        // Actualizar fila existente
        hoja.getRange(filaExistente, 1, 1, 9).setValues([[
          idPlato,
          datos.nombre,
          datos.categoria,
          datos.descripcion,
          parseFloat(datos.precio) || 0,
          datos.disponible !== undefined ? (datos.disponible ? 'Disponible' : 'Agotado') : 'Disponible',
          datos.foto || '',
          extrasJson,
          fechaNow
        ]]);
      } else {
        // Nueva fila
        hoja.appendRow([
          idPlato,
          datos.nombre,
          datos.categoria,
          datos.descripcion,
          parseFloat(datos.precio) || 0,
          datos.disponible !== undefined ? (datos.disponible ? 'Disponible' : 'Agotado') : 'Disponible',
          datos.foto || '',
          extrasJson,
          fechaNow
        ]);
      }

      return responderJSON({ exito: true, id: idPlato, mensaje: 'Plato guardado con éxito' });
    }

    // 2. Actualizar Rápido Precio o Disponibilidad
    if (accion === 'actualizarPrecioStock') {
      const hoja = asegurarHoja(ss, HOJA_MENU, [
        "ID_Plato", "Nombre", "Categoria", "Descripcion", "Precio_USD", "Disponibilidad", "URL_Foto", "Extras_JSON", "Fecha_Actualizacion"
      ]);
      const data = hoja.getDataRange().getValues();
      const idPlato = String(datos.id);

      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === idPlato) {
          if (datos.precio !== undefined) hoja.getRange(i + 1, 5).setValue(parseFloat(datos.precio) || 0);
          if (datos.disponible !== undefined) hoja.getRange(i + 1, 6).setValue(datos.disponible ? 'Disponible' : 'Agotado');
          hoja.getRange(i + 1, 9).setValue(Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss"));
          return responderJSON({ exito: true, mensaje: 'Estado actualizado al instante' });
        }
      }

      return responderJSON({ exito: false, mensaje: 'Plato no encontrado con ID: ' + idPlato });
    }

    // 3. Eliminar Plato
    if (accion === 'eliminarPlato') {
      const hoja = asegurarHoja(ss, HOJA_MENU, [
        "ID_Plato", "Nombre", "Categoria", "Descripcion", "Precio_USD", "Disponibilidad", "URL_Foto", "Extras_JSON", "Fecha_Actualizacion"
      ]);
      const data = hoja.getDataRange().getValues();
      const idPlato = String(datos.id);

      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === idPlato) {
          hoja.deleteRow(i + 1);
          return responderJSON({ exito: true, mensaje: 'Plato eliminado del menú' });
        }
      }

      return responderJSON({ exito: false, mensaje: 'Plato no encontrado' });
    }

    // 4. Registrar Comanda de Cocina
    if (accion === 'registrarComanda') {
      const hoja = asegurarHoja(ss, HOJA_PEDIDOS, [
        "ID_Comanda", "Fecha_Hora", "Cliente_Nombre", "Cliente_Telefono", "Direccion_Entrega", "Detalle_Platos", "Extras_Seleccionados", "Notas_Cocina", "Total_USD", "Estado_Pedido"
      ]);
      const idComanda = datos.idComanda || datos.id || ('CMD-' + Utilities.formatDate(new Date(), "America/Caracas", "yyyyMMdd-HHmmss"));
      const fechaNow = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");

      // Soporte flexible para parámetros en formato simple y camelCase del frontend
      const nombreCliente = datos.clienteNombre || datos.nombre || 'Cliente General';
      const telefonoCliente = datos.clienteTelefono || datos.telefono || '';
      const direccionEntrega = datos.direccionEntrega || datos.direccion || '';

      const rawPlatos = datos.detallePlatos !== undefined ? datos.detallePlatos : datos.platos;
      const detallePlatos = typeof rawPlatos === 'object' ? JSON.stringify(rawPlatos) : (rawPlatos || '');

      const rawExtras = datos.extrasSeleccionados !== undefined ? datos.extrasSeleccionados : datos.extras;
      const extrasSeleccionados = typeof rawExtras === 'object' ? JSON.stringify(rawExtras) : (rawExtras || '');

      const notasCocina = datos.notasCocina !== undefined ? datos.notasCocina : (datos.notas || '');
      const rawTotal = datos.totalUSD !== undefined ? datos.totalUSD : datos.total;
      const totalUSD = parseFloat(rawTotal) || 0;
      const estadoPedido = datos.estadoPedido || datos.estado || 'Pendiente';

      hoja.appendRow([
        idComanda,
        fechaNow,
        nombreCliente,
        telefonoCliente,
        direccionEntrega,
        detallePlatos,
        extrasSeleccionados,
        notasCocina,
        totalUSD,
        estadoPedido
      ]);

      return responderJSON({ exito: true, idComanda: idComanda, mensaje: 'Comanda registrada en ERP' });
    }

    // 5. Enviar Mensaje de Chat Web
    if (accion === 'enviarMensajeChat') {
      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const idMsg = 'MSG-' + new Date().getTime();
      const fechaNow = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");

      hoja.appendRow([
        idMsg,
        fechaNow,
        datos.clienteId || 'anonimo',
        datos.nombre || 'Comensal',
        datos.emisor || 'cliente',
        datos.mensaje || '',
        'No',
        'No'
      ]);

      return responderJSON({ exito: true, idMensaje: idMsg });
    }

    // 5.1. Responder Mensaje desde el Panel Admin
    if (accion === 'responderMensajeAdmin') {
      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const idMsg = 'MSG-ADM-' + new Date().getTime();
      const fechaNow = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");

      hoja.appendRow([
        idMsg,
        fechaNow,
        datos.clienteId || 'cli_general',
        'Chef / Cocina A Domicilio',
        'admin',
        datos.mensaje || '',
        'Si',
        'No'
      ]);

      return responderJSON({ exito: true, idMensaje: idMsg, fecha: fechaNow });
    }

    // 5.2. Marcar Mensajes de un Comensal como Leídos
    if (accion === 'marcarMensajesLeidos') {
      const cId = String(datos.clienteId || '').trim();
      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const data = hoja.getDataRange().getValues();
      let actualizados = 0;

      for (let i = 1; i < data.length; i++) {
        if ((!cId || String(data[i][2]).toLowerCase() === cId.toLowerCase()) && String(data[i][6]).toLowerCase() !== 'si') {
          hoja.getRange(i + 1, 7).setValue('Si');
          actualizados++;
        }
      }
      return responderJSON({ exito: true, actualizados: actualizados });
    }

    // 5.3. Registrar Latido de Presencia de Comensal en Vivo (Memoria CacheService ultra rápida)
    if (accion === 'registrarLatidoPresencia') {
      const cId = String(datos.clienteId || '').trim();
      if (!cId) return responderJSON({ exito: false, mensaje: 'Falta clienteId' });

      const cache = CacheService.getScriptCache();
      let tabla = {};
      try {
        const raw = cache.get("adomicilio_tabla_presencia_global");
        if (raw) tabla = JSON.parse(raw);
      } catch (err) {
        tabla = {};
      }

      tabla[cId] = {
        nombre: datos.nombre || 'Comensal',
        dispositivo: datos.dispositivo || 'web',
        ts: Date.now()
      };

      // Purgar inactivos > 45s
      const ahora = Date.now();
      for (const k in tabla) {
        if (ahora - tabla[k].ts > 45000) delete tabla[k];
      }

      cache.put("adomicilio_tabla_presencia_global", JSON.stringify(tabla), 60);
      return responderJSON({ exito: true, registrado: cId, total: Object.keys(tabla).length });
    }

    // 5.4. Eliminar Conversación de un Comensal Específico (Soft Delete de Alto Rendimiento)
    if (accion === 'eliminarConversacionComensal') {
      const cId = String(datos.clienteId || '').trim();
      if (!cId) {
        return responderJSON({ exito: false, mensaje: 'Falta parámetro clienteId' });
      }

      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const data = hoja.getDataRange().getValues();
      const idsEliminados = [];
      const numFilas = data.length - 1;

      if (numFilas <= 0) {
        return responderJSON({ exito: true, clienteId: cId, filasAfectadas: 0, idsEliminados: [] });
      }

      const columnaEliminado = [];
      let cambios = false;

      for (let i = 1; i < data.length; i++) {
        const fila = data[i];
        const msgClienteId = String(fila[2] || '').trim();
        const valorActual = String(fila[7] || 'No');

        if (msgClienteId.toLowerCase() === cId.toLowerCase() && valorActual.toLowerCase() !== 'si') {
          columnaEliminado.push(['Si']);
          idsEliminados.push(String(fila[0]));
          cambios = true;
        } else {
          columnaEliminado.push([valorActual]);
        }
      }

      if (cambios) {
        hoja.getRange(2, 8, columnaEliminado.length, 1).setValues(columnaEliminado);
      }

      return responderJSON({
        exito: true,
        clienteId: cId,
        filasAfectadas: idsEliminados.length,
        idsEliminados: idsEliminados,
        mensaje: 'Conversación marcada como eliminada correctamente'
      });
    }

    // 5.5. Vaciar Todo el Chat Global (Para Admin)
    if (accion === 'vaciarTodoChatGlobal') {
      const hoja = asegurarHoja(ss, HOJA_CHAT, [
        "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido", "Eliminado"
      ]);
      const lastRow = hoja.getLastRow();
      if (lastRow > 1) {
        const columnaEliminado = [];
        for (let i = 2; i <= lastRow; i++) {
          columnaEliminado.push(['Si']);
        }
        hoja.getRange(2, 8, columnaEliminado.length, 1).setValues(columnaEliminado);
      }
      return responderJSON({ exito: true, mensaje: 'Bandeja global de chat vaciada con éxito' });
    }

    // 6. Subir Foto a Google Drive
    if (accion === 'subirFotoDrive') {
      const base64Data = datos.imagenBase64;
      const nombreArchivo = (datos.nombreArchivo || 'plato_' + new Date().getTime()) + '.jpg';
      
      if (!base64Data) {
        return responderJSON({ exito: false, mensaje: 'Falta imagenBase64' });
      }

      // Buscar o crear carpeta en Google Drive
      let carpetas = DriveApp.getFoldersByName(CARPETA_DRIVE_FOTOS);
      let carpeta = carpetas.hasNext() ? carpetas.next() : DriveApp.createFolder(CARPETA_DRIVE_FOTOS);

      // Decodificar Base64
      const contentType = "image/jpeg";
      const cleanBase64 = base64Data.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
      const bytes = Utilities.base64Decode(cleanBase64);
      const blob = Utilities.newBlob(bytes, contentType, nombreArchivo);

      const archivo = carpeta.createFile(blob);
      archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const fileId = archivo.getId();
      const directUrl = "https://lh3.googleusercontent.com/d/" + fileId;

      return responderJSON({ exito: true, url: directUrl, fileId: fileId });
    }

    // 7. Guardar Configuración de WhatsApps
    if (accion === 'guardarConfig') {
      const hoja = asegurarHoja(ss, HOJA_CONFIG, ["Clave", "Valor", "Descripcion", "Fecha_Modificacion"]);
      const fechaNow = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");
      const data = hoja.getDataRange().getValues();

      for (const clave in datos.config) {
        let encontrada = false;
        for (let i = 1; i < data.length; i++) {
          if (String(data[i][0]) === clave) {
            hoja.getRange(i + 1, 2).setValue(String(datos.config[clave]));
            hoja.getRange(i + 1, 4).setValue(fechaNow);
            encontrada = true;
            break;
          }
        }
        if (!encontrada) {
          hoja.appendRow([clave, String(datos.config[clave]), 'Parámetro de tienda', fechaNow]);
        }
      }

      return responderJSON({ exito: true, mensaje: 'Configuración guardada' });
    }

    // 8. Actualizar Estado de Comanda en Cocina / Despacho
    if (accion === 'actualizarEstadoComanda') {
      const hoja = asegurarHoja(ss, HOJA_PEDIDOS, [
        "ID_Comanda", "Fecha_Hora", "Cliente_Nombre", "Cliente_Telefono", "Direccion_Entrega", "Detalle_Platos", "Extras_Seleccionados", "Notas_Cocina", "Total_USD", "Estado_Pedido"
      ]);
      const data = hoja.getDataRange().getValues();
      const idComanda = String(datos.idComanda || datos.id || '').trim();
      const nuevoEstado = String(datos.nuevoEstado || datos.estado || 'Pendiente').trim();

      if (!idComanda) {
        return responderJSON({ exito: false, mensaje: 'Falta parámetro idComanda' });
      }

      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]).trim() === idComanda) {
          // Columna 10 es Estado_Pedido (1-based index)
          hoja.getRange(i + 1, 10).setValue(nuevoEstado);
          return responderJSON({
            exito: true,
            idComanda: idComanda,
            nuevoEstado: nuevoEstado,
            mensaje: 'Estado actualizado en Google Sheets'
          });
        }
      }

      return responderJSON({ exito: false, mensaje: 'Comanda no encontrada: ' + idComanda });
    }

    return responderJSON({ exito: false, mensaje: 'Acción POST no reconocida: ' + accion });
  } catch (error) {
    return responderJSON({ exito: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Funciones de Utilidad y Helper
 */
function responderJSON(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

function asegurarHoja(ss, nombre, encabezados) {
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) {
    hoja = ss.insertSheet(nombre);
    hoja.appendRow(encabezados);
    hoja.getRange(1, 1, 1, encabezados.length)
        .setFontWeight("bold")
        .setBackground("#F3F4F6")
        .setFontColor("#111827");
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function inicializarEstructuraCompleta(ss) {
  // 1. Hoja Menú
  const hMenu = asegurarHoja(ss, HOJA_MENU, [
    "ID_Plato", "Nombre", "Categoria", "Descripcion", "Precio_USD", "Disponibilidad", "URL_Foto", "Extras_JSON", "Fecha_Actualizacion"
  ]);

  // Si está vacía solo con encabezados, sembrar platos iniciales
  if (hMenu.getLastRow() <= 1) {
    const fecha = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");
    const platosBase = [
      ["D01", "Trío de Empanadas Crujientes", "Desayunos", "3 empanadas doradas con cazón, carne mechada y queso", 4.50, "Disponible", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", JSON.stringify([{ nombre: "Guasacaca extra", precio: 0.5 }]), fecha],
      ["D02", "Ración de Tequeños con Guasacaca (6 unid)", "Desayunos", "Tequeños crujientes con abundante queso blanco", 5.00, "Disponible", "https://images.unsplash.com/photo-1628294895950-9805252327bc", JSON.stringify([{ nombre: "Doble Guasacaca", precio: 0.5 }]), fecha],
      ["A01", "Sopa Criolla de Costilla con Arroz y Arepitas", "Almuerzos", "Sancocho de costilla tierna con verduras y arepitas", 7.50, "Disponible", "https://images.unsplash.com/photo-1547592166-23ac45744acd", JSON.stringify([{ nombre: "Arepitas extra (2x)", precio: 1.0 }]), fecha],
      ["C01", "Cachapa Tradicional con Queso de Mano y Cochino Frito", "Cachapas", "Cachapa de maíz tierno con queso de mano y chicharrón", 8.50, "Disponible", "https://images.unsplash.com/photo-1565299585323-38d6b0865b47", JSON.stringify([{ nombre: "Doble Queso", precio: 2.5 }]), fecha]
    ];
    hMenu.getRange(2, 1, platosBase.length, 9).setValues(platosBase);
  }

  // 2. Hoja Pedidos
  asegurarHoja(ss, HOJA_PEDIDOS, [
    "ID_Comanda", "Fecha_Hora", "Cliente_Nombre", "Cliente_Telefono", "Direccion_Entrega", "Detalle_Platos", "Extras_Seleccionados", "Notas_Cocina", "Total_USD", "Estado_Pedido"
  ]);

  // 3. Hoja Clientes
  asegurarHoja(ss, HOJA_CLIENTES, [
    "Cedula", "Nombre_Completo", "Correo_Electronico", "Telefono_WhatsApp", "Ciudad", "Direccion_Habitual", "Estado_Verificacion", "Fecha_Registro"
  ]);

  // 4. Hoja Chat
  asegurarHoja(ss, HOJA_CHAT, [
    "ID_Mensaje", "Timestamp", "ID_Sesion_Cliente", "Nombre_Cliente", "Emisor", "Mensaje", "Leido"
  ]);

  // 5. Hoja Config
  const hCfg = asegurarHoja(ss, HOJA_CONFIG, ["Clave", "Valor", "Descripcion", "Fecha_Modificacion"]);
  if (hCfg.getLastRow() <= 1) {
    const f = Utilities.formatDate(new Date(), "America/Caracas", "yyyy-MM-dd HH:mm:ss");
    hCfg.appendRow(["NOMBRE_NEGOCIO", "A Domicilio", "Nombre comercial", f]);
    hCfg.appendRow(["WHATSAPP_COCINA", "584120000000", "Teléfono de comandas", f]);
    hCfg.appendRow(["WHATSAPP_SOPORTE", "584140000000", "Teléfono de atención", f]);
    hCfg.appendRow(["HORARIO_ATENCION", "07:00 AM - 10:00 PM", "Horario de servicio", f]);
  }
}

/**
 * Función de inicialización rápida directa desde el editor
 */
function ejecutarInicializacion() {
  const ss = obtenerSpreadsheet();
  inicializarEstructuraCompleta(ss);
  crearCarpetasDrive();
  Logger.log("✅ Estructura e imágenes inicializadas exitosamente!");
}

/**
 * Crea las carpetas organizadas por categorías en Google Drive
 */
function crearCarpetasDrive() {
  let carpetas = DriveApp.getFoldersByName(CARPETA_DRIVE_FOTOS);
  let principal = carpetas.hasNext() ? carpetas.next() : DriveApp.createFolder(CARPETA_DRIVE_FOTOS);
  principal.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const categorias = ["Desayunos", "Almuerzos_Sopas", "Cachapas", "Comida_Rapida", "Bebidas"];
  const ids = { principal: principal.getId() };

  categorias.forEach(function(cat) {
    let sub = principal.getFoldersByName(cat);
    let fld = sub.hasNext() ? sub.next() : principal.createFolder(cat);
    fld.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    ids[cat] = fld.getId();
  });

  return ids;
}


