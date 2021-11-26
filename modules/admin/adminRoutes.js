const router = require ("express").Router();
const { requireAuth, checkIfUserIsAdmin } = require("../../middleware/auth.guard");
const { useBodyValidator, useQueryValidator } = require("./bodyValidator");
const AdminBorrowingGuard = require("./adminGuard");
const {useGuard} = require("../../middleware/guard")
const  AdminController = require ("../admin/adminController")

router.get("/single-request/:borrowedId",requireAuth, useGuard(AdminBorrowingGuard.checkIfBorrowingExistGuard),AdminController.getSingleRequest);
router.put("/approve-book-borrowing/:borrowedId", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin),AdminController.approveBookBorrowing)
module.exports = router;