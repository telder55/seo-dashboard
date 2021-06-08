const router = require("express").Router();
const userRoutes = require("./users");
const { authPerson } = require("../../controllers/authController");

// User Routes
router.use("/users", userRoutes);

//Auth Route
router.post("/auth", authPerson);

module.exports = router;
