const prisma = require("../models/prisma");

module.exports = {
  // Crear comentario
  async crear(req, res) {
    const { texto, id_publicacion, id_padre } = req.body;

    await prisma.comentario.create({
      data: {
        texto,
        id_publicacion: Number(id_publicacion),
        id_usuario: req.session.user.id,
        id_comentario_padre: id_padre ? Number(id_padre) : null,
      },
    });

    res.redirect("/publicaciones/" + id_publicacion);
  },

  // Formulario editar
  async editarForm(req, res) {
    const id = Number(req.params.id);

    const comentario = await prisma.comentario.findUnique({
      where: { id_comentario: id },
    });

    res.render("comentarios/editar", { comentario });
  },

  // Editar comentario
  async editar(req, res) {
    const id = Number(req.params.id);
    const { texto } = req.body;

    const comentario = await prisma.comentario.update({
      where: { id_comentario: id },
      data: { texto, fecha_edicion: new Date() },
    });

    res.redirect("/publicaciones/" + comentario.id_publicacion);
  },

  // Eliminar comentario
  async eliminar(req, res) {
    const id = Number(req.params.id);

    const comentario = await prisma.comentario.findUnique({
      where: { id_comentario: id },
    });

    await prisma.comentario.delete({
      where: { id_comentario: id },
    });

    res.redirect("/publicaciones/" + comentario.id_publicacion);
  },
};
