const express = require("express");
const router = express.Router();
const { signup, signin, signout, requireSignin, forgotPassword, resetPassword, accountActivationSignup } = require("../controllers/authControllers")

// validators
const { userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require("../validators/authValidator");

router.post("/signup", userSignupValidator, signup);
router.post("/account-activation-signup", userSignupValidator, accountActivationSignup);
router.post("/signin", userSigninValidator, signin);
router.get("/signout", signout);
router.put("/forgot-password", resetPasswordValidator, resetPassword);
router.put("/reset-password", forgotPasswordValidator, forgotPassword);
router.post("/google-signin", googleSignin);

// testing
// router.get("/secret", requireSignin, (req, res)=>{
//     res.json({
//         user: req.user
//     })
// })

module.exports = router;