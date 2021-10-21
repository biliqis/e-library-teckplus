
const router = require("express").Router();
const { userRegister, userLogin, updatedUser, deleteUser } = require("../controllers/userController")
router.post("/register", userRegister);
router.post("/login", userLogin);
router.put("/updatedUser/:id", updatedUser)
router.delete("/deleteUser/:id", deleteUser)
module.exports = router;

