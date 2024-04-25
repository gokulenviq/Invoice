/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `items` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_invoiceNo_fkey`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `items` JSON NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `total` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `item`;
