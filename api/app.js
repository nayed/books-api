import express from 'express'
import mongoose from 'mongoose'
import Book from './models/bookModel'
import bodyParser from 'body-parser'

const db = mongoose.connect('mongodb://localhost/bookAPI')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

let bookRouter = express.Router()

bookRouter.route('/Books')              // localhost:3000/api/books
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

bookRouter.route('/Books/:bookId')      // http://localhost:3000/api/books/IDNUMBERSTUFF
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

app.use('/api', bookRouter)

app.get('/', (req, res) => {
    res.send('welcome to my API!')
})

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`)
})