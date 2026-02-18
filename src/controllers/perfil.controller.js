const prisma = require("../models/prisma");

module.exports = {
  async verPerfil(req, res) {
    const id = Number(req.params.id);

    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: {
        usuario_telefono: true,
        publicacion: {
          include: {
            categoria: true,
            megusta_publicacion: true,
          },
        },
        comentario: {
          include: {
            publicacion: true,
          },
        },
        seguimiento_seguimiento_id_seguidorTousuario: true,
        seguimiento_seguimiento_id_seguidoTousuario: true,
      },
    });

    if (!usuario) return res.status(404).send("Usuario no encontrado");

    const esPropietario = req.session.user && req.session.user.id === id;

    const likesRecibidos = usuario.publicacion.reduce((acc, pub) => {
      return acc + pub.megusta_publicacion.length;
    }, 0);

    res.render("usuario/perfil", {
      usuario,
      esPropietario,
      likesRecibidos,
      user: req.session.user,
    });
  },
};
