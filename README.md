# Gestor de Productos - Flask + JavaScript

## Descripción

Aplicación web CRUD para la gestión de productos. Permite crear, leer, actualizar y eliminar productos con soporte para subida de imágenes, búsqueda por nombre, comentarios y control de disponibilidad.

## Stack Tecnológico

- **Backend:** Flask (Python)
- **Frontend:** JavaScript , HTML5, CSS3
- **Storage:** JSON (data.json)
- **Componentes:** Web Components (product-card.js)

## Funcionalidades

- ✅ Listar productos con búsqueda en tiempo real (backend)
- ✅ Crear productos con imagen
- ✅ Editar nombre, precio e imagen de productos existentes
- ✅ Eliminar productos
- ✅ Habilitar/deshabilitar productos
- ✅ Sistema de comentarios por producto

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/productos` | Listar productos (con parámetro `?search=`) |
| POST | `/productos` | Crear producto |
| PUT | `/productos/<id>` | Actualizar producto |
| DELETE | `/productos/<id>` | Eliminar producto |
| GET | `/productos/<id>/comentarios` | Obtener comentarios |
| POST | `/productos/<id>/comentarios` | Agregar comentario |
| GET | `/productos/<id>/habilitar` | Activar/desactivar producto |

## Instalación y Ejecución

```bash
# Clonar repositorio
git clone <repo-url>
cd python-javascript-seccion-a

# Entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/macOS

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python app.py
```



## Estructura de Carpetas

```
python-javascript-seccion-a/
├── app.py                 # Servidor Flask principal
├── data.json             # Base de datos JSON
├── requirements.txt      # Dependencias Python
├── templates/
│   └── index.html        # Interfaz principal
└── static/
    ├── styles.css        # Estilos globales
    ├── js/
    │   ├── main.js       # Lógica principal
    │   ├── api.js        # Funciones HTTP
    │   ├── ui.js         # Utilidades de UI
    │   ├── utils.js      # Funciones auxiliares
    │   └── components/
    │       └── product-card.js  # Web Component
    └── uploads/          # Carpeta de imágenes subidas
```


