# 📖 Historial y Bitácora de Conversación - Proyecto Gastronómico (WebViewComida)

**Responsable Técnico / Programador:** ANDY Paz  
**Correo Electrónico Oficial (Protegido e Inmutable):** `elchichote@gmail.com`  
**Fecha de Inicio:** 17 de Octubre de 2026  
**Ubicación del Proyecto:** `c:\Users\x\Desktop\WebViewComida`  
**Estado Actual:** Fase 0 - Conversación Inicial, Planificación y Gobernanza  

---

## 📌 Principios y Acuerdos de Trabajo
1. **Proyecto 100% Autónomo:** No comparte bases de datos, credenciales ni hojas de Google Sheets con `WebViewTienda`. Todo se construye en su propio ecosistema limpio.
2. **Correo Inmutable:** `elchichote@gmail.com` se preserva como la identidad exclusiva para servicios en la nube, Google Drive y hojas de cálculo.
3. **Consulta Obligatoria:** No se toman decisiones de diseño, marca ni producto sin preguntar y acordar previamente con Andy Paz.
4. **Verificación con Navegador Nativo:** Toda validación de páginas, formularios o inicio de sesión se realiza mediante una instancia real de navegador nativo con persistencia de perfil (`perfil_navegador`).

---

## 📝 Registro de Sesión 1 (17 de Octubre de 2026)

### Planteamiento del Usuario (Andy Paz):
- Se requiere un nuevo proyecto paralelo en una carpeta dedicada (`WebViewComida`).
- El giro de negocio es **Comida Tradicional**:
  - Cachapas con queso de mano, cochino frito, carne mechada, etc.
  - Sopas (mondongo, res, costilla, pollo).
  - Empanadas y pastelitos variados.
  - Bebidas tradicionales (papelón con limón, jugos naturales, malta).
- Mantener las virtudes probadas del sistema anterior:
  - Catálogo interactivo con selector de categorías.
  - Sistema de Chat en tiempo real.
  - Pedidos estructurados por WhatsApp.
  - Modo Claro ☀️ / Modo Oscuro 🌙 gastronómico.
  - Verificación de clientes.
  - Backend en Google Sheets y Google Apps Script.
- Integración de herramienta de Navegador Nativo dedicada para inspeccionar, navegar y loguearse sin asumir datos ciegamente.

### Acciones Ejecutadas:
- Creación del directorio raíz `c:\Users\x\Desktop\WebViewComida`.
- Creación de `reglas_proyecto.json` con las 5 reglas inmutables de gobernanza.
- Creación de la presente bitácora `HISTORIAL.md`.
- Elaboración del Plan Maestro Modular `PLAN_MAESTRO_PROYECTO_COMIDA.md`.
- Creación del lanzador y controlador del Navegador Nativo (`abrir_navegador.js` / `abrir_navegador.bat`).


---

## 📝 Registro de Sesión 2 (17 de Octubre de 2026 - Tarde)

### Acuerdos de Marca, Menú y Arquitectura con Andy Paz:
1. **Nombre Comercial del Negocio:**
   - Se establece formalmente **`A Domicilio`**.
   - *Justificación:* Representa la promesa directa y cercana de comida rápida, caliente, tradicional y de calidad entregada directamente en la puerta del comensal.

2. **Estructura del Menú por Momentos del Día:**
   - **🥟 Desayuno Criollo:**
     * Empanadas venezolanas crujientes (cazón, carne mechada, queso).
     * Tequeños dorados con su salsa guasacaca (ración de 6).
     * Pastelitos andinos hojaldrados y dorados con salsa guasacaca y ajo.
     * Refrescos matutinos: Coca-Cola, Chinotto y 7Up.
   - **🍲 Almuerzos y Sopas Criollas:**
     * Sopa de costilla de res tradicional con jojoto y yuca, acompañada con arroz blanco y arepitas calientes.
     * Sopa de pollo de campo con arroz y arepitas.
   - **🌽 Tarde y Noche (Cenas y Antojos):**
     * Cachapas doradas de maíz tierno con abundante queso de mano y cochino frito.
     * Pizzas familiares e individuales.
     * Hamburguesas especiales a la parrilla.
     * Perros calientes clásicos y especiales.
     * Pollo asado con guarniciones.

3. **Arquitectura de Doble Aplicación Web:**
   - **Página de Clientes (`src/index.html`):** Catálogo gastronómico público con fotos en alta definición, filtros de momentos del día, modal de platos con selección de extras (queso adicional, doble carne, salsas), carrito con comanda estructurada para cocina vía WhatsApp y Chat en vivo.
   - **Página de Administración (`src/admin.html`):** Panel para agregar y quitar platos del menú según disponibilidad del día, ajustar precios al instante, subir fotos a Google Drive y responder mensajes web.
   - **Base de Datos en la Nube:** Hoja de cálculo Google Sheets independiente vinculada a la cuenta de correo `elchichote@gmail.com`.

4. **Identidad Visual y Temas:**
   - Modo Claro ☀️ por defecto: Paleta alegre, vibrante y apetitosa (maíz dorado, terracota cálido, blanco marfil y acentos verdes frescos de cilantro/aguacate).
   - Modo Oscuro 🌙: Tonos carbón elegante con acentos ámbar apetitosos.

5. **Entorno de Documentación y Trazabilidad:**
   - Se crea la carpeta [`docs/`](docs/) para centralizar la arquitectura y guías técnicas.
   - Se publica [`docs/INDICE_ARQUITECTURA.md`](docs/INDICE_ARQUITECTURA.md) con el mapa completo de comunicación entre el frontend, backend de Google Apps Script, Google Sheets y WhatsApp.
   - Se publica [`docs/REGLAS_DE_GOBERNANZA.md`](docs/REGLAS_DE_GOBERNANZA.md) con el blindaje de la cuenta `elchichote@gmail.com` y la regla de no tomar decisiones sin consultar a Andy Paz.

6. **Generación Inicial de Activos Multimedia:**
   - Se generaron y almacenaron en [`assets/imagenes/`](assets/imagenes/) las primeras fotos apetitosas de alta definición:
     * `empanadas_doradas.jpg` (Generada con IA, estilo gourmet de estudio).
     * `pastelitos_guasacaca.jpg` (Generada con IA, hojaldrada con relleno humeante).
     * `tequenos_guasacaca.jpg` (Tequeños dorados con salsa verde).
     * `sopa_costilla_arepitas.jpg` (Sancocho de costilla humeante con arepitas).
     * `cachapa_queso_mano.jpg` (Cachapa tradicional dorada).
     * `refrescos_desayuno.jpg` (Refrescos fríos en lata).


---

## 📝 Registro de Sesión 3 (17 de Octubre de 2026 - Tarde)

