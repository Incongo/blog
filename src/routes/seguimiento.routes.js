const express = require("express");
const router = express.Router();
const controller = require("../controllers/seguimiento.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/usuario/:id/seguir", auth, controller.toggle);

module.exports = router;
