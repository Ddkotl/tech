/*
  Warnings:

  - You are about to drop the column `created_at` on the `bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "created_at";
