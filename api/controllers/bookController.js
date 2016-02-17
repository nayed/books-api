export let bookController = Book => {
    let post = (req, res) => {
        let book = new Book(req.body)

        if (!req.body.title) {
            res.status(400)
            res.send('Title is required')
        }
        else {
            book.save()
            res.status(201)
            send(book)
        }
    }

    let get = (req, res) => {
        let query = {}                          // localhost:3000/api/books?genre=Shonen or ?author=Tite Kubo
        if (req.query.genre) 
            query.genre = req.query.genre
        
        Book.find(query, (err, books) => {
            if (err) 
                res.status(500).send(err)
            else 
                res.json(books)
        })
    }
    return {post, get}
}
