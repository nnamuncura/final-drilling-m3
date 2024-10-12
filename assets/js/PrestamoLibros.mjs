class PrestamoLibro {
    /**
     * 
     * "variable interna" 
     * -> sirve para gestionar el estado de una "instancia" de la clase
     * 
     * instancia, es lo que crea esta fábrica
     */
    // 
    #libros
    constructor(libro) {
        this.#libros = [libro]
        this.tipo = 'libro'
    }

    get libros() {
        return this.#libros
    }

    set libros(libro) {
        this.#libros.push(libro)
    }

    contadorLibros() {
        return this.#libros.length
    }
}

export default PrestamoLibro