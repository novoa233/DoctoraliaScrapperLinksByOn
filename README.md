Scrapper para Doctoralia.cl
permite incorporar un listado de enlaces para obtener informacion
permite almacenar el resultado en JSON y CSV

Modo de Uso
----------

1.- clonar este repositorio
2.- incorporar los enlaces en index.js
3.- lanzar con node index.js
4.- revisar la data en los archivos de salida

// Ejemplo de uso con múltiples URLs 

const urlsToScrape = [
  'https://www.doctoralia.cl/buscar?q=&loc=Talca',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=2',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=3',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=4',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=5',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=6',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=7',
  // Agrega más URLs según sea necesario
];
