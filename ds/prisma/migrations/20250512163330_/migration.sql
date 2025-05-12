/*
  Warnings:

  - You are about to drop the column `end` on the `NightClass` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `NightClass` table. All the data in the column will be lost.
  - Changed the type of `day` on the `NightClass` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "NightClass" DROP COLUMN "end",
DROP COLUMN "start",
DROP COLUMN "day",
ADD COLUMN     "day" INTEGER NOT NULL;
