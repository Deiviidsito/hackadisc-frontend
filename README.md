# HACKADISC Frontend 2025 - .env.idia

¡Bienvenido al repositorio del frontend del proyecto Hackadisc! Aquí encontrarás toda la información y recursos necesarios para empezar con el despliegue y desarrollo de la aplicación web.

## 🚀 Pasos iniciales para el despliegue

Si es la primera vez que despliegas este proyecto en un servidor o deseas ejecutarlo en tu entorno local, sigue estos pasos:

1. 📦 **Instalar Node.js**: Asegúrate de tener Node.js versión 18 o superior instalado en tu sistema.
2. 📦 **Instalar dependencias**: `npm install` (instala todas las dependencias del proyecto).
3. 📋 **Verificar configuración**: El proyecto ya viene configurado con Vite, React, Tailwind CSS y shadcn/ui.

## 🛠️ Stack Tecnológico

Este proyecto utiliza las siguientes tecnologías:

- **React 19** - Biblioteca principal de interfaz de usuario
- **Vite** - Herramienta de desarrollo rápida y moderna
- **Tailwind CSS v4** - Framework de estilos utilitarios
- **shadcn/ui** - Biblioteca de componentes elegantes
- **Zustand** - Gestión de estado ligera
- **React Router** - Navegación entre páginas
- **Recharts** - Gráficos y visualización de datos
- **Axios** - Cliente HTTP para APIs
- **Lucide React** - Iconos modernos

## 🏠 ¿Cómo correr el proyecto en mi entorno local?

Para arrancar el proyecto en tu entorno local, ejecuta los siguientes comandos:

1. 📥 **Clonar el repositorio**: 
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd hackadisc-frontend
   ```

2. 📦 **Instalar dependencias**: 
   ```bash
   npm install
   ```

3. 🌐 **Iniciar servidor de desarrollo**: 
   ```bash
   npm run dev
   ```

Una vez ejecutados estos comandos, puedes acceder al proyecto a través de la URL `http://localhost:5173/` (o el puerto que Vite asigne automáticamente).

## 🧭 Navegación y Rutas

El proyecto incluye un sistema de navegación completo con las siguientes rutas:

- **`/`** - Landing Page (pública) con navegación top
- **`/login`** - Página de inicio de sesión (pública, sin navegación)
- **`/dashboard`** - Panel de control principal (privada, con sidebar)

### Características de Navegación:
- **Rutas Protegidas**: El dashboard requiere autenticación
- **Redirección Automática**: Login redirige al dashboard después del acceso exitoso
- **Navegación Adaptativa**: 
  - **Landing/Públicas**: Barra de navegación superior
  - **Dashboard/Privadas**: Sidebar lateral colapsable
- **Sesión Persistente**: El estado de login se mantiene entre sesiones

### Sidebar del Dashboard:
- **Colapsable**: Se puede contraer para maximizar espacio de trabajo
- **Navegación contextual**: Indica la página activa
- **Información de usuario**: Muestra datos del usuario logueado
- **Paleta INSECAP**: Diseño con gradientes corporativos
- **Rutas disponibles**: Dashboard, Usuarios, Reportes, Configuración
- **Logout integrado**: Cierre de sesión desde el sidebar

## 📋 Conventional Commits

Este proyecto sigue el estándar de [Conventional Commits](https://www.conventionalcommits.org/) para mensajes de commit claros y consistentes:

```bash
# Ejemplo de commits para las funcionalidades actuales:
feat: add React Router navigation system with protected routes
feat: implement Navigation component with responsive design
feat: create Layout wrapper for consistent page structure  
fix: remove duplicate headers from pages after adding global navigation
docs: update README with navigation routes and hackathon configuration
style: improve responsive design for mobile navigation
```

### Tipos de Commit:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin afectar el código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

## ⚙️ Comandos útiles

1. 🚀 **Desarrollo**: `npm run dev` - Inicia el servidor de desarrollo con hot reload.
2. 🏗️ **Build**: `npm run build` - Construye la aplicación para producción.
3. 👀 **Preview**: `npm run preview` - Previsualiza el build de producción.
4. 🧹 **Lint**: `npm run lint` - Ejecuta ESLint para verificar el código.

## 🌐 Configuración de API

Para conectar con el backend de Laravel:

1. **Configurar variables de entorno**:
   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env
   ```

2. **Ajustar la URL de la API** en el archivo `.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Asegurarse de que el backend de Laravel esté corriendo**:
   - El backend debe estar ejecutándose en `http://localhost:8000`
   - Verificar que las rutas de API estén configuradas en Laravel
   - Configurar CORS en Laravel para permitir peticiones desde `http://localhost:5173`

### 🏆 Configuración Especial Hackathon

Para simplificar el desarrollo durante el hackathon, la aplicación está configurada con:
- **Sin middleware de autenticación**: Las rutas de API son públicas
- **Sin tokens JWT**: Login simplificado sin complejidad de tokens
- **Enfoque en Analytics**: Prioridad en reportes y visualización de datos
- **Prototipado Rápido**: Configuración mínima para desarrollo ágil

### Servicios de API Disponibles

- **Auth Service**: Login simplificado, obtener usuario, logout, listado de usuarios
- **User Service**: CRUD básico de usuarios (en desarrollo)
- **API Client**: Cliente HTTP con Axios para peticiones al backend

### Prueba de Conexión

La landing page incluye un componente de prueba de API que te permite:
- Verificar la conexión con el backend
- Probar endpoints de autenticación
- Ver información de configuración en tiempo real

## 👥 Integrantes del Equipo .env.idia

👤 **David Alvarez**
- 💼 _FullStack Developer_
- 📧 [Email](mailto:david.alvarez@alumnos.ucn.cl)

👤 **Sebastián Cortez Silva**
- 💼 _BackEnd Developer_
- 📧 [Email](mailto:sebastian.cortez@alumnos.ucn.cl)

👤 **Benjamín Rivera Portilla**
- 💼 _FullStack Developer_
- 📧 [Email](mailto:benjamin.rivera01@alumnos.ucn.cl)

**Desarrollado con ❤️ por el equipo .env.idia para INSECAP**