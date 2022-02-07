const express = require("express");
const router = express.Router();
const { signup, signin, signout, requireSignin } = require("../controllers/authControllers")

// validators
const { userSignupValidator, userSigninValidator } = require("../validators/authValidator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);
router.get("/signout", signout);

// testing
// router.get("/secret", requireSignin, (req, res)=>{
//     res.json({
//         user: req.user
//     })
// })

module.exports = router;