# Importación de Datos JSON

## Descripción
Sistema de importación de datos JSON para cargar usuarios y ventas directamente a la base de datos de producción a través de una interfaz web intuitiva.

## Funcionalidades

### 📋 Características Principales
- **Importación de Usuarios**: Carga masiva de usuarios desde archivos JSON
- **Importación de Ventas**: Carga masiva de ventas desde archivos JSON
- **Validación de Archivos**: Verificación automática de formato JSON
- **Feedback en Tiempo Real**: Indicadores de progreso y resultados detallados
- **Manejo de Errores**: Mensajes claros sobre errores de importación
- **Autenticación**: Solo usuarios autenticados pueden acceder

### 🚀 Cómo Usar

#### Acceso a la Funcionalidad
1. Navega al **Dashboard Principal**
2. Haz clic en el botón **"Importar Datos"** (icono de base de datos) en la esquina superior derecha
3. Se abrirá la página de importación dedicada

#### Importar Usuarios
1. En la sección **"Importar Usuarios"**:
   - Haz clic en **"Seleccionar archivo de usuarios"**
   - Elige un archivo `.json` válido con datos de usuarios
   - Haz clic en **"Importar Usuarios"**
   - Espera a que se complete el proceso

#### Importar Ventas
1. En la sección **"Importar Ventas"**:
   - Haz clic en **"Seleccionar archivo de ventas"**
   - Elige un archivo `.json` válido con datos de ventas
   - Haz clic en **"Importar Ventas"**
   - Espera a que se complete el proceso

### 📊 Resultados de Importación
Después de cada importación exitosa, verás:
- ✅ **Total procesados**: Número total de registros procesados
- 🆕 **Creados**: Registros nuevos insertados
- 🔄 **Actualizados**: Registros existentes modificados

### ⚠️ Manejo de Errores
Si ocurre un error, verás:
- ❌ **Mensaje de error**: Descripción clara del problema
- 📝 **Detalles técnicos**: Información específica para depuración

## Endpoints de API

### Backend (Laravel)
```php
// Importar usuarios desde JSON
Route::post('importarUsuariosJson', [ImportController::class, 'importarUsuariosJson']);

// Importar ventas desde JSON
Route::post('importarVentasJson', [ImportController::class, 'importarVentasJson']);
```

### Frontend (React)
```javascript
// Configuración de endpoints
export const API_ENDPOINTS = {
  importarUsuarios: '/importarUsuariosJson',
  importarVentas: '/importarVentasJson'
}
```

## Estructura de Archivos

### 🗂️ Componentes Creados
- `src/components/ImportJsonComponent.jsx` - Componente principal de importación
- `src/components/ImportPage.jsx` - Página dedicada para importaciones
- `src/config/api.js` - Configuración actualizada con nuevos endpoints

### 🔗 Integración
- **Dashboard**: Botón agregado en el header principal
- **Rutas**: Nueva ruta `/import` protegida con autenticación
- **Navegación**: Botón "Volver al Dashboard" para fácil retorno

## Requisitos Técnicos

### 📋 Formato de Archivos
- **Extensión**: Archivos deben tener extensión `.json`
- **Formato**: JSON válido según estructura esperada por el backend
- **Tamaño**: Sin límite específico, pero se recomienda archivos razonables

### 🔐 Seguridad
- **Autenticación requerida**: Solo usuarios logueados pueden importar
- **Headers de autorización**: Token JWT incluido automáticamente
- **Validación de archivos**: Verificación de formato antes del envío

### 🌐 Configuración de Entorno
```env
# URLs de API configurables
VITE_API_URL=http://localhost:8000/api
VITE_API_PRODUCTION_URL=https://tu-api-railway.up.railway.app/api
```

## Flujo de Usuario

```mermaid
graph TD
    A[Dashboard] --> B[Clic en "Importar Datos"]
    B --> C[Página de Importación]
    C --> D[Seleccionar Archivo JSON]
    D --> E[Validar Formato]
    E --> F{¿Archivo Válido?}
    F -->|No| G[Mostrar Error]
    F -->|Sí| H[Enviar al Backend]
    H --> I[Procesar Datos]
    I --> J[Mostrar Resultados]
    J --> K[Limpiar Formulario]
    G --> D
    K --> D
```

## Características de UX/UI

### 🎨 Diseño
- **Cards separadas**: Una para usuarios, otra para ventas
- **Indicadores visuales**: Iconos diferenciados por tipo de importación
- **Estados de carga**: Spinners y texto descriptivo durante el proceso
- **Feedback inmediato**: Colores y mensajes según el resultado

### 📱 Responsividad
- **Grid adaptativo**: Se ajusta de 2 columnas a 1 en dispositivos móviles
- **Botones responsivos**: Tamaño apropiado en todas las pantallas
- **Información clara**: Textos y badges bien organizados

### ♿ Accesibilidad
- **Labels claros**: Descripción detallada de cada campo
- **Estados visuales**: Colores y iconos para diferentes estados
- **Navegación lógica**: Flujo intuitivo entre componentes

## Troubleshooting

### Problemas Comunes

#### 1. Error "Archivo debe ser JSON válido"
- **Causa**: Archivo no tiene extensión `.json`
- **Solución**: Asegurar que el archivo termine en `.json`

#### 2. Error de conexión
- **Causa**: Backend no disponible o URL incorrecta
- **Solución**: Verificar variables de entorno y estado del servidor

#### 3. Error de autenticación
- **Causa**: Token expirado o no válido
- **Solución**: Hacer logout/login nuevamente

#### 4. Archivo muy grande
- **Causa**: Archivo excede límites del servidor
- **Solución**: Dividir archivo en partes más pequeñas

### 🔧 Debug
Para depurar problemas:
1. Abrir **Developer Tools** (F12)
2. Ir a la pestaña **Network**
3. Intentar la importación
4. Revisar la respuesta del endpoint en la red
5. Verificar errores en la **Console**

## Notas de Desarrollo

### 🔄 Mejoras Futuras
- [ ] Preview de datos antes de importar
- [ ] Validación del esquema JSON
- [ ] Importación por lotes (chunks)
- [ ] Historial de importaciones
- [ ] Descarga de plantillas JSON
- [ ] Rollback de importaciones

### 🛠️ Mantenimiento
- Revisar logs del backend regularmente
- Monitorear performance con archivos grandes
- Actualizar validaciones según cambios en el esquema
- Mantener documentación actualizada
