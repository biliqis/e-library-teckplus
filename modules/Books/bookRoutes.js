// const router = require("express").Router();
// const {CreateBook,updateBook } = require('./bookContoller')

// router.post('/books/add-book',CreateBook)
// router.put('/books/update-books/:id',updateBook)
// module.exports = router

const router = require("express").Router()
const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");
const { createBook, getAllBooks, deleteSingleBook, getSingleBook, updateBook } = require("./bookContoller")
const { createBookGuard, deleteBookGuard, updateBookGuard, checkIfUserIsAdmin } = require("./bookGuard");

router.post("/create", requireAuth, useGuard(createBookGuard), createBook);
router.patch("/update/:id", useGuard(updateBookGuard), updateBook);

router.get("/get-books",  getAllBooks);
router.get("/get-books/:id",  getSingleBook);

router.delete("/delete/:id", useGuard, checkIfUserIsAdmin, useGuard(deleteBookGuard), deleteSingleBook);

module.exports = router;







// const router = require("express").Router();
// const {
// 	userSignUp,
// 	adminSignUp,
// 	userLogin,
// 	adminLogin,
// 	updateUser,
// 	deleteUser,
// 	test,
// 	UserController,
// } = require("./userController");
// const { requireAuth } = require("../../middleware/auth.guard");
// const {
// 	signUpValidator,
// 	loginValidator,
// 	AdminloginValidator,
// } = require("../../middleware/validator");

// const userValidation = require("./userValidation");
// const { useGuard } = require("../../middleware/guard");
// const { userSignUpGuard, userEmailExists, userloginGuard, bodyValidate, userIdExists } = require("./userGuard");

// router.post(
// 	"/user/sign-up",
// 	userValidation.SignUp(),
// 	useGuard(bodyValidate),
// 	useGuard(userEmailExists),
// 	userSignUp
// );
// router.post("/user/login", userValidation.login(), useGuard(userloginGuard), userLogin);
// //router.get("/user/test", userValidation.login(), test);
// //router.post("/admin/sign-up", signUpValidator, adminSignUp);
// //router.post("/admin/login", AdminloginValidator, adminLogin);
// router.put("/update-user/:id", requireAuth, useGuard(userIdExists), updateUser);
// router.delete("/delete-user/:id", requireAuth, useGuard(userIdExists),
// 	deleteUser);
// module.exports = router;
