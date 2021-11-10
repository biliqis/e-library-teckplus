const router = require("express").Router()

const {userIdExists} = require('../user/userGuard')

const {requireAuth} = require('../../middleware/auth.guard')

const { searchBooksTitle,createUserBorrowBook }= require("./borrowingController")

router.get("/search-books",searchBooksTitle)

router.post('/add-borrowed-book',requireAuth,userIdExists,createUserBorrowBook)

module.exports = router

