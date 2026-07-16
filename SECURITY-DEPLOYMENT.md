# Seguridad — configuración pendiente en el servidor

Este proyecto es un SPA estático (Vite build → HTML/JS/CSS puros, sin backend).
Varios hallazgos de OWASP ZAP corresponden a **cabeceras HTTP**, que un frontend
no puede fijar por sí mismo: las tiene que enviar el servidor/CDN que sirve los
archivos. Aquí ya se agregó la configuración lista para los dos casos más
comunes:

- **Vercel** → `vercel.json` (raíz del proyecto). Se aplica automáticamente al desplegar.
- **Netlify** → `public/_headers`. Se aplica automáticamente al desplegar.

Si el sitio se sirve desde **Nginx** o **Apache** en vez de Vercel/Netlify, hay
que agregar manualmente las mismas cabeceras ahí. Ejemplos:

## Nginx

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Resource-Policy "same-site" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

location /assets/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

# SPA fallback (rutas de React Router)
location / {
  try_files $uri $uri/ /index.html;
}
```

## Apache (.htaccess)

```apache
<IfModule mod_headers.c>
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
  Header always set X-Frame-Options "DENY"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Cross-Origin-Resource-Policy "same-site"
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

## Por qué la CSP quedó así (y qué NO se pudo endurecer más)

- **`script-src 'self'`** — sin `unsafe-inline` ni `unsafe-eval`. El build de
  producción de Vite no usa `eval` ni scripts inline (el ZAP original marcó
  `unsafe-eval`/`unsafe-inline` porque probablemente escaneó el **servidor de
  desarrollo** de Vite, que sí los necesita para Hot Module Replacement; el
  build de producción no).
- **`style-src 'unsafe-inline'`** — esto **no se pudo eliminar** sin rediseñar
  el sitio: la mayoría de los componentes usan estilos en línea de React
  (`style={{...}}`) para gradientes y colores de marca puntuales, lo cual cae
  bajo `style-src-attr` en la CSP. Quitar `unsafe-inline` habría significado
  mover cientos de estilos en línea a clases/CSS-in-JS con nonce, lo cual
  cambia la forma en que se renderiza cada componente — está fuera del alcance
  de "sin rediseños" que se pidió. Es un riesgo aceptado y documentado, no un
  descuido.
- **`style-src https://fonts.googleapis.com`** y **`font-src
  https://fonts.gstatic.com`** — necesarios porque el sitio carga tipografías
  de Google Fonts (`src/styles/fonts.css`).
- **`frame-src https://www.google.com`** — necesario por el mapa embebido en
  la sección de contacto (`ContactSection.tsx`).
- **Subresource Integrity (SRI)** — no aplica: el proyecto no carga ningún
  script/estilo desde un CDN de terceros (Google Fonts se carga como
  hoja de estilos, no como `<script>`), todo el JS/CSS de la app se sirve
  desde el propio build con nombres de archivo con hash (cache-busting nativo
  de Vite).
- **Cookies** — la aplicación no crea ninguna cookie propia (no hay backend,
  autenticación ni analítica configurada). Los hallazgos de ZAP sobre cookies
  probablemente correspondían a cookies de terceros inyectadas por el propio
  proxy/entorno de escaneo, o se resolverán automáticamente al no haber
  cookies que la app emita.
- **Información expuesta / `X-Powered-By`** — cabecera añadida por el
  servidor (Node/Express, Nginx, etc.), no por React. Confirma que el
  servidor de producción no debe enviarla (`server_tokens off;` en Nginx, o
  quitar el header por defecto de Express si en algún momento se agrega uno).

## Antes de publicar

1. Ejecutar `npm install` y `npm run build` (no fue posible ejecutar estos
   pasos en este entorno de trabajo por no tener acceso a red; ver el resumen
   de la entrega).
2. Confirmar dirección/geo real de la clínica en el JSON-LD de `index.html`
   (se dejaron los datos ya usados en la meta description existente, pero
   conviene verificarlos).
3. Volver a correr OWASP ZAP contra el **build de producción** servido con
   las cabeceras de arriba ya activas (no contra `localhost:5173`, que es el
   servidor de desarrollo).
