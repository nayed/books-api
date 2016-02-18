import should from 'should'
import sinon from 'sinon'
import mongoose from 'mongoose'
import {app} from '../api/app.js'
import supertest from 'supertest'

let Book = mongoose.model('Book')
let agent = supertest.agent(app)

describe('Book Crud Test', () => {
    it('Should allow a book to be posted and return a read and _id', done => {
        let bookPost = {title: 'new book', author: 'Thurs Day', genre: 'Fiction'}

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                results.body.read.should.equal(false)
                results.body.should.have.property('_id')
                done()
            })
    })
    afterEach(done => {
        Book.remove().exec()
        done()
    })
})