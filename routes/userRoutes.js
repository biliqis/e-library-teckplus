const router = require("express").Router();
const {
	userRegister,
	userLogin,
	updatedUser,
	deleteUser,
} = require("../controllers/userController");
router.post("/register", userRegister);
router.post("/login", userLogin);
router.put("/updatedUser/:id", updatedUser); //REFACTOR: rename router to update/:id
router.delete("/deleteUser/:id", deleteUser); //REFACTOR: rename router to delete/:id
module.exports = router;
