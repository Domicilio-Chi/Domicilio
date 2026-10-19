/**
 * A Domicilio - Conector API Google Apps Script & Google Sheets
 * Programador: ANDY Paz (elchichote@gmail.com)
 */

// URL por defecto oficial vinculada a Google Sheets de elchichote@gmail.com
const ADOMICILIO_DEFAULT_API = 'https://script.google.com/macros/s/AKfycbyXnJXQEF0XsUVRd9w_oY_iekqD3H77FpJkspmIzavtGiCe9iMcjLfP9cI-5ewYD8kpSw/exec';

const API = {
  getURL: function() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('adomicilio_api_url') || ADOMICILIO_DEFAULT_API;
    }
    return ADOMICILIO_DEFAULT_API;
  },

  setURL: function(url) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('adomicilio_api_url', url.trim());
    }
  },

  // 1. Obtener menú de platos desde Google Sheets (Stale-While-Revalidate resilient)
  obtenerMenu: async function() {
    const url = this.getURL();
    if (!url) {
      console.warn('API URL no configurada, utilizando datos locales.');
      return null;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(`${url}?accion=obtenerMenu`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) {
        console.warn(`Respuesta de red no satisfactoria (${resp.status}) en obtenerMenu`);
        return null;
      }

      const data = await resp.json();
      if (data && data.exito && Array.isArray(data.platos)) {
        return data.platos;
      }
      return null;
    } catch (err) {
      // Manejo silencioso y transparente: no bloquear la UI si no hay conexión
      console.warn('Advertencia en API.obtenerMenu (operando en modo local resiliente):', err.name === 'AbortError' ? 'Tiempo de espera agotado (timeout 8.5s)' : err.message);
      return null;
    }
  },

  // 2. Obtener parámetros globales de configuración (WhatsApp, Horarios, Políticas)
  obtenerConfig: async function() {
    const url = this.getURL();
    if (!url) return null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(`${url}?accion=obtenerConfig`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) return null;

      const data = await resp.json();
      if (data && data.exito && data.config) {
        return data.config;
      }
      return null;
    } catch (err) {
      console.warn('Advertencia en API.obtenerConfig:', err.name === 'AbortError' ? 'Timeout' : err.message);
      return null;
    }
  },

  // 3. Obtener listado de comandas registradas en Google Sheets
  obtenerComandas: async function() {
    const url = this.getURL();
    if (!url) return [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(`${url}?accion=obtenerComandas`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) return [];

      const data = await resp.json();
      if (data && data.exito && Array.isArray(data.comandas)) {
        return data.comandas;
      }
      return [];
    } catch (err) {
      console.warn('Advertencia en API.obtenerComandas:', err.name === 'AbortError' ? 'Timeout' : err.message);
      return [];
    }
  },

  // 4. Guardar o actualizar plato
  guardarPlato: async function(plato) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'guardarPlato', ...plato })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 5. Actualizar precio o disponibilidad rápida en tiempo real
  actualizarPrecioStock: async function(id, precio, disponible) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'actualizarPrecioStock', id, precio, disponible })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 6. Eliminar plato del menú
  eliminarPlato: async function(id) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'eliminarPlato', id })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 7. Registrar comanda en la hoja de cálculo
  registrarComanda: async function(datosComanda) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'registrarComanda', ...datosComanda })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 8. Subir foto a Google Drive
  subirFotoDrive: async function(imagenBase64, nombreArchivo) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'subirFotoDrive', imagenBase64, nombreArchivo })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 9. Enviar mensaje de chat web a Google Sheets
  enviarMensajeChat: async function(mensajeObj) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'enviarMensajeChat', ...mensajeObj })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 10. Sincronizar bandeja global de chat para el Administrador (todos los comensales)
  sincronizarChatGlobal: async function(desdeTimestamp = 0) {
    const url = this.getURL();
    if (!url) return null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(`${url}?accion=sincronizarChatGlobal&desdeTimestamp=${desdeTimestamp}`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) return null;
      const data = await resp.json();
      return (data && data.exito && Array.isArray(data.mensajes)) ? data.mensajes : null;
    } catch (err) {
      return null;
    }
  },

  // 11. Obtener historial de chat de un comensal específico (para el móvil)
  obtenerHistorialChat: async function(clienteId, desdeTimestamp = 0) {
    const url = this.getURL();
    if (!url || !clienteId) return null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(`${url}?accion=obtenerHistorialChat&clienteId=${encodeURIComponent(clienteId)}&desdeTimestamp=${desdeTimestamp}`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) return null;
      const data = await resp.json();
      return (data && data.exito && Array.isArray(data.mensajes)) ? data.mensajes : null;
    } catch (err) {
      return null;
    }
  },

  // 12. Enviar latido de presencia de comensal en vivo a la nube (CacheService)
  registrarLatidoPresencia: async function(clienteId, nombre = 'Comensal', dispositivo = 'web') {
    const url = this.getURL();
    if (!url || !clienteId) return;

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'registrarLatidoPresencia', clienteId, nombre, dispositivo })
      });
    } catch (err) {
      // Latido silencioso resiliente
    }
  },

  // 13. Obtener comensales conectados en vivo en la nube (para el panel Admin)
  obtenerPresenciaActiva: async function() {
    const url = this.getURL();
    if (!url) return null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const resp = await fetch(`${url}?accion=obtenerPresenciaActiva`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!resp.ok) return null;
      const data = await resp.json();
      return (data && data.exito) ? data : null;
    } catch (err) {
      return null;
    }
  },

  // 14. Enviar respuesta oficial del Chef hacia el comensal
  responderMensajeAdmin: async function(clienteId, mensaje) {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de Apps Script' };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'responderMensajeAdmin', clienteId, mensaje })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 15. Marcar mensajes de un comensal como leídos en la nube
  marcarMensajesLeidos: async function(clienteId) {
    const url = this.getURL();
    if (!url) return { exito: false };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'marcarMensajesLeidos', clienteId })
      });
      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  },

  // 16. Eliminar conversación de un comensal en la nube (Soft Delete permanente)
  eliminarConversacionComensal: async function(clienteId) {
    const url = this.getURL();
    if (!url || !clienteId) return { exito: false, mensaje: 'Parámetros inválidos' };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'eliminarConversacionComensal', clienteId: clienteId }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      return await resp.json();
    } catch (err) {
      console.warn('Error en API.eliminarConversacionComensal:', err.message);
      return { exito: false, error: err.message };
    }
  },

  // 17. Vaciar todo el historial de chat en la nube
  vaciarTodoChatGlobal: async function() {
    const url = this.getURL();
    if (!url) return { exito: false, mensaje: 'Sin URL de API' };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ accion: 'vaciarTodoChatGlobal' }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      return await resp.json();
    } catch (err) {
      return { exito: false, error: err.message };
    }
  }
};

// Exportar globalmente para entornos web y Node
if (typeof window !== 'undefined') {
  window.API = API;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
}
