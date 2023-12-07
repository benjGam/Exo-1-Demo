/*
  Warnings:

  - The primary key for the `Belong` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_UUID` on the `Belong` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_UUID,order_number]` on the table `Belong` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_number` to the `Belong` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Belong_product_UUID_order_UUID_key";

-- AlterTable
ALTER TABLE "Belong" DROP CONSTRAINT "Belong_pkey",
DROP COLUMN "order_UUID",
ADD COLUMN     "order_number" INTEGER NOT NULL,
ADD CONSTRAINT "Belong_pkey" PRIMARY KEY ("product_UUID", "order_number");

-- CreateIndex
CREATE UNIQUE INDEX "Belong_product_UUID_order_number_key" ON "Belong"("product_UUID", "order_number");

-- AddForeignKey
ALTER TABLE "Belong" ADD CONSTRAINT "products_uuid_fk" FOREIGN KEY ("product_UUID") REFERENCES "Products"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Belong" ADD CONSTRAINT "orders_uuid_fk" FOREIGN KEY ("order_number") REFERENCES "Orders"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
