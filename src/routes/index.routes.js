const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const ultimas = await prisma.publicacion.findMany({
      orderBy: { fecha_publicacion: "desc" },
      take: 3,
      include: { usuario: true },
    });

    res.render("index", {
      title: "Inicio",
      user: req.session.user,
      ultimas,
    });
  } catch (error) {
    console.error("Error cargando index:", error);

    res.render("index", {
      title: "Inicio",
      user: req.session.user,
      ultimas: [],
    });
  }
});

module.exports = router;
