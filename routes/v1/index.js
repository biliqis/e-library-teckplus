const router = require("express").Router();

const userRoutes = require("./userRoutes");

router.use("/v1", userRoutes);

module.exports = router;
