const router = require("express").Router()
const {useBodyValidator, useQueryValidator } = require("./bodyValidator")
const { requireAuth } = require("../../middleware/auth.guard");
const { bookBorrowingValidator } = require("./borrowingValidator")
const {userIdExists} = require('../user/userGuard')
const { searchBooksById ,createUserBorrowBook,getUserBorrowedBooks }= require("./borrowingController")
// router.get("/lookup-books/:id",searchBooksById )

router.post('/add-borrowed-book',requireAuth,createUserBorrowBook)
router.get('/get-borrowed-books', requireAuth,getUserBorrowedBooks)

module.exports = router

