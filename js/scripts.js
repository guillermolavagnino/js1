document.addEventListener("DOMContentLoaded", () => {
  fetch('https://guillermolavagnino.github.io/js1/data/productos.json')
    .then((response) => response.json())
    //.then((json) => console.log(json));

    .then(data => {
      //console.log(data);  // Mostramos los datos obtenidos

      const contenedor = document.getElementById("contenedor-productos");

      //contenedor.innerHTML = typeof data; // object

      data.productos.forEach(function(producto) {
        console.log(producto.nombre);
        let precio = "";
        precio = new Intl.NumberFormat("de-DE").format(producto.precio);
        contenedor.innerHTML += `
          <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="rounded position-relative fruite-item">
              <div class="fruite-img">
                <img src="${producto.miniatura}" class="img-fluid w-100 rounded-top" alt="${producto.nombre}">
              </div>
              <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${producto.categoria}</div>
              <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <div class="d-flex justify-content-between flex-lg-wrap">
                  <p class="text-dark fs-5 fw-bold mb-0">$${precio} / kg</p>
                  <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary" onclick="agregarAlCarrito(${producto.id})>
                    <i class="fa fa-shopping-bag me-2 text-primary"></i> Agregar
                  </a>
                </div>
              </div>
            </div>
          </div>`;
      });

   })
   .catch(error => {
       console.error('Hubo un error al obtener los productos:', error);
   });
});

