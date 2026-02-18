const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfil.controller");
const auth = require("../middlewares/auth.middleware");

// Ver perfil de cualquier usuario
router.get("/usuario/:id", perfilController.verPerfil);

// Ver MI perfil (usuario logueado)
router.get("/perfil", auth, (req, res) => {
  const id = req.session.user.id;
  res.redirect("/usuario/" + id);
});

module.exports = router;
