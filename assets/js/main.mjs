import Producto from "./class/producto.mjs";
import Carrito from "./class/Carrito.mjs";

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('#listProduct');
let listCartHTML = document.querySelector('.listCart');
let totalCartSpan = document.querySelector('.total span');
let discountCartSpan = document.querySelector('.discount span');
let iconCartSpan = document.querySelector('.icon-cart span');

let url = './assets/js/products-copy.json';
let carritoDeCompra = []

//muestra el carrito en pantalla haciendo clic en el icono 🛒
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

//cierra el carrito al hacer click en boton 'Cerrar' al final del carrito
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

//Conecta a la base de datos con fetch y llama a funcion pintar card en pantalla
const showProductOnScreen = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            return productos.map(producto => {
                return new Producto(producto)
            })
        })
        .then(productos => {
            listProductHTML.innerHTML = '';
            //console.log('productos: ', productos)
            productos.forEach((producto, indice) => pintarProductosEnPantalla(producto))
        })
}

//Agrega los productos al carrito
function agregarAlCarrito(event, producto) {
    let positionClick = event.target;
    let product_id = positionClick.parentElement.dataset.id;
    if (!carritoDeCompra) {
        carritoDeCompra = new Carrito(producto)
    } else {
        const indiceProducto = carritoDeCompra.findIndex(producto => producto.id == product_id)
        if (indiceProducto === -1) {
            producto.quantity = 1;
            carritoDeCompra.push(producto)
        } else {
            let positionItemInCart = carritoDeCompra.findIndex(i => i.id == product_id)
            //console.log('carritodecompra[product_id] : ', carritoDeCompra[positionItemInCart].id, carritoDeCompra[positionItemInCart].name)
            carritoDeCompra[positionItemInCart].quantity++
        }
    }
    //console.log('En carrito hay: ', carritoDeCompra);
    // pintar carrito en html
    pintarProductosEnCarrito(carritoDeCompra)
}

//Agrega las card con productos en pantalla
function pintarProductosEnPantalla(producto){
    let newProduct = document.createElement('div');
    newProduct.classList.add('col-12', 'col-sm-4', 'col-md-3');
    const { id, name, price } = producto;
    newProduct.innerHTML = `
    <div class="card my-3">
        <img src="${producto.image}" class="card-img-top" alt="">
        <div class="card-body" data-id="${id}">
            <h6 class="card-title">${name}</h6>
            <p class="card-text"><strong>$ ${price}</strong></p>
            <button class="btn btn-success addCart">Agregar al Carro</button>
        </div>
    </div>
    `;
    listProductHTML.appendChild(newProduct)
    //agregar productos al carrito
    newProduct.getElementsByTagName('button')[0].addEventListener('click', (event) => agregarAlCarrito(event, producto))
}

//Muestra los productos del carrito en pantalla
function pintarProductosEnCarrito(carritoDeCompra){
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalToPay = 0;
    let discount = 0;
    if (carritoDeCompra.length > 0) {
        //console.log('Elementos en el carrito para pintar el html', carritoDeCompra)
        carritoDeCompra.forEach(cart => {
            const {image, id, name, price, quantity } = cart;
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = id;
            totalToPay = totalToPay + (price * quantity);
            newCart.innerHTML = `
                    <div class="image">
                        <img src="${image}" alt="">                    
                    </div>
                    <div class="name">
                        ${name}
                    </div>
                    <div class="totalPrice">
                        $${price * quantity}
                    </div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${quantity}</span>
                        <span class="plus">+</span>
                    </div>
            `;
            listCartHTML.appendChild(newCart);
        })
    }
    totalToPay >=30000? discount = totalToPay*0.1 : discount = 0;
    iconCartSpan.innerHTML = totalQuantity;
    discountCartSpan.innerHTML = discount;
    totalCartSpan.innerHTML = totalToPay-discount;
}

//Captura el evento click en boton - o + del carrito
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = (positionClick.parentElement).parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changueQuantity(product_id, type);
    }
})

//Modifica cantidades del carrito 
const changueQuantity = (product_id, type)=>{
    let positionItemInCart = carritoDeCompra.findIndex((value) => value.id == product_id);
    if(positionItemInCart >=0){
        switch(type){
            case 'plus':
                carritoDeCompra[positionItemInCart].quantity = carritoDeCompra[positionItemInCart].quantity +1;
                //console.log('posicion en carro en plus es: ',carritoDeCompra[positionItemInCart].quantity)
                break;
            default:
                let valueChange = carritoDeCompra[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    carritoDeCompra[positionItemInCart].quantity = valueChange;
                }else{
                    carritoDeCompra.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    pintarProductosEnCarrito(carritoDeCompra)
}

//Se llama a funcion que muestra los productos en pantalla
showProductOnScreen();


