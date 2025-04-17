-- CreateTable
CREATE TABLE "Memo" (
    "id" SERIAL NOT NULL,
    "studentID" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memo_pkey" PRIMARY KEY ("id")
);
