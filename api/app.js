import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Book from './models/bookModel' 
import {bookRouter} from './routes/bookRoutes'

let db

if (process.env.ENV == 'Test') 
    db = mongoose.connect('mongodb://localhost/bookAPI_test')
else 
    db = mongoose.connect('mongodb://localhost/bookAPI')

let app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/api/books', bookRouter(Book))
//app.use('/api/authors', authorRouter(Author)) or something like that

app.get('/', (req, res) => {
    res.send('welcome to my API!')
})

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`)
})

export {app}