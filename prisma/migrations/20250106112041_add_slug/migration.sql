/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_slug_key" ON "reviews"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");
