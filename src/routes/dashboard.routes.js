const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Solo usuarios logueados pueden entrar
router.get("/dashboard", authMiddleware, dashboardController.dashboard);

module.exports = router;
