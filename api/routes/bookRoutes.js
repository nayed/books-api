import express from 'express'
import {bookController} from '../controllers/bookController'

let bookRouter = Book => {
    let bookRoute = express.Router()
    let bookCtrl = bookController(Book)

    bookRoute.route('/')                            // localhost:3000/api/v1/books
        .post(bookCtrl.post)
        .get(bookCtrl.get)

    bookRoute.use('/:bookId', (req, res, next) => {     // middleware for bookId
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

    bookRoute.route('/:bookId')                         // http://localhost:3000/api/v1/books/IDNUMBERSTUFF
        .get((req, res) => {
            let returnBook = req.book.toJSON()
            returnBook.links = {}
            let newLink = `http://${req.headers.host}/api/v1/books/?genre=${returnBook.genre}`
            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20')
            res.json(returnBook)
        })
        .put((req, res) => {
            req.book.title = req.body.title
            req.book.author = req.body.author
            req.book.genre = req.body.genre
            req.book.score = req.body.score
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