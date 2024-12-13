/*
  Warnings:

  - You are about to drop the column `discount` on the `item_organizations` table. All the data in the column will be lost.
  - You are about to drop the column `discount_type` on the `item_organizations` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `item_organizations` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `item_organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item_organizations" DROP COLUMN "discount",
DROP COLUMN "discount_type",
DROP COLUMN "price",
DROP COLUMN "tax";
