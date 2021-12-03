const router = require("express").Router()
const {useBodyValidator, useQueryValidator } = require("./bodyValidator")
const { requireAuth } = require("../../middleware/auth.guard");
const { bookBorrowingValidator } = require("./borrowingValidator")
const {userIdExists} = require('../user/userGuard')

const { searchBooksById ,createUserBorrowBook,getUserBorrowedBooks }= require("./borrowingController");
const { userBorrowBook, userBorrowBookById } = require("./borrowingService");


router.post('/add-borrowed-book',requireAuth,createUserBorrowBook)
router.get('/get-borrowed-books', requireAuth,getUserBorrowedBooks)
router.post('/borrow-book',requireAuth,userBorrowBookById)
module.exports = router

