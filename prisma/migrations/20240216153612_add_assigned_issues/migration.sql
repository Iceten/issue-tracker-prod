/*
  Warnings:

  - You are about to drop the `issuebis` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `issuebis`;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
