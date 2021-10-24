const router = require("express").Router();
const { userRegister, adminRegister, userLogin, adminLogin, updatedUser, deleteUser } = require("../controllers/userController")
const {requireAuth} = require('../middleware/authMiddleware')

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
//TODO: use the checkUser middleware to verify if the user can perform the action or operation i.e authorization. You dont want an app where a fellow user can delete another user account.
router.put("/updateduser/:id",requireAuth,updatedUser) //TODO: Authorize this
router.delete("/deleteuser/:id", requireAuth, deleteUser) //TODO: Authorize this
//router.put("/updatedAdmin/:id",requireAdminAuth, updatedAdmin)
//router.delete("/deleteAdmin/:id",requireAdminAuth, deleteAdmin)
module.exports = router;
