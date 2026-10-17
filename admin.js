/**
 * A Domicilio - Logica del Panel Administrador
 * Programador / Responsable: ANDY Paz (elchichote@gmail.com)
 */

// Helper para normalizar rutas de imágenes en local y GitHub Pages
function getRutaFoto(ruta) {
  if (!ruta) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100';
  if (ruta.startsWith('http://') || ruta.startsWith('https://')) return ruta;
  return ruta.replace(/^\.\.\//, '');
}

let platosAdmin = JSON.parse(localStorage.getItem('adomicilio_platos_custom') || 'null');

if (!platosAdmin) {
  platosAdmin = [
    {
      id: 'D01',
      nombre: 'Trío de Empanadas Crujientes',
      categoria: 'Desayunos',
      descripcion: '3 empanadas doraditas de harina de maíz rellenas con cazón fresco, carne mechada jugosa y queso blanco.',
      precio: 4.50,
      disponible: true,
      foto: '../assets/imagenes/empanadas_doradas.jpg'
    },
    {
      id: 'D02',
      nombre: 'Ración de Tequeños con Guasacaca (6 unid)',
      categoria: 'Desayunos',
      descripcion: 'Seis tequeños tradicionales rellenos de abundante queso blanco derretido, acompañados de guasacaca.',
      precio: 5.00,
      disponible: true,
      foto: '../assets/imagenes/tequenos_guasacaca.jpg'
    },
    {
      id: 'D03',
      nombre: 'Pastelitos Andinos Dorados (3 unid)',
      categoria: 'Desayunos',
      descripcion: 'Tres pastelitos hojaldrados y crujientes con masa fina tradicional, rellenos de carne molida con papa criolla.',
      precio: 4.50,
      disponible: true,
      foto: '../assets/imagenes/pastelitos_guasacaca.jpg'
    },
    {
      id: 'D04',
      nombre: 'Combo Desayuno con Refresco Frío',
      categoria: 'Bebidas',
      descripcion: 'Bebida fría en lata a elegir (Coca-Cola Original, Chinotto refrescante o 7Up con limón).',
      precio: 1.50,
      disponible: true,
      foto: '../assets/imagenes/refrescos_desayuno.jpg'
    },
    {
      id: 'A01',
      nombre: 'Sopa Criolla de Costilla de Res con Arroz y Arepitas',
      categoria: 'Almuerzos',
      descripcion: 'Poderoso sancocho de costilla de res tierna con jojoto, yuca y cilantro, acompañado con porción de arroz blanco y 2 arepitas.',
      precio: 7.50,
      disponible: true,
      foto: '../assets/imagenes/sopa_costilla_arepitas.jpg'
    },
    {
      id: 'A02',
      nombre: 'Sopa de Pollo de Campo con Arroz y Arepitas',
      categoria: 'Almuerzos',
      descripcion: 'Humeante y reconfortante sopa de pollo criollo con verduras campesinas, servida con arroz blanco y arepitas doradas.',
      precio: 6.50,
      disponible: true,
      foto: '../assets/imagenes/sopa_costilla_arepitas.jpg'
    },
    {
      id: 'C01',
      nombre: 'Cachapa Tradicional con Queso de Mano y Cochino Frito',
      categoria: 'Cachapas',
      descripcion: 'Cachapa de maíz tierno recién molido dorada en budare, rellena de auténtico queso de mano y trozos de cochino frito.',
      precio: 8.50,
      disponible: true,
      foto: '../assets/imagenes/cachapa_queso_mano.jpg'
    },
    {
      id: 'R01',
      nombre: 'Hamburguesa Especial a la Parrilla A Domicilio',
      categoria: 'Comida Rápida',
      descripcion: 'Carne jugosa 100% de res a la brasa con queso amarillo, tocineta, huevo frito, vegetales frescos, papitas y salsas.',
      precio: 6.00,
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'R02',
      nombre: 'Pizza Familiar Mixta A Domicilio',
      categoria: 'Comida Rápida',
      descripcion: 'Masa artesanal a la piedra, salsa de tomate natural, abundante queso mozzarella, jamón, pepperoni, champiñones y orégano.',
      precio: 10.00,
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'R03',
      nombre: 'Perro Caliente Especial con Todo',
      categoria: 'Comida Rápida',
      descripcion: 'Salchicha ahumada con cebolla caramelizada, repollo fresco, papitas crocantes ralladas, queso blanco y salsa de maíz.',
      precio: 2.50,
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'R04',
      nombre: 'Pollo Asado a la Leña (Medio Pollo con Guarnición)',
      categoria: 'Comida Rápida',
      descripcion: 'Medio pollo dorado a la brasa sazonado con adobo criollo y limón, servido con hallaquitas de maíz y ensalada.',
      precio: 8.00,
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80'
    }
  ];
  guardarEnStorage();
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTablaAdmin();
  actualizarMetricas();
  actualizarIconoTemaAdmin();
  configurarCierreModalesAdmin();
});

