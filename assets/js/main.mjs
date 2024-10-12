import Producto from "./class/producto.mjs";
import Carrito from "./class/Carrito.mjs";
console.log('main.mjs funcionando...')

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('#listProduct');
let listCartHTML = document.querySelector('.listCart');
let totalCartSpan = document.querySelector('.total span');
let iconCartSpan = document.querySelector('.icon-cart span');

let url = './assets/js/products-copy.json';
let listProducts = [];
let carts = [];
let carritoDeCompra = []

//muestra el carrito en pantalla haciendo clic en el icono 🛒
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

//cierra el carrito al hacer click en boton 'Cerrar' al final del carrito
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

//funcion que pinta las card con datos en la pantalla
// const addDataToHTML = () => {
//     listProductHTML.innerHTML = '';
//     if (listProducts.length > 0) {
//         listProducts.forEach(product => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('col-12', 'col-sm-4', 'col-md-3');
//             newProduct.innerHTML = `
//                 <div class="card my-3">
//                     <img src="${product.image}" class="card-img-top" alt="">
//                     <div class="card-body" data-id="${product.id}">
//                         <h6 class="card-title">${product.name}</h6>
//                         <p class="card-text"><strong>$ ${product.price}</strong></p>
//                         <button class="btn btn-success addCart">Agregar al Carro</button>
//                     </div>
//                 </div>
//             `;
//             listProductHTML.appendChild(newProduct);
//         })
//     }
// }

// listProductHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if (positionClick.classList.contains('addCart')) {
//         let product_id = positionClick.parentElement.dataset.id;
//         console.log('id del producto en listProductHTML.addEventListner() L53: ', product_id);
//         addProductToCart(product_id)
//     }
// })

// const addProductToCart = (product_id) => {
//     console.log('dentro de funcion addPruductTocart()')
//     let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
//     if (carts.length <= 0) {
//         carts = [{
//             product_id: product_id,
//             quantity: 1
//         }]
//     } else if (positionThisProductInCart < 0) {
//         carts.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     } else {
//         carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
//     }
//     console.log(carts);
// }


//funcion que conecta a la base de datos con fetch y llama a funcion pintar card en pantalla
const showProductOnScreen = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //listProducts = data;
            //console.log('print desde showProduct()', listProducts);
            const productos = data.productos;
            console.log('productos: ', productos)
            return productos.map(producto => {
                return new Producto(producto)
            })
            //se llama funcion que pinta las card en pantalla
            //addDataToHTML();
        })
        .then(productos => {
            listProductHTML.innerHTML = '';
            console.log('productos: ', productos)
            let mensajePantalla = ''
            productos.forEach((producto, indice) => {
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
            })
            //console.log('mensajePantalla : ',mensajePantalla)
            //let eleccionUsuario = prompt(mensajePantalla)
            //let carrito = [];
            //agregarAlCarrito(productos)

        })
}

function agregarAlCarrito(event, producto) {
    console.log('Productos desde agregarAlCarrito(): ')
    let positionClick = event.target;
    let product_id = positionClick.parentElement.dataset.id;
    console.log('positionClick : ', positionClick)
    console.log('Id producto click : ', product_id)
    if (!carritoDeCompra) {
        carritoDeCompra = new Carrito(producto)
    } else {
        const indiceProducto = carritoDeCompra.findIndex(producto => producto.id == product_id)
        console.log('indiceProducto L124 : ', indiceProducto)
        if (indiceProducto === -1) {
            producto.quantity = 1;
            carritoDeCompra.push(producto)
        } else {
            let positionItemInCart = carritoDeCompra.findIndex(i => i.id == product_id)
            console.log('carritodecompra[product_id] : ', carritoDeCompra[positionItemInCart].id, carritoDeCompra[positionItemInCart].name)
            carritoDeCompra[positionItemInCart].quantity++
        }
    }
    console.log('En carrito hay: ', carritoDeCompra);
    // pintar carrito en html
    pintarProductosEnCarrito(carritoDeCompra)
}

function pintarProductosEnCarrito(carritoDeCompra){
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalToPay = 0;
    if (carritoDeCompra.length > 0) {
        console.log('estoy revisando el carrito : ', carritoDeCompra.length)
        console.log('Elementos en el carrito para pintar el html', carritoDeCompra)
        carritoDeCompra.forEach(cart => {
            const {image, id, name, price, quantity } = cart;
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            //newCart.dataset.id = cart.product_id;
            //console.log('newCartDataseID-L79', newCart.dataset.id)
            //let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            //let info = listProducts[positionProduct];
            //totalToPay = totalToPay +(info.price * cart.quantity);
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
    iconCartSpan.innerHTML = totalQuantity;
    totalCartSpan.innerHTML = totalToPay;
}


//Se llama a funcion que muestra los productos en pantalla
showProductOnScreen();


