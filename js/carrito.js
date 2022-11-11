const baseDeDatos = [
    {
        id: 1,
        nombre: 'Agua purificada',
        precio: 3500,
    },
    {
        id: 2,
        nombre: 'Agua alcalina',
        precio: 4500,
    },

];

let login = document.getElementsByClassName("login")[0]
if((sessionStorage.getItem("valor")) === "true"){
    login.innerHTML = `
        <a href="#">Cuenta<a>
        `
}else{
    login.innerHTML = `
    <a href="login.html">Inicia sesión<a>
    `
}

let value = sessionStorage.getItem("valor")
let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar')


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;

        const nodeBoton = document.createElement('button');
        nodeBoton.classList.add('btn', 'btn-primary');
        nodeBoton.textContent = '+';
        nodeBoton.setAttribute('marcador', info.id);
        nodeBoton.addEventListener('click', anyadirProductoAlCarrito);

        cardBody.appendChild(miNodoTitle);
        cardBody.appendChild(miNodoPrecio);
        cardBody.appendChild(nodeBoton);
        miNodo.appendChild(cardBody);
        DOMitems.appendChild(miNodo);
    });
}

function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
        });
    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}
  

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}
function comprarcarrito(){
    if(value === 'true'){
        Swal.fire({
        title: 'Comprar?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, comprar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Compra realizada',
            'agenda tu pedido:)',
            'Exito'
          )
          localStorage.setItem('compra', +carrito)
          carrito= []
          renderizarCarrito()
        }
    
      })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Ops....',
            text: 'Tienes que iniciar sesión para poder realizar una compra',
            })
        }
    }
console.log(value);
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', comprarcarrito)

renderizarProductos();
renderizarCarrito();

//comprar
