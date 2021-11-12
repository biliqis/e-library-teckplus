const router = require("express").Router();
const userController  = require("./userController")
const { requireAuth } = require("../../middleware/auth.guard");
// const {handleDuplicateError} = require('../../helper/error')
const { signUpValidator, loginValidator, } = require("../../middleware/validator");
const userValidation = require("./userValidation");	
const { useGuard } = require("../../middleware/guard");
const { userSignUpGuard, userEmailExists, userloginGuard, bodyValidate, userIdExists } = require("./userGuard");
router.post("/user/sign-up", userValidation.SignUp(), useGuard(bodyValidate), useGuard(userEmailExists),userController.userSignUp);
// TODO: write a custom middleware called useValidator that should take the validator schema and return only the first error 
router.post("/user/login", userValidation.login(), useGuard(userloginGuard), userController.userLogin);
router.put("/update-user/:id", requireAuth, useGuard(userIdExists), userController.updateUser);
router.delete("/delete-user/:id", requireAuth, useGuard(userIdExists),	userController.deleteUser);

module.exports = router;
