
class Book {
    constructor({ id, title, author, publication_year, genre, description, cover_image }) {
        this.id = id
        this.title = title
        this.author = author
        this.publication_year = publication_year
        this.genre = genre
        this.description = description
        this.cover_image = cover_image
    }

    /**
     * Primera forma de validar, 
     * 
     * Sólo validamos números
     */

    // isValid() {
    //   if(isNaN(Number(this.id))) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }


}

export default Book