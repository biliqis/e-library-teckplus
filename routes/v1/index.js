const router = require("express").Router();

const userRoutes = require("./userRoutes");

router.use("/api/v1", userRoutes);

module.exports = router;
