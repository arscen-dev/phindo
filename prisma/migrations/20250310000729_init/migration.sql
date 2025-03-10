-- CreateTable
CREATE TABLE "User" (
    "sid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phoneNumber" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("sid")
);
