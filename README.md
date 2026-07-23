# Radio Patrimonio

Sitio web estático de Radio Patrimonio — "Escuchar al país".

## Estructura

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── data/
    └── programacion.json
```

Sitio 100% estático (HTML/CSS/JS puro), sin dependencias ni proceso de build.

## Desarrollo local

Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Despliegue en Vercel

Este proyecto no requiere configuración especial: Vercel lo detecta como sitio estático automáticamente.
