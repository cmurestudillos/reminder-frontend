# Reminder Frontend

Frontend PWA para la aplicación Reminder construido con Vue 3, Vite y PrimeVue.

## 🚀 Tecnologías

- **Vue 3** - Framework progresivo de JavaScript
- **Vite** - Build tool ultrarrápido
- **PrimeVue** - Librería de componentes UI
- **Pinia** - State management oficial de Vue
- **Vue Router** - Enrutamiento oficial de Vue
- **Axios** - Cliente HTTP
- **Vite PWA** - Plugin para Progressive Web App

## 📦 Instalación

### Prerrequisitos

- Node.js ≥20.19
- pnpm (`corepack enable` o `npm install -g pnpm`)
- Backend de Reminder ejecutándose en http://localhost:4000

### Pasos de instalación

1. Instalar dependencias:
```bash
pnpm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` y configurar la URL de tu API:
```env
VITE_API_URL=http://localhost:4000/api
```

3. Iniciar servidor de desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en http://localhost:3000

## 📁 Estructura del Proyecto

```
reminder-frontend/
├── public/                    # Archivos públicos estáticos
├── src/
│   ├── assets/               # Recursos (imágenes, estilos)
│   │   └── styles/
│   │       └── main.css      # Estilos globales
│   ├── components/           # Componentes reutilizables
│   │   └── Navbar.vue        # Barra de navegación
│   ├── router/               # Configuración de rutas
│   │   └── index.js          # Definición de rutas
│   ├── services/             # Servicios API
│   │   ├── api.js            # Configuración de Axios
│   │   ├── authService.js    # Servicio de autenticación
│   │   ├── listasService.js  # Servicio de listas
│   │   └── tareasService.js  # Servicio de tareas
│   ├── stores/               # Stores de Pinia
│   │   ├── auth.js           # Store de autenticación
│   │   ├── listas.js         # Store de listas
│   │   └── tareas.js         # Store de tareas
│   ├── views/                # Vistas/Páginas
│   │   ├── LoginView.vue
│   │   ├── RegistroView.vue
│   │   ├── ListasView.vue
│   │   ├── ListaDetalleView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada
├── .env                      # Variables de entorno (no incluir en git)
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore
├── index.html                # HTML principal
├── package.json
├── README.md
└── vite.config.js            # Configuración de Vite
```

## 🎯 Características

### ✅ Implementado

- **Autenticación**
  - Registro de usuarios
  - Inicio de sesión
  - JWT token management
  - Guards de navegación
  - Cierre de sesión

- **Gestión de Listas**
  - Crear listas
  - Ver todas las listas
  - Editar listas
  - Eliminar listas
  - Navegación a detalle de lista

- **Gestión de Tareas**
  - Crear tareas en listas
  - Marcar tareas como completadas
  - Editar tareas
  - Eliminar tareas
  - Contador de tareas completadas/pendientes

- **PWA (Progressive Web App)**
  - Instalable en dispositivos
  - Funciona offline
  - Service Worker automático
  - Cache de recursos
  - Manifest configurado

- **UI/UX**
  - Diseño responsive
  - Componentes de PrimeVue
  - Notificaciones Toast
  - Diálogos de confirmación
  - Estados de carga
  - Transiciones suaves

## 🔧 Scripts Disponibles

```bash
# Desarrollo con hot-reload
pnpm dev

# Build para producción
pnpm build

# Preview del build de producción
pnpm preview

# Lint del código / lint con autofix / formateo
pnpm lint
pnpm lint:fix
pnpm format
```

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL de la API backend | `http://localhost:4000/api` |
| `VITE_APP_NAME` | Nombre de la aplicación | `Reminder` |
| `VITE_APP_ENV` | Ambiente de ejecución | `development` o `production` |

## 📱 PWA - Progressive Web App

La aplicación está configurada como PWA y puede:

- **Instalarse** en el dispositivo del usuario
- **Funcionar offline** gracias al Service Worker
- **Cachear recursos** para carga más rápida
- **Recibir actualizaciones automáticas**

### Instalación en Dispositivos

**Desktop:**
1. Abrir la app en Chrome/Edge
2. Click en el icono de instalar en la barra de direcciones
3. Seguir las instrucciones

**Móvil:**
1. Abrir la app en Chrome/Safari
2. Menú → "Agregar a pantalla de inicio"
3. La app aparecerá como aplicación nativa

## 🎨 Componentes de PrimeVue Utilizados

- **Card** - Tarjetas para listas y tareas
- **Button** - Botones de acción
- **InputText** - Campos de texto
- **Password** - Campo de contraseña
- **Textarea** - Área de texto para descripciones
- **Checkbox** - Marcar tareas completadas
- **Dialog** - Modales para crear/editar
- **Toast** - Notificaciones
- **ConfirmDialog** - Confirmación de acciones
- **ProgressSpinner** - Indicador de carga
- **Divider** - Separadores

## 🔐 Flujo de Autenticación

1. Usuario se registra o inicia sesión
2. Backend devuelve token JWT
3. Token se guarda en `localStorage`
4. Token se incluye automáticamente en todas las peticiones (header `x-auth-token`)
5. Router protege rutas que requieren autenticación
6. Si el token expira, usuario es redirigido a login

## 🚀 Despliegue

### Build de Producción

```bash
pnpm build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Desplegar en Netlify

1. Conectar repositorio a Netlify
2. Configurar build:
   - Build command: `pnpm build`
   - Publish directory: `dist`
3. Configurar variables de entorno en Netlify
4. Desplegar

### Desplegar en Vercel

```bash
pnpm add -g vercel
vercel
```

## 🐛 Problemas Comunes

### Error de CORS
Si ves errores de CORS, asegúrate de que el backend tiene configurado correctamente CORS:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Error de conexión a la API
Verifica que:
1. El backend esté ejecutándose
2. La URL en `.env` sea correcta
3. No haya problemas de firewall

### PWA no se instala
- Debe servirse por HTTPS (o localhost en desarrollo)
- Debe tener un manifest válido
- Debe tener un Service Worker registrado

## 📞 Soporte

Para reportar problemas o solicitar características:
1. Crear un issue en el repositorio
2. Describir el problema claramente
3. Incluir pasos para reproducir (si es un bug)

## 👨‍💻 Autor

Carlos Mur

## 📄 Licencia

ISC

---

⭐️ Si este proyecto te fue útil, considera darle una estrella