const express = require("express");
const router = express.Router();

const { createBlog } = require("../controllers/blogsControllers")
const {adminMiddleware, requireSignin} = require("../controllers/authControllers")

router.post("/blog", requireSignin, adminMiddleware, createBlog);

module.exports = router;