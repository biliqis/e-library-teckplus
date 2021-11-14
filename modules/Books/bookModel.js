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


        isAvailable: {
			type: Boolean,
		},


        pricePerBook:{
            type:Number
        },

        isbnNumber: {
            type: String,
        },
    
        noOfCopies: {
            type: Number,
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





