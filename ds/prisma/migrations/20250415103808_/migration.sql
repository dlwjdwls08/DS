/*
  Warnings:

  - You are about to drop the column `class` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `state` to the `AbsenceLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `NightClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AbsenceLog" ADD COLUMN     "state" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "studentName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NightClass" ADD COLUMN     "studentName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "class",
ADD COLUMN     "classNo" TEXT NOT NULL,
ADD COLUMN     "seat" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassTeacher";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "grade" INTEGER NOT NULL,
    "classNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_grade_classNo_key" ON "Teacher"("grade", "classNo");
