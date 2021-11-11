
const router = require("express").Router()

const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");
const { createBook, getAllBooks, deleteSingleBook, getAllBooksPagination, getSingleBook, updateBook, searchAll } = require("./bookContoller")
const { createBookGuard, deleteBookGuard, updateBookGuard } = require("./bookGuard");
const { checkIfUserIsAdmin } = require('../../middleware/auth.guard')

router.post("/create", requireAuth, checkIfUserIsAdmin, createBookGuard, createBook);
router.patch("/update/:id", useGuard(updateBookGuard), updateBook);

router.get("/get-books", getAllBooksPagination);
router.get('/search-books', searchAll)
router.get("/get-books/:id", getSingleBook);

router.delete("/delete/:id", requireAuth, checkIfUserIsAdmin, useGuard(deleteBookGuard), deleteSingleBook);

module.exports = router;






