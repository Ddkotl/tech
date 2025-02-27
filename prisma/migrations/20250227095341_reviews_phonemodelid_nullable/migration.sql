-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_phone_model_id_fkey";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "phone_model_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_phone_model_id_fkey" FOREIGN KEY ("phone_model_id") REFERENCES "phone_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;
