/*
  Warnings:

  - You are about to drop the `Dietary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "meal_dietaries" DROP CONSTRAINT "meal_dietaries_dietaryId_fkey";

-- DropTable
DROP TABLE "Dietary";

-- CreateTable
CREATE TABLE "dietaries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "dietaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dietaries_name_key" ON "dietaries"("name");

-- AddForeignKey
ALTER TABLE "meal_dietaries" ADD CONSTRAINT "meal_dietaries_dietaryId_fkey" FOREIGN KEY ("dietaryId") REFERENCES "dietaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
