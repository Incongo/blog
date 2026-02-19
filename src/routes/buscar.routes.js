const express = require("express");
const router = express.Router();
const buscarController = require("../controllers/buscar.controller");
const auth = require("../middlewares/auth.middleware");

// Ver perfil de cualquier usuario
router.get("/buscar", buscarController.buscarTodo);

module.exports = router;
