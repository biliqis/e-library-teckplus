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
const { userSignUpGuard, userEmailExists, userloginGuard, bodyValidate, userIdExists } = require("./userGuard");

router.post(
	"/user/sign-up",

	// TODO: write a custom middleware called useValidator that should take the validator schema and return only the first error 
	userValidation.SignUp(),
	useGuard(bodyValidate),
	useGuard(userEmailExists),
	userSignUp
);

router.post("/user/login", userValidation.login(), useGuard(userloginGuard), userLogin);
//router.get("/user/test", userValidation.login(), test);
//router.post("/admin/sign-up", signUpValidator, adminSignUp);
//router.post("/admin/login", AdminloginValidator, adminLogin);
router.put("/update-user/:id", requireAuth, useGuard(userIdExists), updateUser);
router.delete("/delete-user/:id", requireAuth, useGuard(userIdExists),
	deleteUser);
module.exports = router;
