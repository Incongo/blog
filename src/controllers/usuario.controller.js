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
    const id = req.session.user.id;

    const { nombre, biografia } = req.body;

    let data = { nombre, biografia };

    // Si hay foto nueva, añadirla
    if (req.file) {
      data.foto_perfil = "/uploads/" + req.file.filename;
    }

    await prisma.usuario.update({
      where: { id_usuario: id },
      data,
    });

    res.redirect("/usuario/" + id);
  },
};
