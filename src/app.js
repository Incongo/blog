const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares globales
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Sesiones
app.use(
  session({
    secret: "mi_secreto_super_seguro",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 }, // 8 horas
  }),
);

// Variables globales para las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layout.ejs");

// Rutas
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/usuario.routes"));
app.use("/", require("./routes/dashboard.routes"));
app.use("/", require("./routes/publicacion.routes"));
app.use("/", require("./routes/comentario.routes"));
app.use("/", require("./routes/perfil.routes"));
app.use("/", require("./routes/seguimiento.routes"));
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/buscar.routes"));

// (Opcional) — ya tienes arriba el static, este no hace falta
// app.use(express.static("public"));

module.exports = app;
