/**
 * A Domicilio - Logica Principal del Catalogo y Comandas
 * Programador / Responsable: ANDY Paz (elchichote@gmail.com)
 */

// Helper para normalizar rutas de imágenes en local y GitHub Pages
function getRutaFoto(ruta) {
  if (!ruta) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  if (ruta.startsWith('http://') || ruta.startsWith('https://') || ruta.startsWith('data:') || ruta.startsWith('blob:')) {
    // Si es enlace de Google Drive, asegurar formato directo
    const matchDrive = ruta.match(/drive\.google\.com\/(?:file\/d\/|(?:open|uc)\?(?:.*&)?id=)([a-zA-Z0-9_-]+)/);
    if (matchDrive && matchDrive[1]) {
      return `https://lh3.googleusercontent.com/d/${matchDrive[1]}`;
    }
    return ruta;
  }
  return ruta.replace(/^\.\.\//, '');
}

// Menú Base de Comida Tradicional y Rápida
// Menú Base de Comida Tradicional y Rápida con Fotos Reales y Variedad
const MENU_INICIAL = [
  {
    id: 'D01',
    nombre: 'Empanadas de Harina de Maíz (3 unid)',
    categoria: 'Desayunos',
    icono: '🥟',
    descripcion: 'Tres empanadas doradas y crujientes de harina de maíz precocida con masa crocante. Escoge tus opciones favoritas: queso, guiso de carne, pollo, cazón, mechada o de todo.',
    precio: 4.50,
    foto: 'assets/imagenes/empanadas_maiz_reales.png',
    extras: [
      { id: 'ext_rell_queso', nombre: 'Empanada de Queso blanco', precio: 0.00 },
      { id: 'ext_rell_guiso', nombre: 'Empanada de Guiso (Carne molida)', precio: 0.00 },
      { id: 'ext_rell_pollo', nombre: 'Empanada de Pollo mechado criollo', precio: 0.00 },
      { id: 'ext_rell_cazon', nombre: 'Empanada de Cazón / Sazón oriental', precio: 0.00 },
      { id: 'ext_rell_mechada', nombre: 'Empanada de Carne Mechada', precio: 0.00 },
      { id: 'ext_rell_detodo', nombre: 'Empanada Mixta / De Todo (Combinada)', precio: 0.00 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 },
      { id: 'ext_beb_1_5l', nombre: '🍾 Refresco Botella 1.5 Litros', precio: 3.00 },
      { id: 'ext_guasacaca', nombre: 'Ración extra de Guasacaca verde fresca', precio: 0.50 },
      { id: 'ext_salsa_ajo', nombre: 'Salsa tártara / ajo criollo de la casa', precio: 0.50 }
    ]
  },
  {
    id: 'D02',
    nombre: 'Ración de Tequeños con Guasacaca (6 unid)',
    categoria: 'Desayunos',
    icono: '🧀',
    descripcion: 'Seis tequeños tradicionales venezolanos dorados y crujientes rellenos de abundante queso blanco derretido, servidos con guasacaca verde.',
    precio: 5.00,
    foto: 'assets/imagenes/tequenos_reales.png',
    extras: [
      { id: 'ext_teq_guasacaca', nombre: 'Doble ración de salsa Guasacaca verde', precio: 0.50 },
      { id: 'ext_teq_tartara', nombre: 'Salsa tártara / ajo de la casa', precio: 0.50 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 },
      { id: 'ext_beb_1_5l', nombre: '🍾 Refresco Botella 1.5 Litros', precio: 3.00 }
    ]
  },
  {
    id: 'D03',
    nombre: 'Empanadas de Harina de Trigo / Pastelitos (3 unid)',
    categoria: 'Desayunos',
    icono: '🥟',
    descripcion: 'Tres pastelitos hojaldrados y crujientes de fina masa de trigo con bordes ondulados tradicionales. Rellenos al gusto.',
    precio: 4.50,
    foto: 'assets/imagenes/empanadas_trigo_reales.png',
    extras: [
      { id: 'ext_trigo_queso', nombre: 'Pastelito de Queso blanco', precio: 0.00 },
      { id: 'ext_trigo_guiso', nombre: 'Pastelito de Guiso de carne', precio: 0.00 },
      { id: 'ext_trigo_pollo', nombre: 'Pastelito de Pollo campesino', precio: 0.00 },
      { id: 'ext_trigo_mechada', nombre: 'Pastelito de Carne Mechada', precio: 0.00 },
      { id: 'ext_trigo_detodo', nombre: 'Pastelito Mixto / Con Todo', precio: 0.00 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 },
      { id: 'ext_beb_1_5l', nombre: '🍾 Refresco Botella 1.5 Litros', precio: 3.00 },
      { id: 'ext_past_guasacaca', nombre: 'Ración extra de Guasacaca verde fresca', precio: 0.50 }
    ]
  },
  {
    id: 'D05',
    nombre: 'Ración de Arepitas Tostadas Rellenas',
    categoria: 'Desayunos',
    icono: '🫓',
    descripcion: 'Arepitas asadas en budare doraditas y rellenas al gusto con carne mechada, pollo campesino o queso de mano hilado.',
    precio: 5.00,
    foto: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&auto=format&fit=crop&q=80',
    extras: [
      { id: 'ext_arepa_mechada', nombre: 'Relleno: Carne Mechada jugosa', precio: 0.00 },
      { id: 'ext_arepa_pollo', nombre: 'Relleno: Pollo campesino desmechado', precio: 0.00 },
      { id: 'ext_arepa_queso', nombre: 'Relleno: Queso de Mano hilado', precio: 0.00 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 }
    ]
  },
  {
    id: 'A01',
    nombre: 'Sopa Criolla de Costilla de Res con Arroz y Arepitas',
    categoria: 'Almuerzos',
    icono: '🍲',
    descripcion: 'Poderoso sancocho de costilla de res tierna con jojoto, yuca y cilantro, acompañado con porción de arroz blanco y 2 arepitas calientes.',
    precio: 7.50,
    foto: 'assets/imagenes/sopa_costilla_arepitas.jpg',
    extras: [
      { id: 'ext_sopa_arepas', nombre: '2 Arepitas asadas adicionales', precio: 1.00 },
      { id: 'ext_sopa_arroz', nombre: 'Porción extra de arroz blanco', precio: 1.50 },
      { id: 'ext_sopa_costilla', nombre: 'Ración extra de costilla de res', precio: 3.00 },
      { id: 'ext_sopa_aguacate', nombre: 'Ruedas de aguacate fresco', precio: 1.50 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 }
    ]
  },
  {
    id: 'A02',
    nombre: 'Sopa de Pollo de Campo con Arroz y Arepitas',
    categoria: 'Almuerzos',
    icono: '🍲',
    descripcion: 'Humeante y reconfortante sopa de pollo criollo con verduras campesinas, servida con arroz blanco y arepitas doradas.',
    precio: 6.50,
    foto: 'assets/imagenes/sopa_costilla_arepitas.jpg',
    extras: [
      { id: 'ext_spollo_arepas', nombre: '2 Arepitas asadas adicionales', precio: 1.00 },
      { id: 'ext_spollo_aguacate', nombre: 'Ruedas de aguacate fresco', precio: 1.50 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 }
    ]
  },
  {
    id: 'C01',
    nombre: 'Cachapa Tradicional con Queso de Mano y Cochino Frito',
    categoria: 'Cachapas',
    icono: '🌽',
    descripcion: 'Cachapa de maíz tierno recién molido y dorada en budare, rellena de auténtico queso de mano hilado y trozos de cochino frito crujiente.',
    precio: 8.50,
    foto: 'assets/imagenes/cachapa_queso_mano.jpg',
    extras: [
      { id: 'ext_cach_queso', nombre: 'Doble Queso de Mano hilado', precio: 2.50 },
      { id: 'ext_cach_cochino', nombre: 'Ración extra de Cochino Frito crocante', precio: 3.50 },
      { id: 'ext_cach_nata', nombre: 'Porción de Nata llanera fresca', precio: 1.00 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 }
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
      { id: 'ext_burg_papas', nombre: 'Papas fritas adicionales', precio: 2.00 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 }
    ]
  },
  {
    id: 'R02',
    nombre: 'Pizza Familiar Artesanal con Queso Fundido',
    categoria: 'Comida Rápida',
    icono: '🍕',
    descripcion: 'Pizza familiar horneada a la piedra con salsa de tomate natural, abundante queso mozzarella fundido y orégano.',
    precio: 10.00,
    foto: 'assets/imagenes/pizza_artesanal_real.png',
    extras: [
      { id: 'ext_piz_jamon', nombre: 'Jamón cocido y tocineta crocante', precio: 2.00 },
      { id: 'ext_piz_maiz', nombre: 'Maíz tierno y champiñones', precio: 1.50 },
      { id: 'ext_beb_1_5l', nombre: '🍾 Refresco Botella 1.5L (Coca-Cola/Pepsi/Chinotto)', precio: 3.00 },
      { id: 'ext_beb_2l', nombre: '🍾 Refresco Botella 2 Litros Familiar', precio: 4.00 }
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
      { id: 'ext_dog_queso', nombre: 'Queso amarillo fundido extra', precio: 1.00 },
      { id: 'ext_beb_lata', nombre: '🥤 Refresco en lata fría (355ml)', precio: 1.50 }
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
      { id: 'ext_pol_guasacaca', nombre: 'Guasacaca de la casa', precio: 0.50 },
      { id: 'ext_beb_1_5l', nombre: '🍾 Refresco Botella 1.5 Litros', precio: 3.00 }
    ]
  },
  {
    id: 'B01',
    nombre: 'Refresco en Botella (1.5L / 2L / 1L)',
    categoria: 'Bebidas',
    icono: '🍾',
    descripcion: 'Refresco frío en botella. Elige tu marca favorita (Coca-Cola, Pepsi, Chinotto, Frescolita, Hit Naranja o Hit Uva) y tu tamaño.',
    precio: 3.00,
    foto: 'assets/imagenes/refrescos_1_5l_variados.png',
    extras: [
      { id: 'ext_tam_1l', nombre: 'Tamaño: Botella 1 Litro', precio: -0.50 },
      { id: 'ext_tam_1_5l', nombre: 'Tamaño: Botella 1.5 Litros (Estándar)', precio: 0.00 },
      { id: 'ext_tam_2l', nombre: 'Tamaño: Botella 2 Litros Grande', precio: 1.00 },
      { id: 'ext_sab_coca', nombre: 'Sabor: Coca-Cola Sabor Original', precio: 0.00 },
      { id: 'ext_sab_pepsi', nombre: 'Sabor: Pepsi Cola Fría', precio: 0.00 },
      { id: 'ext_sab_chinotto', nombre: 'Sabor: Chinotto Limón refrescante', precio: 0.00 },
      { id: 'ext_sab_frescolita', nombre: 'Sabor: Frescolita roja tradicional', precio: 0.00 },
      { id: 'ext_sab_hit_nar', nombre: 'Sabor: Hit Naranja', precio: 0.00 },
      { id: 'ext_sab_hit_uva', nombre: 'Sabor: Hit Uva', precio: 0.00 }
    ]
  },
  {
    id: 'B02',
    nombre: 'Refresco en Lata Fría (355ml)',
    categoria: 'Bebidas',
    icono: '🥤',
    descripcion: 'Lata individual bien fría. Elige tu sabor: Coca-Cola Original, Pepsi, 7Up / Chinotto o Frescolita.',
    precio: 1.50,
    foto: 'assets/imagenes/coca_cola_lata.png',
    extras: [
      { id: 'ext_lata_coca', nombre: 'Sabor: Coca-Cola Original', precio: 0.00 },
      { id: 'ext_lata_pepsi', nombre: 'Sabor: Pepsi Fría', precio: 0.00 },
      { id: 'ext_lata_chinotto', nombre: 'Sabor: 7Up / Chinotto Limón', precio: 0.00 },
      { id: 'ext_lata_frescolita', nombre: 'Sabor: Frescolita', precio: 0.00 },
      { id: 'ext_lata_vaso', nombre: 'Incluir vaso con hielo y limón', precio: 0.00 }
    ]
  },
  {
    id: 'B03',
    nombre: 'Jugo Natural Casero Frío (Vaso Grande 500ml)',
    categoria: 'Bebidas',
    icono: '🧃',
    descripcion: 'Jugo 100% de frutas naturales preparado al momento con poco azúcar o sin azúcar.',
    precio: 2.00,
    foto: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800',
    extras: [
      { id: 'ext_jugo_pina', nombre: 'Fruta: Piña natural fresca', precio: 0.00 },
      { id: 'ext_jugo_parchita', nombre: 'Fruta: Parchita / Maracuyá', precio: 0.00 },
      { id: 'ext_jugo_melon', nombre: 'Fruta: Melón dulce', precio: 0.00 },
      { id: 'ext_jugo_fresa', nombre: 'Fruta: Fresa fresca', precio: 0.50 }
    ]
  }
];

function cargarPlatosActivos() {
  const versionActual = 'v3.4_sin_opcional_limpio';
  const versionGuardada = localStorage.getItem('adomicilio_menu_version');
  
  if (versionGuardada !== versionActual) {
    localStorage.setItem('adomicilio_platos_custom', JSON.stringify(MENU_INICIAL));
    localStorage.setItem('adomicilio_menu_version', versionActual);
    return [...MENU_INICIAL];
  }

  const custom = localStorage.getItem('adomicilio_platos_custom');
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  return [...MENU_INICIAL];
}

// Estado de la Aplicación
let platos = cargarPlatosActivos();
let categoriaSeleccionada = 'Todos';
let platoSeleccionadoModal = null;
let cantidadModal = 1;
let comanda = JSON.parse(localStorage.getItem('adomicilio_comanda') || '[]');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const catPred = localStorage.getItem('adomicilio_categoria_predeterminada') || 'Todos';
  categoriaSeleccionada = catPred;

  iniciarSplashPresentacion();
  renderizarCategorias();
  renderizarPlatos();
  actualizarBadgeComanda();
  actualizarIconoTema();
  actualizarBannersDelivery();
  actualizarEmailContactoFooter();
  cargarDatosEntregaGuardados();
  configurarCierreModales();
});

