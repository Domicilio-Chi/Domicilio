/**
 * A Domicilio - Logica Principal del Catalogo y Comandas
 * Programador / Responsable: ANDY Paz (elchichote@gmail.com)
 */

// Helper para normalizar rutas de imágenes en local y GitHub Pages
function getRutaFoto(ruta) {
  if (!ruta) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  if (ruta.startsWith('http://') || ruta.startsWith('https://')) return ruta;
  return ruta.replace(/^\.\.\//, '');
}

// Menú Base de Comida Tradicional y Rápida
const MENU_INICIAL = [
  {
    id: 'D01',
    nombre: 'Trío de Empanadas Crujientes',
    categoria: 'Desayunos',
    icono: '🥟',
    descripcion: '3 empanadas doraditas de harina de maíz rellenas con cazón fresco, carne mechada jugosa y queso blanco.',
    precio: 4.50,
    foto: '../assets/imagenes/empanadas_doradas.jpg',
    extras: [
      { id: 'ext_guasacaca', nombre: 'Ración extra de Guasacaca verde', precio: 0.50 },
      { id: 'ext_salsa_ajo', nombre: 'Salsa tártara / ajo de la casa', precio: 0.50 },
      { id: 'ext_queso_blanco', nombre: 'Queso blanco llanero rallado adicional', precio: 1.00 }
    ]
  },
  {
    id: 'D02',
    nombre: 'Ración de Tequeños con Guasacaca (6 unid)',
    categoria: 'Desayunos',
    icono: '🧀',
    descripcion: 'Seis tequeños venezolanos tradicionales crujientes y rellenos de abundante queso blanco derretido, acompañados de guasacaca.',
    precio: 5.00,
    foto: '../assets/imagenes/tequenos_guasacaca.jpg',
    extras: [
      { id: 'ext_teq_doble_salsa', nombre: 'Doble porción de salsa Guasacaca', precio: 0.50 },
      { id: 'ext_teq_papelon', nombre: 'Salsa reducción de papelón y ají', precio: 0.75 }
    ]
  },
  {
    id: 'D03',
    nombre: 'Pastelitos Andinos Dorados (3 unid)',
    categoria: 'Desayunos',
    icono: '🥟',
    descripcion: 'Tres pastelitos hojaldrados y crujientes con masa fina tradicional, rellenos de carne molida sazonada con papa criolla.',
    precio: 4.50,
    foto: '../assets/imagenes/pastelitos_guasacaca.jpg',
    extras: [
      { id: 'ext_past_guasacaca', nombre: 'Ración de Guasacaca verde fresca', precio: 0.50 },
      { id: 'ext_past_picante', nombre: 'Picante criollo de la casa', precio: 0.50 }
    ]
  },
  {
    id: 'D04',
    nombre: 'Combo Desayuno con Refresco Frío',
    categoria: 'Bebidas',
    icono: '🥤',
    descripcion: 'Bebida fría en lata a elegir (Coca-Cola Original, Chinotto refrescante o 7Up con limón).',
    precio: 1.50,
    foto: '../assets/imagenes/refrescos_desayuno.jpg',
    extras: [
      { id: 'ext_ref_limon', nombre: 'Vaso con hielo y rodaja de limón', precio: 0.00 }
    ]
  },
  {
    id: 'A01',
    nombre: 'Sopa Criolla de Costilla de Res con Arroz y Arepitas',
    categoria: 'Almuerzos',
    icono: '🍲',
    descripcion: 'Poderoso sancocho de costilla de res tierna con jojoto, yuca y cilantro, acompañado con porción de arroz blanco y 2 arepitas calientes.',
    precio: 7.50,
    foto: '../assets/imagenes/sopa_costilla_arepitas.jpg',
    extras: [
      { id: 'ext_sopa_arepas', nombre: '2 Arepitas asadas adicionales', precio: 1.00 },
      { id: 'ext_sopa_arroz', nombre: 'Porción extra de arroz blanco', precio: 1.50 },
      { id: 'ext_sopa_costilla', nombre: 'Ración extra de costilla de res', precio: 3.00 },
      { id: 'ext_sopa_aguacate', nombre: 'Ruedas de aguacate fresco', precio: 1.50 }
    ]
  },
  {
    id: 'A02',
    nombre: 'Sopa de Pollo de Campo con Arroz y Arepitas',
    categoria: 'Almuerzos',
    icono: '🍲',
    descripcion: 'Humeante y reconfortante sopa de pollo criollo con verduras campesinas, servida con arroz blanco y arepitas doradas.',
    precio: 6.50,
    foto: '../assets/imagenes/sopa_costilla_arepitas.jpg',
    extras: [
      { id: 'ext_spollo_arepas', nombre: '2 Arepitas asadas adicionales', precio: 1.00 },
      { id: 'ext_spollo_aguacate', nombre: 'Ruedas de aguacate fresco', precio: 1.50 }
    ]
  },
  {
    id: 'C01',
    nombre: 'Cachapa Tradicional con Queso de Mano y Cochino Frito',
    categoria: 'Cachapas',
    icono: '🌽',
    descripcion: 'Cachapa de maíz tierno recién molido y dorada en budare, rellena de auténtico queso de mano hilado y trozos de cochino frito crujiente.',
    precio: 8.50,
    foto: '../assets/imagenes/cachapa_queso_mano.jpg',
    extras: [
      { id: 'ext_cach_queso', nombre: 'Doble Queso de Mano hilado', precio: 2.50 },
      { id: 'ext_cach_cochino', nombre: 'Ración extra de Cochino Frito crocante', precio: 3.50 },
      { id: 'ext_cach_nata', nombre: 'Porción de Nata llanera fresca', precio: 1.00 }
    ]
  },
  {
    id: 'R01',
    nombre: 'Hamburguesa Especial a la Parrilla A Domicilio',
    categoria: 'Comida Rápida',
    icono: '🍔',
    descripcion: 'Carne jugosa 100% de res a la brasa con queso amarillo, tocineta, huevo frito, vegetales frescos, papitas y salsas especiales de la casa.',
    precio: 6.00,
    foto: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    extras: [
      { id: 'ext_burg_carne', nombre: 'Doble carne a la brasa', precio: 2.50 },
      { id: 'ext_burg_tocineta', nombre: 'Tocineta crocante extra', precio: 1.50 },
      { id: 'ext_burg_papas', nombre: 'Papas fritas adicionales', precio: 2.00 }
    ]
  },
  {
    id: 'R02',
    nombre: 'Pizza Familiar Mixta A Domicilio',
    categoria: 'Comida Rápida',
    icono: '🍕',
    descripcion: 'Masa artesanal a la piedra, salsa de tomate natural, abundante queso mozzarella fundido, jamón, pepperoni, champiñones y orégano.',
    precio: 10.00,
    foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    extras: [
      { id: 'ext_piz_queso', nombre: 'Borde relleno de queso', precio: 2.50 },
      { id: 'ext_piz_pep', nombre: 'Extra de pepperoni crujiente', precio: 2.00 }
    ]
  },
  {
    id: 'R03',
    nombre: 'Perro Caliente Especial con Todo',
    categoria: 'Comida Rápida',
    icono: '🌭',
    descripcion: 'Salchicha ahumada con cebolla caramelizada, repollo fresco, papitas crocantes ralladas, queso blanco derretido y salsa de maíz.',
    precio: 2.50,
    foto: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80',
    extras: [
      { id: 'ext_dog_tocineta', nombre: 'Tocineta crujiente encima', precio: 1.00 },
      { id: 'ext_dog_queso', nombre: 'Queso amarillo fundido extra', precio: 1.00 }
    ]
  },
  {
    id: 'R04',
    nombre: 'Pollo Asado a la Leña (Medio Pollo con Guarnición)',
    categoria: 'Comida Rápida',
    icono: '🍗',
    descripcion: 'Medio pollo dorado a la brasa sazonado con adobo criollo y limón, servido con hallaquitas de maíz y ensalada rallada fresca.',
    precio: 8.00,
    foto: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    extras: [
      { id: 'ext_pol_hallaquitas', nombre: '3 Hallaquitas de maíz extra', precio: 1.50 },
      { id: 'ext_pol_guasacaca', nombre: 'Guasacaca de la casa', precio: 0.50 }
    ]
  }
];

// Estado de la Aplicación
let platos = [...MENU_INICIAL];
let categoriaSeleccionada = 'Todos';
let platoSeleccionadoModal = null;
let cantidadModal = 1;
let comanda = JSON.parse(localStorage.getItem('adomicilio_comanda') || '[]');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderizarCategorias();
  renderizarPlatos();
  actualizarBadgeComanda();
  actualizarIconoTema();
});

