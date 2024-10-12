class Carrito{
    #productos
    constructor(producto){
        this.#productos = [producto];
        this.tipo = 'producto';
    }

    get productos(){
        return this.#productos;
    }

    set productos(producto){
        this.#productos.push(producto);
    }

    contadorProductos(){
        return this.#productos.length;
    }
}

export default Carrito