const express = require("express");
const router = express.Router();

const { create, list, read, remove } = require("../controllers/categoryController")
const { requireSignin, adminMiddleware } = require("../controllers/authControllers")

// validators
const { categoryValidator } = require("../validators/categoryValidator");

router.post("/category", categoryValidator, requireSignin, adminMiddleware, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;