/*
  Warnings:

  - Changed the type of `end` on the `NightClass` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `start` on the `NightClass` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "NightClass" DROP COLUMN "end",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
DROP COLUMN "start",
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
