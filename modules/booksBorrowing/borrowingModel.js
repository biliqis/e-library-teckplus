const { string } = require("joi")
const mongoose = require("mongoose")
const bookSchema = require('../Books/bookModel')

const borrowedBookSchema = new mongoose.Schema({
    bookId: {
        type: String
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    numberOfBooksToBeBorrowed: {
        type: Number,
    },
    
    borrowDate: {
        type: Date
    },

    returnDate: {
        type: Date,
        default:Date.now
    },
    returned:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("borrowedBook",borrowedBookSchema)

