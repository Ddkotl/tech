/*
  Warnings:

  - You are about to drop the `news_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "news_likes" DROP CONSTRAINT "news_likes_news_id_fkey";

-- DropForeignKey
ALTER TABLE "news_likes" DROP CONSTRAINT "news_likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews_likes" DROP CONSTRAINT "reviews_likes_reviews_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews_likes" DROP CONSTRAINT "reviews_likes_user_id_fkey";

-- DropTable
DROP TABLE "news_likes";

-- DropTable
DROP TABLE "reviews_likes";
