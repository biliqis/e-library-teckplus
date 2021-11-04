
const router = require("express").Router()
const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");
const { createBook, getAllBooks, deleteSingleBook, getSingleBook, updateBook } = require("./bookContoller")
const { createBookGuard, deleteBookGuard, updateBookGuard, checkIfUserIsAdmin } = require("./bookGuard");

router.post("/create", useGuard(createBookGuard), createBook);
router.patch("/update/:id", useGuard(updateBookGuard), updateBook);

router.get("/get-books", getAllBooks);
router.get("/get-books/:id", getSingleBook);

router.delete("/delete/:id", useGuard, checkIfUserIsAdmin, useGuard(deleteBookGuard), deleteSingleBook);

module.exports = router;






