-- AlterTable
ALTER TABLE "template_fields" ADD COLUMN     "placeholder" TEXT,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false;
