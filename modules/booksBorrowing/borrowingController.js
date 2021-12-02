const { findBookById,userBorrowBook,getBorrowBookByUser } = require("./borrowingService")
const { booksBorrowingValidator } = require("./borrowingValidator")

booksBorrowingController ={};

booksBorrowingController.searchBooksById = async (req,res) => {
    return await findBookById(req,res)
}

booksBorrowingController.createUserBorrowBook = async (req,res) => {
    return userBorrowBook(req,res)
}

booksBorrowingController.getUserBorrowedBooks = async (req,res) => {
    return await getBorrowBookByUser(req,res)
}

module.exports = booksBorrowingController