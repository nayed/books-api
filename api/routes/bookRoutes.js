import express from 'express'

let bookRouter = Book => {
    let bookRoute = express.Router()

    bookRoute.route('/')              // localhost:3000/api/books
        .post((req, res) => {
            let book = new Book(req.body)
            book.save()
            res.status(201).send(book)
        })
        .get((req, res) => {
            let query = {}                  // localhost:3000/api/books?genre=Shonen or ?author=Tite Kubo
            if (req.query.genre) 
                query.genre = req.query.genre
            
            Book.find(query, (err, books) => {
                if (err) 
                    res.status(500).send(err)
                else 
                    res.json(books)
            })
        })

    bookRoute.use('/:bookId', (req, res, next) => {     //middleware for bookId
        Book.findById(req.params.bookId, (err, book) => {
            if (err) 
                res.status(500).send(err)
            else if (book) {
                req.book = book
                next()
            }
            else 
                res.status(404).send('no book found')
        })
    })

    bookRoute.route('/:bookId')      // http://localhost:3000/api/books/IDNUMBERSTUFF
        .get((req, res) => {
            res.json(req.book)
        })
        .put((req, res) => {
            req.book.title = req.body.title
            req.book.author = req.body.author
            req.book.genre = req.body.genre
            req.book.read = req.body.read
            req.book.save(err => {
                if (err) 
                    res.status(500).send(err)
                else 
                    res.json(req.book)
            })
        })
        .patch((req, res) => {
            if (req.body._id) 
                delete req.body._id
            
            for (let p in req.body) {
                req.book[p] = req.body[p]
            }
            req.book.save(err => {
                if (err) 
                    res.status(500).send(err)
                else 
                    res.json(req.book)
            })
        })
        .delete((req, res) => {
            req.book.remove(err => {
                if (err) 
                    res.status(500).send(err)
                else 
                    res.status(204).send('Removed')
            })
        })
    return bookRoute
}

export {bookRouter}