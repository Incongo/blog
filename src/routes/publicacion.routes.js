const express = require("express");
const router = express.Router();

const publicacionController = require("../controllers/publicacion.controller");
const auth = require("../middlewares/auth.middleware");

// Listar
router.get("/publicaciones", publicacionController.listar);

// Crear
router.get("/publicaciones/crear", auth, publicacionController.crearForm);
router.post("/publicaciones/crear", auth, publicacionController.crear);

// Detalle
router.get("/publicaciones/:id", publicacionController.detalle);

// Editar
router.get("/publicaciones/:id/editar", auth, publicacionController.editarForm);
router.post("/publicaciones/:id/editar", auth, publicacionController.editar);

// Eliminar
router.post(
  "/publicaciones/:id/eliminar",
  auth,
  publicacionController.eliminar,
);

router.post("/publicaciones/:id/like", auth, publicacionController.togglelike);

module.exports = router;
