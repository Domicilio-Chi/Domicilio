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
  const filtro = document.getElementById('filtroBusquedaAdmin')?.value.toLowerCase().trim() || '';

  let lista = platosAdmin;
  if (filtro) {
    lista = lista.filter(p => p.nombre.toLowerCase().includes(filtro) || p.categoria.toLowerCase().includes(filtro));
  }

  tbody.innerHTML = lista.map((p, idx) => `
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
// MODAL AGREGAR / EDITAR PLATO
// ==========================================
function abrirModalNuevoPlato() {
  document.getElementById('modalEditarTitulo').textContent = 'Agregar Nuevo Plato';
  document.getElementById('editPlatoId').value = '';
  document.getElementById('editNombre').value = '';
  document.getElementById('editCategoria').value = 'Desayunos';
  document.getElementById('editPrecio').value = '';
  document.getElementById('editDescripcion').value = '';
  document.getElementById('editFoto').value = '';
  document.getElementById('modalEditarPlato').classList.remove('hidden');
}

function editarPlato(id) {
  const p = platosAdmin.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalEditarTitulo').textContent = 'Editar Plato';
  document.getElementById('editPlatoId').value = p.id;
  document.getElementById('editNombre').value = p.nombre;
  document.getElementById('editCategoria').value = p.categoria;
  document.getElementById('editPrecio').value = p.precio;
  document.getElementById('editDescripcion').value = p.descripcion;
  document.getElementById('editFoto').value = p.foto;
  document.getElementById('modalEditarPlato').classList.remove('hidden');
}

function cerrarModalEditarPlato() {
  document.getElementById('modalEditarPlato').classList.add('hidden');
}

function guardarPlatoAdmin() {
  const id = document.getElementById('editPlatoId').value;
  const nombre = document.getElementById('editNombre').value.trim();
  const categoria = document.getElementById('editCategoria').value;
  const precio = parseFloat(document.getElementById('editPrecio').value);
  const descripcion = document.getElementById('editDescripcion').value.trim();
  let foto = document.getElementById('editFoto').value.trim();

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
      mostrarToastAdmin(`¡${nombre} actualizado con éxito!`);
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
      disponible: true
    };
    platosAdmin.unshift(nuevo);
    mostrarToastAdmin(`¡${nombre} agregado al menú!`);
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
  }
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
