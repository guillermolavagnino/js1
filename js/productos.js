document.addEventListener("DOMContentLoaded", () => {
  fetch('https://guillermolavagnino.github.io/js1/data/productos.json')
    .then((response) => response.json())

    .then(data => {
      //console.log(data);  // Mostramos los datos obtenidos

      const contenedor = document.getElementById("contenedor-productos");

      productos = []; // array
      //contenedor.innerHTML = typeof data; // object

      data.productos.forEach(function(producto) {
        //console.log(producto.nombre);
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
                  <button href="#" class="btn border border-secondary rounded-pill px-3 text-primary" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-cantidad="1" onclick="agregarProducto(${producto.id})">
                    <i class="fa fa-shopping-bag me-2 text-primary"></i> Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>`;
        productos.push(producto);
      });

   })
   .catch(error => {
       console.error('Hubo un error al obtener los productos:', error);
   });
});

function agregarProducto(id) { 
  console.log(id);
  let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // [] teoricamente es un array
  //console.log(typeof carrito); // object

  const producto = productos.find(p => p.id === id);
  const productoEnCarrito = carrito.find(producto => producto.producto.id === id); // OK

    if (productoEnCarrito) {
      productoEnCarrito.producto.cantidad += 1;
        Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto agregado al carrito!",
                showConfirmButton: false,
                timer: 1000
              });

    } else {
        producto.cantidad = 1;
        carrito.push({producto});
        Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto agregado al carrito!",
                showConfirmButton: false,
                timer: 1000
              });
    }

  //let contador = Object.keys(carrito).length;
  let contador = carrito.reduce((total, item) => total + item.producto.cantidad, 0);
  document.getElementById('carrito-contador').innerHTML = contador;
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//let contador = Object.keys(carrito).length;
let contador = carrito.reduce((total, item) => total + item.producto.cantidad, 0);
document.getElementById('carrito-contador').innerHTML = contador;
localStorage.setItem('carrito', JSON.stringify(carrito));
