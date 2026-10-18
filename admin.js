/**
 * A Domicilio - Logica del Panel Administrador
 * Programador / Responsable: ANDY Paz (elchichote@gmail.com)
 */

// Helper para normalizar rutas de imágenes en local y GitHub Pages
function getRutaFoto(ruta) {
  if (!ruta) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100';
  if (ruta.startsWith('http://') || ruta.startsWith('https://') || ruta.startsWith('data:') || ruta.startsWith('blob:')) return ruta;
  return ruta.replace(/^\.\.\//, '');
}

let platosAdmin = JSON.parse(localStorage.getItem('adomicilio_platos_custom') || 'null');

const VERSION_ADMIN_CATALOGO = 'v3.3_opciones_rellenos_opcionales';
const versionGuardadaAdmin = localStorage.getItem('adomicilio_version_catalogo');

if (!platosAdmin || versionGuardadaAdmin !== VERSION_ADMIN_CATALOGO) {
  platosAdmin = [
    {
      id: 'D01',
      nombre: 'Trío de Empanadas de Maíz Crujientes (Mechada, Molida, Pollo)',
      categoria: 'Desayunos',
      descripcion: '3 empanadas doraditas de harina de maíz recién fritas con masa crujiente. Rellenos a elegir: carne mechada jugosa, molida criolla, pollo mechado, cazón margariteño o queso blanco derretido.',
      precio: 4.50,
      disponible: true,
      foto: 'assets/imagenes/empanadas_maiz_reales.png'
    },
    {
      id: 'D02',
      nombre: 'Ración de Tequeños Dorados Artesanales (6 unid)',
      categoria: 'Desayunos',
      descripcion: 'Seis tequeños tradicionales de masa de trigo crujiente rellenos de abundante queso blanco derretido, acompañados de guasacaca cremosa.',
      precio: 5.00,
      disponible: true,
      foto: 'assets/imagenes/tequenos_reales.png'
    },
    {
      id: 'D03',
      nombre: 'Empanadas de Trigo y Pastelitos Andinos (3 unid)',
      categoria: 'Desayunos',
      descripcion: 'Tres pastelitos de masa fina de trigo con borde repulgado y fritura crujiente, rellenos de carne molida sazonada, pollo o queso.',
      precio: 4.50,
      disponible: true,
      foto: 'assets/imagenes/empanadas_trigo_reales.png'
    },
    {
      id: 'D05',
      nombre: 'Ración de Arepitas Tostadas Rellenas (3 unid)',
      categoria: 'Desayunos',
      descripcion: 'Tres arepitas doradas y asadas rellenas con abundante carne mechada, pollo desmechado y queso amarillo rallado, acompañadas de nata llanera.',
      precio: 5.50,
      disponible: true,
      foto: 'assets/imagenes/empanadas_maiz_reales.png'
    },
    {
      id: 'A01',
      nombre: 'Sopa Criolla de Costilla de Res con Arroz y Arepitas',
      categoria: 'Almuerzos',
      descripcion: 'Poderoso sancocho de costilla de res tierna con jojoto, yuca y cilantro, acompañado con porción de arroz blanco y 2 arepitas.',
      precio: 7.50,
      disponible: true,
      foto: 'assets/imagenes/sopa_costilla_arepitas.jpg'
    },
    {
      id: 'A02',
      nombre: 'Sopa de Pollo de Campo con Arroz y Arepitas',
      categoria: 'Almuerzos',
      descripcion: 'Humeante y reconfortante sopa de pollo criollo con verduras campesinas, servida con arroz blanco y arepitas doradas.',
      precio: 6.50,
      disponible: true,
      foto: 'assets/imagenes/sopa_costilla_arepitas.jpg'
    },
    {
      id: 'C01',
      nombre: 'Cachapa Tradicional con Queso de Mano y Cochino Frito',
      categoria: 'Cachapas',
      descripcion: 'Cachapa de maíz tierno recién molido dorada en budare, rellena de auténtico queso de mano y trozos de cochino frito.',
      precio: 8.50,
      disponible: true,
      foto: 'assets/imagenes/cachapa_queso_mano.jpg'
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
      nombre: 'Pizza Familiar Artesanal con Queso Fundido',
      categoria: 'Comida Rápida',
      descripcion: 'Pizza familiar horneada a la piedra con salsa de tomate natural, abundante queso mozzarella fundido y orégano.',
      precio: 10.00,
      disponible: true,
      foto: 'assets/imagenes/pizza_artesanal_real.png'
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
      id: 'B01',
      nombre: 'Refresco en Botella Familiar (Coca-Cola / Pepsi / Chinotto)',
      categoria: 'Bebidas',
      descripcion: 'Refresco bien frío en botella retornable o no retornable a elegir sabor y tamaño (1 Litro, 1.5 Litros o 2 Litros).',
      precio: 2.50,
      disponible: true,
      foto: 'assets/imagenes/refrescos_1l_variados.png'
    },
    {
      id: 'B02',
      nombre: 'Refresco en Lata Fría 355ml (Coca-Cola / Pepsi / Frescolita)',
      categoria: 'Bebidas',
      descripcion: 'Lata individual de refresco extra fría lista para destapar: Coca-Cola, Pepsi, Frescolita, Chinotto, Hit Naranja o Hit Uva.',
      precio: 1.50,
      disponible: true,
      foto: 'assets/imagenes/coca_cola_lata.png'
    },
    {
      id: 'B03',
      nombre: 'Jugo Natural Frío de Frutas (500ml)',
      categoria: 'Bebidas',
      descripcion: 'Jugo 100% natural preparado al instante bien frío: Piña, Parchita, Melón o Fresa.',
      precio: 2.00,
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80'
    }
  ];
  guardarEnStorage();
  localStorage.setItem('adomicilio_version_catalogo', VERSION_ADMIN_CATALOGO);
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTablaAdmin();
  actualizarMetricas();
  actualizarIconoTemaAdmin();
  configurarCierreModalesAdmin();
  actualizarSelectsCategoriasAdmin();
  configurarDragAndDropFotoAdmin();
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
        <td class="py-3 px-4 font-black text-emerald-600 dark:text-emerald-400 text-sm">
          $${p.precio.toFixed(2)}
        </td>
        <td class="py-3 px-4">
          <button onclick="toggleDisponibilidad('${p.id}')" class="px-3 py-1 rounded-full font-bold text-[11px] transition ${
            p.disponible 
              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200' 
              : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200'
          }">
            <i class="fa-solid ${p.disponible ? 'fa-check' : 'fa-ban'} mr-1"></i>
            ${p.disponible ? 'Disponible Hoy' : 'Agotado'}
          </button>
        </td>
        <td class="py-3 px-4 text-right space-x-2">
          <button onclick="editarPlato('${p.id}')" class="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-600 transition" title="Editar">
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
            <img src="${getRutaFoto(p.foto)}" alt="${p.nombre}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'" class="rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shadow-xs shrink-0" style="width: 58px; height: 58px; min-width: 58px; min-height: 58px;">
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1.5">
                <h4 class="font-bold text-xs sm:text-sm text-stone-900 dark:text-white leading-tight break-words">${p.nombre}</h4>
                <span class="font-black text-emerald-600 dark:text-emerald-400 text-sm shrink-0">$${p.precio.toFixed(2)}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-1">
                <span class="px-2 py-0.5 rounded-full bg-stone-200/70 dark:bg-stone-700/80 text-[10px] font-bold text-stone-700 dark:text-stone-300">
                  ${p.categoria}
                </span>
                <span class="text-[10px] text-stone-400 font-mono">#${p.id}</span>
              </div>
              ${p.descripcion ? `<p class="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-snug">${p.descripcion}</p>` : ''}
            </div>
          </div>

          <!-- Fila Inferior: Disponibilidad, Editar y Eliminar (100% visible, sin cortes) -->
          <div class="flex items-center gap-2 pt-1 border-t border-stone-200/60 dark:border-stone-700/50">
            <!-- Botón Disponibilidad -->
            <button onclick="toggleDisponibilidad('${p.id}')" class="flex-1 py-1.5 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
              p.disponible 
                ? 'bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200' 
                : 'bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
            }">
              <i class="fa-solid ${p.disponible ? 'fa-circle-check text-emerald-600 dark:text-emerald-400' : 'fa-circle-xmark text-emerald-600 dark:text-emerald-400'} text-xs"></i>
              <span>${p.disponible ? 'Disponible' : 'Agotado'}</span>
            </button>

            <!-- Botón Editar -->
            <button onclick="editarPlato('${p.id}')" class="py-1.5 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition">
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

  const mensajes = JSON.parse(localStorage.getItem('adomicilio_mensajes_chat') || '[]');
  const elMensajes = document.getElementById('metricaMensajes');
  if (elMensajes) elMensajes.textContent = mensajes.length;

  const badgeChat = document.getElementById('badgeAdminChat');
  if (badgeChat) {
    if (mensajes.length > 0) badgeChat.classList.remove('hidden');
    else badgeChat.classList.add('hidden');
  }
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
function mostrarPreviewFoto(url) {
  const img = document.getElementById('previewFotoImg');
  const icono = document.getElementById('previewFotoIcono');
  if (!img || !icono) return;

  if (url && typeof url === 'string' && url.trim() !== '') {
    img.src = getRutaFoto(url.trim());
    img.classList.remove('hidden');
    icono.classList.add('hidden');
  } else {
    img.src = '';
    img.classList.add('hidden');
    icono.classList.remove('hidden');
  }
}

