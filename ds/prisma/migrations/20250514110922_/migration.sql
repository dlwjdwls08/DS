/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `TeacherName` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeacherName_date_key" ON "TeacherName"("date");
