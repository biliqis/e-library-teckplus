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
		"isbnNumber": {
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
		address: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("book", BookSchema);