// ==========================================
// TEMA CLARO ☀️ / OSCURO 🌙
// ==========================================
function conmutarTema() {
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
  actualizarIconoTema();
}

function actualizarIconoTema() {
  const icono = document.getElementById('iconoTema');
  if (!icono) return;
  const esOscuro = document.documentElement.classList.contains('dark');
  if (esOscuro) {
    icono.className = 'fa-solid fa-sun text-amber-400 text-sm sm:text-base';
  } else {
    icono.className = 'fa-solid fa-moon text-stone-600 text-sm sm:text-base';
  }
}

// ==========================================
// RENDERIZADO DE CATEGORÍAS
// ==========================================
function renderizarCategorias() {
  const contenedor = document.getElementById('contenedorCategorias');
  if (!contenedor) return;

  const categorias = [
    { id: 'Todos', nombre: 'Todos', icono: 'fa-solid fa-border-all' },
    { id: 'Desayunos', nombre: 'Desayuno Criollo', icono: 'fa-solid fa-sun' },
    { id: 'Almuerzos', nombre: 'Sopas & Almuerzos', icono: 'fa-solid fa-bowl-food' },
    { id: 'Cachapas', nombre: 'Cachapas', icono: 'fa-solid fa-wheat-awn' },
    { id: 'Comida Rápida', nombre: 'Rápida & Parrilla', icono: 'fa-solid fa-burger' },
    { id: 'Bebidas', nombre: 'Bebidas Frías', icono: 'fa-solid fa-bottle-water' }
  ];

  contenedor.innerHTML = categorias.map(c => {
    const activa = c.id === categoriaSeleccionada;
    return `
      <button 
        onclick="seleccionarCategoria('${c.id}')"
        class="flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
          activa 
            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105' 
            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700/60 hover:bg-rose-50 dark:hover:bg-stone-700'
        }">
        <i class="${c.icono} text-xs"></i>
        <span>${c.nombre}</span>
      </button>
    `;
  }).join('');
}

