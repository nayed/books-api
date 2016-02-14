import express from 'express'
import mongoose from 'mongoose'

const db = mongoose.connect('mongodb://localhost/bookAPI')

import Book from './models/bookModel'

const app = express()

const port = process.env.PORT || 3000

let bookRouter = express.Router()

bookRouter.route('/books')      // localhost:3000/api/books
    .get((req, res) => {
        Book.find((err, books) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.json(books)
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