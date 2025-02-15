/*
  Warnings:

  - Added the required column `main_image` to the `specification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "specification" ADD COLUMN     "main_image" TEXT NOT NULL;
