/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceNo]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_invoiceId_fkey`;

-- AlterTable
ALTER TABLE `invoice` MODIFY `website` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `invoiceId`,
    ADD COLUMN `invoiceNo` VARCHAR(191) NULL,
    MODIFY `total` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_invoiceNo_key` ON `Invoice`(`invoiceNo`);

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_invoiceNo_fkey` FOREIGN KEY (`invoiceNo`) REFERENCES `Invoice`(`invoiceNo`) ON DELETE SET NULL ON UPDATE CASCADE;
