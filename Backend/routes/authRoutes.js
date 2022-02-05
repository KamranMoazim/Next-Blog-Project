const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/authControllers")

// validators
const { userSignupValidator } = require("../validators/authValidator");

router.post("/signup", userSignupValidator, signup);

module.exports = router;