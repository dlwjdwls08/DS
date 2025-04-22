import { Leave, Memo, NightClass, Student, AbsenceLog} from "@prisma/client"

export type StudentInfo = {
  student: Student,
  absence: AbsenceLog,
  memo: Memo[],
  leave: Leave,
  class: NightClass,
}
