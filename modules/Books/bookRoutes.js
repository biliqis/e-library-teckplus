
const router = require("express").Router()
const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");
const {useBodyValidator, useQueryValidator } = require("./bodyValidator")
const bookContoller = require ("../Books/bookContoller")
const bookGuard = require("./bookGuard")
const {booksValidator} = require("./bookValidator")
//const { checkIfUserIsAdmin } = require('../../middleware/auth.guard')
//const { createBook, getAllBooks, deleteSingleBook, getAllBooksPagination, getSingleBook, updateBook, searchAll } = require("./bookContoller")
//const { createBookGuard, deleteBookGuard, updateBookGuard } = require("./bookGuard");
// const bookGuard = require("./bookGuard")
 const checkIfUserIsAdmin = require('../../middleware/auth.guard');
const bookController = require("../Books/bookContoller");
router.post("/create",requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.createBookValidator), useGuard(bookGuard.createBookGuard), bookContoller.createBook);
router.patch("/update/:id", requireAuth,  useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.editUserValidator), useGuard(bookGuard.updateBookGuard), bookController.updateBook);
router.get("/get-books", bookController.getAllBooksPagination);
router.get('/search-books', bookController.searchAll)
router.get("/get-books/:id", bookController.getSingleBook);

router.delete("/delete/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), bookGuard.deleteBookGuard,bookContoller.deleteSingleBook);

module.exports = router;






