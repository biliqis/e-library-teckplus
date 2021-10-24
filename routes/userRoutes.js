const router = require("express").Router();
const { userSignUp, adminSignUp, userLogin, adminLogin, updateUser, deleteUser} = require("../controllers/userController")
const { requireAuth } = require('../middleware/authMiddleware')
router.post("/SignUp", userSignUp);
router.post("/login", userLogin);
router.post("/admin/SignUp", adminSignUp);
router.post("/admin/login", adminLogin);
router.put("/updateuser/:id", requireAuth, updateUser)
router.delete("/deleteuser/:id", requireAuth, deleteUser)
module.exports = router;
