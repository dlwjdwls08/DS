-- CreateTable
CREATE TABLE "TeacherName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherName_pkey" PRIMARY KEY ("id")
);
