/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "phoneNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "files" (
    "sid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "files_to_users" (
    "file_sid" TEXT NOT NULL,
    "user_sid" TEXT NOT NULL,

    CONSTRAINT "files_to_users_pkey" PRIMARY KEY ("file_sid","user_sid")
);

-- CreateTable
CREATE TABLE "templates" (
    "sid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "file_sid" TEXT NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "templates_to_users" (
    "template_sid" TEXT NOT NULL,
    "user_sid" TEXT NOT NULL,

    CONSTRAINT "templates_to_users_pkey" PRIMARY KEY ("template_sid","user_sid")
);

-- CreateTable
CREATE TABLE "template_roles" (
    "sid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'SENDER',
    "template_sid" TEXT NOT NULL,

    CONSTRAINT "template_roles_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "template_fields" (
    "sid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "template_sid" TEXT NOT NULL,
    "template_role_sid" TEXT NOT NULL,

    CONSTRAINT "template_fields_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
