const router = require("express").Router();
const { userRegister, adminRegister, userLogin, adminLogin, updatedUser, deleteUser } = require("../controllers/userController")
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
//TODO: use the checkUser middleware to verify if the user can perform the action or operation i.e authorization. You dont want an app where a fellow user can delete another user account.
router.put("/updateduser/:id", updatedUser) //TODO: Authorize this
router.delete("/deleteuser/:id", deleteUser) //TODO: Authorize this
module.exports = router;
