-- CreateTable
CREATE TABLE "NightClass" (
    "id" SERIAL NOT NULL,
    "studentID" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "NightClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassTeacher" (
    "id" SERIAL NOT NULL,
    "classID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveList" (
    "id" SERIAL NOT NULL,
    "studentID" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbsenceLog" (
    "id" SERIAL NOT NULL,
    "studentID" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AbsenceLog_pkey" PRIMARY KEY ("id")
);
