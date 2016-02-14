import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {bookRouter} from './routes/bookRoutes'

const db = mongoose.connect('mongodb://localhost/bookAPI')

const app = express()

const port = process.env.PORT || 3000

//let bookRouter = require('./routes/bookRoutes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/api', bookRouter())

app.get('/', (req, res) => {
    res.send('welcome to my API!')
})

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`)
})