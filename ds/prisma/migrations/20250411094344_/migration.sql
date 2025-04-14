/*
  Warnings:

  - You are about to drop the column `classID` on the `ClassTeacher` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `NightClass` table. All the data in the column will be lost.
  - You are about to drop the column `classID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `LeaveList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class` to the `ClassTeacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `ClassTeacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `NightClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `NightClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassTeacher" DROP COLUMN "classID",
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "grade" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NightClass" DROP COLUMN "time",
ADD COLUMN     "end" INTEGER NOT NULL,
ADD COLUMN     "start" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "classID",
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "grade" INTEGER NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL;

-- DropTable
DROP TABLE "LeaveList";

-- CreateTable
CREATE TABLE "Leave" (
    "id" SERIAL NOT NULL,
    "studentID" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentID_key" ON "Student"("studentID");

-- AddForeignKey
ALTER TABLE "NightClass" ADD CONSTRAINT "NightClass_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
