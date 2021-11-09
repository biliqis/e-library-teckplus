const router = require("express").Router()

const { searchBooksTitle }= require("./borrowingController")

router.get("/search-books",searchBooksTitle)

module.exports = router

