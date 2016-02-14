import express from 'express'

const app = express()

const port = process.env.PORT || 3000

let bookRouter = express.Router()

bookRouter.route('/books')      // localhost:3000/api/books
    .get((req, res) => {
        let responseJson = {hello: "This is my api"}
        res.json(responseJson)
    })

app.use('/api', bookRouter)

app.get('/', (req, res) => {
    res.send('welcome to my API!')
})

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`)
})