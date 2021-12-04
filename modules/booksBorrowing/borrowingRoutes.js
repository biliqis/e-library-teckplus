const router = require("express").Router()
const {useBodyValidator, useQueryValidator } = require("./bodyValidator")
const { requireAuth } = require("../../middleware/auth.guard");
const { bookBorrowingValidator } = require("./borrowingValidator")
const {userIdExists} = require('../user/userGuard')

const { searchBooksById ,createUserBorrowBook,getUserBorrowedBooks, getPendings, getReturnBooks,}= require("./borrowingController");
const { userBorrowBook, userBorrowBookById,checkUserBorrowOnce } = require("./borrowingService");


router.post('/add-borrowed-book',requireAuth, checkUserBorrowOnce, createUserBorrowBook)
router.get('/get-borrowed-books', requireAuth,getUserBorrowedBooks)
router.post('/borrow-book',requireAuth,userBorrowBookById)
router.get('/pending-books', requireAuth, getPendings )
router.get('/get-return-books', requireAuth, getReturnBooks)
module.exports = router

