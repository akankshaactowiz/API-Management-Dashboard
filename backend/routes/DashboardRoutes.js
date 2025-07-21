const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/AuthController");
const protect = require("../middleware/AuthMiddleware");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
