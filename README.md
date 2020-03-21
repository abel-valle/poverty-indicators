# poverty-indicator
Proyecto de contenido web para visualización de datos de pobreza de México del 2015.
El proyecto se desarrolló usando lo siguiente:

- **JavaScript**: Lenguaje de programación interpretado.
- **d3.js**: JavaScript library for visualizing data with HTML, SVG, and CSS.
- **dc.js**: JavaScript charting library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets.
- **Crossfilter**: Fast Multidimensional Filtering for Coordinated Views.
- **HTML 5**
- **Bootstrap 3**
## Ejecución
Abrir el archivo **index.html** en cualquier navegador.
El archivo **index.html** requiere del contenido de la carpeta **static**.

## Archivos importantes
- **poverty_data_generator.py**:
Código Python que convierte los datos de un archivo CSV a JSON.
- **index.html**: Código HTML en donde se incrustan las gráficas haciendo referencias mediante ID's
- static/js/**graphs.js**: Archivo JavaScript que contiene la construcción de las gráficas y la lógica de manipulación de
datos usando d3.js y dc.js. 
