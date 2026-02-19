const prisma = require("../models/prisma");

exports.buscarTodo = async (req, res) => {
  const q = req.query.q || "";
  const tipo = req.query.tipo || "todo";
  const categoria = req.query.categoria || "todas";

  const contains = { contains: q, mode: "insensitive" };

  let usuarios = [];
  let publicaciones = [];
  let comentarios = [];

  // Usuarios
  if (tipo === "todo" || tipo === "usuarios") {
    usuarios = await prisma.usuario.findMany({
      where: { nombre: contains },
    });
  }

  // Publicaciones
  if (tipo === "todo" || tipo === "publicaciones") {
    publicaciones = await prisma.publicacion.findMany({
      where: {
        AND: [
          {
            OR: [{ titulo: contains }, { contenido: contains }],
          },
          categoria !== "todas" ? { id_categoria: Number(categoria) } : {},
        ],
      },
      include: {
        categoria: true,
        usuario: true,
        megusta_publicacion: true,
      },
    });
  }

  // Comentarios
  if (tipo === "todo" || tipo === "comentarios") {
    comentarios = await prisma.comentario.findMany({
      where: { texto: contains },
      include: {
        usuario: true,
        publicacion: true,
      },
    });
  }

  // Obtener categorías para el filtro
  const categorias = await prisma.categoria.findMany();

  res.render("buscar/resultados", {
    q,
    tipo,
    categoria,
    categorias,
    usuarios,
    publicaciones,
    comentarios,
  });
};
