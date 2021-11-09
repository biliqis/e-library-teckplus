const { string } = require("joi")
const mongoose = require("mongoose")
const bookSchema = require('../Books/bookModel')

const borrowedBookSchema = new mongoose.Schema({
    bookTitles: {
        type: String
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },

    numberOfBooksToBeBorrowed: {
        type: Number,
        max :3
    },

    borrowDate: {
        type: Date
    },

    returnDate: {
        type: Date
    },
    returned:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("borrowedBook",borrowedBookSchema)