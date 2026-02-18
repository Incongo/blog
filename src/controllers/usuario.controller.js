const prisma = require("../models/prisma");
const bcrypt = require("bcrypt");

module.exports = {
  registerForm(req, res) {
    res.render("register");
  },

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      // Generar hash seguro
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.usuario.create({
        data: {
          nombre: name,
          email,
          contrase_a: hashedPassword,
        },
      });

      req.session.user = {
        id: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        logged: true,
      };

      res.redirect("/dashboard");
    } catch (error) {
      console.error("ERROR COMPLETO REGISTRO:", error);
      return res.status(500).send(error.message);
    }
  },

  async formEditar(req, res) {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: req.session.user.id },
    });

    res.render("usuario/editar", { usuario });
  },

  async editar(req, res) {
    const { nombre, biografia } = req.body;

    await prisma.usuario.update({
      where: { id_usuario: req.session.user.id },
      data: { nombre, biografia },
    });

    res.redirect("/usuario/" + req.session.user.id);
  },

  async actualizarFoto(req, res) {
    if (!req.file) {
      return res.redirect("/usuario/" + req.session.user.id);
    }

    const ruta = "/uploads/" + req.file.filename;

    await prisma.usuario.update({
      where: { id_usuario: req.session.user.id },
      data: { foto_perfil: ruta },
    });

    res.redirect("/usuario/" + req.session.user.id);
  },
};