function seleccionarCategoria(catId) {
  categoriaSeleccionada = catId;
  renderizarCategorias();
  renderizarPlatos();

  const tit = document.getElementById('tituloCategoriaActiva');
  const sub = document.getElementById('subtituloCategoria');
  if (catId === 'Todos') {
    tit.textContent = 'Todos los Platos';
    sub.textContent = 'Explora nuestro menú disponible para despacho inmediato';
  } else {
    tit.textContent = catId;
    sub.textContent = `Platos calientes y opciones disponibles en ${catId}`;
  }
}

// ==========================================
// RENDERIZADO DE PLATOS
// ==========================================
function renderizarPlatos() {
  const grid = document.getElementById('gridPlatos');
  const estadoVacio = document.getElementById('estadoVacio');
  const contador = document.getElementById('contadorPlatos');
  const inputBusqueda = document.getElementById('inputBuscador');
  const termino = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : '';

  let filtrados = platos;
  if (categoriaSeleccionada !== 'Todos') {
    filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
  }
  if (termino) {
    filtrados = filtrados.filter(p => 
      p.nombre.toLowerCase().includes(termino) || 
      p.descripcion.toLowerCase().includes(termino) ||
      p.categoria.toLowerCase().includes(termino)
    );
  }

  contador.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'plato' : 'platos'}`;

  if (filtrados.length === 0) {
    grid.innerHTML = '';
    estadoVacio.classList.remove('hidden');
    return;
  }

  estadoVacio.classList.add('hidden');
  grid.innerHTML = filtrados.map(p => `
    <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group">
      
      <!-- Contenedor Foto -->
      <div class="relative h-48 bg-stone-950 overflow-hidden cursor-pointer" onclick="abrirModalPlato('${p.id}')">
        <img 
          src="${getRutaFoto(p.foto)}" 
          alt="${p.nombre}" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
        
        <!-- Píldora de Categoría -->
        <span class="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
          ${p.icono || '🍽️'} ${p.categoria}
        </span>

        <!-- Badge Precio -->
        <span class="absolute top-3 right-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-900 dark:text-white font-black text-xs px-3 py-1 rounded-full shadow-md border border-stone-200 dark:border-stone-700">
          $${p.precio.toFixed(2)}
        </span>
      </div>

      <!-- Información del Plato -->
      <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 class="font-heading font-black text-base text-stone-900 dark:text-white leading-snug group-hover:text-rose-600 transition">
            ${p.nombre}
          </h4>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            ${p.descripcion}
          </p>
        </div>

        <!-- Botones de Acción -->
        <div class="pt-2 flex items-center space-x-2">
          <button 
            onclick="abrirModalPlato('${p.id}')"
            class="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-md shadow-rose-600/20 flex items-center justify-center space-x-1.5 transition">
            <i class="fa-solid fa-plus-circle text-xs"></i>
            <span>Pedir / Extras</span>
          </button>
          
          <button 
            onclick="compartirPlato('${p.id}')"
            class="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center transition shadow-xs"
            title="Compartir Plato">
            <i class="fa-solid fa-share-nodes text-xs"></i>
          </button>
        </div>

      </div>

    </div>
  `).join('');
}

// Búsqueda en tiempo real
function filtrarPorBusqueda() {
  const input = document.getElementById('inputBuscador');
  const btnLimpiar = document.getElementById('btnLimpiarBuscador');
  if (input.value) {
    btnLimpiar.classList.remove('hidden');
  } else {
    btnLimpiar.classList.add('hidden');
  }
  renderizarPlatos();
}

function limpiarBuscador() {
  const input = document.getElementById('inputBuscador');
  input.value = '';
  document.getElementById('btnLimpiarBuscador').classList.add('hidden');
  renderizarPlatos();
}

// ==========================================
// MODAL DE PLATO Y CÁLCULO DE EXTRAS
// ==========================================
function abrirModalPlato(id) {
  platoSeleccionadoModal = platos.find(p => p.id === id);
  if (!platoSeleccionadoModal) return;

  cantidadModal = 1;
  document.getElementById('modalCantidad').textContent = '1';
  document.getElementById('modalTituloPlato').textContent = platoSeleccionadoModal.nombre;
  document.getElementById('modalDescripcionPlato').textContent = platoSeleccionadoModal.descripcion;
  document.getElementById('modalCategoriaPlato').textContent = platoSeleccionadoModal.categoria;
  document.getElementById('modalFotoPlato').src = getRutaFoto(platoSeleccionadoModal.foto);
  document.getElementById('modalPrecioBase').textContent = `$${platoSeleccionadoModal.precio.toFixed(2)}`;
  document.getElementById('inputNotasCocina').value = '';

  // Renderizar checkboxes de extras
  const contenedorExtras = document.getElementById('contenedorExtras');
  if (platoSeleccionadoModal.extras && platoSeleccionadoModal.extras.length > 0) {
    contenedorExtras.innerHTML = platoSeleccionadoModal.extras.map(e => `
      <label class="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 cursor-pointer hover:border-rose-400 transition text-xs">
        <div class="flex items-center space-x-2.5">
          <input 
            type="checkbox" 
            value="${e.id}" 
            data-precio="${e.precio}" 
            data-nombre="${e.nombre}" 
            onchange="calcularTotalModal()"
            class="checkbox-extra w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-stone-300">
          <span class="font-medium text-stone-800 dark:text-stone-200">${e.nombre}</span>
        </div>
        <span class="font-bold text-rose-600 dark:text-rose-400">+${e.precio > 0 ? '$' + e.precio.toFixed(2) : 'Gratis'}</span>
      </label>
    `).join('');
  } else {
    contenedorExtras.innerHTML = `
      <p class="text-xs text-stone-400 italic">Este plato no tiene adicionales opcionales.</p>
    `;
  }

  calcularTotalModal();
  document.getElementById('modalPlato').classList.remove('hidden');
}

function cerrarModalPlato() {
  document.getElementById('modalPlato').classList.add('hidden');
  platoSeleccionadoModal = null;
}

function modificarCantidadModal(delta) {
  cantidadModal = Math.max(1, cantidadModal + delta);
  document.getElementById('modalCantidad').textContent = cantidadModal;
  calcularTotalModal();
}

function calcularTotalModal() {
  if (!platoSeleccionadoModal) return;
  let totalUnitario = platoSeleccionadoModal.precio;
  
  const checkboxes = document.querySelectorAll('.checkbox-extra:checked');
  checkboxes.forEach(cb => {
    totalUnitario += parseFloat(cb.dataset.precio || 0);
  });

  const totalFinal = totalUnitario * cantidadModal;
  document.getElementById('modalTotalCalculado').textContent = `$${totalFinal.toFixed(2)}`;
}

function agregarPlatoAComanda() {
  if (!platoSeleccionadoModal) return;

  const extrasSeleccionados = [];
  let sumaExtras = 0;
  const checkboxes = document.querySelectorAll('.checkbox-extra:checked');
  checkboxes.forEach(cb => {
    extrasSeleccionados.push({
      nombre: cb.dataset.nombre,
      precio: parseFloat(cb.dataset.precio || 0)
    });
    sumaExtras += parseFloat(cb.dataset.precio || 0);
  });

  const notas = document.getElementById('inputNotasCocina').value.trim();

  comanda.push({
    idUnico: Date.now().toString(),
    platoId: platoSeleccionadoModal.id,
    nombre: platoSeleccionadoModal.nombre,
    precioBase: platoSeleccionadoModal.precio,
    extras: extrasSeleccionados,
    notas: notas,
    cantidad: cantidadModal,
    totalItem: (platoSeleccionadoModal.precio + sumaExtras) * cantidadModal
  });

  localStorage.setItem('adomicilio_comanda', JSON.stringify(comanda));
  actualizarBadgeComanda();
  cerrarModalPlato();
  mostrarToast(`¡${platoSeleccionadoModal.nombre} agregado a la comanda! 🍲`);
}

// ==========================================
// MODAL DE COMANDA / PEDIDOS
// ==========================================
function abrirModalComanda() {
  renderizarListaComanda();
  document.getElementById('modalComanda').classList.remove('hidden');
}

function cerrarModalComanda() {
  document.getElementById('modalComanda').classList.add('hidden');
}

function actualizarBadgeComanda() {
  const badge = document.getElementById('badgeCantidadComanda');
  const totalItems = comanda.reduce((sum, item) => sum + item.cantidad, 0);
  if (badge) {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove('opacity-0');
    }
  }
}

function renderizarListaComanda() {
  const contenedor = document.getElementById('listaComandaItems');
  const labelTotal = document.getElementById('comandaTotalPagar');

  if (comanda.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center py-8 text-stone-400">
        <i class="fa-solid fa-receipt text-3xl mb-2 opacity-50"></i>
        <p class="text-xs font-medium">Tu comanda está vacía.</p>
        <p class="text-[11px] text-stone-500 mt-0.5">Agrega empanadas, sopas o cachapas para despachar.</p>
      </div>
    `;
    labelTotal.textContent = '$0.00';
    return;
  }

  let granTotal = 0;
  contenedor.innerHTML = comanda.map((item, idx) => {
    granTotal += item.totalItem;
    return `
      <div class="bg-stone-50 dark:bg-stone-800/80 p-3 rounded-2xl border border-stone-200 dark:border-stone-700/60 flex items-start justify-between gap-2 text-xs">
        <div class="flex-1 space-y-1">
          <div class="flex items-center space-x-1.5 font-black text-stone-900 dark:text-white">
            <span class="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center text-[10px]">${item.cantidad}x</span>
            <span>${item.nombre}</span>
          </div>
          ${item.extras.length > 0 ? `
            <div class="pl-6 text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5">
              ${item.extras.map(e => `<div>+ ${e.nombre} ($${e.precio.toFixed(2)})</div>`).join('')}
            </div>
          ` : ''}
          ${item.notas ? `
            <div class="pl-6 text-[10px] text-amber-600 dark:text-amber-400 italic">
              Nota: "${item.notas}"
            </div>
          ` : ''}
        </div>
        <div class="text-right flex flex-col items-end space-y-1">
          <span class="font-black text-rose-600 dark:text-rose-400">$${item.totalItem.toFixed(2)}</span>
          <button onclick="eliminarItemComanda(${idx})" class="text-stone-400 hover:text-red-500 transition text-[11px]" title="Quitar">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  labelTotal.textContent = `$${granTotal.toFixed(2)}`;
}

function eliminarItemComanda(idx) {
  comanda.splice(idx, 1);
  localStorage.setItem('adomicilio_comanda', JSON.stringify(comanda));
  actualizarBadgeComanda();
  renderizarListaComanda();
}

function enviarComandaWhatsApp() {
  if (comanda.length === 0) {
    mostrarToast('Tu comanda está vacía');
    return;
  }

  const nombre = document.getElementById('comandaClienteNombre').value.trim();
  const direccion = document.getElementById('comandaClienteDireccion').value.trim();

  if (!nombre) {
    mostrarToast('Por favor escribe tu nombre');
    document.getElementById('comandaClienteNombre').focus();
    return;
  }
  if (!direccion) {
    mostrarToast('Por favor escribe la dirección de entrega');
    document.getElementById('comandaClienteDireccion').focus();
    return;
  }

  let granTotal = 0;
  let mensaje = `👋 *¡HOLA A DOMICILIO! DESEO CONFIRMAR ESTA COMANDA:*\n\n`;
  mensaje += `👤 *Cliente:* ${nombre}\n`;
  mensaje += `📍 *Dirección de Entrega:* ${direccion}\n\n`;
  mensaje += `🍽️ *DETALLE DE LA ORDEN:*\n`;

  comanda.forEach((item, i) => {
    granTotal += item.totalItem;
    mensaje += `\n*${i + 1}. [${item.cantidad}x] ${item.nombre}* - $${item.totalItem.toFixed(2)}\n`;
    if (item.extras.length > 0) {
      item.extras.forEach(e => {
        mensaje += `   ➕ ${e.nombre}\n`;
      });
    }
    if (item.notas) {
      mensaje += `   📝 _Instrucción: ${item.notas}_\n`;
    }
  });

  mensaje += `\n💰 *TOTAL A PAGAR: $${granTotal.toFixed(2)} USD*\n\n`;
  mensaje += `¿Me confirman tiempo estimado de despacho para mi zona? ¡Gracias! 🔥`;

  // Número por defecto de cocina (configurable en admin)
  const telefonoCocina = '584120000000';
  const urlWhatsApp = `https://wa.me/${telefonoCocina}?text=${encodeURIComponent(mensaje)}`;

  window.open(urlWhatsApp, '_blank');
  mostrarToast('¡Comanda enviada a WhatsApp! 📲');
}

// ==========================================
// COMPARTIR PLATO
// ==========================================
function compartirPlato(id) {
  const p = platos.find(x => x.id === id);
  if (!p) return;
  const texto = `¡Mira este delicioso plato en A Domicilio!: *${p.nombre}* a solo $${p.precio.toFixed(2)}`;
  if (navigator.share) {
    navigator.share({
      title: 'A Domicilio',
      text: texto,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${texto} - ${window.location.href}`);
    mostrarToast('Enlace copiado al portapapeles 📋');
  }
}

// ==========================================
// CHAT WEB EN VIVO
// ==========================================
function abrirModalChat() {
  document.getElementById('modalChat').classList.remove('hidden');
}

function cerrarModalChat() {
  document.getElementById('modalChat').classList.add('hidden');
}

function enviarMensajeChat() {
  const input = document.getElementById('chatInputTexto');
  const texto = input.value.trim();
  if (!texto) return;

  const area = document.getElementById('chatMensajesArea');
  
  // Mensaje del Comensal
  const msgUser = document.createElement('div');
  msgUser.className = 'flex items-start justify-end space-x-2';
  msgUser.innerHTML = `
    <div class="bg-rose-600 text-white rounded-2xl rounded-tr-none p-3 max-w-[80%] text-xs shadow-xs">
      ${texto}
    </div>
  `;
  area.appendChild(msgUser);
  input.value = '';
  area.scrollTop = area.scrollHeight;

  // Respuesta simulada de Cocina en 1 segundo
  setTimeout(() => {
    const msgRespuesta = document.createElement('div');
    msgRespuesta.className = 'flex items-start space-x-2';
    msgRespuesta.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs flex-shrink-0">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <div class="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded-2xl rounded-tl-none p-3 max-w-[80%] text-xs shadow-xs text-stone-800 dark:text-stone-200">
        ¡Mensaje recibido! Nuestro equipo de cocina está en línea. Si deseas que preparemos tu pedido de inmediato, envíanos tu comanda por WhatsApp. 🛵💨
      </div>
    `;
    area.appendChild(msgRespuesta);
    area.scrollTop = area.scrollHeight;
  }, 1000);
}

// ==========================================
// TOAST FLOTANTE DE CONFIRMACIÓN
// ==========================================
function mostrarToast(mensaje) {
  const toast = document.getElementById('toastNotificacion');
  const texto = document.getElementById('toastMensaje');
  if (!toast || !texto) return;

  texto.textContent = mensaje;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}
