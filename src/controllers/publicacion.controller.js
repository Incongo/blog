const prisma = require("../models/prisma");

module.exports = {
  // LISTAR TODAS
  async listar(req, res) {
    const publicaciones = await prisma.publicacion.findMany({
      include: {
        usuario: true,
        categoria: true,
      },
      orderBy: { id_publicacion: "desc" },
    });

    res.render("publicaciones/lista", { publicaciones });
  },

  // FORMULARIO CREAR
  async crearForm(req, res) {
    const categorias = await prisma.categoria.findMany();
    res.render("publicaciones/crear", { categorias });
  },

  // CREAR PUBLICACIÓN
  async crear(req, res) {
    const { titulo, contenido, categoria } = req.body;

    await prisma.publicacion.create({
      data: {
        titulo,
        contenido,
        id_usuario: req.session.user.id,
        id_categoria: categoria ? Number(categoria) : null,
      },
    });

    res.redirect("/publicaciones");
  },

  // DETALLE
  async detalle(req, res) {
    const id = Number(req.params.id);

    const publicacion = await prisma.publicacion.findUnique({
      where: { id_publicacion: id },
      include: {
        usuario: true,
        categoria: true,
        megusta_publicacion: true,
        comentario: {
          where: { id_comentario_padre: null }, // solo comentarios raíz
          include: {
            usuario: true,
            other_comentario: {
              // respuestas nivel 1
              include: {
                usuario: true,
                other_comentario: {
                  // respuestas nivel 2
                  include: { usuario: true },
                },
              },
            },
          },
          orderBy: { fecha_comentario: "desc" },
        },
      },
    });

    if (!publicacion) return res.status(404).send("Publicación no encontrada");

    // 🔥 MAPEAR other_comentario → respuestas (lo que tu vista espera)
    function mapRespuestas(c) {
      return {
        ...c,
        respuestas: Array.isArray(c.other_comentario)
          ? c.other_comentario.map(mapRespuestas)
          : [],
      };
    }

    publicacion.comentario = publicacion.comentario.map(mapRespuestas);

    res.render("publicaciones/detalle", {
      publicacion,
      user: req.session.user,
    });
  },

  // FORMULARIO EDITAR
  async editarForm(req, res) {
    const id = Number(req.params.id);
    //Solo puedo editar si soy el autor de la publicación
    const publicacion = await prisma.publicacion.findUnique({
      where: { id_publicacion: id },
    });

    if (!publicacion) return res.status(404).send("Publicación no encontrada");
    if (publicacion.id_usuario !== req.session.user.id) {
      //Redireccionar a ver todas las publicaciones en vez de mostrar un error
      return res.redirect("/publicaciones");
    }

    const categorias = await prisma.categoria.findMany();

    res.render("publicaciones/editar", { publicacion, categorias });
  },

  // EDITAR
  async editar(req, res) {
    const id = Number(req.params.id);
    const { titulo, contenido, categoria } = req.body;

    await prisma.publicacion.update({
      where: { id_publicacion: id },
      data: {
        titulo,
        contenido,
        id_categoria: categoria ? Number(categoria) : null,
      },
    });

    res.redirect("/publicaciones/" + id);
  },

  // ELIMINAR
  async eliminar(req, res) {
    const id = Number(req.params.id);
    //Comporbar que soy el autor de la publicación antes de eliminarla
    const publicacion = await prisma.publicacion.findUnique({
      where: { id_publicacion: id },
    });
    if (!publicacion) {
      return res.status(404).send("Publicación no encontrada");
    }
    if (publicacion.id_usuario !== req.session.user.id) {
      return res.redirect("/publicaciones");
    }

    await prisma.publicacion.delete({
      where: { id_publicacion: id },
    });

    res.redirect("/publicaciones");
  },

  // VER PERFIL
  async verPerfil(req, res) {
    const id = Number(req.params.id);

    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: {
        usuario_telefono: true,
        publicacion: {
          include: { megusta_publicacion: true },
        },
        comentario: {
          include: { publicacion: true },
        },
        seguimiento_seguimiento_id_seguidoTousuario: true, // seguidores
        seguimiento_seguimiento_id_seguidorTousuario: true, // siguiendo
      },
    });

    if (!usuario) return res.status(404).send("Usuario no encontrado");

    const esPropietario = req.session.user && req.session.user.id === id;

    // Likes recibidos
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

  async togglelike(req, res) {
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
