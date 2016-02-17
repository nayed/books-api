import should from 'should'
import sinon from 'sinon'
import {bookController} from '../api/controllers/bookController'

describe('Book Controller Tests', () => {
    describe('Post', () => {
        /* testing the POST method */
        it('should not allowed an empty title on post', () => {
            let Book = function(book) {
                this.save = () => {}
            }

            let req = {
                body: {
                    author: 'Nay'
                }
            }

            let res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            let bookCtrl = bookController(Book)

            bookCtrl.post(req, res)

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`)
            res.send.calledWith('Title is required').should.equal(true)
        })
    })
})