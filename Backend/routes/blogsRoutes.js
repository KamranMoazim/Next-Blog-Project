const express = require("express");
const router = express.Router();
const { time } = require("../controllers/blogsControllers")

router.get("/", time);

module.exports = router;