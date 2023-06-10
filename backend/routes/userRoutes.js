const router = require("express").Router();
const userController = require("../controllers/userController");

// Signup API
router.post("/signup", userController.signup);

module.exports = router;
