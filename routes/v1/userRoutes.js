const router = require("express").Router();
const {
	userSignUp,
	adminSignUp,
	userLogin,
	adminLogin,
	updateUser,
	deleteUser,
} = require("../../controllers/userController");
const { requireAuth } = require("../../middleware/authMiddleware");
const { signUpValidator, loginValidator, AdminloginValidator } = require("../../middleware/validator");


router.post("/user/sign-up", signUpValidator, userSignUp);
router.post("/user/login",loginValidator, userLogin);
router.post("/admin/sign-up",signUpValidator, adminSignUp);
router.post("/admin/login", AdminloginValidator, adminLogin);
router.patch("/update-user/:id", requireAuth, updateUser);
router.delete("/delete-user/:id", requireAuth, deleteUser);
module.exports = router;
