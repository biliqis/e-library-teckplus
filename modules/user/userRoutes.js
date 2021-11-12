const router = require("express").Router();
 const { useBodyValidator }= require("./bodyValidator");

 const  userValidation = require("./userValidation")
const BaseError = require("../../error/BaseError");
const userController  = require("./userController")
const { requireAuth } = require("../../middleware/auth.guard");
const { signUpValidator, loginValidator, } = require("../../middleware/validator");
const { useGuard } = require("../../middleware/guard");

const { userSignUpGuard, userEmailExists, userloginGuard, bodyValidate, userIdExists } = require("./userGuard");

router.post("/user/sign-up", useBodyValidator(userValidation.createUserValidator),useGuard(bodyValidate), useGuard(userEmailExists),userController.userSignUp);
// TODO: write a custom middleware called useValidator that should take the validator schema and return only the first error 
router.post("/user/login", useBodyValidator(userValidation.createUserValidator), useGuard(userloginGuard), userController.userLogin);
router.put("/update-user/:id", useBodyValidator(userValidation.createUserValidator),requireAuth, useGuard(userIdExists), userController.updateUser);
router.delete("/delete-user/:id", useBodyValidator(userValidation.createUserValidator),requireAuth, useGuard(userIdExists),	userController.deleteUser);

module.exports = router;
