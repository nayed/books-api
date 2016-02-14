import express from 'express'

let bookRouter = (Book) => {
    let bookRoute = express.Router()

    bookRoute.route('/')              // localhost:3000/api/books
        .post((req, res) => {
            let book = new Book(req.body)
            book.save()
            res.status(201).send(book)
        })
        .get((req, res) => {
            let query = {}                  // localhost:3000/api/books?genre=Shonen or ?author=Tite Kubo
            if (req.query.genre) {
                query.genre = req.query.genre
            }
            Book.find(query, (err, books) => {
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    res.json(books)
                }
            })
        })

    bookRoute.route('/:bookId')      // http://localhost:3000/api/books/IDNUMBERSTUFF
        .get((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    res.json(book)
                }
            })
        })
    return bookRoute
}

export {bookRouter}