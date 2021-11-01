const router = require("express").Router();
const {
	userSignUp,
	adminSignUp,
	userLogin,
	adminLogin,
	updateUser,
	deleteUser,
	test,
	UserController,
} = require("./userController");
const { requireAuth } = require("../../middleware/auth.guard");
const {
	signUpValidator,
	loginValidator,
	AdminloginValidator,
} = require("../../middleware/validator");

const userValidation = require("./userValidation");
const { useGuard } = require("../../middleware/guard");
const { userSignUpGuard, userEmailExists, userloginGuard } = require("./userGuard");

router.post(
	"/user/sign-up",
	userValidation.SignUp(),
	// useValidator(userValidation.SignUp()),
	useGuard(userSignUpGuard),
	// useGuard(userEmailExists),
	userSignUp
);
router.post("/user/login", userValidation.login(), useGuard(userloginGuard), userLogin);
router.get("/user/test", userValidation.login(), test);
router.post("/admin/sign-up", signUpValidator, adminSignUp);
router.post("/admin/login", AdminloginValidator, adminLogin);
router.patch("/update-user/:id", requireAuth, updateUser);
router.delete("/delete-user/:id", requireAuth, deleteUser);
module.exports = router;
