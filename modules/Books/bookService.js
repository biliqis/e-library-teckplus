const bookModel = require("./book.model")
const ObjectId = require('mongodb').ObjectId



module.exports.bookTitleExists = (bookTitle) => {
	return bookModel.countDocuments({ bookTitle }).then((count) => count > 0)
}

module.exports.bookIdExists = async (bookId) => {
    const book = await bookModel.findById({ _id: new ObjectId(bookId) })
    return book
}

module.exports.createBookService = async (book) => {
    const model = new bookModel({ ...book })
	return model.save();
}

module.exports.updateBookService = async (bookId, book) => {
    return bookModel.findOneAndUpdate({ _id: bookId }, { ...book },{ new: true });
}

module.exports.getAllBookService = async(req, res) => {
    const books = bookModel.find()
    return books
}

module.exports.deleteBookService = async (userId)=>{
	return await bookModel.deleteOne({ _id: new ObjectId(userId) })
}
