const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema(
    {
        bookTitle: {
            type: String,
        },


        authorName: {
            type: String,
        },

        bookCover: {
            data: Buffer,
             contentType: String,
        },


        isAvailable: {
            type: Boolean,
        },

        pricePerBook: {
            type: Number
        },

        isbnNumber: {
            type: String,
        },

        noOfCopies: {
            type: Number,
        },

        // availableCopies: {
        //     type: Number,
        // },

        description: {
            type: String,
        },
        

        publishDate: {
            type: String,
        },
    },

    {
        timestamps: true,
    }
);

//enable search indexing
BookSchema.index({ '$**': 'text' })
module.exports = mongoose.model("book", BookSchema);





