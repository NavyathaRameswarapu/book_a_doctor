const express = require("express");

const {
  registerController,
  loginController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", (req, res, next) => {
  console.log("✅ Login route hit");
  next();
}, loginController);

module.exports = router;