function guardarEnStorage() {
  localStorage.setItem('adomicilio_platos_custom', JSON.stringify(platosAdmin));
}

// ==========================================
// TEMA CLARO / OSCURO ADMIN
// ==========================================
function conmutarTemaAdmin() {
  const esOscuro = document.documentElement.classList.contains('dark');
  if (esOscuro) {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('adomicilio_tema', 'claro');
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('adomicilio_tema', 'oscuro');
  }
  actualizarIconoTemaAdmin();
}

function actualizarIconoTemaAdmin() {
  const icono = document.getElementById('iconoTemaAdmin');
  if (!icono) return;
  const esOscuro = document.documentElement.classList.contains('dark');
  if (esOscuro) {
    icono.className = 'fa-solid fa-sun text-amber-400 text-sm';
  } else {
    icono.className = 'fa-solid fa-moon text-stone-600 text-sm';
  }
}

// ==========================================
// TABLA Y MÉTRICAS
// ==========================================
function renderizarTablaAdmin() {
  const tbody = document.getElementById('tablaPlatosAdmin');
  const contenedorMovil = document.getElementById('listaCardsAdminMovil');
  const filtro = document.getElementById('filtroBusquedaAdmin')?.value.toLowerCase().trim() || '';

  let lista = platosAdmin;
  if (filtro) {
    lista = lista.filter(p => p.nombre.toLowerCase().includes(filtro) || p.categoria.toLowerCase().includes(filtro));
  }

  // 1. Renderizar tabla para Escritorio (md y superior)
  if (tbody) {
    tbody.innerHTML = lista.map((p) => `
      <tr class="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition">
        <td class="py-3 px-4 flex items-center space-x-3">
          <img src="${getRutaFoto(p.foto)}" alt="${p.nombre}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'" class="w-10 h-10 rounded-xl object-cover border border-stone-200 dark:border-stone-700 shadow-xs">
          <div>
            <span class="font-bold text-stone-900 dark:text-white block">${p.nombre}</span>
            <span class="text-[11px] text-stone-400 line-clamp-1">${p.descripcion}</span>
          </div>
        </td>
        <td class="py-3 px-4 font-medium text-stone-600 dark:text-stone-300">
          <span class="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px]">
            ${p.categoria}
          </span>
        </td>
        <td class="py-3 px-4 font-black text-rose-600 dark:text-rose-400 text-sm">
          $${p.precio.toFixed(2)}
        </td>
        <td class="py-3 px-4">
          <button onclick="toggleDisponibilidad('${p.id}')" class="px-3 py-1 rounded-full font-bold text-[11px] transition ${
            p.disponible 
              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200' 
              : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 hover:bg-rose-200'
          }">
            <i class="fa-solid ${p.disponible ? 'fa-check' : 'fa-ban'} mr-1"></i>
            ${p.disponible ? 'Disponible Hoy' : 'Agotado'}
          </button>
        </td>
        <td class="py-3 px-4 text-right space-x-2">
          <button onclick="editarPlato('${p.id}')" class="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-rose-600 transition" title="Editar">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="eliminarPlato('${p.id}')" class="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-red-500 transition" title="Quitar del Menú">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  // 2. Renderizar tarjetas para Móvil (pantallas < 768px)
  if (contenedorMovil) {
    if (lista.length === 0) {
      contenedorMovil.innerHTML = `
        <div class="py-8 text-center text-stone-400">
          <i class="fa-solid fa-utensils text-2xl mb-2"></i>
          <p class="text-xs">No se encontraron platos que coincidan con la búsqueda</p>
        </div>
      `;
    } else {
      contenedorMovil.innerHTML = lista.map((p) => `
        <div class="p-3.5 bg-stone-50/90 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2.5 shadow-2xs">
          <!-- Fila Superior: Foto, Nombre, Categoría, ID y Precio -->
          <div class="flex items-start space-x-3">
            <img src="${getRutaFoto(p.foto)}" alt="${p.nombre}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'" class="w-13 h-13 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shadow-xs shrink-0">
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1.5">
                <h4 class="font-bold text-xs sm:text-sm text-stone-900 dark:text-white leading-tight break-words">${p.nombre}</h4>
                <span class="font-black text-rose-600 dark:text-rose-400 text-sm shrink-0">$${p.precio.toFixed(2)}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-1">
                <span class="px-2 py-0.5 rounded-full bg-stone-200/70 dark:bg-stone-700/80 text-[10px] font-bold text-stone-700 dark:text-stone-300">
                  ${p.categoria}
                </span>
                <span class="text-[10px] text-stone-400 font-mono">#${p.id}</span>
              </div>
              ${p.descripcion ? `<p class="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-1">${p.descripcion}</p>` : ''}
            </div>
          </div>

          <!-- Fila Inferior: Disponibilidad, Editar y Eliminar (100% visible, sin cortes) -->
          <div class="flex items-center gap-2 pt-1 border-t border-stone-200/60 dark:border-stone-700/50">
            <!-- Botón Disponibilidad -->
            <button onclick="toggleDisponibilidad('${p.id}')" class="flex-1 py-1.5 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
              p.disponible 
                ? 'bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200' 
                : 'bg-rose-100/90 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 hover:bg-rose-200'
            }">
              <i class="fa-solid ${p.disponible ? 'fa-circle-check text-emerald-600 dark:text-emerald-400' : 'fa-circle-xmark text-rose-600 dark:text-rose-400'} text-xs"></i>
              <span>${p.disponible ? 'Disponible' : 'Agotado'}</span>
            </button>

            <!-- Botón Editar -->
            <button onclick="editarPlato('${p.id}')" class="py-1.5 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition">
              <i class="fa-solid fa-pen-to-square text-xs text-stone-500 dark:text-stone-400"></i>
              <span>Editar</span>
            </button>

            <!-- Botón Eliminar -->
            <button onclick="eliminarPlato('${p.id}')" class="w-8 h-8 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-400 hover:text-red-500 hover:border-red-300 shadow-2xs flex items-center justify-center transition shrink-0" title="Eliminar Plato">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  actualizarMetricas();
}

function filtrarPlatosAdmin() {
  renderizarTablaAdmin();
}

function actualizarMetricas() {
  document.getElementById('metricaTotalPlatos').textContent = platosAdmin.length;
  const activos = platosAdmin.filter(p => p.disponible).length;
  document.getElementById('metricaPlatosActivos').textContent = activos;
}

function toggleDisponibilidad(id) {
  const p = platosAdmin.find(x => x.id === id);
  if (!p) return;
  p.disponible = !p.disponible;
  guardarEnStorage();
  renderizarTablaAdmin();
  mostrarToastAdmin(p.disponible ? `¡${p.nombre} activado para venta!` : `${p.nombre} marcado como agotado.`);
}

// ==========================================
// MODAL AGREGAR / EDITAR PLATO Y EXTRAS
// ==========================================
function abrirModalNuevoPlato() {
  document.getElementById('modalEditarTitulo').textContent = 'Agregar Nuevo Plato';
  document.getElementById('editPlatoId').value = '';
  document.getElementById('editNombre').value = '';
  document.getElementById('editCategoria').value = 'Desayunos';
  document.getElementById('editPrecio').value = '';
  document.getElementById('editDescripcion').value = '';
  document.getElementById('editFoto').value = '';
  
  // Limpiar y poner 2 extras por defecto
  const contenedor = document.getElementById('contenedorListaExtrasAdmin');
  if (contenedor) {
    contenedor.innerHTML = '';
    agregarFilaExtraFormulario('Guasacaca verde de la casa', '0.50');
    agregarFilaExtraFormulario('Salsa tártara / ajo criollo', '0.50');
  }

  document.getElementById('modalEditarPlato').classList.remove('hidden');
}

function editarPlato(id) {
  const p = platosAdmin.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalEditarTitulo').textContent = 'Editar Plato y Salsas';
  document.getElementById('editPlatoId').value = p.id;
  document.getElementById('editNombre').value = p.nombre;
  document.getElementById('editCategoria').value = p.categoria;
  document.getElementById('editPrecio').value = p.precio;
  document.getElementById('editDescripcion').value = p.descripcion;
  document.getElementById('editFoto').value = p.foto;

  // Cargar lista de extras del plato
  const contenedor = document.getElementById('contenedorListaExtrasAdmin');
  if (contenedor) {
    contenedor.innerHTML = '';
    if (p.extras && Array.isArray(p.extras) && p.extras.length > 0) {
      p.extras.forEach(ext => {
        agregarFilaExtraFormulario(ext.nombre, ext.precio);
      });
    } else {
      agregarFilaExtraFormulario('Guasacaca verde de la casa', '0.50');
    }
  }

  document.getElementById('modalEditarPlato').classList.remove('hidden');
}

function cerrarModalEditarPlato() {
  document.getElementById('modalEditarPlato').classList.add('hidden');
}

// Gestión modular de filas de extras
function agregarFilaExtraFormulario(nombre = '', precio = '0.50') {
  const contenedor = document.getElementById('contenedorListaExtrasAdmin');
  if (!contenedor) return;

  const div = document.createElement('div');
  div.className = 'fila-extra flex items-center space-x-2 bg-stone-50 dark:bg-stone-800/80 p-2 rounded-xl border border-stone-200 dark:border-stone-700/60';
  div.innerHTML = `
    <input 
      type="text" 
      placeholder="Nombre de salsa o extra (ej: Guasacaca)" 
      value="${nombre}" 
      class="extra-nombre flex-1 px-2.5 py-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-rose-500 text-stone-900 dark:text-white">
    <div class="flex items-center space-x-1 w-24">
      <span class="text-xs text-stone-400 font-bold">$</span>
      <input 
        type="number" 
        step="0.25" 
        min="0" 
        placeholder="0.50" 
        value="${precio}" 
        class="extra-precio w-full px-2 py-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-rose-500 text-stone-900 dark:text-white text-right">
    </div>
    <button type="button" onclick="this.closest('.fila-extra').remove()" class="w-7 h-7 rounded-lg text-stone-400 hover:text-red-500 transition flex items-center justify-center text-xs" title="Eliminar este extra">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  contenedor.appendChild(div);
}

function obtenerExtrasDesdeFormulario() {
  const filas = document.querySelectorAll('#contenedorListaExtrasAdmin .fila-extra');
  const extras = [];
  filas.forEach((fila, i) => {
    const nombre = fila.querySelector('.extra-nombre')?.value.trim();
    const precio = parseFloat(fila.querySelector('.extra-precio')?.value || 0);
    if (nombre) {
      extras.push({
        id: 'ext_' + Date.now().toString().slice(-4) + '_' + i,
        nombre: nombre,
        precio: isNaN(precio) ? 0 : precio
      });
    }
  });
  return extras;
}

function guardarPlatoAdmin() {
  const id = document.getElementById('editPlatoId').value;
  const nombre = document.getElementById('editNombre').value.trim();
  const categoria = document.getElementById('editCategoria').value;
  const precio = parseFloat(document.getElementById('editPrecio').value);
  const descripcion = document.getElementById('editDescripcion').value.trim();
  let foto = document.getElementById('editFoto').value.trim();
  const extras = obtenerExtrasDesdeFormulario();

  if (!nombre || isNaN(precio) || !descripcion) {
    alert('Por favor completa todos los campos requeridos (*)');
    return;
  }

  if (!foto) {
    foto = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  }

  if (id) {
    // Edición
    const p = platosAdmin.find(x => x.id === id);
    if (p) {
      p.nombre = nombre;
      p.categoria = categoria;
      p.precio = precio;
      p.descripcion = descripcion;
      p.foto = foto;
      p.extras = extras;
      mostrarToastAdmin(`¡${nombre} actualizado con éxito!`);
      
      // Sincronizar con Google Sheets ERP
      try {
        API.guardarPlato({ id: p.id, nombre, categoria, precio, descripcion, foto, disponible: p.disponible, extras });
      } catch(e) {}
    }
  } else {
    // Creación
    const nuevo = {
      id: 'PL-' + Date.now().toString().slice(-4),
      nombre,
      categoria,
      precio,
      descripcion,
      foto,
      disponible: true,
      extras
    };
    platosAdmin.unshift(nuevo);
    mostrarToastAdmin(`¡${nombre} agregado al menú!`);
    
    // Sincronizar con Google Sheets ERP
    try {
      API.guardarPlato(nuevo);
    } catch(e) {}
  }

  guardarEnStorage();
  renderizarTablaAdmin();
  cerrarModalEditarPlato();
}

function eliminarPlato(id) {
  const p = platosAdmin.find(x => x.id === id);
  if (!p) return;
  if (confirm(`¿Estás seguro de que deseas quitar "${p.nombre}" del menú?`)) {
    platosAdmin = platosAdmin.filter(x => x.id !== id);
    guardarEnStorage();
    renderizarTablaAdmin();
    mostrarToastAdmin(`Plato eliminado.`);
    try {
      API.eliminarPlato(id);
    } catch(e) {}
  }
}

// ==========================================
// CONFIGURACIÓN DE DELIVERY GRATIS
// ==========================================
function abrirModalConfigDelivery() {
  const defaultConfig = {
    activo: true,
    minUnidades: 2,
    textoPromo: 'Envío Gratis a partir de 2 unid.',
    condiciones: 'Pide 2 o más empanadas, tequeños, pastelitos, cachapas, sopas, hamburguesas o cualquier especialidad de nuestra carta y el envío corre por cuenta de la casa.'
  };
  let config = defaultConfig;
  try {
    const raw = localStorage.getItem('adomicilio_config_delivery');
    if (raw) config = { ...defaultConfig, ...JSON.parse(raw) };
  } catch(e) {}

  document.getElementById('cfgDeliveryActivo').checked = !!config.activo;
  document.getElementById('cfgDeliveryMinUnidades').value = config.minUnidades || 2;
  document.getElementById('cfgDeliveryTextoPromo').value = config.textoPromo || 'Envío Gratis a partir de 2 unid.';
  document.getElementById('cfgDeliveryCondiciones').value = config.condiciones || '';
  document.getElementById('modalConfigDelivery').classList.remove('hidden');
}

function cerrarModalConfigDelivery() {
  const m = document.getElementById('modalConfigDelivery');
  if (m) m.classList.add('hidden');
}

function guardarConfigDelivery() {
  const activo = document.getElementById('cfgDeliveryActivo').checked;
  const minUnidades = parseInt(document.getElementById('cfgDeliveryMinUnidades').value) || 2;
  const textoPromo = document.getElementById('cfgDeliveryTextoPromo').value.trim() || `Envío Gratis a partir de ${minUnidades} unid.`;
  const condiciones = document.getElementById('cfgDeliveryCondiciones').value.trim();

  const config = { activo, minUnidades, textoPromo, condiciones };
  localStorage.setItem('adomicilio_config_delivery', JSON.stringify(config));
  
  cerrarModalConfigDelivery();
  mostrarToastAdmin('Configuración de Delivery Gratis guardada exitosamente');
}

// ==========================================
// CIERRE DE MODALES EN ADMIN (CLIC FUERA O ESC)
// ==========================================
function configurarCierreModalesAdmin() {
  const modales = [
    { id: 'modalEditarPlato', close: cerrarModalEditarPlato },
    { id: 'modalConfigWhatsApp', close: cerrarModalConfigWhatsApp },
    { id: 'modalConfigDelivery', close: cerrarModalConfigDelivery },
    { id: 'modalConfigAPI', close: cerrarModalConfigAPI },
    { id: 'modalAdminChat', close: cerrarModalAdminChat },
    { id: 'modalConfigGeneral', close: cerrarModalConfigGeneral }
  ];

  modales.forEach(m => {
    const el = document.getElementById(m.id);
    if (el) {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          m.close();
        }
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModalEditarPlato();
      cerrarModalConfigWhatsApp();
      cerrarModalConfigDelivery();
      cerrarModalConfigAPI();
      cerrarModalAdminChat();
      cerrarModalConfigGeneral();
    }
  });
}

// ==========================================
// CONFIGURACIÓN DE WHATSAPP
// ==========================================
function abrirModalConfigWhatsApp() {
  document.getElementById('cfgTelCocina').value = localStorage.getItem('adomicilio_tel_cocina') || '584120000000';
  document.getElementById('cfgTelRepartidores').value = localStorage.getItem('adomicilio_tel_reparto') || '584140000000';
  document.getElementById('modalConfigWhatsApp').classList.remove('hidden');
}

function cerrarModalConfigWhatsApp() {
  document.getElementById('modalConfigWhatsApp').classList.add('hidden');
}

function guardarConfigWhatsApp() {
  const tel1 = document.getElementById('cfgTelCocina').value.trim();
  const tel2 = document.getElementById('cfgTelRepartidores').value.trim();
  localStorage.setItem('adomicilio_tel_cocina', tel1);
  localStorage.setItem('adomicilio_tel_reparto', tel2);
  cerrarModalConfigWhatsApp();
  mostrarToastAdmin('Teléfonos de WhatsApp actualizados correctamente');
}

// ==========================================
// CONFIGURACIÓN DE GOOGLE SHEETS / APPS SCRIPT
// ==========================================
function abrirModalConfigAPI() {
  document.getElementById('cfgApiUrl').value = localStorage.getItem('adomicilio_api_url') || '';
  document.getElementById('modalConfigAPI').classList.remove('hidden');
}

function cerrarModalConfigAPI() {
  document.getElementById('modalConfigAPI').classList.add('hidden');
}

function guardarConfigAPI() {
  const url = document.getElementById('cfgApiUrl').value.trim();
  if (url) {
    API.setURL(url);
    mostrarToastAdmin('¡URL de Google Sheets vinculada con éxito!');
  } else {
    localStorage.removeItem('adomicilio_api_url');
    mostrarToastAdmin('Modo local / offline activo.');
  }
  cerrarModalConfigAPI();
}

// Toast
function mostrarToastAdmin(texto) {
  const toast = document.getElementById('toastAdmin');
  const span = document.getElementById('toastAdminTexto');
  span.textContent = texto;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

// ==========================================
// CONSULTAS Y CHAT DE CLIENTES EN ADMIN
// ==========================================
function abrirModalAdminChat() {
  renderizarAdminChat();
  document.getElementById('modalAdminChat').classList.remove('hidden');
}

function cerrarModalAdminChat() {
  document.getElementById('modalAdminChat').classList.add('hidden');
}

function renderizarAdminChat() {
  const listaContenedor = document.getElementById('adminChatListaMensajes');
  if (!listaContenedor) return;

  const mensajes = JSON.parse(localStorage.getItem('adomicilio_mensajes_chat') || '[]');
  
  if (mensajes.length === 0) {
    listaContenedor.innerHTML = `
      <div class="text-center py-12 text-stone-400">
        <i class="fa-solid fa-comments text-3xl mb-2 text-stone-300 dark:text-stone-700"></i>
        <p class="text-xs font-bold">No hay consultas de comensales registradas aún.</p>
        <p class="text-[11px] text-stone-400 mt-1">Cuando un cliente pregunte sobre una cachapa, sopa o plato, aparecerá aquí con el nombre del plato.</p>
      </div>
    `;
    return;
  }

  listaContenedor.innerHTML = mensajes.slice().reverse().map(m => `
    <div class="p-3.5 rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/70 shadow-xs space-y-2">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
          <i class="fa-solid fa-user-circle text-rose-500"></i> ${m.cliente || 'Comensal'}
        </span>
        <span class="text-[10px] text-stone-400">${m.fecha || ''}</span>
      </div>

      ${m.plato ? `
        <div class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-[11px] font-bold">
          <i class="fa-solid fa-utensils text-[10px]"></i>
          <span>Consultó sobre: ${m.plato} (${m.categoria || 'Menú'})</span>
        </div>
      ` : ''}

      <p class="text-xs text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-900/60 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800">
        "${m.mensaje}"
      </p>

      <div class="flex items-center justify-end space-x-2 pt-1">
        <button onclick="responderPorWhatsAppAdmin('${m.plato || ''}', '${encodeURIComponent(m.mensaje)}')" class="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center space-x-1.5 transition">
          <i class="fa-brands fa-whatsapp text-xs"></i>
          <span>Responder en WhatsApp</span>
        </button>
      </div>
    </div>
  `).join('');
}

function responderAdminChat() {
  const input = document.getElementById('adminInputRespuesta');
  const texto = input.value.trim();
  if (!texto) return;

  const mensajes = JSON.parse(localStorage.getItem('adomicilio_mensajes_chat') || '[]');
  mensajes.push({
    id: 'MSG-' + Date.now(),
    fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cliente: 'Cocina A Domicilio (Chef)',
    mensaje: texto,
    emisor: 'admin'
  });
  localStorage.setItem('adomicilio_mensajes_chat', JSON.stringify(mensajes));

  if (window.API && typeof API.enviarMensajeChat === 'function') {
    API.enviarMensajeChat({
      clienteId: 'admin',
      nombre: 'Cocina A Domicilio',
      mensaje: `[Respuesta Cocina]: ${texto}`,
      emisor: 'admin'
    }).catch(e => console.warn(e));
  }

  input.value = '';
  renderizarAdminChat();
  mostrarToastAdmin('Respuesta enviada al chat');
}

function responderPorWhatsAppAdmin(platoNombre, msgEncoded) {
  const msg = decodeURIComponent(msgEncoded);
  const texto = `¡Hola! Te escribe el chef de A Domicilio con respecto a tu consulta sobre *${platoNombre || 'nuestro menú'}*: "${msg}". Estamos listos para preparártelo.`;
  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
}

// ==========================================
// CONFIGURACIÓN GENERAL Y CATEGORÍA INICIAL
// ==========================================
function abrirModalConfigGeneral() {
  const catPred = localStorage.getItem('adomicilio_categoria_predeterminada') || 'Todos';
  document.getElementById('cfgCategoriaPredeterminada').value = catPred;

  const emailContacto = localStorage.getItem('adomicilio_email_contacto') || 'inghumbertoacosta@gmail.com';
  const inputEmail = document.getElementById('cfgEmailContacto');
  if (inputEmail) inputEmail.value = emailContacto;

  document.getElementById('modalConfigGeneral').classList.remove('hidden');
}

function cerrarModalConfigGeneral() {
  document.getElementById('modalConfigGeneral').classList.add('hidden');
}

function guardarConfigGeneral() {
  const cat = document.getElementById('cfgCategoriaPredeterminada').value;
  localStorage.setItem('adomicilio_categoria_predeterminada', cat);

  const inputEmail = document.getElementById('cfgEmailContacto');
  const email = inputEmail ? inputEmail.value.trim() : 'inghumbertoacosta@gmail.com';
  if (email) {
    localStorage.setItem('adomicilio_email_contacto', email);
  }
  
  if (window.API && typeof API.guardarConfig === 'function') {
    API.guardarConfig({ 
      categoria_predeterminada: cat,
      email_contacto: email 
    }).catch(e => console.warn(e));
  }

  cerrarModalConfigGeneral();
  mostrarToastAdmin(`Ajustes guardados correctamente`);
}