function parsearEnlaceGoogleDrive(enlace) {
  if (!enlace || typeof enlace !== 'string') return enlace;
  const url = enlace.trim();
  // Formato 1: drive.google.com/file/d/FILE_ID/view...
  const matchFileD = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return `https://lh3.googleusercontent.com/d/${matchFileD[1]}`;
  }
  // Formato 2: drive.google.com/open?id=FILE_ID o uc?id=FILE_ID
  const matchId = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
  }
  return url;
}

function actualizarPreviewDesdeInput() {
  const input = document.getElementById('editFoto');
  if (!input) return;
  let valor = input.value.trim();
  
  // Si pegó un enlace de Google Drive, auto-convertirlo al formato de imagen directa
  const enlaceDirecto = parsearEnlaceGoogleDrive(valor);
  if (enlaceDirecto !== valor) {
    input.value = enlaceDirecto;
    valor = enlaceDirecto;
    mostrarToastAdmin('¡Enlace de Google Drive transformado a imagen directa!');
  }
  
  mostrarPreviewFoto(valor);
}

function manejarSeleccionFotoPlato(event) {
  const archivo = event.target?.files?.[0];
  if (archivo) {
    procesarArchivoFoto(archivo);
  }
}

function procesarArchivoFoto(archivo) {
  if (!archivo || !archivo.type.startsWith('image/')) {
    mostrarToastAdmin('Por favor selecciona un archivo de imagen válido (JPG, PNG o WEBP).');
    return;
  }

  mostrarToastAdmin('Optimizando foto para carga ultrarrápida...');

  const lector = new FileReader();
  lector.onload = function(e) {
    const imgOriginal = new Image();
    imgOriginal.onload = function() {
      // Redimensionar proporcionalmente a máx 800px para que pese muy poco y cargue al instante
      const maxDim = 800;
      let ancho = imgOriginal.width;
      let alto = imgOriginal.height;

      if (ancho > maxDim || alto > maxDim) {
        if (ancho > alto) {
          alto = Math.round((alto * maxDim) / ancho);
          ancho = maxDim;
        } else {
          ancho = Math.round((ancho * maxDim) / alto);
          alto = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = ancho;
      canvas.height = alto;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgOriginal, 0, 0, ancho, alto);

      // Comprimir a JPEG con calidad 82%
      const fotoDataUrl = canvas.toDataURL('image/jpeg', 0.82);

      const inputFoto = document.getElementById('editFoto');
      if (inputFoto) {
        inputFoto.value = fotoDataUrl;
      }
      mostrarPreviewFoto(fotoDataUrl);
      mostrarToastAdmin('¡Foto cargada y lista para guardar!');
    };
    imgOriginal.onerror = function() {
      mostrarToastAdmin('No se pudo procesar la imagen seleccionada.');
    };
    imgOriginal.src = e.target.result;
  };
  lector.readAsDataURL(archivo);
}

function configurarDragAndDropFotoAdmin() {
  const dropzone = document.getElementById('dropzoneFotoAdmin');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(evento => {
    dropzone.addEventListener(evento, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('border-emerald-500', 'bg-emerald-50/50', 'dark:bg-emerald-950/30');
    }, false);
  });

  ['dragleave', 'drop'].forEach(evento => {
    dropzone.addEventListener(evento, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/50', 'dark:bg-emerald-950/30');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const archivos = e.dataTransfer?.files;
    if (archivos && archivos.length > 0) {
      procesarArchivoFoto(archivos[0]);
    }
  }, false);
}

function abrirModalNuevoPlato() {
  actualizarSelectsCategoriasAdmin();
  document.getElementById('modalEditarTitulo').textContent = 'Agregar Nuevo Plato';
  document.getElementById('editPlatoId').value = '';
  document.getElementById('editNombre').value = '';
  const primerCat = obtenerCategoriasAdmin()[0];
  document.getElementById('editCategoria').value = primerCat ? primerCat.id : 'Desayunos';
  document.getElementById('editPrecio').value = '';
  document.getElementById('editDescripcion').value = '';
  document.getElementById('editFoto').value = '';
  mostrarPreviewFoto('');
  
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

  actualizarSelectsCategoriasAdmin();
  document.getElementById('modalEditarTitulo').textContent = 'Editar Plato y Salsas';
  document.getElementById('editPlatoId').value = p.id;
  document.getElementById('editNombre').value = p.nombre;
  document.getElementById('editCategoria').value = p.categoria;
  document.getElementById('editPrecio').value = p.precio;
  document.getElementById('editDescripcion').value = p.descripcion;
  document.getElementById('editFoto').value = p.foto;
  mostrarPreviewFoto(p.foto);

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
      class="extra-nombre flex-1 px-2.5 py-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 text-stone-900 dark:text-white">
    <div class="flex items-center space-x-1 w-24">
      <span class="text-xs text-stone-400 font-bold">$</span>
      <input 
        type="number" 
        step="0.25" 
        min="0" 
        placeholder="0.50" 
        value="${precio}" 
        class="extra-precio w-full px-2 py-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 text-stone-900 dark:text-white text-right">
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
    { id: 'modalConfigGeneral', close: cerrarModalConfigGeneral },
    { id: 'modalGestionCategorias', close: cerrarModalGestionCategorias },
    { id: 'modalConfigSplash', close: cerrarModalConfigSplash }
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

  listaContenedor.innerHTML = mensajes.slice().reverse().map((m, idxRev) => {
    const idxOriginal = mensajes.length - 1 - idxRev;
    const esAdmin = m.emisor === 'admin';
    return `
      <div class="p-3.5 rounded-2xl ${esAdmin ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60' : 'bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/70'} shadow-xs space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold ${esAdmin ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-900 dark:text-white'} flex items-center gap-1.5">
            <i class="fa-solid ${esAdmin ? 'fa-utensils text-emerald-600' : 'fa-user-circle text-stone-500'}"></i>
            ${m.cliente || (esAdmin ? 'Cocina A Domicilio' : 'Comensal')}
          </span>
          <div class="flex items-center space-x-2">
            <span class="text-[10px] text-stone-400">${m.fecha || ''}</span>
            <button onclick="eliminarMensajeChatAdmin('${m.id || ''}', ${idxOriginal})" class="w-6 h-6 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 flex items-center justify-center transition cursor-pointer" title="Eliminar esta consulta">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        </div>

        ${m.plato ? `
          <div class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
            <i class="fa-solid fa-utensils text-[10px]"></i>
            <span>Consultó sobre: ${m.plato} (${m.categoria || 'Menú'})</span>
          </div>
        ` : ''}

        <p class="text-xs text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-900/60 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800">
          "${m.mensaje}"
        </p>

        ${!esAdmin ? `
          <div class="flex items-center justify-end space-x-2 pt-1">
            <button onclick="responderPorWhatsAppAdmin('${m.plato || ''}', '${encodeURIComponent(m.mensaje)}')" class="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center space-x-1.5 transition cursor-pointer">
              <i class="fa-brands fa-whatsapp text-xs"></i>
              <span>Responder en WhatsApp</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function eliminarMensajeChatAdmin(idMensaje, idxOriginal) {
  let mensajes = JSON.parse(localStorage.getItem('adomicilio_mensajes_chat') || '[]');
  if (idMensaje) {
    mensajes = mensajes.filter(m => m.id !== idMensaje);
  } else if (typeof idxOriginal === 'number' && idxOriginal >= 0 && idxOriginal < mensajes.length) {
    mensajes.splice(idxOriginal, 1);
  }
  localStorage.setItem('adomicilio_mensajes_chat', JSON.stringify(mensajes));
  renderizarAdminChat();
  actualizarMetricas();
  mostrarToastAdmin('Consulta eliminada del registro');
}

function confirmarVaciarTodoChatAdmin() {
  const mensajes = JSON.parse(localStorage.getItem('adomicilio_mensajes_chat') || '[]');
  if (mensajes.length === 0) {
    mostrarToastAdmin('No hay consultas registradas para vaciar');
    return;
  }
  if (!confirm('¿Deseas vaciar todas las consultas del chat de clientes? Esta acción eliminará el historial del panel.')) {
    return;
  }
  localStorage.removeItem('adomicilio_mensajes_chat');
  renderizarAdminChat();
  actualizarMetricas();
  mostrarToastAdmin('Historial de chat vaciado con éxito');
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
  actualizarMetricas();
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

// ==========================================
// GESTIÓN DINÁMICA DE CATEGORÍAS
// ==========================================
const CATEGORIAS_DEFAULT = [
  { id: 'Desayunos', nombre: 'Desayuno Criollo', nombreMovil: 'Desayunos', icono: 'fa-solid fa-sun' },
  { id: 'Almuerzos', nombre: 'Sopas & Almuerzos', nombreMovil: 'Sopas', icono: 'fa-solid fa-bowl-food' },
  { id: 'Cachapas', nombre: 'Cachapas Tradicionales', nombreMovil: 'Cachapas', icono: 'fa-solid fa-wheat-awn' },
  { id: 'Comida Rápida', nombre: 'Rápida & Parrilla', nombreMovil: 'Rápida', icono: 'fa-solid fa-burger' },
  { id: 'Bebidas', nombre: 'Bebidas Frías', nombreMovil: 'Bebidas', icono: 'fa-solid fa-bottle-water' }
];

function obtenerCategoriasAdmin() {
  const guardadas = localStorage.getItem('adomicilio_categorias');
  if (guardadas) {
    try {
      const parsed = JSON.parse(guardadas);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  return CATEGORIAS_DEFAULT;
}

function guardarCategoriasAdmin(lista) {
  localStorage.setItem('adomicilio_categorias', JSON.stringify(lista));
  actualizarSelectsCategoriasAdmin();
}

function actualizarSelectsCategoriasAdmin() {
  const selectEdit = document.getElementById('editCategoria');
  const selectCfg = document.getElementById('cfgCategoriaPredeterminada');
  const cats = obtenerCategoriasAdmin();

  if (selectEdit) {
    const valActual = selectEdit.value;
    selectEdit.innerHTML = cats.map(c => `
      <option value="${c.id}">${c.nombre} (${c.id})</option>
    `).join('');
    if (valActual && cats.some(c => c.id === valActual)) {
      selectEdit.value = valActual;
    }
  }

  if (selectCfg) {
    const valCfg = selectCfg.value;
    selectCfg.innerHTML = `<option value="Todos">Todos los Platos (Por defecto)</option>` + cats.map(c => `
      <option value="${c.id}">${c.nombre}</option>
    `).join('');
    if (valCfg) selectCfg.value = valCfg;
  }
}

function abrirModalGestionCategorias() {
  renderizarListaCategoriasAdmin();
  document.getElementById('modalGestionCategorias').classList.remove('hidden');
}

function cerrarModalGestionCategorias() {
  document.getElementById('modalGestionCategorias').classList.add('hidden');
}

function renderizarListaCategoriasAdmin() {
  const contenedor = document.getElementById('listaCategoriasAdmin');
  if (!contenedor) return;

  const cats = obtenerCategoriasAdmin();
  contenedor.innerHTML = cats.map((c) => {
    const platosEnCat = platosAdmin.filter(p => p.categoria.toLowerCase() === c.id.toLowerCase() || p.categoria.toLowerCase() === c.nombre.toLowerCase()).length;
    return `
      <div class="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700/60 text-xs">
        <div class="flex items-center space-x-3 min-w-0">
          <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <i class="${c.icono || 'fa-solid fa-utensils'}"></i>
          </div>
          <div class="min-w-0">
            <h5 class="font-bold text-stone-900 dark:text-white truncate">${c.nombre}</h5>
            <span class="text-[10px] text-stone-400">${c.id} • ${platosEnCat} plato${platosEnCat === 1 ? '' : 's'}</span>
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button 
            type="button" 
            onclick="eliminarCategoriaAdmin('${c.id}')" 
            class="w-7 h-7 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white transition flex items-center justify-center cursor-pointer shadow-2xs" 
            title="Eliminar categoría">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function crearNuevaCategoriaAdmin() {
  const input = document.getElementById('nuevaCategoriaNombre');
  const nombre = input ? input.value.trim() : '';
  if (!nombre) {
    alert('Por favor escribe un nombre para la categoría');
    return;
  }

  const cats = obtenerCategoriasAdmin();
  const id = nombre;
  if (cats.some(c => c.id.toLowerCase() === id.toLowerCase())) {
    alert('Ya existe una categoría con ese nombre');
    return;
  }

  let icono = 'fa-solid fa-utensils';
  const nMin = nombre.toLowerCase();
  if (nMin.includes('postre') || nMin.includes('dulce') || nMin.includes('torta')) icono = 'fa-solid fa-cake-candles';
  else if (nMin.includes('bebida') || nMin.includes('jugo') || nMin.includes('refresco')) icono = 'fa-solid fa-bottle-water';
  else if (nMin.includes('parrilla') || nMin.includes('carne') || nMin.includes('pollo')) icono = 'fa-solid fa-drumstick-bite';
  else if (nMin.includes('pizza')) icono = 'fa-solid fa-pizza-slice';
  else if (nMin.includes('combo')) icono = 'fa-solid fa-box-open';
  else if (nMin.includes('sopa') || nMin.includes('hervido')) icono = 'fa-solid fa-bowl-food';
  else if (nMin.includes('desayuno') || nMin.includes('empanada')) icono = 'fa-solid fa-sun';

  cats.push({
    id: id,
    nombre: nombre,
    nombreMovil: nombre.length > 10 ? nombre.substring(0, 10) + '...' : nombre,
    icono: icono
  });

  guardarCategoriasAdmin(cats);
  renderizarListaCategoriasAdmin();
  input.value = '';
  mostrarToastAdmin(`Categoría "${nombre}" creada con éxito 🎉`);
}

function eliminarCategoriaAdmin(id) {
  const platosEnCat = platosAdmin.filter(p => p.categoria.toLowerCase() === id.toLowerCase());
  if (platosEnCat.length > 0) {
    if (!confirm(`La categoría "${id}" tiene ${platosEnCat.length} plato(s) asociado(s). Si la eliminas, esos platos seguirán existiendo en "Todos los platos". ¿Deseas continuar?`)) {
      return;
    }
  } else {
    if (!confirm(`¿Eliminar la categoría "${id}"?`)) return;
  }

  let cats = obtenerCategoriasAdmin();
  cats = cats.filter(c => c.id.toLowerCase() !== id.toLowerCase());
  guardarCategoriasAdmin(cats);
  renderizarListaCategoriasAdmin();
  mostrarToastAdmin(`Categoría eliminada 🗑️`);
}

// ==========================================
// GESTIÓN DE PORTADAS DE INICIO (SPLASH)
// ==========================================
const RUTA_SPLASH_DESKTOP_DEFAULT = 'assets/imagenes/splash_desktop_horizontal.jpg';
const RUTA_SPLASH_MOVIL_DEFAULT = 'assets/imagenes/splash_empanadas_frescas.jpg';

function abrirModalConfigSplash() {
  const deskGuardada = localStorage.getItem('adomicilio_splash_desktop') || RUTA_SPLASH_DESKTOP_DEFAULT;
  const movilGuardada = localStorage.getItem('adomicilio_splash_movil') || RUTA_SPLASH_MOVIL_DEFAULT;

  const inputDesk = document.getElementById('inputUrlSplashDesktop');
  const inputMov = document.getElementById('inputUrlSplashMovil');
  const prevDesk = document.getElementById('previewSplashDesktopImg');
  const prevMov = document.getElementById('previewSplashMovilImg');

  if (inputDesk) inputDesk.value = deskGuardada;
  if (inputMov) inputMov.value = movilGuardada;
  if (prevDesk) prevDesk.src = getRutaFoto(deskGuardada);
  if (prevMov) prevMov.src = getRutaFoto(movilGuardada);

  document.getElementById('modalConfigSplash').classList.remove('hidden');
}

function cerrarModalConfigSplash() {
  document.getElementById('modalConfigSplash').classList.add('hidden');
}

function actualizarPreviewSplashDesdeInput(tipo) {
  if (tipo === 'desktop') {
    const input = document.getElementById('inputUrlSplashDesktop');
    if (!input) return;
    let val = parsearEnlaceGoogleDrive(input.value.trim());
    input.value = val;
    const img = document.getElementById('previewSplashDesktopImg');
    if (img) img.src = getRutaFoto(val || RUTA_SPLASH_DESKTOP_DEFAULT);
  } else {
    const input = document.getElementById('inputUrlSplashMovil');
    if (!input) return;
    let val = parsearEnlaceGoogleDrive(input.value.trim());
    input.value = val;
    const img = document.getElementById('previewSplashMovilImg');
    if (img) img.src = getRutaFoto(val || RUTA_SPLASH_MOVIL_DEFAULT);
  }
}

function manejarSeleccionSplashDesktop(event) {
  const archivo = event.target?.files?.[0];
  if (!archivo || !archivo.type.startsWith('image/')) {
    mostrarToastAdmin('Selecciona un archivo de imagen válido');
    return;
  }
  comprimirYGuardarPortada(archivo, 1920, (dataUrl) => {
    const input = document.getElementById('inputUrlSplashDesktop');
    const img = document.getElementById('previewSplashDesktopImg');
    if (input) input.value = dataUrl;
    if (img) img.src = dataUrl;
    mostrarToastAdmin('¡Foto de PC cargada y optimizada!');
  });
}

function manejarSeleccionSplashMovil(event) {
  const archivo = event.target?.files?.[0];
  if (!archivo || !archivo.type.startsWith('image/')) {
    mostrarToastAdmin('Selecciona un archivo de imagen válido');
    return;
  }
  comprimirYGuardarPortada(archivo, 1280, (dataUrl) => {
    const input = document.getElementById('inputUrlSplashMovil');
    const img = document.getElementById('previewSplashMovilImg');
    if (input) input.value = dataUrl;
    if (img) img.src = dataUrl;
    mostrarToastAdmin('¡Foto móvil cargada y optimizada!');
  });
}

function comprimirYGuardarPortada(archivo, maxDim, callback) {
  const lector = new FileReader();
  lector.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      let ancho = img.width;
      let alto = img.height;
      if (ancho > maxDim || alto > maxDim) {
        if (ancho > alto) {
          alto = Math.round((alto * maxDim) / ancho);
          ancho = maxDim;
        } else {
          ancho = Math.round((ancho * maxDim) / alto);
          alto = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = ancho;
      canvas.height = alto;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, ancho, alto);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  lector.readAsDataURL(archivo);
}

function guardarConfigSplash() {
  const urlDesk = document.getElementById('inputUrlSplashDesktop')?.value.trim() || RUTA_SPLASH_DESKTOP_DEFAULT;
  const urlMov = document.getElementById('inputUrlSplashMovil')?.value.trim() || RUTA_SPLASH_MOVIL_DEFAULT;

  localStorage.setItem('adomicilio_splash_desktop', urlDesk);
  localStorage.setItem('adomicilio_splash_movil', urlMov);

  mostrarToastAdmin('¡Portadas de bienvenida guardadas con éxito! 🖼️');
  cerrarModalConfigSplash();
}

function restaurarSplashPredeterminado() {
  localStorage.removeItem('adomicilio_splash_desktop');
  localStorage.removeItem('adomicilio_splash_movil');

  const inputDesk = document.getElementById('inputUrlSplashDesktop');
  const inputMov = document.getElementById('inputUrlSplashMovil');
  const prevDesk = document.getElementById('previewSplashDesktopImg');
  const prevMov = document.getElementById('previewSplashMovilImg');

  if (inputDesk) inputDesk.value = RUTA_SPLASH_DESKTOP_DEFAULT;
  if (inputMov) inputMov.value = RUTA_SPLASH_MOVIL_DEFAULT;
  if (prevDesk) prevDesk.src = getRutaFoto(RUTA_SPLASH_DESKTOP_DEFAULT);
  if (prevMov) prevMov.src = getRutaFoto(RUTA_SPLASH_MOVIL_DEFAULT);

  mostrarToastAdmin('Portadas restauradas a los valores originales');
}
