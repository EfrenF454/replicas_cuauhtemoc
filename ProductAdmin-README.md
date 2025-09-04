# Administrador de Productos

Esta interfaz te permite gestionar fácilmente los productos en tu archivo `products.json`.

## Características

- ✅ **Agregar productos**: Crear nuevos productos con todos los campos necesarios
- ✅ **Editar productos**: Modificar productos existentes
- ✅ **Eliminar productos**: Remover productos del catálogo
- ✅ **Validación**: Formularios con validación para campos requeridos
- ✅ **Interfaz intuitiva**: Diseño moderno con Material-UI
- ✅ **Descarga**: Exportar el archivo JSON actualizado
- ✅ **Persistencia**: Los cambios se guardan automáticamente en el archivo

## Archivos creados

```
src/
├── components/
│   └── ProductAdmin.tsx      # Componente principal del administrador
├── pages/
│   ├── admin.tsx            # Página de administración
│   └── api/
│       └── products.ts      # API endpoint para guardar productos
└── api/
    └── products.ts          # API endpoint (backup)
```

## Uso

### 1. Acceder al administrador

Navega a la ruta `/admin` en tu aplicación para acceder al administrador de productos.

### 2. Agregar un producto

1. Haz clic en el botón "Agregar Producto"
2. Completa el formulario con los datos del producto:
   - **Nombre**: Nombre del producto (requerido)
   - **Descripción**: Descripción detallada (requerido)
   - **Precio**: Precio actual (requerido)
   - **Precio Original**: Precio antes de descuento (opcional)
   - **Categoría**: Selecciona una categoría
   - **Imagen**: URL de la imagen del producto
   - **Calificación**: Calificación de 0 a 5 estrellas
   - **Reseñas**: Número de reseñas
   - **Descuento**: Porcentaje de descuento (0-100%)
   - **En Stock**: Si el producto está disponible
   - **Nuevo**: Si es un producto nuevo
3. Haz clic en "Agregar" para guardar

### 3. Editar un producto

1. Haz clic en el ícono de edición (lápiz) en la tarjeta del producto
2. Modifica los campos necesarios en el formulario
3. Haz clic en "Actualizar" para guardar los cambios

### 4. Eliminar un producto

1. Haz clic en el ícono de eliminación (papelera) en la tarjeta del producto
2. Confirma la eliminación en el diálogo que aparece

### 5. Descargar el archivo JSON

Haz clic en el botón "Descargar JSON" para obtener una copia del archivo actualizado.

## Estructura de un producto

```json
{
  "id": 1,
  "name": "Nombre del Producto",
  "price": 1000,
  "originalPrice": 1200,
  "image": "/images/products/imagen.jpg",
  "category": "Categoría",
  "rating": 4.5,
  "reviews": 25,
  "inStock": true,
  "isNew": false,
  "discount": 15,
  "description": "Descripción del producto"
}
```

## Categorías disponibles

- Rifles de Asalto
- Pistolas
- Miras
- Reparación
- Accesorios

## Notas importantes

- Los IDs se generan automáticamente para productos nuevos
- Los cambios se guardan automáticamente en el archivo `products.json`
- La interfaz muestra alertas de éxito o error para cada operación
- Los productos se validan antes de guardarse

## Personalización

Para agregar más categorías, edita el array `categories` en `src/components/ProductAdmin.tsx`:

```typescript
const categories = [
  'Rifles de Asalto',
  'Pistolas',
  'Miras',
  'Reparación',
  'Accesorios',
  'Nueva Categoría'  // Agregar aquí
];
```

## Troubleshooting

### Error al guardar productos
- Verifica que el archivo `products.json` tenga permisos de escritura
- Asegúrate de que el endpoint API esté funcionando correctamente

### Productos no se cargan
- Verifica que el archivo `public/data/products.json` existe
- Revisa la consola del navegador para errores de red

### Problemas con Next.js
- Asegúrate de que el servidor de desarrollo esté corriendo
- Verifica que los archivos estén en las rutas correctas
