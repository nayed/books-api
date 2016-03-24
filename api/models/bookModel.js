import mongoose, {Schema} from 'mongoose'

let bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    score: {type: Number},
    comment: {type: String, default: null}
})

export default mongoose.model('Book', bookModel)