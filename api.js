/**
 * A Domicilio - Conector API Google Apps Script & Google Sheets
 * Programador: ANDY Paz (elchichote@gmail.com)
 */

// URL por defecto oficial vinculada a Google Sheets de elchichote@gmail.com
const ADOMICILIO_DEFAULT_API = 'https://script.google.com/macros/s/AKfycbyXnJXQEF0XsUVRd9w_oY_iekqD3H77FpJkspmIzavtGiCe9iMcjLfP9cI-5ewYD8kpSw/exec';

const API = {
  getURL: function() {
    return localStorage.getItem('adomicilio_api_url') || ADOMICILIO_DEFAULT_API;
  },

  setURL: function(url) {
    localStorage.setItem('adomicilio_api_url', url.trim());
  },

  // 1. Obtener menú de platos desde Google Sheets
  obtenerMenu: async function() {
    const url = this.getURL();
    if (!url) {
      console.warn('API URL no configurada, utilizando datos locales.');
      return null;
    }

    try {
      const resp = await fetch(`${url}?accion=obtenerMenu`, { method: 'GET' });
      const data = await resp.json();
      if (data && data.exito) {
        return data.platos;
      }
      return null;
    } catch (err) {
      console.error('Error al conectar con Google Sheets:', err);
      return null;
    }
  },

  // 2. Guardar o actualizar plato
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

  // 3. Actualizar precio o disponibilidad rápida
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

  // 4. Eliminar plato del menú
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

  // 5. Registrar comanda en la hoja de cálculo
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

  // 6. Subir foto a Google Drive
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

  // 7. Enviar mensaje de chat web a Google Sheets
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
  }
};
