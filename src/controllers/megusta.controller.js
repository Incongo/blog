const prisma = require("../models/prisma");

module.exports = {
  // ---------------------------------------------------------
  // TOGGLE DE ME GUSTA EN PUBLICACIONES
  // ---------------------------------------------------------
  // Este método se ejecuta cuando el usuario pulsa el botón
  // "Me gusta" en una publicación.
  //
  // Si el usuario YA había dado like → se elimina.
  // Si NO lo había dado → se crea.
  //
  // Después redirige SIEMPRE a la publicación original.
  // ---------------------------------------------------------
  async toggle(req, res) {
    // ID de la publicación desde la URL
    const id_publicacion = Number(req.params.id);

    // ID del usuario desde la sesión
    const id_usuario = req.session.user.id;

    // ---------------------------------------------------------
    // 1. Comprobar si el usuario YA ha dado like a esta publicación
    // ---------------------------------------------------------
    const existing = await prisma.megusta_publicacion.findUnique({
      where: {
        id_usuario_id_publicacion: {
          id_usuario,
          id_publicacion,
        },
      },
    });

    // ---------------------------------------------------------
    // 2. Si existe → quitar like
    // ---------------------------------------------------------
    if (existing) {
      await prisma.megusta_publicacion.delete({
        where: {
          id_usuario_id_publicacion: {
            id_usuario,
            id_publicacion,
          },
        },
      });
    }
    // ---------------------------------------------------------
    // 3. Si NO existe → dar like
    // ---------------------------------------------------------
    else {
      await prisma.megusta_publicacion.create({
        data: {
          id_usuario,
          id_publicacion,
        },
      });
    }

    // ---------------------------------------------------------
    // 4. Redirigir SIEMPRE a la publicación original
    //    (evita el error "Cannot GET /back")
    // ---------------------------------------------------------
    res.redirect("/publicaciones/" + id_publicacion);
  },
};
