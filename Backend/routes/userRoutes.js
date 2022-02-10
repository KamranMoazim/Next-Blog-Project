const express = require("express");
const router = express.Router();

const { requireSignin, authMiddleware } = require("../controllers/authControllers")
const { read, publicProfile, update } = require("../controllers/userController")


router.get("/profile", requireSignin, authMiddleware, read);
router.get("/profile/:username", publicProfile);
router.put("/profile/update", requireSignin, authMiddleware, update);
// router.get("/profile/photo/:username", photo);



module.exports = router;