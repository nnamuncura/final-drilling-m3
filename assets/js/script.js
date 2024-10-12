let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('#listProduct');
let listCartHTML = document.querySelector('.listCart');
let totalCartSpan = document.querySelector('.total span');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div')
            newProduct.classList.add('col-12', 'col-sm-4', 'col-md-3');
            //newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="card my-3">
                        <img src="${product.image}" class="card-img-top" alt="">
                        <div class="card-body" data-id="${product.id}">
                            <h6 class="card-title">${product.name}</h6>
                            <p class="card-text"><strong>$ ${product.price}</strong></p>
                            <button class="btn btn-success addCart">Agregar al Carro</button>
                        </div>
                    </div>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        //alert(product_id)
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    // console.log(carts);
    addCartToHTML();
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalToPay = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            console.log('newCartDataseID-L79', newCart.dataset.id)
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            totalToPay = totalToPay +(info.price * cart.quantity);
            newCart.innerHTML = `
                    <div class="image">
                        <img src="${info.image}" alt="">                    
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">
                        $${info.price * cart.quantity}
                    </div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">+</span>
                    </div>
            `;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerHTML = totalQuantity;
    totalCartSpan.innerHTML = totalToPay;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    console.log('possitionClick-L108:', positionClick)
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = (positionClick.parentElement).parentElement.dataset.id;
        console.log('positionClickParentEl', positionClick.parentElement)
        console.log('product_id: ',product_id)
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changueQuantity(product_id, type);
    }
})

const changueQuantity = (product_id, type)=>{
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >=0){
        switch(type){
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity +1;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
}

const initApp = () => {
    fetch('./assets/js/products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            console.log(listProducts)
            addDataToHTML();
        })
}

initApp();
/**
 * link video: https://youtu.be/gXWohFYrI0M?si=ahXQT19ApVEVsrnL
 * quede en el minuto 24
 */