// ==========================================
// PRESENTACIÓN INTRODUCTORIA (SPLASH TEMPORAL 2.5s)
// ==========================================
function iniciarSplashPresentacion() {
  const splash = document.getElementById('splashPresentacion');
  if (!splash) return;

  setTimeout(() => {
    const barra = document.getElementById('barraProgresoSplash');
    if (barra) barra.style.width = '100%';
    const barraMovil = document.getElementById('barraProgresoSplashMovil');
    if (barraMovil) barraMovil.style.width = '100%';
  }, 50);

  setTimeout(() => {
    cerrarSplashInmediato();
  }, 2500);
}

function cerrarSplashInmediato() {
  const splash = document.getElementById('splashPresentacion');
  if (!splash || splash.dataset.cerrado === 'true') return;
  splash.dataset.cerrado = 'true';
  splash.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
  setTimeout(() => {
    splash.style.display = 'none';
  }, 500);
}

// ==========================================
// CORREO DE CONTACTO EN FOOTER
// ==========================================
function actualizarEmailContactoFooter() {
  const email = localStorage.getItem('adomicilio_email_contacto') || 'inghumbertoacosta@gmail.com';
  const aLink = document.getElementById('footerEmailContacto');
  const txtSpan = document.getElementById('textoEmailContacto');
  if (aLink) aLink.href = `mailto:${email}`;
  if (txtSpan) txtSpan.textContent = email;
}

