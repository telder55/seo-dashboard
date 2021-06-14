const router = require("express").Router();
const userRoutes = require("./users");
const { authPerson } = require("../../controllers/authController");
const {
  redirectFunction,
  exchangeFunc,
  getRefresh,
} = require("../../controllers/gscController");

// User Routes
router.use("/users", userRoutes);

//Auth Route
router.post("/auth", authPerson);

// Get redirect URL
router.get("/redirect", redirectFunction);

// Exchange Code for Token
router.post("/exchange", exchangeFunc);

// Get Search Data
router.post("/search", getRefresh);

module.exports = router;
