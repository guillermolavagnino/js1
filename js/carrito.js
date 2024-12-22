document.addEventListener('DOMContentLoaded', function() { 
  actualizarCarrito();
});

function actualizarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  //console.log(carrito);
  let listaCarrito = document.getElementById('lista-carrito'); 
  //listaCarrito.innerHTML = "";
  let totalcarrito = parseInt(0);
  let contador = 0;

  for (let i = 0; i < carrito.length; i++) {
    let producto = carrito[i];
    console.log(producto);

    let precio = "";
    precio = new Intl.NumberFormat("de-DE").format(producto.producto.precio);
    let total = "";
    totalp = producto.producto.precio * 1;
    total = new Intl.NumberFormat("de-DE").format(totalp);

    totalcarrito = totalcarrito + total;

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
                                        <input type="text" class="form-control form-control-sm text-center border-0" value="1">
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
                                    <button class="btn btn-md rounded-circle bg-light border mt-4" id="eliminarDelCarrito-${producto.producto.id}" >
                                        <i class="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            </tr>`;
    contador++;
  }

  document.getElementById('subtotalcarrito').innerHTML = totalcarrito;
  document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

  document.getElementById('carrito-contador').innerHTML = contador;

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

