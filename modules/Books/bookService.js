const bookModel = require("./bookModel")


//const bookService = {};

module.exports.bookTitleExists = (bookTitle) => {
	return bookModel.countDocuments({ bookTitle }).then((count) => count > 0)
}

module.exports.bookIdExists = async (bookId) => {
    const book = await bookModel.findById({ _id: new ObjectId(bookId) })
    return book
}

module.exports.createBookService = async (book) => {
    //console.log('book')
    const model = new bookModel({ ...book })
    console.log(model)
	// return model.save();
}

module.exports.updateBookService = async (bookId, book) => {
    //TODO: change to findByIdAndUpdate since you are searching by Id and the Id is known.
	return bookModel.findOneAndUpdate(
		{ _id: bookId },
		{ ...book },
		{ new: true }
	);
}

module.exports.getAllBookService = async (req, res) => {
    //TODO: Implement Pagination of the results.
    const books = bookModel.find({})
    return books
}

module.exports.deleteBookService = async (userId) => {
	//TODO: change to findByIdAndDelete since you are searching by Id and the Id is known.
	//TODO: You are passing in the userId on book collection, this cant work, it should be the bookId.
	return await bookModel.deleteOne({ _id: new ObjectId(userId) }); //TODO: check the parameter you are passing in.
}


//TODO: Implement the Search api, that accepts a search term and a queries.