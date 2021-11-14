const { findBookById,userBorrowBook } = require("./borrowingService")
const { booksBorrowingValidator } = require("./borrowingValidator")

booksBorrowingController ={};

booksBorrowingController.searchBooksById = async (req,res) => {
    return await findBookById(req,res)
}

booksBorrowingController.createUserBorrowBook = async (req,res) => {
    return userBorrowBook(req,res)
}

module.exports = booksBorrowingController