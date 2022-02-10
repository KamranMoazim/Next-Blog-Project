const express = require("express");
const router = express.Router();
const { contactForm, blogAuthorContactForm } = require("../controllers/formController")

// validators
const { formValidator } = require("../validators/formValidator");

router.post("/contact", formValidator, contactForm);
router.post("/contact-blog-author", formValidator, blogAuthorContactForm);


module.exports = router;