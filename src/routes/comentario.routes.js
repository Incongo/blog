const express = require("express");
const router = express.Router();
const controller = require("../controllers/comentario.controller");
const auth = require("../middlewares/auth.middleware");

// Crear comentario
router.post("/comentarios/crear", auth, controller.crear);

// RESPONDER comentario (usa el mismo método)
router.post("/comentarios/responder", auth, controller.crear);

// Editar comentario
router.get("/comentarios/:id/editar", auth, controller.editarForm);
router.post("/comentarios/:id/editar", auth, controller.editar);

// Eliminar comentario
router.post("/comentarios/:id/eliminar", auth, controller.eliminar);

module.exports = router;
