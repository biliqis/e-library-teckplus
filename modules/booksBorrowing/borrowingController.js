const { findBookByTitle,userBorrowBook } = require("./borrowingService")


module.exports.searchBooksTitle = async (req,res) => {
    return findBookByTitle(req,res)
}

module.exports.createUserBorrowBook = async (req,res) => {
    return userBorrowBook(req,res)
}