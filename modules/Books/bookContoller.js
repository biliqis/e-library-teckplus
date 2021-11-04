
const { bookTitleExists, bookIdExists, createBookService, getAllBookService, deleteBookService, updateBookService } = require("./bookService");
const { createBookValidator, editUserValidator } = require("./bookValidator");
//const AppError = require("../Error/appError");
//const  ObjectID = require('mongodb').ObjectId;

module.exports.createBook = async(req, res, next) => {
	
    const data = await createBookValidator.validateAsync(req.body);
    const bookData = await createBookService(data);
    return res.json({ bookData })

}



module.exports.updateBook = async(req, res, next) => {
    const bookId = req.params.id
    const data = await editUserValidator.validateAsync(req.body);

    const bookData = await updateBookService(bookId, data);

    return res.json({ message: `Book with the ID ${bookId} is updated successfully`, bookData })
}

module.exports.getAllBooks = async (req, res, next) => {
    const allBooks = await getAllBookService()
    return res.status(200).json({message: "Books retrieved successfully", allBooks})
}


module.exports.deleteSingleBook = async (req, res, next) => {
    await deleteBookService(req.params.id)
    return res.status(200).json({message: `Books with the ID ${req.params.id} successfully deleted`})
}


module.exports.getSingleBook = async (req, res, next) => {
    const book = await bookIdExists(req.params.id)
    return res.status(200).json({message: "Books retrieved successfully", book})
}

