/*
  Warnings:

  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_news_id_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_reviews_id_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_news_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_reviews_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "likes";

-- CreateTable
CREATE TABLE "news_likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,

    CONSTRAINT "news_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews_likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reviews_id" TEXT NOT NULL,

    CONSTRAINT "reviews_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_bookmarks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,

    CONSTRAINT "news_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews_bookmarks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reviews_id" TEXT NOT NULL,

    CONSTRAINT "reviews_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_likes_user_id_news_id_key" ON "news_likes"("user_id", "news_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_likes_user_id_reviews_id_key" ON "reviews_likes"("user_id", "reviews_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_bookmarks_user_id_news_id_key" ON "news_bookmarks"("user_id", "news_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_bookmarks_user_id_reviews_id_key" ON "reviews_bookmarks"("user_id", "reviews_id");

-- AddForeignKey
ALTER TABLE "news_likes" ADD CONSTRAINT "news_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_likes" ADD CONSTRAINT "news_likes_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_likes" ADD CONSTRAINT "reviews_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_likes" ADD CONSTRAINT "reviews_likes_reviews_id_fkey" FOREIGN KEY ("reviews_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_bookmarks" ADD CONSTRAINT "news_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_bookmarks" ADD CONSTRAINT "news_bookmarks_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_bookmarks" ADD CONSTRAINT "reviews_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_bookmarks" ADD CONSTRAINT "reviews_bookmarks_reviews_id_fkey" FOREIGN KEY ("reviews_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
