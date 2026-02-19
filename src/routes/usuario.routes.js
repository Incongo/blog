const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

router.get("/register", usuarioController.registerForm);
router.post("/register", usuarioController.register);

router.get("/usuario/editar", auth, usuarioController.formEditar);
router.post(
  "/usuario/editar",
  auth,
  upload.single("foto"),
  usuarioController.editar,
);

module.exports = router;
