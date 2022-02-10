const { check } = require("express-validator");

exports.formValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is Required."),
    check("email")
        .isEmail()
        .withMessage("Email is Required and Must be valid."),
    check("message")
        .not()
        .isEmpty()
        .isLength({min:20})
        .withMessage("Message is Required and Must be at least 20 characters."),
]
