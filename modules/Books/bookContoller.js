
const { bookTitleExists, bookIdExists, createBookService, getAllBookService, getAllBooksPaginated, deleteBookService, updateBookService, searchBooks } = require("./bookService");
const { createBookValidator, editUserValidator } = require("./bookValidator");

//create a book
module.exports.createBook = async (req, res) => {
    try {
        const data = await createBookValidator.validateAsync(req.body);
        const bookData = await createBookService(data);
        console.log(bookData)
        return res.json({ bookData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error Occured" });
    }
}

module.exports.searchAll = async (req, res) => {
    let searchResults = await searchBooks(req, res)
    return searchResults
}
//add a book
module.exports.updateBook = async (req, res, next) => {
    const bookId = req.params.id
    const data = await editUserValidator.validateAsync(req.body);
    const bookData = await updateBookService(bookId, data);
    return res.json({ message: `Book with the ID ${bookId} is updated successfully`, bookData })

}
//get all books with pagination

module.exports.getAllBooks = async (req, res) => {
    const allBooks = await getAllBooksPaginated()
    console.log(allBooks)
    return res.status(200).json({ message: "Books retrieved successfully", allBooks })
}

//delete books
module.exports.deleteSingleBook = async (req, res, next) => {
    await deleteBookService(req.params.id)
    return res.status(200).json({ message: `Books with the ID ${req.params.id} successfully deleted` })
}

//get single
module.exports.getSingleBook = async (req, res, next) => {
    const book = await bookIdExists(req.params.id)
    return res.status(200).json({ message: "Books retrieved successfully", book })
}

module.exports.getAllBooksPagination = async (req, res, next) => {
    const { page, limit } = req.query
    console.log(page, limit)
    try {
        const books = await getAllBooksPaginated(page, limit)
        res.status(200).json({
            message: 'success',
            length: `${books.length} data retrieved`, data: books
        })

    } catch (err) {
        //console.err(err)
        return res.json({ message: err.message })
    }
}


