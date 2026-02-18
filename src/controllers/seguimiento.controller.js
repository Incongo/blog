const prisma = require("../models/prisma");

module.exports = {
  async toggle(req, res) {
    const id_seguido = Number(req.params.id); // el perfil que estoy viendo
    const id_seguidor = req.session.user.id; // yo (usuario logueado)

    // No tiene sentido seguirse a uno mismo
    if (id_seguido === id_seguidor) {
      return res.redirect("/usuario/" + id_seguido);
    }

    // ¿Ya lo sigo?
    const existing = await prisma.seguimiento.findUnique({
      where: {
        id_seguidor_id_seguido: {
          id_seguidor,
          id_seguido,
        },
      },
    });

    if (existing) {
      // Si ya lo sigo → dejar de seguir
      await prisma.seguimiento.delete({
        where: {
          id_seguidor_id_seguido: {
            id_seguidor,
            id_seguido,
          },
        },
      });
    } else {
      // Si no lo sigo → empezar a seguir
      await prisma.seguimiento.create({
        data: {
          id_seguidor,
          id_seguido,
        },
      });
    }

    res.redirect("/usuario/" + id_seguido);
  },
};
