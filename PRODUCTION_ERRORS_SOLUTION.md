# Solución a Errores de Producción - Importación JSON

## 🚨 Problemas Detectados

### 1. Error CORS (Access-Control-Allow-Origin)
```
Access to fetch at 'https://hackadisc-backend-production.up.railway.app/api/importarUsuariosJson' 
from origin 'https://hackadisc-frontend.vercel.app' has been blocked by CORS policy
```

### 2. Error 413 (Content Too Large)
```
POST https://hackadisc-backend-production.up.railway.app/api/importarUsuariosJson 
net::ERR_FAILED 413 (Content Too Large)
```

## 🔧 Soluciones para el Backend (Laravel)

### Solución 1: Configurar CORS

#### Archivo: `config/cors.php`
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://hackadisc-frontend.vercel.app',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ],
    'allowed_origins_patterns' => [
        'https://*.vercel.app',
        'https://*.netlify.app'
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

#### Middleware CORS en `app/Http/Kernel.php`
```php
protected $middleware = [
    // ... otros middlewares
    \Fruitcake\Cors\HandleCors::class,
];
```

### Solución 2: Aumentar Límites de Upload

#### Archivo: `php.ini` o configuración del servidor
```ini
; Aumentar límites de upload
upload_max_filesize = 200M
post_max_size = 200M
max_execution_time = 600
max_input_time = 300
memory_limit = 2G
```

#### En Railway (Variables de Entorno)
```env
PHP_UPLOAD_MAX_FILESIZE=200M
PHP_POST_MAX_SIZE=200M
PHP_MAX_EXECUTION_TIME=600
PHP_MEMORY_LIMIT=2G
```

#### Configuración en `.htaccess` (si aplica)
```apache
php_value upload_max_filesize 200M
php_value post_max_size 200M
php_value max_execution_time 600
php_value max_input_time 300
php_value memory_limit 2G
```

### Solución 3: Configurar Nginx (si se usa)

#### Archivo: `/etc/nginx/nginx.conf` o configuración del sitio
```nginx
http {
    client_max_body_size 200M;
    client_body_timeout 300s;
    client_header_timeout 300s;
}

server {
    location ~ \.php$ {
        fastcgi_read_timeout 300s;
        fastcgi_send_timeout 300s;
    }
}
```

### Solución 4: Variables de Entorno en Railway

Configurar en el dashboard de Railway:

```env
# CORS
FRONTEND_URL=https://hackadisc-frontend.vercel.app

# Límites de archivo
PHP_UPLOAD_MAX_FILESIZE=200M
PHP_POST_MAX_SIZE=200M
PHP_MAX_EXECUTION_TIME=600
PHP_MEMORY_LIMIT=2G

# Laravel
APP_ENV=production
APP_DEBUG=false
APP_URL=https://hackadisc-backend-production.up.railway.app
```

### Solución 5: Headers de Respuesta en Laravel

#### Middleware personalizado: `app/Http/Middleware/CorsMiddleware.php`
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'https://hackadisc-frontend.vercel.app');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
```

#### Registrar en `app/Http/Kernel.php`
```php
protected $middleware = [
    // ... otros middlewares
    \App\Http\Middleware\CorsMiddleware::class,
];
```

## 🎯 Pasos de Implementación

### Paso 1: Configurar CORS inmediatamente
1. Instalar el paquete CORS de Laravel:
   ```bash
   composer require fruitcake/laravel-cors
   ```

2. Publicar configuración:
   ```bash
   php artisan vendor:publish --tag="cors"
   ```

3. Configurar `config/cors.php` con las URLs permitidas

### Paso 2: Aumentar límites en Railway
1. Ir al dashboard de Railway
2. Seleccionar el proyecto backend
3. Ir a Variables → Agregar las variables de entorno mencionadas
4. Redesplegar la aplicación

### Paso 3: Verificar el controlador
Asegurar que el `ImportController` maneje correctamente archivos grandes:

```php
// En ImportController.php - al inicio del método
set_time_limit(600); // 10 minutos
ini_set('memory_limit', '2G');
ini_set('upload_max_filesize', '200M');
ini_set('post_max_size', '200M');
```

### Paso 4: Manejar OPTIONS requests
Agregar ruta para preflight requests en `routes/api.php`:

```php
// Manejar preflight requests
Route::options('{any}', function (Request $request) {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', 'https://hackadisc-frontend.vercel.app')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
})->where('any', '.*');
```

## 🧪 Testing

### Verificar CORS
```bash
curl -H "Origin: https://hackadisc-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type, Authorization" \
     -X OPTIONS \
     https://hackadisc-backend-production.up.railway.app/api/importarUsuariosJson
```

### Verificar límites de upload
```bash
curl -X POST \
     -H "Content-Type: multipart/form-data" \
     -F "archivos=@test-large-file.json" \
     https://hackadisc-backend-production.up.railway.app/api/importarUsuariosJson
```

## 📋 Checklist de Verificación

- [ ] CORS configurado correctamente en `config/cors.php`
- [ ] Orígenes permitidos incluyen `https://hackadisc-frontend.vercel.app`
- [ ] Variables de entorno de Railway configuradas
- [ ] Límites de upload aumentados (200MB)
- [ ] Límites de tiempo aumentados (600s)
- [ ] Middleware CORS registrado
- [ ] Rutas OPTIONS configuradas
- [ ] Aplicación redesployada
- [ ] Testing realizado desde frontend de producción

## 🔄 Rollback Plan

Si algo falla:

1. **Revertir configuración CORS**: Comentar origins específicos
2. **Reducir límites**: Volver a 50MB temporalmente  
3. **Logs**: Revisar logs de Railway para errores específicos
4. **Cache**: Limpiar cache de Laravel: `php artisan config:clear`

## 📞 Contacto

Una vez implementadas estas soluciones, el frontend debería poder:
- ✅ Conectarse sin errores CORS
- ✅ Subir archivos hasta 200MB
- ✅ Procesar datos sin timeouts
- ✅ Mostrar resultados detallados
