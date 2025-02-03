/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 * 
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 * 
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 * 
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "1.00"

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pwamd"

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
 "/pwachistes/ayuda.html",
 "/pwachistes/favicon.ico",
 "/pwachistes/index.html",
 "/pwachistes/site.webmanifest",
 "/pwachistes/css/dark-hc.css",
 "/pwachistes/css/dark-mc.css",
 "/pwachistes/css/dark.css",
 "/pwachistes/css/estilos.css",
 "/pwachistes/css/light-hc.css",
 "/pwachistes/css/light-mc.css",
 "/pwachistes/css/light.css",
 "/pwachistes/css/transicion_completa.css",
 "/pwachistes/css/transicion_pestanas.css",
 "/pwachistes/img/icono2048.png",
 "/pwachistes/img/maskable_icon.png",
 "/pwachistes/img/maskable_icon_x128.png",
 "/pwachistes/img/maskable_icon_x192.png",
 "/pwachistes/img/maskable_icon_x384.png",
 "/pwachistes/img/maskable_icon_x48.png",
 "/pwachistes/img/maskable_icon_x512.png",
 "/pwachistes/img/maskable_icon_x72.png",
 "/pwachistes/img/maskable_icon_x96.png",
 "/pwachistes/img/screenshot_horizontal.png",
 "/pwachistes/img/screenshot_vertical.png",
 "/pwachistes/js/configura.js",
 "/pwachistes/js/nav-bar.js",
 "/pwachistes/js/nav-drw.js",
 "/pwachistes/js/nav-tab-fixed.js",
 "/pwachistes/js/nav-tab-scrollable.js",
 "/pwachistes/js/registraServiceWorker.js",
 "/pwachistes/lib/css/material-symbols-outlined.css",
 "/pwachistes/lib/css/md-cards.css",
 "/pwachistes/lib/css/md-fab-primary.css",
 "/pwachistes/lib/css/md-filled-button.css",
 "/pwachistes/lib/css/md-filled-text-field.css",
 "/pwachistes/lib/css/md-list.css",
 "/pwachistes/lib/css/md-menu.css",
 "/pwachistes/lib/css/md-navigation-bar.css",
 "/pwachistes/lib/css/md-outline-button.css",
 "/pwachistes/lib/css/md-ripple.css",
 "/pwachistes/lib/css/md-segmented-button.css",
 "/pwachistes/lib/css/md-slider-field.css",
 "/pwachistes/lib/css/md-standard-icon-button.css",
 "/pwachistes/lib/css/md-switch.css",
 "/pwachistes/lib/css/md-tab.css",
 "/pwachistes/lib/css/md-top-app-bar.css",
 "/pwachistes/lib/css/roboto.css",
 "/pwachistes/lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
 "/pwachistes/lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
 "/pwachistes/lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
 "/pwachistes/lib/fonts/roboto-v32-latin-regular.woff2",
 "/pwachistes/lib/js/abreElementoHtml.js",
 "/pwachistes/lib/js/cierraElementoHtmo.js",
 "/pwachistes/lib/js/exportaAHtml.js",
 "/pwachistes/lib/js/getAttribute.js",
 "/pwachistes/lib/js/htmlentities.js",
 "/pwachistes/lib/js/muestraError.js",
 "/pwachistes/lib/js/muestraTextoDeAyuda.js",
 "/pwachistes/lib/js/ProblemDetails.js",
 "/pwachistes/lib/js/querySelector.js",
 "/pwachistes/lib/js/resaltaSiEstasEn.js",
 "/pwachistes/lib/js/const/ES_APPLE.js",
 "/pwachistes/lib/js/custom/md-menu-button.js",
 "/pwachistes/lib/js/custom/md-options-menu.js",
 "/pwachistes/lib/js/custom/md-overflow-button.js",
 "/pwachistes/lib/js/custom/md-overflow-menu.js",
 "/pwachistes/lib/js/custom/md-select-menu.js",
 "/pwachistes/lib/js/custom/md-slider-field.js",
 "/pwachistes/lib/js/custom/md-top-app-bar.js",
 "/pwachistes/lib/js/custom/MdNavigationDrawer.js",
 "/pwachistes/material-tokens/css/baseline.css",
 "/pwachistes/material-tokens/css/colors.css",
 "/pwachistes/material-tokens/css/elevation.css",
 "/pwachistes/material-tokens/css/motion.css",
 "/pwachistes/material-tokens/css/palette.css",
 "/pwachistes/material-tokens/css/shape.css",
 "/pwachistes/material-tokens/css/state.css",
 "/pwachistes/material-tokens/css/typography.css",
 "/pwachistes/material-tokens/css/theme/dark.css",
 "/pwachistes/material-tokens/css/theme/light.css",
 "/pwachistes/ungap/custom-elements.js"
]

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope)  {
 // Evento al empezar a instalar el servide worker,
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(llenaElCache())
  })

 // Evento al solicitar información a la red.
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(buscaLaRespuestaEnElCache(evt))
  }
 })

 // Evento cuando el service worker se vuelve activo.
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}

async function llenaElCache() {
 console.log("Intentando cargar caché:", CACHE)
 // Borra todos los cachés.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Abre el caché de este service worker.
 const cache = await caches.open(CACHE)
 // Carga el listado de ARCHIVOS.
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
 // Abre el caché.
 const cache = await caches.open(CACHE)
 const request = evt.request
 /* Busca la respuesta a la solicitud en el contenido del caché, sin
  * tomar en cuenta la parte después del símbolo "?" en la URL. */
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  /* Si no la encuentra, empieza a descargar de la red y devuelve
   * la promesa. */
  return fetch(request)
 } else {
  // Si la encuentra, devuelve la respuesta encontrada en el caché.
  return response
 }
}