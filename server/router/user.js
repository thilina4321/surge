const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
const requireAuth = require("../middleware/auth");

// router
router.post("/signup", userController.singupUser);
router.post("/login", userController.loginUser);
router.get("/current-user/:id", requireAuth, userController.currentUser);
router.post("/update-user/:id", requireAuth, userController.updateUser);
router.post("/update-password/:id", requireAuth, userController.updatePassword);

module.exports = router;
