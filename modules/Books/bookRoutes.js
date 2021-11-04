// const router = require("express").Router();
// const {CreateBook,updateBook } = require('./bookContoller')

// router.post('/books/add-book',CreateBook)
// router.put('/books/update-books/:id',updateBook)
// module.exports = router

const router = require("express").Router()
const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");
const { createBook, getAllBooks, deleteSingleBook, getSingleBook, updateBook } = require("./bookContoller")
const { createBookGuard, deleteBookGuard, updateBookGuard, checkIfUserIsAdmin } = require("./bookGguard");

router.post("/create", auth, checkIfUserIsAdmin, useGuard(createBookGuard), createBook);
router.patch("/update/:id", auth, checkIfUserIsAdmin, useGuard(updateBookGuard), updateBook);

router.get("/get-books",  getAllBooks);
router.get("/get-books/:id",  getSingleBook);

router.delete("/delete/:id", auth, checkIfUserIsAdmin, useGuard(deleteBookGuard), deleteSingleBook);

module.exports = router;