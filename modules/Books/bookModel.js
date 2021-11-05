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


        "ISBN": {
            type: String,
        },
        countryId: {
            type: String
        },
        noOfCopies: {
            type: Number,
        },
        publishDate: {
            type: String,
        },
        phoneNumber: {
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

module.exports = mongoose.model("book", BookSchema);