/*
  Warnings:

  - Added the required column `deliver_at` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "deliver_at" TIMESTAMP(3) NOT NULL;
