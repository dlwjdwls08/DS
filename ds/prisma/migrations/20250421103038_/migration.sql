/*
  Warnings:

  - You are about to drop the column `end` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `date` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "end",
DROP COLUMN "reason",
DROP COLUMN "start",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
