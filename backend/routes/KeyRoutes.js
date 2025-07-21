const express = require("express");
const router = express.Router();
const {
  getkey,
  addkey,
  updatekey,
  deletekey,
} = require("../controllers/KeyControllers");
const protect = require("../middleware/AuthMiddleware");

router.get("/getkey", getkey);
router.post("/addkey", protect, addkey);
router.put("/updatekey/:id", protect, updatekey);
router.delete("/deletekey/:id", protect, deletekey);

module.exports = router;
