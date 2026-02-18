-- CreateTable
CREATE TABLE "categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "comentario" (
    "id_comentario" SERIAL NOT NULL,
    "id_publicacion" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "fecha_comentario" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_edicion" TIMESTAMP(6),
    "moderado" BOOLEAN DEFAULT false,
    "puntuacion" INTEGER DEFAULT 0,
    "id_comentario_padre" INTEGER,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id_comentario")
);

-- CreateTable
CREATE TABLE "etiqueta" (
    "id_etiqueta" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "etiqueta_pkey" PRIMARY KEY ("id_etiqueta")
);

-- CreateTable
CREATE TABLE "megusta_publicacion" (
    "id_usuario" INTEGER NOT NULL,
    "id_publicacion" INTEGER NOT NULL,
    "fecha_megusta" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "megusta_publicacion_pkey" PRIMARY KEY ("id_usuario","id_publicacion")
);

-- CreateTable
CREATE TABLE "publicacion" (
    "id_publicacion" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_publicacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6),
    "estado" VARCHAR(20),
    "id_categoria" INTEGER,

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("id_publicacion")
);

-- CreateTable
CREATE TABLE "publicacion_etiqueta" (
    "id_publicacion" INTEGER NOT NULL,
    "id_etiqueta" INTEGER NOT NULL,

    CONSTRAINT "publicacion_etiqueta_pkey" PRIMARY KEY ("id_publicacion","id_etiqueta")
);

-- CreateTable
CREATE TABLE "seguimiento" (
    "id_seguidor" INTEGER NOT NULL,
    "id_seguido" INTEGER NOT NULL,
    "fecha_seguimiento" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seguimiento_pkey" PRIMARY KEY ("id_seguidor","id_seguido")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "contraseña" VARCHAR(200) NOT NULL,
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN DEFAULT true,
    "biografia" TEXT,
    "foto_perfil" TEXT,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "usuario_telefono" (
    "id_telefono" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "telefono" VARCHAR(30) NOT NULL,

    CONSTRAINT "usuario_telefono_pkey" PRIMARY KEY ("id_telefono")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nombre_key" ON "categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "etiqueta_nombre_key" ON "etiqueta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_comentario_padre_fkey" FOREIGN KEY ("id_comentario_padre") REFERENCES "comentario"("id_comentario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_publicacion_fkey" FOREIGN KEY ("id_publicacion") REFERENCES "publicacion"("id_publicacion") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "megusta_publicacion" ADD CONSTRAINT "megusta_publicacion_id_publicacion_fkey" FOREIGN KEY ("id_publicacion") REFERENCES "publicacion"("id_publicacion") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "megusta_publicacion" ADD CONSTRAINT "megusta_publicacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion_etiqueta" ADD CONSTRAINT "publicacion_etiqueta_id_etiqueta_fkey" FOREIGN KEY ("id_etiqueta") REFERENCES "etiqueta"("id_etiqueta") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion_etiqueta" ADD CONSTRAINT "publicacion_etiqueta_id_publicacion_fkey" FOREIGN KEY ("id_publicacion") REFERENCES "publicacion"("id_publicacion") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimiento" ADD CONSTRAINT "seguimiento_id_seguido_fkey" FOREIGN KEY ("id_seguido") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimiento" ADD CONSTRAINT "seguimiento_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_telefono" ADD CONSTRAINT "usuario_telefono_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;
