
const router = require("express").Router()
const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");

const { useBodyValidator, useQueryValidator } = require("./bodyValidator")
const bookContoller = require("../Books/bookContoller")
const bookGuard = require("./bookGuard")

const { booksValidator } = require("./bookValidator")
const upload = require('../../util/upload')
const {parser} = require("../../util/cloud")

const checkIfUserIsAdmin = require('../../middleware/auth.guard');
const bookController = require("../Books/bookContoller");


//router.post("/create", upload.single('image'), requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.createBookValidator), useGuard(bookGuard.createBookGuard), bookContoller.createBook);

router.post("/create", parser.single('image'), requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.createBookValidator), useGuard(bookGuard.createBookGuard), bookContoller.createBook);
router.patch("/update/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.editUserValidator), useGuard(bookGuard.updateBookGuard), bookController.updateBook);
router.get("/get-books", bookController.getAllBooksPagination);
router.get('/search-books', bookController.searchAll)
router.get("/get-books/:id", bookController.getSingleBook);
router.put("/approve-book/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), bookController.approveBook);
router.delete("/delete/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), bookGuard.deleteBookGuard, bookContoller.deleteSingleBook);

module.exports = router;






