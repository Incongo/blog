# 📝 Blog Fullstack con Node.js, Express, Prisma y PostgreSQL

Este proyecto es una plataforma de blog completa donde los usuarios pueden crear publicaciones, comentar, dar “me gusta”, seguir a otros usuarios y personalizar su perfil.  
Incluye un diseño moderno oscuro + dorado, un backend robusto con Prisma ORM y una base de datos PostgreSQL en UTF‑8.

---

## 🚀 Características principales

### 👤 Sistema de usuarios
- Registro, login y logout  
- Perfiles públicos  
- Edición de perfil (nombre, biografía, foto)  
- Seguidores y seguidos  
- Estadísticas del usuario:
  - Likes recibidos  
  - Número de publicaciones  
  - Comentarios realizados  

---

### 📝 Publicaciones
- Crear publicaciones con:
  - Título  
  - Contenido  
  - Categoría  
  - Imagen opcional  
- Editar y eliminar publicaciones propias  
- Vista de detalle  
- Lista de publicaciones ordenadas por fecha  
- Vista previa del contenido  
- Miniatura de imagen en la lista  

---

### ❤️ Likes dinámicos
- Sistema toggle (like/unlike)  
- Actualización en tiempo real con fetch()  
- Contador sincronizado con la base de datos  
- Tabla intermedia megusta_publicacion con clave compuesta  

---

### 💬 Comentarios anidados
- Comentarios raíz y respuestas ilimitadas  
- Renderizado recursivo con EJS  
- Mapeo automático de other_comentario → respuestas  
- Formularios de respuesta dinámicos  
- Edición y eliminación de comentarios propios  

---

### 🖼️ Subida de imágenes
- Implementado con Multer  
- Almacenamiento en /public/uploads  
- Guardado de la ruta en la base de datos  
- Visualización en lista y detalle de publicaciones  

---

### 🗂️ Categorías
- Tabla categoria  
- Relación 1:N con publicaciones  
- Selector en creación y edición  
- Categorías iniciales recomendadas:
  - Tecnología  
  - Programación  
  - Videojuegos  
  - Cine y Series  
  - Música  
  - Arte y Diseño  
  - Fotografía  
  - Cocina  
  - Viajes  
  - Deportes  
  - Actualidad  
  - Opinión  
  - Educación  
  - Salud  
  - Humor  

---

## 🏗️ Tecnologías utilizadas

### Backend
- Node.js  
- Express  
- Prisma ORM  
- PostgreSQL  
- Multer  
- Bcrypt  
- Express-session  

### Frontend
- EJS  
- CSS personalizado (tema oscuro + dorado)  
- JavaScript para interacciones dinámicas  

---

## 📁 Estructura del proyecto

src/  
 ├── controllers/  
 ├── middlewares/  
 ├── models/ (Prisma)  
 ├── routes/  
 ├── views/  
 │    ├── publicaciones/  
 │    ├── usuario/  
 │    └── layout.ejs  
public/  
 ├── uploads/  
 ├── css/  
 └── img/  

---

## ⚙️ Instalación

### 1. Clonar el repositorio
git clone https://github.com/tuusuario/tu-repo.git  
cd tu-repo  

### 2. Instalar dependencias
npm install  

### 3. Configurar variables de entorno  
Crear un archivo `.env`:

DATABASE_URL="postgresql://usuario:password@localhost:5432/blog_utf8"  
SESSION_SECRET="loquesea"  

### 4. Ejecutar migraciones
npx prisma migrate dev  

### 5. Iniciar el servidor
npm start  

---

## 🧪 Funcionalidades destacadas
- Likes dinámicos sin recargar la página  
- Comentarios recursivos  
- Perfiles con estadísticas  
- Subida de imágenes  
- Sistema de categorías  
- Estilo visual consistente y moderno  

---

## 🛠️ Mejoras futuras
- Editor WYSIWYG  
- Notificaciones  
- Buscador avanzado  
- Modo oscuro/claro  
- Likes en comentarios  

---

## 📄 Licencia
Proyecto de uso libre para aprendizaje y desarrollo personal.
