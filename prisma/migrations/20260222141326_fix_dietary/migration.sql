-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "cuisine" TEXT NOT NULL DEFAULT 'Unknown';

-- CreateTable
CREATE TABLE "Dietary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dietary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_dietaries" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "dietaryId" TEXT NOT NULL,

    CONSTRAINT "meal_dietaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dietary_name_key" ON "Dietary"("name");

-- AddForeignKey
ALTER TABLE "meal_dietaries" ADD CONSTRAINT "meal_dietaries_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_dietaries" ADD CONSTRAINT "meal_dietaries_dietaryId_fkey" FOREIGN KEY ("dietaryId") REFERENCES "Dietary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
