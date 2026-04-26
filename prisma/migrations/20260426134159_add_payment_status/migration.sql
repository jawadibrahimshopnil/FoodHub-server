-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('COD', 'PENDING', 'PAID');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'COD';
