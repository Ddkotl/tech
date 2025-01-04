/*
  Warnings:

  - You are about to drop the column `post_id` on the `bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,news_id,reviews_id]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,news_id,reviews_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `news_id` to the `bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews_id` to the `bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `news_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews_id` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_post_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_fkey";

-- DropIndex
DROP INDEX "bookmarks_user_id_post_id_key";

-- DropIndex
DROP INDEX "likes_user_id_post_id_key";

-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "post_id",
ADD COLUMN     "news_id" TEXT NOT NULL,
ADD COLUMN     "reviews_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "post_id",
ADD COLUMN     "news_id" TEXT NOT NULL,
ADD COLUMN     "reviews_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "preview_image" TEXT,
    "images" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "preview_image" TEXT,
    "images" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsParsedTitles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "NewsParsedTitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewsParsedTitles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ReviewsParsedTitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReviewsTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "news_title_key" ON "news"("title");

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "tags"("title");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_title_key" ON "reviews"("title");

-- CreateIndex
CREATE UNIQUE INDEX "NewsParsedTitles_title_key" ON "NewsParsedTitles"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewsParsedTitles_title_key" ON "ReviewsParsedTitles"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsTags_AB_unique" ON "_NewsTags"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsTags_B_index" ON "_NewsTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewsTags_AB_unique" ON "_ReviewsTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewsTags_B_index" ON "_ReviewsTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_user_id_news_id_reviews_id_key" ON "bookmarks"("user_id", "news_id", "reviews_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_news_id_reviews_id_key" ON "likes"("user_id", "news_id", "reviews_id");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_reviews_id_fkey" FOREIGN KEY ("reviews_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_reviews_id_fkey" FOREIGN KEY ("reviews_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsTags" ADD CONSTRAINT "_NewsTags_A_fkey" FOREIGN KEY ("A") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsTags" ADD CONSTRAINT "_NewsTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewsTags" ADD CONSTRAINT "_ReviewsTags_A_fkey" FOREIGN KEY ("A") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewsTags" ADD CONSTRAINT "_ReviewsTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