// ==========================================
// CONFIGURACIÓN DE DELIVERY GRATIS
// ==========================================
function obtenerConfigDelivery() {
  const defaultConfig = {
    activo: true,
    minUnidades: 2,
    textoPromo: 'Envío Gratis (2+ unid)',
    condiciones: 'Pide 2 o más empanadas, tequeños, pastelitos, cachapas, sopas, hamburguesas o cualquier especialidad de nuestra carta y el envío corre por cuenta de la casa.'
  };
  try {
    const raw = localStorage.getItem('adomicilio_config_delivery');
    return raw ? { ...defaultConfig, ...JSON.parse(raw) } : defaultConfig;
  } catch(e) {
    return defaultConfig;
  }
}

function actualizarBannersDelivery() {
  const config = obtenerConfigDelivery();
  const pill = document.getElementById('textoDeliveryPill');
  const btnPill = document.getElementById('btnInfoDeliveryHeader');
  
  if (pill && btnPill) {
    if (!config.activo) {
      btnPill.classList.add('hidden');
    } else {
      btnPill.classList.remove('hidden');
      pill.textContent = config.textoPromo || `Envío Gratis (${config.minUnidades}+ unid)`;
    }
  }

  const tituloCond = document.getElementById('infoDeliveryTituloCondicion');
  const detalleCond = document.getElementById('infoDeliveryDetalleCondicion');
  if (tituloCond) {
    tituloCond.textContent = `¡Envío Gratis a partir de ${config.minUnidades} plato${config.minUnidades > 1 ? 's' : ''}!`;
  }
  if (detalleCond && config.condiciones) {
    detalleCond.textContent = config.condiciones;
  }
}

function abrirModalInfoDelivery() {
  actualizarBannersDelivery();
  document.getElementById('modalInfoDelivery').classList.remove('hidden');
}

function cerrarModalInfoDelivery() {
  const m = document.getElementById('modalInfoDelivery');
  if (m) m.classList.add('hidden');
}

// Configurar cierre de modales por clic en el fondo (backdrop) o tecla Escape
function configurarCierreModales() {
  const modales = [
    { id: 'modalPlato', close: cerrarModalPlato },
    { id: 'modalComanda', close: cerrarModalComanda },
    { id: 'modalDatosEntrega', close: cerrarModalDatosEntrega },
    { id: 'modalChat', close: cerrarModalChat },
    { id: 'modalInfoDelivery', close: cerrarModalInfoDelivery }
  ];

  modales.forEach(m => {
    const el = document.getElementById(m.id);
    if (el) {
      el.addEventListener('click', (e) => {
        // Si el clic ocurrió directamente sobre el fondo oscuro (backdrop)
        if (e.target === el) {
          m.close();
        }
      });
    }
  });

  // Tecla Escape para salir de cualquier modal abierto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModalPlato();
      cerrarModalComanda();
      cerrarModalChat();
      cerrarModalInfoDelivery();
    }
  });
}

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
// RENDERIZADO DE CATEGORÍAS (BARRA HORIZONTAL RESPONSIVE ESTABLE)
// ==========================================
const CATEGORIAS_BASE_CATALOGO = [
  { id: 'Todos', nombre: 'Todos', nombreMovil: 'Todos', icono: 'fa-solid fa-border-all' },
  { id: 'Desayunos', nombre: 'Desayuno Criollo', nombreMovil: 'Desayunos', icono: 'fa-solid fa-sun' },
  { id: 'Almuerzos', nombre: 'Sopas & Almuerzos', nombreMovil: 'Sopas', icono: 'fa-solid fa-bowl-food' },
  { id: 'Cachapas', nombre: 'Cachapas', nombreMovil: 'Cachapas', icono: 'fa-solid fa-wheat-awn' },
  { id: 'Comida Rápida', nombre: 'Rápida & Parrilla', nombreMovil: 'Rápida', icono: 'fa-solid fa-burger' },
  { id: 'Bebidas', nombre: 'Bebidas Frías', nombreMovil: 'Bebidas', icono: 'fa-solid fa-bottle-water' }
];

function obtenerCategoriasCliente() {
  const guardadas = localStorage.getItem('adomicilio_categorias');
  if (guardadas) {
    try {
      const parsed = JSON.parse(guardadas);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [
          { id: 'Todos', nombre: 'Todos', nombreMovil: 'Todos', icono: 'fa-solid fa-border-all' },
          ...parsed
        ];
      }
    } catch(e) {}
  }
  return CATEGORIAS_BASE_CATALOGO;
}

function renderizarCategorias() {
  const contenedor = document.getElementById('contenedorCategorias');
  if (!contenedor) return;

  const categorias = obtenerCategoriasCliente();

  contenedor.innerHTML = categorias.map(c => {
    const activa = c.id === categoriaSeleccionada;
    return `
      <button 
        onclick="seleccionarCategoria('${c.id}')"
        data-cat="${c.id}"
        class="btn-categoria-pill flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shadow-xs flex-shrink-0 cursor-pointer ${
          activa 
            ? 'cat-activa-permanente bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/40' 
            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700/60 hover:bg-emerald-50 dark:hover:bg-stone-700'
        }">
        <i class="${c.icono} text-xs"></i>
        <span>
          <span class="inline sm:hidden">${c.nombreMovil}</span>
          <span class="hidden sm:inline">${c.nombre}</span>
        </span>
      </button>
    `;
  }).join('');
}

