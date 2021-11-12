const router = require("express").Router()

const {userIdExists} = require('../user/userGuard')

const {requireAuth} = require('../../middleware/auth.guard')

const { searchBooksById ,createUserBorrowBook }= require("./borrowingController")

router.get("/search-books/:id",searchBooksById )

router.post('/add-borrowed-book',requireAuth,createUserBorrowBook)

module.exports = router

