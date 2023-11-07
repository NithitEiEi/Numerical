/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "roe" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "equation" TEXT NOT NULL,

    CONSTRAINT "roe_pkey" PRIMARY KEY ("id")
);
