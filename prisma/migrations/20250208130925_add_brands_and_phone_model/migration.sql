-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phone_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "phone_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specification" (
    "id" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "thickness" INTEGER NOT NULL,
    "oc" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "screen_duim" INTEGER NOT NULL,
    "screen_px" TEXT NOT NULL,
    "camera_photo" TEXT NOT NULL,
    "camera_video" TEXT NOT NULL,
    "batary_capasity" TEXT NOT NULL,
    "charging" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "launch" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "display" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "camera" TEXT NOT NULL,
    "sounds" TEXT NOT NULL,
    "comms" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "batary" TEXT NOT NULL,
    "misk" TEXT NOT NULL,
    "tests" TEXT NOT NULL,
    "phoneModelId" TEXT NOT NULL,

    CONSTRAINT "specification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "phone_models_name_key" ON "phone_models"("name");

-- CreateIndex
CREATE UNIQUE INDEX "phone_models_slug_key" ON "phone_models"("slug");

-- AddForeignKey
ALTER TABLE "phone_models" ADD CONSTRAINT "phone_models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specification" ADD CONSTRAINT "specification_phoneModelId_fkey" FOREIGN KEY ("phoneModelId") REFERENCES "phone_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
