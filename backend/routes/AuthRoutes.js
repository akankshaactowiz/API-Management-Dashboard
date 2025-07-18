const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  Adminsignup,
  Adminlogin,
} = require("../controllers/AuthController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/Adminsignup", Adminsignup);
router.post("/Adminlogin", Adminlogin);

module.exports = router;
