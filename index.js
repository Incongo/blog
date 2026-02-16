const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
require("dotenv").config();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Permite leer datos enviados desde formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configurar sesiones
app.use(
  session({
    secret: "mi_secreto_super_seguro", // cámbialo por algo más fuerte
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  }),
);

// Middleware para que TODAS las vistas tengan acceso a req.session.user
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Rutas GET que renderizan plantillas EJS
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Ruta POST para login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Aquí normalmente validarías el usuario en la base de datos

  // Guardamos datos en la sesión
  req.session.user = {
    email: email,
    logged: true,
  };

  res.json({
    ok: true,
    message: "Login correcto, sesión iniciada",
    session: req.session.user,
  });
});

// Ruta POST para registro
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    ok: true,
    message: "Registro recibido correctamente",
    data: { name, email, password },
  });
});

// Cerrar sesión
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
