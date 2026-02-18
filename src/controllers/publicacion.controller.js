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
        megusta_publicacion: true, // 👈 AQUI SE AÑADE
        comentario: {
          where: { id_comentario_padre: null },
          include: {
            usuario: true,
            other_comentario: {
              include: { usuario: true },
            },
          },
        },
      },
    });

    if (!publicacion) return res.status(404).send("Publicación no encontrada");

    res.render("publicaciones/detalle", { publicacion });
  },

  // FORMULARIO EDITAR
  async editarForm(req, res) {
    const id = Number(req.params.id);

    const publicacion = await prisma.publicacion.findUnique({
      where: { id_publicacion: id },
    });

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
};