### Ejecución y Validación de la Fase 1 (Maquetación y Verificación en Navegador Nativo):
1. **Desarrollo del Catálogo Gastronómico de Clientes (`src/index.html` y `src/app.js`):**
   - Implementación de cabecera adaptativa de 2 filas para compatibilidad total móvil y escritorio.
   - Banner de bienvenida gastronómico cálido y apetitoso.
   - Barra deslizante de categorías por momentos del día: Desayunos Criollos, Sopas & Almuerzos, Cachapas, Comida Rápida & Parrilla, Bebidas Frías.
   - Cuadrícula responsiva de platos con fotos de alta definición en [`assets/imagenes/`](assets/imagenes/) y badges de precio destacados.
   - Modal de plato interactivo con selector de **Extras de Comida** (guasacaca adicional, salsas, quesos, arepitas) con recálculo de precio en tiempo real y campo de notas para la cocina.
   - Modal de Comanda con resumen ordenado, formulario de entrega (nombre y dirección) y botón de envío directo a WhatsApp formateado como comanda de restaurante.
   - Modal de Chat Web directo con respuesta de atención en línea.
   - Conmutador de tema Modo Claro ☀️ / Modo Oscuro 🌙 con persistencia en localStorage (`adomicilio_tema`).

2. **Desarrollo del Panel de Administración (`src/admin.html` y `src/admin.js`):**
   - Tarjetas de métricas en tiempo real: Platos en carta, platos activos hoy, comandas recibidas y mensajes web.
   - Buscador en vivo de platos.
   - Botón destacado `[+ Agregar Nuevo Plato]`.
   - Tabla interactiva con miniaturas, categorías, precios editables y switch de disponibilidad de 1 clic ("Disponible Hoy" / "Agotado").
   - Modal de creación y edición completa de platos.
   - Modal de configuración de números de WhatsApp (Cocina / Repartidores).
   - Acceso directo para previsualizar el menú público.

3. **Verificación Estricta con Navegador Nativo (`REG-03`):**
   - Se ejecutó el script de verificación automatizado [`verificar_pantalla.js`](verificar_pantalla.js) conectándose vía CDP al puerto `9222` de Chrome nativo.
   - Se validaron y capturaron 4 evidencias visuales en [`capturas/`](capturas/):
     * `catalogo_publico_adomicilio.png` (Catálogo público con banner y platos apetitosos).
     * `modal_plato_empanadas.png` (Modal de empanadas con extras seleccionables y notas).
     * `modal_comanda_adomicilio.png` (Comanda con 2 platos, cálculo de total $10.00 y botón WhatsApp).
     * `panel_admin_adomicilio.png` (Panel administrativo con tabla de gestión de platos y métricas).
   - Cero errores de sintaxis o renderizado.


---

## 📝 Registro de Sesión 4 (17 de Octubre de 2026 - Tarde)

### Solución y Enfoque Visual del Navegador Nativo en Pantalla:
1. **Diagnóstico del Problema de Visualización:**
   - Al ejecutar procesos desde el entorno de herramientas de automatización en Windows, el subproceso se estaba asignando al escritorio virtual del ejecutor (`WinSta0\exebox-...`), lo que mantenía el navegador vivo y accesible por CDP pero sin renderizar su ventana en el monitor interactivo (`WinSta0\Default`).
