const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authControllers")

// validators
const { userSignupValidator, userSigninValidator } = require("../validators/authValidator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);

module.exports = router;