import Book from "./Books.mjs";
import PrestamoLibro from "./PrestamoLibros.mjs";

console.log('script2.mjs funcionando...')
/**
 * Obtener datos de la "base de datos"
 * 
 * obtiene nuestro DB.json
 */

fetch("./assets/js/DB.json")
    .then((response) => {
        /** 
         * PASOS DEL CALLBACK / FUNCION 
         * 
         * 1.- Recibe la respuesta del servidor
         * 
         * -> trae un "readableStream"
         **/

        return response.json()
    })
    .then((data) => {
        /**
         * data es el "readableStream" consumido
         * en nuestro caso es DB.json
         * 
         * que emula el consumo a un API
         */

        /**
         * data.libros es arreglo de objetos "comunes y corriente"
         */
        console.log('data de libro:', data)
        const libros = data.libros

        return libros.map(libro => {
            // const { id, title, author, publication_year, genre, description, cover_image } = libro
            // return new Book(id, title, author, publication_year, genre, description, cover_image)
            return new Book(libro)
        })
    })
    .then(libros => {
        let mensajeParaUsuario = ''// 

        /**
         * forEach(callback)
         * 
         * callback((elemento, indice) => {
         *  usamos elemento e indice
         * })
         */
        libros.forEach((libro, indice) => {
            const { title, author } = libro // tomamos título y autor de cada libro

            mensajeParaUsuario += `(${indice + 1}) ${title} - ${author} \n` // \n -> representa salto de línea
        });

        /**
         * Dando la configuración inicial del ciclo
         */
        let eleccionUsuario = prompt(mensajeParaUsuario) // primera elección
        let prestamos // creamos un "indefinido" para los préstamos

        while (eleccionUsuario != null && eleccionUsuario != 'no') {

            console.log('¿Está creado el carrito?', !!prestamos)

            if (!libros[eleccionUsuario - 1]) {
                /** Caso de elección que no existe */
                alert('No existe éste libro')
            } else if (!prestamos) {
                /** Asignamos el "carrito" a la variable prestamos */
                console.log('En la rama donde se crea carrito')
                console.log('Creando instancia del carrito')
                prestamos = new PrestamoLibro(libros[eleccionUsuario - 1])
            } else {
                console.log('Aquí agregaremos nuevos libros')
            }

            console.log("Carrito con libros, al final de una iteración", prestamos)
            eleccionUsuario = prompt(mensajeParaUsuario)
        }
    })





/**
 * Forma para crear libros
 */

// let book = new  Book(
//   '12354',
//   'Contemplando la Luna',
//   'Sagyo',
//   '1650',
//   'Poesía',
//   'Libro de poseía budista',
//   'https://fakeimg.pl/667x1000/cc6600'
// )



// console.log('El libro es válido',book.isValid())
// book.title = 'Crónicas del pájaro que da cuerda al mundo'
// console.log(book.title) // muestra el nombre del libro

/**
 * Creación del objeto
 *
 * new NombreClase
 *
 * estante -> [ 'primer libro' ]
 */
// const librosAlejandro = new PrestamoLibro(book)

/**
 * Setter en la instancia
 *
 * objeto.propiedad = 'nuevo valor'
 */
// librosAlejandro.libros = 'Nuevo libro'


// console.log(librosAlejandro.libros) // todos los libros en el prestamo


// console.log("El estante de libros tiene:", librosAlejandro.contadorLibros())