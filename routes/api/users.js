const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/").post(usersController.create);

// Check if email is in database
router.route("/:email").get(usersController.findOne);

// Matches with "/api/books/:id"
router.route("/:id").put(usersController.update);

module.exports = router;
