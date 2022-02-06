const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/authControllers")

// validators
const { userSignupValidator, userSigninValidator } = require("../validators/authValidator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);
router.get("/signout", signout);

// testing
// router.get("/secret", (req, res)=>{
//     res.json({
//         message: "You have access to secret page"
//     })
// })

module.exports = router;