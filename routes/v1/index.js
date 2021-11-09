const router = require("express").Router();
const userRoutes = require("../../modules/user/userRoutes");
const bookRoutes = require('../../modules/Books/bookRoutes')
const booksBorrowing = require("../../modules/booksBorrowing/borrowingRoutes")
router.use("/api/v1", userRoutes);
router.use("/api/v1/book", bookRoutes);
router.use("/api/v1/books-borrowing", booksBorrowing);
//const bookRoutes = require('../../modules/Books/bookRoutes')
//router.use("/api/v1", bookRoutes);

module.exports = router;