2. **Acciones Técnicas Aplicadas:**
   - Se configuró el lanzamiento forzado hacia el escritorio interactivo del usuario (`WinSta0\Default`).
   - Se creó un lanzador directo de 1 clic en el Escritorio de Windows: [`c:\Users\x\Desktop\Abrir_Navegador_A_Domicilio.bat`](file:///c:/Users/x/Desktop/Abrir_Navegador_A_Domicilio.bat).
   - El script abre automáticamente el navegador maximizado en la pantalla principal con 3 pestañas preparadas:
     * **Pestaña 1:** `https://accounts.google.com` (para que Andy inicie sesión con `elchichote@gmail.com` y queden guardadas las credenciales de Google Sheets).
     * **Pestaña 2:** [`file:///c:/Users/x/Desktop/WebViewComida/src/index.html`](file:///c:/Users/x/Desktop/WebViewComida/src/index.html) (Menú público de clientes).
     * **Pestaña 3:** [`file:///c:/Users/x/Desktop/WebViewComida/src/admin.html`](file:///c:/Users/x/Desktop/WebViewComida/src/admin.html) (Panel administrativo).

---

## 📝 Registro de Sesión 5 (17 de Octubre de 2026 - Tarde / Continuación)

### Enfoque de Pantalla, Validación de Sesión y Creación de Google Sheets:
1. **Detección y Corrección Multimonitor:**
   - Se detectó mediante CDP (`Browser.getWindowForTarget`) que la ventana del navegador se encontraba ubicada fuera del monitor principal, en coordenadas del tercer monitor (`left: 1432`).
   - Se reposicionó y ajustó automáticamente al monitor interactivo principal `DISPLAY1` en coordenadas (`left: 50, top: 50, width: 1340, height: 800`).
2. **Validación Visual de Sesión Google (`REG-01`):**
   - Se capturó y validó la sesión activa de Google (`capturas/cuenta_google_activa.png`), confirmando el inicio de sesión oficial con **ANDY Paz** (`elchichote@gmail.com`) y suscripción Google AI Pro.
3. **Creación Automática del ERP en Google Sheets:**
   - Se generó una nueva hoja de cálculo en la cuenta de Andy: `A Domicilio - ERP Gastronomico` (ID: `1nHy2HPQEqdum2g1pXAyz6eJECVX4zgIPAt8J5JZqsRA`), visible y enfocada en pantalla (`capturas/pantalla_actual_sheets.png`).
4. **Preparación del Despliegue Apps Script:**
   - Se cargó el código completo de [`backend/Codigo.gs`](backend/Codigo.gs) directamente en el Portapapeles de Windows de Andy Paz con `Set-Clipboard`.
   - Queda listo para pegar (`Ctrl + V`) en Apps Script, implementar como Web App y conectar el endpoint `/exec` al Panel de Administración.
5. **Verificación de Acceso Público de Lectura en Google Sheets:**
   - Se verificó el acceso público en modo sólo lectura para la hoja oficial `A Domicilio - ERP Gastronomico` (ID: `1nHy2HPQEqdum2g1pXAyz6eJECVX4zgIPAt8J5JZqsRA`).
   - Se ejecutó prueba de extracción vía Google Visualization API (`/gviz/tq?tqx=out:json`) con respuesta exitosa `status: ok`, permitiendo consultar el catálogo sin necesidad de credenciales adicionales.
6. **Inyección Automatizada del Backend en Apps Script:**
   - Se inyectaron mediante CDP y la API de Monaco Editor los 16.104 caracteres del código íntegro de [`backend/Codigo.gs`](backend/Codigo.gs) en el proyecto oficial de Google Apps Script.
   - Se enlazó explícitamente el ID de la hoja de cálculo (`SPREADSHEET_ID`) y la función `obtenerSpreadsheet()`.
   - El código quedó guardado y sincronizado en Google Drive (`capturas/codigo_pegado_appsscript.png`).

---

## 📝 Registro de Sesión 6 (17 de Octubre de 2026 - Tarde / Despliegue Cloud ERP y GitHub)

### Activación del Endpoint de Producción, Sincronización y Preparación de GitHub:
1. **Despliegue y Ajuste de Acceso Público:**
   - Andy Paz generó la implementación Web inicial obteniendo el endpoint: `https://script.google.com/macros/s/AKfycbyXnJXQEF0XsUVRd9w_oY_iekqD3H77FpJkspmIzavtGiCe9iMcjLfP9cI-5ewYD8kpSw/exec`.
   - Se ajustó el nivel de acceso en *Gestionar implementaciones* a **"Cualquier usuario"** (público sin requerir inicio de sesión de Google para los comensales).
   - Se renombró el proyecto en Google Apps Script a **`A Domicilio - Backend Gastronomico`** (`capturas/proyecto_renombrado.png`).

2. **Inicialización y Siembra de Datos en Google Sheets ERP:**
   - Se ejecutó la acción `inicializarHojas` directamente contra el endpoint en vivo.
   - Se verificó la creación de las 5 pestañas de datos en la hoja `A Domicilio - ERP Gastronomico`:
     * `Menu_Platillos`: Encabezados oficiales y 4 platos sembrados con extras en formato JSON.
     * `Pedidos_Comanda`: Registro de comandas con detalles, clientes y estados.
     * `Clientes_Comensales`: Directorio de clientes con cédula, correo y teléfono.
     * `Mensajes_Chat`: Historial de mensajería bidireccional.
     * `Configuracion`: Parámetros de tienda, horarios y teléfonos de WhatsApp.
   - Evidencia capturada en [`capturas/hojas_inicializadas_erp.png`](capturas/hojas_inicializadas_erp.png).

3. **Sincronización Total del Frontend (`src/api.js` y `reglas_proyecto.json`):**
   - Se configuró el endpoint oficial por defecto en [`src/api.js`](src/api.js).
   - Se actualizaron las especificaciones en [`reglas_proyecto.json`](reglas_proyecto.json).
   - Se recargaron y validaron visualmente:
     * Catálogo público: [`capturas/menu_sincronizado_cloud.png`](capturas/menu_sincronizado_cloud.png) (11 platos cargados, filtros por categoría y diseño apetitoso).
     * Panel de Administración: [`capturas/admin_sincronizado_cloud.png`](capturas/admin_sincronizado_cloud.png) (badge "Sincronizado con Google Sheets" activo, tabla de precios en vivo).

4. **Identificación de Entorno GitHub Dedicado:**
   - Se detectó en la sesión activa del navegador el perfil oficial de GitHub: **`Domicilio-Chi`** ([`capturas/github_perfil.png`](capturas/github_perfil.png)), 100% independiente para el alojamiento del catálogo y páginas públicas.

---

## 📝 Registro de Sesión 7 (17 de Octubre de 2026 - Noche / Despliegue en Vivo GitHub Pages, Pruebas End-to-End y Cierre de Fase 1)

### Despliegue Global, Sincronización Cloud y Validación Operativa de "A Domicilio":
1. **Creación de Repositorio y Autenticación GitHub:**
   - Se creó el repositorio oficial [`https://github.com/Domicilio-Chi/Domicilio.git`](https://github.com/Domicilio-Chi/Domicilio.git) bajo la cuenta independiente **`Domicilio-Chi`**.
   - Se generó y resguardó el Personal Access Token clásico (con permisos de `repo` y `workflow`) en [`domicilio_token.txt`](domicilio_token.txt).
   - Se configuró la identidad Git inmutable: `ANDY Paz` / `elchichote@gmail.com`.

2. **Empaquetado y Despliegue en GitHub Pages:**
   - Se implementó el script de preparación y despliegue automatizado [`preparar_gh_pages.js`](preparar_gh_pages.js).
   - Se estructuró la carpeta limpia de producción [`comida_gh_pages/`](comida_gh_pages/):
     * `index.html`: Catálogo gastronómico público con cabecera responsive, selector de momentos del día, comanda interactiva y chat.
     * `admin.html`: Panel administrativo para gestión de platos, precios, disponibilidad y números de WhatsApp de cocina.
     * `api.js`: Conector asíncrono con Google Apps Script y Google Sheets ERP.
     * `app.js` y `admin.js`: Lógica operativa de cliente y administrador.
     * `404.html`: Soporte nativo para deep linking en GitHub Pages.
     * `.nojekyll`: Desactivación del procesamiento Jekyll para carga limpia de recursos estáticos.
     * `assets/imagenes/`: Fotografías gastronómicas de alta definición (empanadas, tequeños, pastelitos, cachapas, sopas criollas y bebidas).
   - Se realizó commit `feat(adomicilio): lanzamiento inicial catalogo gastronomico, comandas y ERP sincronizado` y push a la rama `main`.
   - Se activó GitHub Pages vía REST API (`POST /repos/Domicilio-Chi/Domicilio/pages`) con enforcement HTTPS.
   - Resultado verificado: Compilación exitosa (`status: built`) y páginas en vivo retornando HTTP 200:
     * **Catálogo Público:** [`https://domicilio-chi.github.io/Domicilio/`](https://domicilio-chi.github.io/Domicilio/)
     * **Panel de Administración:** [`https://domicilio-chi.github.io/Domicilio/admin.html`](https://domicilio-chi.github.io/Domicilio/admin.html)

3. **Siembra Completa del Menú Gastronómico en Google Sheets ERP:**
   - Se ejecutó el script [`sembrar_menu_completo_erp.js`](sembrar_menu_completo_erp.js), registrando en la hoja oficial `A Domicilio - ERP Gastronomico` (ID: `1nHy2HPQEqdum2g1pXAyz6eJECVX4zgIPAt8J5JZqsRA`) los 12 platos criollos y de comida rápida:
     * **Desayunos:** Trío de Empanadas Crujientes ($4.50), Ración de Tequeños con Guasacaca ($5.00), Pastelitos Andinos Dorados ($4.50).
     * **Bebidas:** Combo Desayuno con Refresco Frío ($1.50).
     * **Almuerzos y Sopas:** Sopa Criolla de Costilla de Res con Arroz y Arepitas ($7.50), Sopa de Pollo de Campo con Arroz y Arepitas ($6.50).
     * **Cachapas:** Cachapa Tradicional con Queso de Mano y Cochino Frito ($8.50), Cachapa Especial Doble Queso de Mano ($7.00).
     * **Comida Rápida y Parrilla:** Hamburguesa Especial a la Parrilla ($6.50), Pizza Familiar Mixta ($12.00), Perro Caliente Especial con Todo ($3.50), Pollo Asado a la Brasa Medio Pollo ($9.50).
   - Cada plato cuenta con su array estructurado de **Extras de Comida** (salsas, guasacaca, quesos adicionales, raciones) y normalización automática de imágenes (`getRutaFoto`).

4. **Sincronización Automática de Comandas con el ERP:**
   - Se actualizó la función `enviarComandaWhatsApp()` en [`src/app.js`](src/app.js) para que, al despachar un pedido, invoque en segundo plano a `API.registrarComanda()` guardando el registro completo en la pestaña `Pedidos_Comanda` de Google Sheets (ID comanda, nombre del cliente, dirección, platos con cantidades, adicionales seleccionados, notas de cocina y total USD).
   - Cambios sincronizados y pusheados a GitHub (`[main 7e2aa0c]`).

5. **Validación Visual y Funcional Automatizada vía Chrome CDP (`REG-03`):**
   - Se conectó al navegador nativo en el puerto `9222` de Chrome (`verificar_sitio_en_vivo.js` y `probar_comanda_completa.js`).
   - Se ejecutaron las pruebas sobre las URLs públicas reales de GitHub Pages:
     * **Carga de Catálogo:** Verificación de títulos, filtros y renderizado nítido de fotos gastronómicas de alta definición ([`online_catalogo_publico.png`](capturas/online_catalogo_publico.png)).
     * **Filtro de Categorías:** Filtrado instantáneo por "Sopas & Almuerzos" mostrando las sopas de costilla y pollo con arepitas doradas ([`online_categoria_almuerzos.png`](capturas/online_categoria_almuerzos.png)).
     * **Modal de Personalización de Plato:** Apertura del plato `D01` (Empanadas Crujientes), selección de adicionales de Guasacaca verde extra y Salsa tártara con recálculo dinámico ([`online_modal_empanadas_extras.png`](capturas/online_modal_empanadas_extras.png)).
     * **Modal de Comanda:** Lista de comanda con desglose de plato, adicionales, subtotal ($5.50), datos de cliente y dirección de entrega ([`online_comanda_con_items.png`](capturas/online_comanda_con_items.png)).
     * **Panel Administrador:** Conexión en vivo con Google Sheets ERP, badge verde de sincronización, métricas de platos en carta y tabla de edición rápida de disponibilidad y precios ([`online_admin_erp.png`](capturas/online_admin_erp.png)).
   - **Resultado Global:** 100% de pruebas superadas sin errores en consola ni roturas de interfaz.


---

## 📝 Registro de Sesión 8 (17 de Octubre de 2026 - Noche / Ajustes de UX, Delivery Gratis, Editor Modular de Salsas y Nuevos Campos)

### Implementación Exhaustiva de las Mejoras Solicitadas por Andy Paz:
1. **Eliminación del Enlace `Admin` en el Footer Público:**
   - Atendiendo a la instrucción y captura de pantalla proporcionada por Andy Paz, se retiró por completo el enlace visible `<a href="admin.html">🔒 Admin</a>` del footer en [`src/index.html`](src/index.html).
   - Ahora el footer público muestra únicamente el copyright corporativo y la descripción gastronómica de manera limpia y segura.

2. **Cierre de Modales por Clic Fuera (Backdrop Click) y Tecla `Escape`:**
   - Se implementó la escucha de eventos en el backdrop oscuro de todas las ventanas modales (`modalPlato`, `modalComanda`, `modalChat`, `modalInfoDelivery`, `modalEditarPlato`, `modalConfigDelivery`, etc.).
   - Ahora el usuario puede salir de cualquier ventana modal tanto pulsando la [X] como haciendo un clic en el fondo exterior o presionando la tecla `Escape`.

3. **Sistema Dinámico de Delivery Gratis (Catálogo y Administrador):**
   - **En el Panel Administrador (`src/admin.html` & `src/admin.js`):**
     * Nuevo botón `[🛵 Delivery]` en la barra superior.
     * Modal dedicado `#modalConfigDelivery` para activar/desactivar la promoción, fijar la cantidad mínima de unidades (default: 2 unidades), personalizar el texto promocional y detallar las condiciones de cobertura.
   - **En el Catálogo de Clientes (`src/index.html` & `src/app.js`):**
     * Píldora interactiva destacada en la cabecera: `🛵 Envío Gratis (2+ unid)` que al hacer clic despliega una ventana informativa (`#modalInfoDelivery`) con las condiciones de entrega caliente, tiempos de despacho y empaque térmico.
     * En la ficha del plato (`#modalPlato`): Banner dinámico que reacciona a la cantidad seleccionada. Si la cantidad es 1, avisa `🛵 ¡Delivery GRATIS a partir de 2 unidades! (Agrega 1 más)`; si la cantidad es 2 o superior, conmuta a verde: `🎉 ¡Esta orden califica para Delivery GRATIS! 🛵`.
     * En la comanda (`#modalComanda`): Indicador visual que valida en tiempo real si el pedido supera el umbral de unidades para bonificar el envío.

4. **Campos Adicionales en el Formulario de la Comanda y Despacho WhatsApp:**
   - Se añadieron campos solicitados para agilizar el despacho y la entrega a domicilio:
     * `comandaClienteTelefono`: Teléfono de contacto / WhatsApp del comensal.
     * `comandaPuntoReferencia`: Color de fachada, portón o punto cercano de referencia para el repartidor.
     * `comandaMetodoPago`: Selector desplegable con opciones (Efectivo Divisas $, Pago Móvil Bs, Efectivo Bs, Zelle / Binance Pay, Punto de Venta al recibir).
     * `comandaPagaCon`: Indicación de con cuánto paga el comensal para que el repartidor lleve el vuelto/cambio exacto.
   - La comanda formateada para WhatsApp ahora incluye todos estos datos estructurados junto con el estado del delivery (`¡DELIVERY GRATIS APLICADO!`).
   - Los datos adicionales también se envían y registran en la pestaña `Pedidos_Comanda` de Google Sheets ERP.

5. **Editor Modular de Salsas, Adicionales y Extras en el Panel Administrador:**
   - En el modal de creación y edición de platos (`#modalEditarPlato`):
     * Nueva sección: **"Salsas, Adicionales y Extras del Plato"** con botón `[+ Agregar Extra]`.
     * Permite agregar, modificar o eliminar salsas (guasacaca, tártara, ajo), quesos extras o raciones adicionales con su respectivo precio en USD ($0.00 para gratis).
     * Al guardar el plato, los adicionales se sincronizan tanto en memoria/localStorage como en la base de datos en la nube de Google Sheets ERP (`API.guardarPlato`).

6. **Optimización de Responsividad Móvil (390px / Teléfonos):**
   - Se ajustó el espaciado y flex-wrap de la cabecera en pantallas estrechas para evitar desbordamientos.
   - Modales optimizados con scroll interno y tamaños táctiles cómodos.
   - Pruebas automatizadas y capturas de pantalla verificadas en emulación móvil de 390px x 844px.

---

## 📝 Registro de Sesión 9 (17 de Octubre de 2026 - Noche / Refactorización del Modal de Plato para Móviles)

### Mejoras Realizadas según las Instrucciones Específicas del Usuario:
1. **Eliminación del Badge de Categoría sobre la Foto:**
   - Se removió por completo la etiqueta flotante de categoría (ej. *"Desayuno"*) que cubría la fotografía del plato en `#modalPlato`.
   - La imagen gastronómica ahora se aprecia limpia, despejada y sin superposiciones de texto innecesarias.
   - En [`src/app.js`](src/app.js) se aseguró el acceso seguro mediante comprobación condicional (`if (badgeCat)`) para evitar errores en consola.

2. **Cabecera Limpia: Nombre a la Izquierda y Precio al Extremo Derecho:**
   - Se eliminó el texto redundante `"Precio base"`, dejando únicamente el precio en tipografía destacada y nítida (`$4.50`, `$5.00`, etc.) alineado a la derecha.
   - El título del plato (`#modalTituloPlato`) y su descripción breve (`#modalDescripcionPlato`) se ubican a la izquierda ocupando el espacio disponible con tipografía responsiva (`text-lg sm:text-xl font-black`).

3. **Compactación de Altura de Imagen y Espaciados para Pantallas de Teléfono:**
   - La altura del contenedor de la foto se redujo de `h-60 sm:h-72` (240px-288px) a `h-40 sm:h-52` (160px-208px), recuperando más de 80px de espacio vertical crítico en dispositivos móviles.
   - El padding interior se ajustó de `p-5 sm:p-6 space-y-4` a `p-4 sm:p-5 space-y-3`.
   - Se optimizaron las distancias entre la sección de salsas/extras, las notas de cocina y el banner de delivery gratis.
   - El botón `"Agregar a Comanda"` y el selector de cantidad ahora quedan siempre a la vista y de fácil acceso sin necesidad de hacer scroll excesivo en pantallas de 375px a 390px.

4. **Persistencia de la Selección de Salsas y Recálculo Dinámico:**
   - Se verificó que al tildar salsas o adicionales (ej. Guasacaca verde +$0.50), el precio base permanece fijo en la cabecera superior mientras que el botón inferior actualiza instantáneamente el total acumulado (`$5.00`).

5. **Verificación en Vivo mediante Chrome CDP y Despliegue en GitHub Pages:**
   - Cambios integrados en `src/index.html`, `src/app.js`, `comida_gh_pages/index.html`, `comida_gh_pages/404.html` y `comida_gh_pages/app.js`.
   - Commit y push exitoso: `2a1d909` en la rama `main` de `https://github.com/Domicilio-Chi/Domicilio.git`.
   - Pruebas automatizadas ejecutadas con emulación móvil de 390px x 844px en `test_ajustes_modal_movil.js`:
     * Cierre por clic fuera (backdrop): `cerrado: true`
     * Cierre por botón [X]: `cerradoConX: true`
     * Evidencias visuales capturadas:
       - [`mejora_07_modal_plato_movil_390px.png`](capturas/mejora_07_modal_plato_movil_390px.png)
       - [`mejora_08_modal_extra_seleccionado_movil.png`](capturas/mejora_08_modal_extra_seleccionado_movil.png)


6. **Reemplazo de Categoría por Nombre del Plato y Precio en Tarjetas del Catálogo:**
   - Atendiendo la captura enviada por el usuario (`media_1792274171215_50feb1bd.png`), se identificó que las tarjetas del catálogo mostraban una píldora superior izquierda con la categoría (ej. *"🥟 Desayunos"*).
   - Se reemplazó la píldora de categoría por el **Nombre Real del Plato** (`${p.nombre}`) en la esquina superior izquierda sobre fondo oscuro translúcido (`bg-black/75 backdrop-blur-md`), conservando el badge de precio (`$4.50`) en la esquina superior derecha (`bg-rose-600 text-white font-black`).
   - Se aplicó cache buster `?v=2.1` a los scripts para forzar la recarga en caliente de los navegadores.
   - Commit y push: `8adf619` y `b00d410`.
   - Evidencia capturada y validada en vivo con CDP: [`mejora_09_tarjeta_nombre_y_precio_sin_desayuno.png`](capturas/mejora_09_tarjeta_nombre_y_precio_sin_desayuno.png).

---

## 📝 Registro de Sesión 10 (17 de Octubre de 2026 - Noche / Guía Secuencial de Categorías, Categoría Predeterminada y Chat Contextual por Plato)

### Nuevas Funcionalidades Desarrolladas según Solicitud de Andy Paz:
1. **Guía Animada y Secuencial de Categorías (Efecto "Toca Aquí"):**
   - Se diseñó e implementó un efecto de baliza visual dinámica (`iniciarGuiaSecuencialCategorias`) con animación CSS `@keyframes guiaPulso`.
   - Cada 1.6 segundos, el sistema ilumina de manera secuencial una categoría (`Todos` ➔ `Desayuno Criollo` ➔ `Sopas & Almuerzos` ➔ `Cachapas` ➔ `Rápida & Parrilla` ➔ `Bebidas Frías`), invitando de forma intuitiva a los comensales móviles a interactuar.
   - En dispositivos móviles, la barra de categorías ahora cuenta con `flex-wrap` y ajuste táctil para visualizar todas las categorías de inmediato.
   - Al tocar o seleccionar cualquier categoría, la animación se detiene suavemente (`detenerGuiaCategorias`).

2. **Categoría Predeterminada Configurable desde Administrador:**
   - En [`src/admin.html`](src/admin.html) y [`src/admin.js`](src/admin.js) se añadió el botón `[⚙️ Ajustes]` y el modal `#modalConfigGeneral`.
   - Permite al administrador definir qué categoría se carga automáticamente cuando los comensales entran a la página principal (ej. abrir directo en *Cachapas* o *Desayunos*).
   - Persiste en `localStorage` (`adomicilio_categoria_predeterminada`) y en la hoja `Configuracion` de Google Sheets ERP.

3. **Botón "Consultar al Chef" en la Subventana del Plato:**
   - En la ficha modal del plato (`#modalPlato`), justo arriba de la barra de comanda, se agregó el botón: `[💬 ¿Tienes dudas? Consulta al chef sobre este plato]`.
   - Al presionarlo, abre el chat web vinculando automáticamente el contexto del plato consultado (`chatContextoPlato`).

4. **Chat Web con Contexto Automático del Menú y Chips de Preguntas Frecuentes:**
   - En el encabezado del chat (`#modalChat`), se despliega una barra con indicador activo: `Consultando: [Nombre del Plato] ($[Precio])`.
   - Se agregaron chips de preguntas rápidas de un clic:
     * `⏱️ ¿Cuánto tarda?`
     * `🌶️ ¿Trae salsas?`
     * `🛵 ¿Entrega inmediata?`
   - Los mensajes del cliente se etiquetan con el plato consultado y se envían a Google Sheets `Mensajes_Chat`.
   - La cocina responde automáticamente con información estimada de salida y un botón directo: `[📲 Confirmar por WhatsApp]`.

5. **Panel Administrador de Consultas en Vivo:**
   - Nuevo botón `[💬 Consultas]` en la barra superior del Admin con badge de notificación.
   - Modal `#modalAdminChat` que lista las preguntas de los clientes, destacando exactamente qué plato están preguntando (`🍽️ Consultó sobre: Cachapa Tradicional con Queso de Mano`).
   - Campo para redactar respuestas y botón para saltar directo a WhatsApp con el comensal.

6. **Despliegue y Validación:**
   - Commit `a76ba0f` en rama `main` de `https://github.com/Domicilio-Chi/Domicilio.git`.
   - Pruebas automatizadas en vivo con Chrome CDP ejecutadas en `test_nuevas_funciones_completas.js`:
     * [`mejora_10_guia_secuencial_categorias_movil.png`](capturas/mejora_10_guia_secuencial_categorias_movil.png)
     * [`mejora_11_chat_con_contexto_plato.png`](capturas/mejora_11_chat_con_contexto_plato.png)
     * [`mejora_12_admin_panel_consultas_plato.png`](capturas/mejora_12_admin_panel_consultas_plato.png)
     * [`mejora_13_admin_config_categoria_predeterminada.png`](capturas/mejora_13_admin_config_categoria_predeterminada.png)

---

## 📝 Registro de Sesión 11 (17 de Octubre de 2026 - Noche / Splash 2.5s Sin Trabas, Tarjeta 100% Clickeable, Compartir en Modal y Correo de Contacto)

### Objetivos Completados según Solicitud Directa de Humberto / Andy Paz:
1. **Presentación Introductoria Temporal (Splash 2.5s) y Retiro del Banner Estático:**
   - Se removió la sección estática `<section>` del banner del cuerpo de la página para no ocupar espacio vertical permanente en móviles ni en escritorio. Las categorías ahora aparecen inmediatamente bajo la cabecera.
   - Se diseñó un overlay de presentación `#splashPresentacion` (`fixed inset-0 z-[100]`) totalmente responsivo (móvil y PC), con fondo de cristal ahumado y tarjeta con gradiente cálido criollo.
   - **Garantía Cero Congelamiento (Zero-Lag):** La página y el menú cargan de inmediato en el DOM. El splash se desvanece suavemente a los 2.5 segundos mediante transición CSS GPU (`opacity-0 pointer-events-none scale-95`) y luego se desacopla completamente del DOM (`display: none`), liberando todos los eventos de clic.
   - Incluye botón instantáneo `[Entrar ya ➔]` y una barra de progreso lineal de 2.4 segundos.

2. **Paleta/Tarjeta Completa del Plato 100% Clickeable:**
   - Anteriormente, solo hacer clic sobre la foto abría el modal; hacer clic en el nombre o descripción no abría nada.
   - Se unificó toda la tarjeta del plato (`#gridPlatos > div`) como un único disparador táctil con `onclick="abrirModalPlato('${p.id}')"` y `cursor-pointer`. Tocar cualquier punto (foto, título, ingredientes, precio o fondo) abre de inmediato la ficha con sus extras.
   - Se eliminaron los botones redundantes `[Pedir / Extras]` y `[Compartir]` de la cuadrícula, logrando tarjetas mucho más limpias, compactas y profesionales.
   - Se incorporó un sutil pie informativo en cada tarjeta: `Toca para ver extras y pedir ➔` y `🔥 Recién hecho`.

3. **Reubicación del Botón Compartir dentro del Modal del Plato:**
   - En la cabecera del modal (`#modalPlato`), junto al botón de cerrar `[X]`, se colocó el botón de compartir `[🔗]` (`compartirPlatoDesdeModal`).
   - Al presionarlo desde adentro del plato, copia el enlace al portapapeles o activa la hoja de compartir nativa en smartphones.

4. **Línea de Contacto en Footer y Configuración Editable desde Admin:**
   - En el pie de página público se añadió: `Contáctanos: inghumbertoacosta@gmail.com` con enlace directo `mailto:`.
   - En el Panel Administrador (`src/admin.html` y `src/admin.js`), dentro del modal `[⚙️ Ajustes]`, se agregó el campo editable `cfgEmailContacto`.
   - Permite a Humberto Acosta modificar el correo de contacto en cualquier momento, sincronizándose automáticamente con `localStorage` y la hoja `Configuracion` de Google Sheets ERP.

5. **Despliegue y Validación en Vivo:**
   - Cache buster actualizado a `?v=2.2`.
   - Commit y push exitoso: `4653840` en `https://github.com/Domicilio-Chi/Domicilio.git`.
   - Suite automatizada `test_splash_tarjeta_email.js` ejecutada al 100% con Chrome CDP:
     * [`mejora_14_splash_presentacion_2_5s.png`](capturas/mejora_14_splash_presentacion_2_5s.png)
     * [`mejora_15_modal_plato_abierto_por_click_tarjeta.png`](capturas/mejora_15_modal_plato_abierto_por_click_tarjeta.png)
     * [`mejora_16_footer_email_contacto.png`](capturas/mejora_16_footer_email_contacto.png)
     * [`mejora_17_admin_config_email_contacto.png`](capturas/mejora_17_admin_config_email_contacto.png)

---

## 📝 Registro de Sesión 12 (17 de Octubre de 2026 - Noche / Buscador Colapsable con Sugerencias, Chat Vibrante Azul-Blanco y Categorías con Onda Suave)

### Nuevas Optimizaciones Realizadas según Feedback de Humberto:
1. **Buscador Colapsable mediante Botón de Lupita en la Cabecera:**
   - Se removió la barra de búsqueda permanente de la cabecera móvil que ocupaba altura innecesaria en pantalla.
   - Se integró el botón **`[🔍]`** (`#btnToggleBuscador`) dentro de la fila de acciones superiores (junto a tema, chat, WhatsApp y comanda).
   - Al tocar la lupita, se despliega suavemente el panel `#panelBuscadorColapsable` con autoenfoque en el input.
   - Al tocarlo nuevamente o pulsar `[Cerrar]`, se oculta de inmediato restaurando el espacio vertical.

2. **Panel de Sugerencias Interactivas en Vivo ("Va Sugiriendo Abajo"):**
   - Cuando el buscador está abierto y el campo está vacío, despliega chips rápidos con términos populares:
     * `🥟 Empanadas` | `🧀 Tequeños` | `🌽 Cachapas` | `🍲 Sopa de Costilla` | `🍔 Hamburguesa` | `🥤 Bebidas`
   - Al hacer clic en cualquier chip, filtra automáticamente el catálogo.
   - Al teclear (ej. "cacha" o "sopa"), lista en tiempo real los platos coincidentes con su ícono y precio, permitiendo abrir directamente el modal del plato deseado con un solo toque.

3. **Animación Vibrante Fluctuante Azul / Blanco en el Ícono de Chat:**
   - El botón `#btnAbrirChatHeader` incorpora la clase `.chat-pulsante-azul-blanco`.
   - Efecto visual dinámico con `@keyframes chatBordeVibrante` y `@keyframes chatIconoFluctua`:
     * Fluctúa entre azul eléctrico (`#0284c7` / `#38bdf8`) y blanco puro (`#ffffff`) tanto en el ícono como en los bordes y halo exterior (`box-shadow`).
     * Incluye una sutil vibración periódica que atrae la mirada del comensal para que consulte sobre el menú o pregunte al chef.

4. **Visualización Optimizada de Categorías en Móvil con Onda Suave:**
   - Las categorías cuentan con nombres cortos y contundentes para teléfonos: `Todos`, `Desayunos`, `Sopas`, `Cachapas`, `Rápida`, `Bebidas`.
   - Se organizan en una pista horizontal con desplazamiento táctil ultra-suave (`no-scrollbar`).
   - Se implementó la animación de onda suave `@keyframes guiaOndaSuave` que eleva y resalta suavemente una a una las categorías inactivas cada 1.8 segundos, desplazándolas a la vista si quedan fuera del margen de la pantalla móvil.

5. **Despliegue y Validación:**
   - Cache buster actualizado a `?v=2.3`.
   - Commit y push exitoso: `7812cd0` en `https://github.com/Domicilio-Chi/Domicilio.git`.
   - Suite automatizada `test_buscador_chat_categorias.js` ejecutada con Chrome CDP:
     * [`mejora_18_header_compacto_chat_pulsante.png`](capturas/mejora_18_header_compacto_chat_pulsante.png)
     * [`mejora_19_buscador_colapsable_con_sugerencias.png`](capturas/mejora_19_buscador_colapsable_con_sugerencias.png)
     * [`mejora_20_categorias_movil_onda_suave.png`](capturas/mejora_20_categorias_movil_onda_suave.png)

---

## 📝 Registro de Sesión 13 (17 de Octubre de 2026 - Noche / Creación del Manual Maestro README para IAs y Desarrolladores)

### Objetivo y Ejecución:
- En respuesta a la solicitud de Humberto (*"en la carpeta esra la esplicasion el indise de funcionamiento logica para que una ia que encuentre la carpeta y entienda toto al leerlo? crea el documento"*), se redactó y publicó el manual maestro definitivo:
  [`README.md`](README.md).
- El documento centraliza:
  1. **Ficha Técnica Oficial:** Propietario (Humberto / ANDY Paz), cuenta `elchichote@gmail.com`, repositorios, tokens y enlaces en vivo.
  2. **Diagrama de Arquitectura Mermaid:** Flujo de datos completo entre el Catálogo Público, Panel Admin, Google Sheets ERP, Google Drive, WhatsApp y Web Chat.
  3. **Estructura de Directorios:** Mapa de cada archivo en `src/`, `comida_gh_pages/`, `backend/`, `docs/`, `assets/` y scripts de prueba.
  4. **Lógica de Negocio al Detalle:** Splash no-bloqueante (2.5s), buscador colapsable con sugerencias, tarjetas 100% clickeables, modal de plato y adicionales, motor de comanda con Delivery Gratis, chat con contexto automático, selector de categorías con onda suave y tema dual.
  5. **Esquema de Base de Datos Google Sheets:** Definición de columnas de las 5 hojas (`Menu_Platillos`, `Pedidos_Comanda`, `Mensajes_Chat`, `Clientes_Comensales`, `Configuracion`).
  6. **Protocolo de Sincronización y Gobernanza para IAs:** Reglas inmutables para que cualquier nueva IA mantenga la integridad y evite regresiones.
- Se replicó el archivo en [`comida_gh_pages/README.md`](comida_gh_pages/README.md) y se subió a GitHub Pages en el commit `bf35cc9`.





---

## 📝 Registro de Sesión 14 (17 de Octubre de 2026 - Noche / Rediseño Responsive Dual-View del Panel Admin para Móviles)

### Diagnóstico del Problema:
- El usuario reportó con captura de pantalla (`media_1792277047380_68447b2b.png`): *"no se ve bien desde el telefono jaja se cota"*.
- **Causa raíz:** La tabla de 5 columnas del panel de administración (`admin.html`) (`PLATO`, `CATEGORÍA`, `PRECIO`, `DISPONIBILIDAD`, `ACCIONES`) requería un ancho mínimo mayor al de una pantalla móvil (360–390px). La columna de "DISPONIBILIDAD" se recortaba (`🚫 Agotad...` / `✓ Dispo...`) y la columna de "ACCIONES" (botones Editar y Eliminar) quedaba oculta fuera del borde derecho de la pantalla. Adicionalmente, los 7 botones de la cabecera envolvían en dos filas desalineadas.

### Solución Arquitectónica Implementada (Dual-View Pattern):
1. **Vista Dual Responsive (Cero Pérdida de Información):**
   - **Escritorio ($\ge 768\text{px}$):** Se conserva la tabla densa de 5 columnas para usuarios de pantalla ancha bajo la clase `hidden md:block`.
   - **Móvil ($< 768\text{px}$):** Se implementó una vista dedicada en formato de tarjetas individuales (`#listaCardsAdminMovil`, clase `block md:hidden`) donde cada plato se adapta al 100% del ancho del teléfono (360–390px) sin ningún desplazamiento horizontal ni textos truncados.
2. **Estructura de la Tarjeta Móvil:**
   - **Fila Superior:** Miniatura fija de 58x58px con bordes redondeados (`rounded-2xl`), nombre completo del plato, etiqueta de categoría, ID (#D01) y precio destacado ($4.50) en la esquina superior derecha.
   - **Línea de Descripción:** Resumen del plato en texto secundario legible.
   - **Burbuja de Acciones Inferior (100% visible):**
     * Botón de Disponibilidad a ancho completo: `[✓ Disponible]` en verde esmeralda o `[🚫 Agotado]` en carmesí, con icono y texto completo sin truncar.
     * Botón de Edición: `[✏️ Editar]` con icono y texto claro.
     * Botón de Eliminación: `[🗑️]` compacto con advertencia de confirmación.
3. **Cabecera Ultra-Compacta en Fila Única:**
   - Se ajustaron los botones de acción administrativa a formato cuadrado de 28x28px (`w-7 h-7`) con espacio optimizado (`gap-1`) en pantallas pequeñas.
   - Los 7 botones (Ver Menú, Sheets ERP, Delivery Gratis, WhatsApp, Consultas, Ajustes y Tema Claro/Oscuro) conviven perfectamente en una única fila horizontal sin ocupar espacio vertical innecesario.
4. **Cachebuster Inmediato:**
   - Se incluyó `admin.js?v=2.2` en `admin.html` para forzar la actualización inmediata en navegadores móviles evitando caché antiguo.

### Evidencias Visuales y Pruebas Automatizadas:
- Se ejecutó verificación integral automatizada conectando a Chrome nativo vía CDP en viewport móvil de 390x844px (`verificar_admin_movil.js`) y en escritorio de 1280x800px (`verificar_admin_dual_desktop.js`):
  * **Móvil (390px):** `tableHidden: true`, `listVisible: true`, `scrollWidth: 390`, `clientWidth: 390`, `hayOverflowHorizontal: false` (cero desborde). Capturas generadas:
    - [`capturas/mejora_21_admin_tarjetas_movil.png`](capturas/mejora_21_admin_tarjetas_movil.png)
    - [`capturas/mejora_22_admin_tarjetas_movil_scroll.png`](capturas/mejora_22_admin_tarjetas_movil_scroll.png)
  * **Escritorio (1280px):** `tableVisible: true`, `listHidden: true`, `totalFilasTabla: 11`. Captura generada:
    - [`capturas/mejora_23_admin_tabla_desktop.png`](capturas/mejora_23_admin_tabla_desktop.png)
- **Commits en GitHub Pages:** `df4b2bc`, `22b0e7d` y `0e97e27` en `origin/main`.

---

## 📝 Registro de Sesión 15 (17 de Octubre de 2026 - Noche / Transformación Paleta Verde Amigable, Precios Inferiores, Fotos Reales y Sistema de Bebidas)

### Requerimientos del Usuario:
1. **Transformación de Paleta Cromática:** La página tenía exceso de rojo; el cliente solicitó sustituir los tonos rojos por un verde claro, fresco y amigable (`emerald-500` / `emerald-600`).
2. **Reubicación y Rediseño de Precios:** Mover el precio del borde superior al borde inferior de la imagen, con tamaño más visible y en tono verde clarito amigable.
3. **Cero Recortes en Nombres de Platos:** Los títulos no deben truncarse con puntos suspensivos; deben ser legibles y completos.
4. **Eliminación de Elementos Redundantes:** Retirar la barra inferior `"Toca para ver extras y pedir ➔"` y `"🔥 Recién hecho"`. Toda el área de la tarjeta debe abrir el menú/modal del plato al hacer clic o pulsar sobre cualquier sector (foto, título o descripción).
5. **Paneles de Presentación Splash Dual:** Panel adaptado a PC (horizontal/panorámico) y panel adaptado a Smartphone (vertical).
6. **Incorporación de Fotos Reales Proporcionadas por el Cliente:**
   - Empanadas de maíz doradas reales.
   - Tequeños venezolanos reales.
   - Empanadas de trigo / pastelitos reales.
   - Pizza artesanal real.
   - Bebidas y refrescos en botella y lata.
7. **Sistema de Rellenos para Empanadas:** Rellenos de carne mechada, carne molida, pollo, mojito/cazón y queso; además de ración de arepitas rellenas.
8. **Arquitectura de Bebidas Frías:** Categoría propia de bebidas con marcas (Coca-Cola, Pepsi, Chinotto, Frescolita, Hit) y tamaños (lata 355ml, botellas 1L, 1.5L, 2L) y jugos naturales.
9. **Unificación Terminológica:** Cambiar "Comanda" / "Carrito" por **"Pedido"** en toda la interfaz de usuario.

---

### Implementaciones Técnicas Realizadas:
1. **Paleta Verde Esmeralda Amigable:**
   - Se reemplazaron todas las clases `rose-*` por `emerald-*` en `src/index.html`, `src/app.js`, `src/admin.html` y `src/admin.js`.
   - Botón de pedido, insignias activas de categorías, píldoras de precios, foco en inputs y modales ahora muestran un verde esmeralda coherente (`emerald-600` / `emerald-500`).
2. **Nueva Estructura de la Tarjeta del Menú:**
   - **Precio en Borde Inferior Derecho:** `absolute bottom-3 right-3` con diseño destacado: `bg-emerald-500 text-white font-black text-sm sm:text-base px-3.5 py-1 rounded-2xl shadow-lg border border-emerald-300/40`.
   - **Insignia de Categoría:** En la esquina superior izquierda `absolute top-3 left-3` con fondo translúcido `bg-black/60 backdrop-blur-md`.
   - **Títulos Sin Truncamiento:** `font-heading font-black text-base sm:text-lg leading-snug break-words`.
   - **Tarjeta 100% Clickeable:** Todo el contenedor tiene `cursor-pointer` y `onclick="abrirModalPlato(id)"`.
3. **Presentación Splash Dual:**
   - `#panelSplashDesktop` (`hidden md:flex`): Banner panorámico para PC.
   - `#panelSplashMovil` (`flex md:hidden`): Showcase vertical con fotos circulares flotantes para smartphones.
4. **Catálogo con Fotos Reales y Bebidas:**
   - Se copiaron y vincularon los 8 activos gráficos a `assets/imagenes/`.
   - Menú inicial actualizado con versión `v3.2_fotos_reales_bebidas`.
   - Modal de empanadas con selección de rellenos (`+Gratis`) y cross-selling de refrescos.
5. **Terminología "Pedido":**
   - Actualizado en la cabecera (`[🧾 Pedido (N)]`), en el modal (`Tu Pedido`), en el botón de agregar (`Agregar al Pedido`) y en el mensaje generado para WhatsApp (`👋 ¡HOLA A DOMICILIO! DESEO CONFIRMAR ESTE PEDIDO:`).

---

### Evidencias Visuales y Verificación Automatizada (Chrome CDP):
- Se ejecutó suite de pruebas conectada al navegador Chrome vía CDP (`verificar_nuevas_mejoras_v32.js` y `test_modal_titulo_en_imagen.js`):
  * [`capturas/mejora_23_movil_precio_inferior_verde.png`](capturas/mejora_23_movil_precio_inferior_verde.png): Vista móvil (390px) con fotos reales, precios verdes en borde inferior y títulos sin corte.
  * [`capturas/mejora_24_modal_empanadas_rellenos_verde.png`](capturas/mejora_24_modal_empanadas_rellenos_verde.png): Modal de plato con rellenos de empanadas, botón de compartir y total en verde.
  * [`capturas/mejora_25_categoria_bebidas_variedad.png`](capturas/mejora_25_categoria_bebidas_variedad.png): Categoría de bebidas filtrada con refrescos en botella y lata.
  * [`capturas/mejora_26_desktop_catalogo_verde_completo.png`](capturas/mejora_26_desktop_catalogo_verde_completo.png): Catálogo completo en escritorio (1280px) con la nueva paleta verde.
  * [`capturas/mejora_27_modal_titulo_y_precio_en_imagen.png`](capturas/mejora_27_modal_titulo_y_precio_en_imagen.png): Título y precio integrados directamente sobre la foto dentro de la ventana modal, optimizando el espacio vertical para móviles.
  * [`capturas/mejora_28_modal_empanadas_opciones_opcionales.png`](capturas/mejora_28_modal_empanadas_opciones_opcionales.png): Reemplazo de la etiqueta `+Gratis` por `Opcional` en todos los sabores y rellenos de empanadas (Queso, Guiso, Pollo, Cazón, Mechada y De Todo).
- **Commits en GitHub Pages:** `72bb590`, `21f2845`, `de4bcb5`, `9d124d5` y `fa571b8` en `origin/main`. Sitio activo en: `https://domicilio-chi.github.io/Domicilio/`.