function seleccionarCategoria(catId) {
  categoriaSeleccionada = catId;
  renderizarCategorias();
  renderizarPlatos();

  // Centrado horizontal suave ÚNICAMENTE dentro del contenedor de categorías (sin alterar el scroll de la ventana)
  const contenedor = document.getElementById('contenedorCategorias');
  if (contenedor) {
    const btnActivo = contenedor.querySelector(`[data-cat="${catId}"]`);
    if (btnActivo) {
      const contenedorRect = contenedor.getBoundingClientRect();
      const btnRect = btnActivo.getBoundingClientRect();
      const scrollOffset = (btnRect.left - contenedorRect.left) - (contenedor.clientWidth / 2) + (btnRect.width / 2);
      contenedor.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  }
}

// ==========================================
// RENDERIZADO DE PLATOS
// ==========================================
function renderizarPlatos() {
  const grid = document.getElementById('gridPlatos');
  const estadoVacio = document.getElementById('estadoVacio');
  const inputBusqueda = document.getElementById('inputBuscador');
  const termino = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : '';

  let filtrados = platos;
  if (categoriaSeleccionada !== 'Todos') {
    filtrados = filtrados.filter(p => p.categoria && p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());
  }
  if (termino) {
    filtrados = filtrados.filter(p => 
      p.nombre.toLowerCase().includes(termino) || 
      p.descripcion.toLowerCase().includes(termino) ||
      p.categoria.toLowerCase().includes(termino)
    );
  }

  if (filtrados.length === 0) {
    grid.innerHTML = '';
    estadoVacio.classList.remove('hidden');
    return;
  }

  estadoVacio.classList.add('hidden');
  grid.innerHTML = filtrados.map(p => `
    <div 
      onclick="abrirModalPlato('${p.id}')"
      class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group cursor-pointer select-none">
      
      <!-- Contenedor Foto con Título y Precio directamente SOBRE la imagen -->
      <div class="relative h-52 sm:h-56 bg-stone-950 overflow-hidden">
        <img 
          src="${getRutaFoto(p.foto)}" 
          alt="${p.nombre}" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">

        <!-- Degradado inferior con Título y Precio sobre la Imagen (Sin categoría superior) -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12 pb-3 px-3.5 sm:px-4 flex items-end justify-between gap-2.5 pointer-events-none">
          <div class="flex-1 min-w-0 pr-1">
            <h4 class="font-heading font-black text-sm sm:text-base text-white leading-snug drop-shadow-md break-words">
              ${p.nombre}
            </h4>
          </div>
          <div class="shrink-0 text-right">
            <span class="bg-emerald-500 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-2xl shadow-lg border border-emerald-300/40 tracking-tight inline-flex items-center">
              $${p.precio.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <!-- Descripción del Plato debajo de la imagen -->
      <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-center">
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          ${p.descripcion}
        </p>
      </div>

    </div>
  `).join('');
}

// ==========================================
// BÚSQUEDA COLAPSABLE Y SUGERENCIAS EN TIEMPO REAL
// ==========================================
function toggleBuscador() {
  const panel = document.getElementById('panelBuscadorColapsable');
  const input = document.getElementById('inputBuscador');
  const btn = document.getElementById('btnToggleBuscador');
  if (!panel) return;

  const estaOculto = panel.classList.contains('hidden');
  if (estaOculto) {
    panel.classList.remove('hidden');
    if (btn) btn.classList.add('bg-emerald-100', 'text-emerald-600', 'dark:bg-emerald-950/80', 'dark:text-emerald-400');
    setTimeout(() => {
      if (input) input.focus();
      renderizarSugerenciasBusqueda('');
    }, 60);
  } else {
    cerrarBuscador();
  }
}

function cerrarBuscador() {
  const panel = document.getElementById('panelBuscadorColapsable');
  const input = document.getElementById('inputBuscador');
  const btn = document.getElementById('btnToggleBuscador');
  if (!panel) return;

  panel.classList.add('hidden');
  if (btn) btn.classList.remove('bg-emerald-100', 'text-emerald-600', 'dark:bg-emerald-950/80', 'dark:text-emerald-400');
  if (input && input.value) {
    input.value = '';
    renderizarPlatos();
  }
}

function alEscribirBuscador() {
  const input = document.getElementById('inputBuscador');
  const btnLimpiar = document.getElementById('btnLimpiarBuscador');
  const valor = input ? input.value : '';

  if (btnLimpiar) {
    if (valor) btnLimpiar.classList.remove('hidden');
    else btnLimpiar.classList.add('hidden');
  }

  filtrarPorBusqueda();
  renderizarSugerenciasBusqueda(valor);
}

function filtrarPorBusqueda() {
  renderizarPlatos();
}

function limpiarBuscador() {
  const input = document.getElementById('inputBuscador');
  if (input) {
    input.value = '';
    input.focus();
  }
  const btnLimpiar = document.getElementById('btnLimpiarBuscador');
  if (btnLimpiar) btnLimpiar.classList.add('hidden');
  renderizarPlatos();
  renderizarSugerenciasBusqueda('');
}

function renderizarSugerenciasBusqueda(termino) {
  const cont = document.getElementById('sugerenciasBuscador');
  if (!cont) return;

  termino = (termino || '').toLowerCase().trim();

  // Chips sugeridos rápidos cuando no hay texto
  if (!termino) {
    const sugeridos = [
      { label: '🥟 Empanadas', query: 'empanada' },
      { label: '🧀 Tequeños', query: 'tequeño' },
      { label: '🌽 Cachapas', query: 'cachapa' },
      { label: '🍲 Sopa de Costilla', query: 'costilla' },
      { label: '🍔 Hamburguesa', query: 'hamburguesa' },
      { label: '🥤 Bebidas', query: 'refresco' }
    ];
    cont.innerHTML = `
      <div class="pt-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5">Sugerencias populares:</span>
        <div class="flex flex-wrap gap-1.5">
          ${sugeridos.map(s => `
            <button 
              type="button"
              onclick="aplicarSugerenciaBusqueda('${s.query}')" 
              class="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400 transition cursor-pointer border border-stone-200/80 dark:border-stone-700/60">
              ${s.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    return;
  }

  // Filtrar platos que coincidan para sugerir abajo en tiempo real
  const coincidencias = platos.filter(p => 
    p.nombre.toLowerCase().includes(termino) ||
    p.categoria.toLowerCase().includes(termino) ||
    p.descripcion.toLowerCase().includes(termino)
  ).slice(0, 4);

  if (coincidencias.length === 0) {
    cont.innerHTML = `
      <div class="pt-2 text-stone-400 text-xs italic">
        No hay coincidencias directas para "${termino}". Explora nuestro menú general abajo.
      </div>
    `;
    return;
  }

  cont.innerHTML = `
    <div class="pt-2 space-y-1">
      <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">Platos encontrados:</span>
      <div class="divide-y divide-stone-100 dark:divide-stone-800">
        ${coincidencias.map(p => `
          <div 
            onclick="abrirModalPlato('${p.id}')"
            class="py-1.5 px-2 flex items-center justify-between rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer transition">
            <div class="flex items-center space-x-2 min-w-0 pr-2">
              <span class="text-base">${p.icono || '🍽️'}</span>
              <span class="text-xs font-bold text-stone-800 dark:text-stone-200 truncate">${p.nombre}</span>
            </div>
            <span class="text-xs font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0">$${p.precio.toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function aplicarSugerenciaBusqueda(query) {
  const input = document.getElementById('inputBuscador');
  if (input) {
    input.value = query;
    alEscribirBuscador();
  }
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
  const badgeCat = document.getElementById('modalCategoriaPlato');
  if (badgeCat) badgeCat.textContent = platoSeleccionadoModal.categoria;
  document.getElementById('modalFotoPlato').src = getRutaFoto(platoSeleccionadoModal.foto);
  const badgePrecioBase = document.getElementById('modalPrecioBase');
  if (badgePrecioBase) badgePrecioBase.textContent = `$${platoSeleccionadoModal.precio.toFixed(2)}`;
  const inputNotas = document.getElementById('inputNotasCocina');
  if (inputNotas) inputNotas.value = '';

  // Renderizar checkboxes de extras
  const contenedorExtras = document.getElementById('contenedorExtras');
  if (platoSeleccionadoModal.extras && platoSeleccionadoModal.extras.length > 0) {
    contenedorExtras.innerHTML = platoSeleccionadoModal.extras.map(e => `
      <label class="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 cursor-pointer hover:border-emerald-400 transition text-xs">
        <div class="flex items-center space-x-2.5">
          <input 
            type="checkbox" 
            value="${e.id}" 
            data-precio="${e.precio}" 
            data-nombre="${e.nombre}" 
            onchange="calcularTotalModal()"
            class="checkbox-extra w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300">
          <span class="font-medium text-stone-800 dark:text-stone-200">${e.nombre}</span>
        </div>
        ${e.precio > 0 
          ? `<span class="font-bold text-emerald-600 dark:text-emerald-400">+$${e.precio.toFixed(2)}</span>` 
          : ''
        }
      </label>
    `).join('');
  } else {
    contenedorExtras.innerHTML = `
      <p class="text-xs text-stone-400 italic">Este plato no tiene adicionales disponibles.</p>
    `;
  }

  calcularTotalModal();
  actualizarBannerDeliveryPlato(cantidadModal);
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
  actualizarBannerDeliveryPlato(cantidadModal);
}

function actualizarBannerDeliveryPlato(cantidad) {
  const config = obtenerConfigDelivery();
  const banner = document.getElementById('bannerDeliveryPlato');
  const texto = document.getElementById('textoPromoDeliveryPlato');
  const badge = document.getElementById('badgeDeliveryStatusPlato');
  if (!banner || !texto) return;

  if (!config.activo) {
    banner.classList.add('hidden');
    return;
  }
  banner.classList.remove('hidden');

  const min = config.minUnidades || 2;
  if (cantidad >= min) {
    texto.innerHTML = `🎉 ¡Genial! Esta orden califica para <strong>Delivery GRATIS</strong>`;
    banner.className = 'p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/60 dark:border-emerald-700/60 flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300 transition-colors';
    if (badge) {
      badge.textContent = '¡Gratis!';
      badge.className = 'text-[10px] bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full font-bold';
    }
  } else {
    const faltan = min - cantidad;
    texto.innerHTML = `🛵 ¡Delivery GRATIS a partir de ${min} unidades! (Agrega ${faltan} más)`;
    banner.className = 'p-2.5 rounded-2xl bg-amber-500/10 border border-amber-300/60 dark:border-amber-700/60 flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300 transition-colors';
    if (badge) {
      badge.textContent = 'Promo';
      badge.className = 'text-[10px] bg-amber-200/70 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold';
    }
  }
}

function calcularTotalModal() {
  if (!platoSeleccionadoModal) return;
  let totalUnitario = platoSeleccionadoModal.precio;
  
  const checkboxes = document.querySelectorAll('.checkbox-extra:checked');
  checkboxes.forEach(cb => {
    totalUnitario += parseFloat(cb.dataset.precio || 0);
  });

  const totalFinal = totalUnitario * cantidadModal;
  const badgePrecioBase = document.getElementById('modalPrecioBase');
  if (badgePrecioBase) {
    badgePrecioBase.textContent = `$${totalFinal.toFixed(2)}`;
  }
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

  const notas = document.getElementById('inputNotasCocina')?.value.trim() || '';

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
  abrirModalComanda();
  mostrarToast(`¡${platoSeleccionadoModal.nombre} agregado al pedido! 🍲`);
}

// ==========================================
// MODAL DE PEDIDO
// ==========================================
function abrirModalComanda() {
  renderizarListaComanda();
  actualizarResumenDatosEntrega();
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

  const totalItems = comanda.reduce((sum, item) => sum + item.cantidad, 0);
  actualizarIndicadorDeliveryComanda(totalItems);

  if (comanda.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center py-8 text-stone-400">
        <i class="fa-solid fa-receipt text-3xl mb-2 opacity-50"></i>
        <p class="text-xs font-medium">Tu pedido está vacío.</p>
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
      <div class="flex items-center gap-2 group">
        <!-- Tarjeta del Ítem -->
        <div class="flex-1 min-w-0 bg-stone-50 dark:bg-stone-800/80 p-3 sm:p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700/60 flex items-start justify-between gap-2.5 text-xs shadow-xs">
          <div class="flex-1 space-y-1 min-w-0">
            <div class="flex items-center space-x-2 font-black text-stone-900 dark:text-white">
              <span class="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">${item.cantidad}x</span>
              <span class="truncate">${item.nombre}</span>
            </div>
            ${item.extras.length > 0 ? `
              <div class="pl-7 text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5 break-words">
                ${item.extras.map(e => `<div>+ ${e.nombre} ($${e.precio.toFixed(2)})</div>`).join('')}
              </div>
            ` : ''}
            ${item.notas ? `
              <div class="pl-7 text-[10px] text-amber-600 dark:text-amber-400 italic break-words">
                Nota: "${item.notas}"
              </div>
            ` : ''}
          </div>
          
          <!-- Precio del Ítem destacado -->
          <div class="text-right shrink-0">
            <span class="font-black text-sm sm:text-base text-emerald-600 dark:text-emerald-400">$${item.totalItem.toFixed(2)}</span>
          </div>
        </div>

        <!-- Botón Papelera FUERA del recuadro, Grande y Cómodo para presionar en Móvil -->
        <button 
          onclick="eliminarItemComanda(${idx})" 
          class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-200/80 dark:border-rose-900/50 flex items-center justify-center text-base sm:text-lg shadow-sm hover:shadow-md transition-all active:scale-90 shrink-0" 
          title="Eliminar este plato del pedido">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join('');

  labelTotal.textContent = `$${granTotal.toFixed(2)}`;
}

function actualizarIndicadorDeliveryComanda(totalItems) {
  const indicador = document.getElementById('indicadorDeliveryComanda');
  if (!indicador) return;

  const config = obtenerConfigDelivery();
  if (!config.activo) {
    indicador.classList.add('hidden');
    return;
  }
  indicador.classList.remove('hidden');

  const min = config.minUnidades || 2;
  if (totalItems >= min) {
    indicador.className = 'p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 text-xs font-bold flex items-center justify-between text-emerald-700 dark:text-emerald-400 transition-colors';
    indicador.innerHTML = `
      <div class="flex items-center space-x-1.5">
        <i class="fa-solid fa-gift text-sm text-emerald-600 dark:text-emerald-400"></i>
        <span>🎉 ¡Tu pedido califica para <strong>Delivery GRATIS</strong>!</span>
      </div>
      <span class="text-[10px] bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">Activo</span>
    `;
  } else {
    const faltan = min - totalItems;
    indicador.className = 'p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs font-bold flex items-center justify-between text-amber-800 dark:text-amber-300 transition-colors';
    indicador.innerHTML = `
      <div class="flex items-center space-x-1.5">
        <i class="fa-solid fa-motorcycle text-sm text-emerald-600"></i>
        <span>🛵 Agrega <strong>${faltan} plato${faltan > 1 ? 's' : ''} más</strong> y obtén Delivery GRATIS</span>
      </div>
      <span class="text-[10px] bg-amber-200/70 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">Falta ${faltan}</span>
    `;
  }
}

function eliminarItemComanda(idx) {
  comanda.splice(idx, 1);
  localStorage.setItem('adomicilio_comanda', JSON.stringify(comanda));
  actualizarBadgeComanda();
  renderizarListaComanda();
}

// ==========================================
// GESTIÓN DE DATOS DE ENTREGA Y PAGO
// ==========================================
function abrirModalDatosEntrega() {
  document.getElementById('modalDatosEntrega')?.classList.remove('hidden');
}

function cerrarModalDatosEntrega() {
  document.getElementById('modalDatosEntrega')?.classList.add('hidden');
}

function guardarDatosEntregaDesdeModal() {
  const nombre = document.getElementById('comandaClienteNombre')?.value.trim();
  const telefono = document.getElementById('comandaClienteTelefono')?.value.trim();
  const direccion = document.getElementById('comandaClienteDireccion')?.value.trim();
  const puntoReferencia = document.getElementById('comandaPuntoReferencia')?.value.trim();
  const metodoPago = document.getElementById('comandaMetodoPago')?.value || 'Efectivo Divisas ($ USD)';
  const pagaCon = document.getElementById('comandaPagaCon')?.value.trim();

  if (!nombre) {
    mostrarToast('Por favor escribe tu nombre');
    document.getElementById('comandaClienteNombre')?.focus();
    return;
  }
  if (!telefono) {
    mostrarToast('Por favor escribe tu teléfono / WhatsApp');
    document.getElementById('comandaClienteTelefono')?.focus();
    return;
  }
  if (!direccion) {
    mostrarToast('Por favor escribe tu dirección exacta');
    document.getElementById('comandaClienteDireccion')?.focus();
    return;
  }

  const datos = { nombre, telefono, direccion, puntoReferencia, metodoPago, pagaCon };
  localStorage.setItem('adomicilio_datos_cliente', JSON.stringify(datos));
  actualizarResumenDatosEntrega();
  cerrarModalDatosEntrega();
  mostrarToast('✔ Datos de entrega guardados');
}

function cargarDatosEntregaGuardados() {
  try {
    const guardados = localStorage.getItem('adomicilio_datos_cliente');
    if (guardados) {
      const d = JSON.parse(guardados);
      if (document.getElementById('comandaClienteNombre') && d.nombre) document.getElementById('comandaClienteNombre').value = d.nombre;
      if (document.getElementById('comandaClienteTelefono') && d.telefono) document.getElementById('comandaClienteTelefono').value = d.telefono;
      if (document.getElementById('comandaClienteDireccion') && d.direccion) document.getElementById('comandaClienteDireccion').value = d.direccion;
      if (document.getElementById('comandaPuntoReferencia') && d.puntoReferencia) document.getElementById('comandaPuntoReferencia').value = d.puntoReferencia;
      if (document.getElementById('comandaMetodoPago') && d.metodoPago) document.getElementById('comandaMetodoPago').value = d.metodoPago;
      if (document.getElementById('comandaPagaCon') && d.pagaCon) document.getElementById('comandaPagaCon').value = d.pagaCon;
    }
  } catch(e) {}
  actualizarResumenDatosEntrega();
}

function actualizarResumenDatosEntrega() {
  const nombre = document.getElementById('comandaClienteNombre')?.value.trim();
  const direccion = document.getElementById('comandaClienteDireccion')?.value.trim();
  const metodoPago = document.getElementById('comandaMetodoPago')?.value || '';
  
  const titulo = document.getElementById('resumenDatosEntregaTitulo');
  const subtitulo = document.getElementById('resumenDatosEntregaSubtitulo');
  const badge = document.getElementById('badgeBotonDatosEntrega');
  const icono = document.getElementById('iconoDatosEntrega');

  if (!titulo || !subtitulo) return;

  if (nombre && direccion) {
    titulo.textContent = `📍 Enviar a: ${nombre}`;
    subtitulo.textContent = `${direccion} • ${metodoPago.split(' ')[0] || ''}`;
    if (badge) {
      badge.innerHTML = `<span>Editar</span> <i class="fa-solid fa-pen text-[10px]"></i>`;
      badge.className = 'text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 border border-amber-300/60 dark:border-amber-800 px-3 py-1 rounded-xl shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform';
    }
    if (icono) {
      icono.className = 'w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0';
    }
  } else {
    titulo.textContent = 'Datos de Entrega y Pago';
    subtitulo.textContent = 'Toca aquí para indicar tu nombre, dirección y pago';
    if (badge) {
      badge.innerHTML = `<span>Rellenar</span> <i class="fa-solid fa-chevron-right text-[10px]"></i>`;
      badge.className = 'text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-800 px-3 py-1 rounded-xl shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform';
    }
  }
}

function enviarComandaWhatsApp() {
  if (comanda.length === 0) {
    mostrarToast('Tu pedido está vacío');
    return;
  }

  const nombre = document.getElementById('comandaClienteNombre')?.value.trim();
  const telefono = document.getElementById('comandaClienteTelefono')?.value.trim();
  const direccion = document.getElementById('comandaClienteDireccion')?.value.trim();
  const puntoReferencia = document.getElementById('comandaPuntoReferencia')?.value.trim();
  const metodoPago = document.getElementById('comandaMetodoPago')?.value || 'Efectivo Divisas ($ USD)';
  const pagaCon = document.getElementById('comandaPagaCon')?.value.trim();

  if (!nombre || !telefono || !direccion) {
    mostrarToast('Por favor completa tus datos de entrega');
    abrirModalDatosEntrega();
    return;
  }

  const totalItems = comanda.reduce((sum, item) => sum + item.cantidad, 0);
  const configDelivery = obtenerConfigDelivery();
  const aplicaDeliveryGratis = configDelivery.activo && (totalItems >= (configDelivery.minUnidades || 2));

  let granTotal = 0;
  let mensaje = `👋 *¡HOLA A DOMICILIO! DESEO CONFIRMAR ESTE PEDIDO:*\n\n`;
  mensaje += `👤 *Cliente:* ${nombre}\n`;
  mensaje += `📱 *Teléfono:* ${telefono}\n`;
  mensaje += `📍 *Dirección de Entrega:* ${direccion}\n`;
  if (puntoReferencia) {
    mensaje += `🏠 *Punto de Referencia:* ${puntoReferencia}\n`;
  }
  mensaje += `💳 *Método de Pago:* ${metodoPago}\n`;
  if (pagaCon) {
    mensaje += `💵 *Paga con / Cambio:* ${pagaCon}\n`;
  }
  mensaje += `🛵 *Condición de Entrega:* ${aplicaDeliveryGratis ? '🎉 ¡DELIVERY GRATIS APLICADO! (Promoción 2+ platos)' : 'Despacho a domicilio standard'}\n\n`;
  mensaje += `🍽️ *DETALLE DEL PEDIDO:*\n`;

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

  // Registrar pedido en segundo plano en Google Sheets ERP
  try {
    const detallePlatos = comanda.map(c => `${c.cantidad}x ${c.nombre} ($${c.totalItem.toFixed(2)})`).join(', ');
    const extrasPlatos = comanda.flatMap(c => c.extras.map(e => `${c.cantidad}x ${e.nombre}`)).join(', ') || 'Sin adicionales';
    const notasPlatos = comanda.map(c => c.notas).filter(Boolean).join(' | ') || 'Ninguna';
    const notasCompletas = `Ref: ${puntoReferencia || 'S/R'} | Pago: ${metodoPago} ${pagaCon ? '(' + pagaCon + ')' : ''} | Delivery: ${aplicaDeliveryGratis ? 'GRATIS' : 'STANDARD'} | ${notasPlatos}`;

    API.registrarComanda({
      idComanda: 'CMD-' + Date.now().toString().slice(-4),
      clienteNombre: nombre,
      clienteTelefono: telefono,
      direccionEntrega: direccion,
      detallePlatos: detallePlatos,
      extrasSeleccionados: extrasPlatos,
      notasCocina: notasCompletas,
      totalUSD: granTotal,
      estado: 'Recibida en Cocina'
    }).then(res => {
      console.log('Pedido registrado en ERP Google Sheets:', res);
    }).catch(err => {
      console.warn('Registro offline en Google Sheets:', err);
    });
  } catch(e) {
    console.warn('Error enviando pedido al ERP:', e);
  }

  // Teléfono de cocina configurado en admin o por defecto
  const configWhatsApp = JSON.parse(localStorage.getItem('adomicilio_config_whatsapp') || '{}');
  const telefonoCocina = configWhatsApp.telCocina || '584120000000';
  const urlWhatsApp = `https://wa.me/${telefonoCocina}?text=${encodeURIComponent(mensaje)}`;

  window.open(urlWhatsApp, '_blank');
  mostrarToast('¡Pedido enviado a WhatsApp y registrado en cocina! 📲');
  
  // Limpiar comanda tras envio
  comanda = [];
  localStorage.removeItem('adomicilio_comanda');
  actualizarBadgeComanda();
  renderizarListaComanda();
  cerrarModalComanda();
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

function compartirPlatoDesdeModal(event) {
  if (event) event.stopPropagation();
  if (platoSeleccionadoModal && platoSeleccionadoModal.id) {
    compartirPlato(platoSeleccionadoModal.id);
  }
}

// ==========================================
// CHAT WEB EN VIVO CON CONTEXTO DE PLATO
// ==========================================
let chatContextoPlato = null;

function consultarPlatoDesdeModal() {
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

  const totalCalculado = (platoSeleccionadoModal.precio + sumaExtras) * cantidadModal;

  chatContextoPlato = {
    ...platoSeleccionadoModal,
    cantidad: cantidadModal,
    extras: extrasSeleccionados,
    total: totalCalculado
  };

  cerrarModalPlato();
  abrirModalChat();
}

function abrirModalChat(contextoDirecto = null) {
  if (contextoDirecto) {
    chatContextoPlato = contextoDirecto;
  }

  const modal = document.getElementById('modalChat');
  const banner = document.getElementById('chatBannerContexto');
  const textoBanner = document.getElementById('chatContextoTexto');
  
  if (chatContextoPlato) {
    if (banner) banner.classList.remove('hidden');
    if (textoBanner) {
      const cant = chatContextoPlato.cantidad || 1;
      const cantTxt = cant > 1 ? `${cant}x ` : '';
      const extrasTxt = chatContextoPlato.extras && chatContextoPlato.extras.length > 0 
        ? ` (+ ${chatContextoPlato.extras.map(e => e.nombre).join(', ')})` 
        : '';
      const totalTxt = chatContextoPlato.total ? chatContextoPlato.total.toFixed(2) : (chatContextoPlato.precio * cant).toFixed(2);
      textoBanner.textContent = `Consultando: ${cantTxt}${chatContextoPlato.nombre}${extrasTxt} ($${totalTxt})`;
    }
    
    // Insertar bienvenida contextual si no se ha añadido aún para esta combinación exacta
    const area = document.getElementById('chatMensajesArea');
    const contextoKey = `ctx-${chatContextoPlato.id}-${chatContextoPlato.cantidad || 1}-${(chatContextoPlato.extras || []).map(e=>e.nombre).join('-')}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    // Registrar en mapa global de consultas para soportar múltiples platos y borrado selectivo
    window.contextosPlatosChat = window.contextosPlatosChat || {};
    window.contextosPlatosChat[contextoKey] = JSON.parse(JSON.stringify(chatContextoPlato));
    chatContextoPlato._key = contextoKey;

    const yaExiste = area.querySelector(`[data-contexto-key="${contextoKey}"]`);
    if (!yaExiste) {
      const msgContexto = document.createElement('div');
      msgContexto.setAttribute('data-contexto-key', contextoKey);
      msgContexto.className = 'flex items-start space-x-2 animate-in fade-in duration-300';
      
      const cant = chatContextoPlato.cantidad || 1;
      const cantStr = cant > 1 ? `${cant} raciones de ` : '';
      const extrasStr = chatContextoPlato.extras && chatContextoPlato.extras.length > 0
        ? ` con ${chatContextoPlato.extras.map(e => `<strong>${e.nombre}</strong>`).join(' y ')}`
        : '';
      const totalStr = chatContextoPlato.total ? `$${chatContextoPlato.total.toFixed(2)}` : `$${(chatContextoPlato.precio * cant).toFixed(2)}`;

      msgContexto.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0">
          <i class="fa-solid fa-utensils"></i>
        </div>
        <div class="bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl rounded-tl-none p-3.5 max-w-[88%] text-xs shadow-xs text-emerald-950 dark:text-emerald-100 space-y-2">
          <div class="flex items-center space-x-1.5">
            <span class="font-black text-emerald-700 dark:text-emerald-400">🍽️ ${cant > 1 ? `${cant}x ` : ''}${chatContextoPlato.nombre}</span>
            <span class="text-[10px] font-black bg-emerald-200/80 dark:bg-emerald-900/80 px-2 py-0.5 rounded-full text-emerald-800 dark:text-emerald-200">${totalStr}</span>
          </div>
          <p class="leading-relaxed">¡Hola! Veo que estás interesado en <strong>${cantStr}${chatContextoPlato.nombre}</strong>${extrasStr}. El monto total es de <strong>${totalStr}</strong>.</p>
          <p class="text-[11px] opacity-90 leading-normal">¿Deseas alguna indicación especial para cocina o prefieres agregarlo directo a tu comanda?</p>
          <div class="pt-1 flex items-center gap-2 flex-wrap">
            <!-- Botón Agregar a Pedido -->
            <button onclick="agregarContextoDirectoAPedido('${contextoKey}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95" title="Agregar este plato a mi comanda">
              <i class="fa-solid fa-cart-plus text-[10px]"></i>
              <span>Agregar a mi Pedido</span>
            </button>

            <!-- Botón Papelera para Borrar solo esta consulta del chat -->
            <button onclick="eliminarContextoDelChat('${contextoKey}')" class="px-2.5 py-1.5 bg-rose-50 dark:bg-rose-950/70 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white dark:hover:text-white border border-rose-200/80 dark:border-rose-900/60 text-[11px] font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5 cursor-pointer active:scale-95" title="Eliminar solo este plato del chat">
              <i class="fa-solid fa-trash-can text-[10px]"></i>
              <span>Borrar</span>
            </button>
          </div>
        </div>
      `;
      area.appendChild(msgContexto);
      area.scrollTop = area.scrollHeight;
    }
  } else {
    if (banner) banner.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

function agregarContextoDirectoAPedido(key = null) {
  const contexto = (key && window.contextosPlatosChat && window.contextosPlatosChat[key]) 
    ? window.contextosPlatosChat[key] 
    : chatContextoPlato;

  if (!contexto) return;

  const cant = contexto.cantidad || 1;
  const extras = contexto.extras || [];
  const sumaExtras = extras.reduce((acc, e) => acc + (e.precio || 0), 0);
  const totalItem = (contexto.precio + sumaExtras) * cant;

  comanda.push({
    idUnico: Date.now().toString(),
    platoId: contexto.id,
    nombre: contexto.nombre,
    precioBase: contexto.precio,
    extras: extras,
    notas: 'Agregado desde chat con el chef',
    cantidad: cant,
    totalItem: totalItem
  });

  localStorage.setItem('adomicilio_comanda', JSON.stringify(comanda));
  actualizarBadgeComanda();
  cerrarModalChat();
  abrirModalComanda();
  mostrarToast(`¡${contexto.nombre} agregado al pedido! 🍲`);
}

function eliminarContextoDelChat(contextoKey) {
  const area = document.getElementById('chatMensajesArea');
  const msgEl = area ? area.querySelector(`[data-contexto-key="${contextoKey}"]`) : null;
  if (msgEl) {
    msgEl.classList.add('transition-all', 'duration-200', 'opacity-0', 'scale-95');
    setTimeout(() => {
      if (msgEl && msgEl.parentNode) {
        msgEl.parentNode.removeChild(msgEl);
      }
      
      // Si el banner superior correspondía a esta consulta, ocultarlo
      if (chatContextoPlato && chatContextoPlato._key === contextoKey) {
        chatContextoPlato = null;
        const banner = document.getElementById('chatBannerContexto');
        if (banner) banner.classList.add('hidden');
      }

      if (window.contextosPlatosChat && window.contextosPlatosChat[contextoKey]) {
        delete window.contextosPlatosChat[contextoKey];
      }
    }, 200);

    mostrarToast('Consulta eliminada del chat 🗑️');
  }
}

function cerrarModalChat() {
  document.getElementById('modalChat').classList.add('hidden');
}

function confirmarVaciarChatCliente() {
  if (!confirm('¿Deseas limpiar todos los mensajes de esta conversación?')) return;

  localStorage.removeItem('adomicilio_mensajes_chat');
  chatContextoPlato = null;
  const banner = document.getElementById('chatBannerContexto');
  if (banner) banner.classList.add('hidden');

  const area = document.getElementById('chatMensajesArea');
  if (area) {
    area.innerHTML = `
      <div class="flex items-start space-x-2">
        <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0">
          <i class="fa-solid fa-utensils"></i>
        </div>
        <div class="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded-2xl rounded-tl-none p-3 max-w-[80%] text-xs shadow-xs text-stone-800 dark:text-stone-200">
          ¡Hola! 👋 Bienvenido a <strong>A Domicilio</strong>. ¿Tienes dudas sobre los ingredientes de algún plato o tiempo estimado de despacho? ¡Escríbenos aquí!
        </div>
      </div>
    `;
  }
  mostrarToast('Conversación limpiada');
}

function limpiarContextoChat() {
  chatContextoPlato = null;
  const banner = document.getElementById('chatBannerContexto');
  if (banner) banner.classList.add('hidden');
}

function enviarChipChat(texto) {
  const input = document.getElementById('chatInputTexto');
  if (input) {
    input.value = texto;
    enviarMensajeChat();
  }
}

function enviarMensajeChat() {
  const input = document.getElementById('chatInputTexto');
  const texto = input.value.trim();
  if (!texto) return;

  const area = document.getElementById('chatMensajesArea');
  
  // Si hay contexto de plato, formatear el texto
  const platoEtiqueta = chatContextoPlato ? chatContextoPlato.nombre : null;
  const categoriaEtiqueta = chatContextoPlato ? chatContextoPlato.categoria : categoriaSeleccionada;

  // Mensaje del Comensal
  const msgUser = document.createElement('div');
  msgUser.className = 'flex items-start justify-end space-x-2 animate-in fade-in duration-200';
  msgUser.innerHTML = `
    <div class="bg-emerald-600 text-white rounded-2xl rounded-tr-none p-3 max-w-[80%] text-xs shadow-xs">
      ${platoEtiqueta ? `<div class="text-[10px] opacity-80 font-bold mb-0.5">🍽️ Sobre: ${platoEtiqueta}</div>` : ''}
      ${texto}
    </div>
  `;
  area.appendChild(msgUser);
  input.value = '';
  area.scrollTop = area.scrollHeight;

  // Guardar en historial local de chat
  const historialChat = JSON.parse(localStorage.getItem('adomicilio_mensajes_chat') || '[]');
  const nuevoMensaje = {
    id: 'MSG-' + Date.now(),
    fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cliente: 'Comensal en Línea',
    plato: platoEtiqueta,
    categoria: categoriaEtiqueta,
    mensaje: texto,
    emisor: 'cliente'
  };
  historialChat.push(nuevoMensaje);
  localStorage.setItem('adomicilio_mensajes_chat', JSON.stringify(historialChat));

  // Enviar a Google Sheets ERP si la API está configurada
  if (window.API && typeof API.enviarMensajeChat === 'function') {
    API.enviarMensajeChat({
      clienteId: localStorage.getItem('adomicilio_cliente_id') || 'cliente_' + Date.now(),
      nombre: 'Comensal en Línea',
      mensaje: platoEtiqueta ? `[Consulta: ${platoEtiqueta}] ${texto}` : texto,
      plato: platoEtiqueta,
      categoria: categoriaEtiqueta
    }).catch(e => console.warn('Error enviando mensaje a Sheets:', e));
  }

  // Respuesta inteligente del Chef / Cocina
  setTimeout(() => {
    const msgRespuesta = document.createElement('div');
    msgRespuesta.className = 'flex items-start space-x-2 animate-in fade-in duration-300';
    
    let respuestaTexto = '¡Mensaje recibido! Nuestro equipo de cocina está en línea y activo. ¿Deseas que preparemos tu orden ya mismo?';
    if (chatContextoPlato) {
      const cant = chatContextoPlato.cantidad || 1;
      const cantStr = cant > 1 ? `${cant}x ` : '';
      const extrasStr = chatContextoPlato.extras && chatContextoPlato.extras.length > 0 
        ? ` con ${chatContextoPlato.extras.map(e => e.nombre).join(', ')}` 
        : '';
      const totalStr = chatContextoPlato.total ? ` ($${chatContextoPlato.total.toFixed(2)})` : '';
      respuestaTexto = `¡Recibido! Sobre **${cantStr}${chatContextoPlato.nombre}${extrasStr}**${totalStr}: sale caliente y recién hecho en unos 15 a 20 minutos. ¡Puedes agregarlo directo a tu pedido o confirmar con nosotros por WhatsApp! 🛵💨`;
    }

    msgRespuesta.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <div class="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-xs shadow-xs text-stone-800 dark:text-stone-200 space-y-1.5">
        <p class="leading-relaxed">${respuestaTexto}</p>
        <button onclick="confirmarPorWhatsAppDesdeChat('${platoEtiqueta || ''}')" class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition mt-1">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Confirmar por WhatsApp</span>
        </button>
      </div>
    `;
    area.appendChild(msgRespuesta);
    area.scrollTop = area.scrollHeight;
  }, 900);
}

function confirmarPorWhatsAppDesdeChat(platoNombre) {
  const telWA = localStorage.getItem('adomicilio_whatsapp_pedidos') || '584141234567';
  let texto = '¡Hola A Domicilio! Estoy chateando en la web y me interesa ordenar.';
  if (platoNombre) {
    texto = `¡Hola A Domicilio! Estoy consultando sobre *${platoNombre}* y deseo confirmar mi pedido. ¿Me pueden atender?`;
  }
  window.open(`https://wa.me/${telWA.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(texto)}`, '_blank');
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
