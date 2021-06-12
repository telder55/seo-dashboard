const router = require("express").Router();
const userRoutes = require("./users");
const { authPerson } = require("../../controllers/authController");
const { redirectFunction } = require("../../controllers/redirect");

// User Routes
router.use("/users", userRoutes);

//Auth Route
router.post("/auth", authPerson);

// Get redirect URL
router.get("/redirect", redirectFunction);

module.exports = router;
