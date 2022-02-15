const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const userController = require("../controller/admin_controller");

router.post("/login", userController.loginUser);
router.delete("/documents/:id", auth, userController.deleteDocument);

module.exports = router;
