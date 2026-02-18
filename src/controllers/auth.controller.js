const prisma = require("../models/prisma");
const bcrypt = require("bcrypt");

module.exports = {
  loginForm(req, res) {
    res.render("login");
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).send("Usuario no encontrado");
      }

      // Comparar contraseña con el hash
      const passwordMatch = await bcrypt.compare(password, user.contrase_a);

      if (!passwordMatch) {
        return res.status(401).send("Contraseña incorrecta");
      }

      // Guardar sesión
      req.session.user = {
        id: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        logged: true,
      };

      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).send("Error al iniciar sesión");
    }
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect("/"));
  },
};
