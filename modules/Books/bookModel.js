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
        pricePerBook:{
            type:Number
        },
        sex: {
            type: String
        },

        isbnNumber: {//TODO: Please justify why you do this.
            type: String,
        },
        country: {
            type: String
        },//TODO: Why did you use the country as an Id?? are you creating the country some where and you are passing the Id of the model here or what?
        noOfCopies: {
            type: Number,
        },
        publishDate: {
            type: String,
        },
    
        roles: {
            type: String,
            // enum: ["admin", "user"]
        },

        address: {
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