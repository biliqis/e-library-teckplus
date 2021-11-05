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
        sex: {
            type: String
        },

        "ISBN": {//TODO: Please justify why you do this.
            type: String,
        },
        countryId: {
            type: String
        },//TODO: Why did you use the country as an Id?? are you creating the country some where and you are passing the Id of the model here or what?
        noOfCopies: {
            type: Number,
        },
        publishDate: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("book", BookSchema);