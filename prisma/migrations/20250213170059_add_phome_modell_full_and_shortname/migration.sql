/*
  Warnings:

  - You are about to drop the column `name` on the `phone_models` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_name]` on the table `phone_models` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[full_name]` on the table `phone_models` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `full_name` to the `phone_models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_name` to the `phone_models` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "phone_models_name_key";

-- AlterTable
ALTER TABLE "phone_models" DROP COLUMN "name",
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "short_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "phone_models_short_name_key" ON "phone_models"("short_name");

-- CreateIndex
CREATE UNIQUE INDEX "phone_models_full_name_key" ON "phone_models"("full_name");
