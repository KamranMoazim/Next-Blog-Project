const express = require("express");
const router = express.Router();

const { create, list, read, remove } = require("../controllers/tagController")
const { requireSignin, adminMiddleware } = require("../controllers/authControllers")

// validators
const { tagValidator } = require("../validators/tagValidator");

router.post("/tag", tagValidator, requireSignin, adminMiddleware, create);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;