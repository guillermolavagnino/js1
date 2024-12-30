if (document.getElementById('lista-carrito')) {
  actualizarCarrito();
};

function actualizarCarrito() { 
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  //console.log(carrito);
  let listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = "";
  let totalcarrito = parseInt(0);

  for (let i = 0; i < carrito.length; i++) {
    let producto = carrito[i];
    console.log(producto);

    let precio = "";
    precio = new Intl.NumberFormat("de-DE").format(producto.producto.precio);
    let total = "";
    totalp = producto.producto.precio * producto.producto.cantidad;
    total = new Intl.NumberFormat("de-DE").format(totalp);

    totalcarrito = totalcarrito + totalp;
    totalcarritow = new Intl.NumberFormat("de-DE").format(totalcarrito);
    totalcarritomasenvio = totalcarrito + 1000;
    totalcarritomasenvio = new Intl.NumberFormat("de-DE").format(totalcarritomasenvio);

    listaCarrito.innerHTML += `<tr>
                                <td>
                                    <p class="mb-0 mt-4">${producto.producto.nombre}</p>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4">$${precio}</p>
                                </td>
                                <td>
                                    <div class="input-group quantity mt-4" style="width: 100px;">
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" class="form-control form-control-sm text-center border-0" value="${producto.producto.cantidad}">
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4">$${total}</p>
                                </td>
                                <td>
                                    <button class="btn btn-md rounded-circle bg-light border mt-4" onclick="eliminarDelCarrito(${producto.producto.id})">
                                        <i class="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            </tr>`;
  }

  document.getElementById('subtotalcarrito').innerHTML = '$' + totalcarritow;
  document.getElementById('totalcarritomasenvio').innerHTML = '$' + totalcarritomasenvio;

  document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

  let contador = Object.keys(carrito).length;
  document.getElementById('carrito-contador').innerHTML = contador;

  localStorage.setItem('carrito', JSON.stringify(carrito));
}



function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
  console.log(id);

  // Cargamos el carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Encontramos el índice del producto a eliminar usando findIndex
  let index = carrito.findIndex(producto => producto.producto.id === id);

  if (index !== -1) {
    // Si el producto existe en el carrito, lo eliminamos
    carrito.splice(index, 1);
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "El producto fue eliminado del carrito",
      showConfirmButton: false,
      timer: 1000
    });

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }
}

