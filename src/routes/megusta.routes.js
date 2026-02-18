const express = require("express");
const router = express.Router();
const controller = require("../controllers/megusta.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/publicaciones/:id/like", auth, controller.toggle);

module.exports = router;
