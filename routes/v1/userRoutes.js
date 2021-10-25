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
const { signUpValidator } = require("../../middleware/validator");

router.get("/test", (req, res) => {
	res.send("working fine");
});
router.post("/sign-up", signUpValidator, userSignUp);
router.post("/login", userLogin);
router.post("/admin/sign-up", adminSignUp);
router.post("/admin/login", adminLogin);
router.patch("/update-user/:id", requireAuth, updateUser);
router.delete("/delete-user/:id", requireAuth, deleteUser);
module.exports = router;
