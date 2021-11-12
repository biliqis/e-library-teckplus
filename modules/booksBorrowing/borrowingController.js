const { findBookById,userBorrowBook } = require("./borrowingService")


module.exports.searchBooksById = async (req,res) => {
    return findBookById(req,res)
}

module.exports.createUserBorrowBook = async (req,res) => {
    return userBorrowBook(req,res)
}