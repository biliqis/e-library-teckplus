
const router = require("express").Router();
const { userRegister,adminRegister, userLogin,adminLogin,updatedUser, deleteUser } = require("../controllers/userController")
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.put("/updateduser/:id", updatedUser)
router.delete("/deleteuser/:id", deleteUser)
module.exports = router;

