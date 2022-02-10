const { check } = require("express-validator");

exports.userSignupValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is Required."),
    check("email")
        .isEmail()
        .withMessage("Email must be Valid."),
    check("password")
        .isLength({min:6})
        .withMessage("Password must be of at least 6.")
        .isAlphanumeric()
        .withMessage("Password must contain Alphanumeric Characters."),
]

exports.userSigninValidator = [
    check("email")
        .isEmail()
        .withMessage("Email must be Valid."),
    check("password")
        .isLength({min:6})
        .withMessage("Password must be of at least 6.")
        .isAlphanumeric()
        .withMessage("Password must contain Alphanumeric Characters."),
]

exports.forgotPasswordValidator = [
    check("email")
        .isEmpty()
        .isEmail()
        .withMessage("Email is Required and must be Valid."),
]

exports.resetPasswordValidator = [
    check("newPassword")
        .isLength({min:6})
        .withMessage("Password must be of at least 6.")
        .isAlphanumeric()
        .withMessage("Password must contain Alphanumeric Characters."),
]