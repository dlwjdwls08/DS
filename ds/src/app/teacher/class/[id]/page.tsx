'use client'

import Hyungsul from "@/components/classtype/hyungsul"
import EOZ from "@/components/classtype/eoz"
import Chang3 from "@/components/classtype/chang3"
import Library from "@/components/classtype/library"
import { Chang8_1, Chang8_2 } from "@/components/classtype/chang8"
import { Leave, Memo, NightClass, Room, Student, AbsenceLog } from "@prisma/client"
import axios from "axios"
import { useEffect, useState, use } from "react"
import { Box, Button, Stack, Typography, Grid2, CircularProgress } from "@mui/material"
import { StudentInfo } from "@/components/classtype/type"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { useAbsenceState, useClassState } from "@/store/store"
import { useRouter } from "next/navigation"

export default function ClassPage({ params }: { params: Promise<{ id: string }>}) {
  const [room, setRoom] = useState<Room>()
  const [loading, setLoading] = useState(true)
  const [studentList, setStudentList] = useState<StudentInfo[]>([])

  const [students, setStudents] = useState<Student[]>([])
  const [memos, setMemos] = useState<Memo[]>([])
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [nightClasses, setNightClasses] = useState<NightClass[]>([])
  const [absences, setAbsences] = useState<AbsenceLog[]>([])

  const [isInteracting, setInteracting] = useState<boolean>(false)


  const { id } = use(params)
  const multiSet = useAbsenceState((s) => s.multiSet);

  const router = useRouter();
  const { classID, change } = useClassState();

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      const { data } = await axios.get(`/api/room/${id}`)     
      
      // 데이터를 상태에 저장
      setStudents(data.students)
      setMemos(data.memos)
      setLeaves(data.leaves)
      setNightClasses(data.nightClasses)
      setAbsences(data.absences)

      setRoom(data.room)
      
      // 정렬 
      data.students.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.memos.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.leaves.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.nightClasses.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.absences.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))

      const list: StudentInfo[] = [];
      let j = 0, k = 0, l = 0, m = 0
      for (let i = 0; i < data.students.length; i++) {
        const stdInfo = {} as StudentInfo
        const std = data.students[i]
        stdInfo.student = std
        const studentID = std.studentID

        while (data.memos[j] && data.memos[j].studentID === studentID) {
          stdInfo.memo = [data.memos[j]]
          j++
        }
        if (data.leaves[k] && data.leaves[k].studentID === studentID) {
          stdInfo.leave = data.leaves[k]
          k++
        }
        if (data.nightClasses[l] && data.nightClasses[l].studentID === studentID) {
          stdInfo.class = data.nightClasses[l]
          l++
        }
        if (data.absences[m] && data.absences[m].studentID === studentID) {
          stdInfo.absence = data.absences[m]
          m++
        }
        list.push(stdInfo)
      }
      setStudentList(list)
      setLoading(false)
    }

    fetchData()
  }, [id])

  async function updateState(targetState:boolean) {

    multiSet(
      students.map((stu) => ({
        id: stu.studentID,
        state: targetState,
      })),
    );    


    try {
      await axios.post(`/api/absence/room/${id}`, { targetState });
    } catch (e) {
      console.error(e);
    } finally {
    }


  }

  function handleChange(roomNo: number) {
    if (roomNo <= 0) roomNo += 20
    change(roomNo)
    router.push(`/teacher/class/${roomNo}`)
  }

  if (loading) {
    return <Stack sx={{justifyContent:'center',alignContent:'center', height:'100%'}}>
      <Box sx={{justifySelf:'center', alignSelf:'center',margin:'10px'}}>Loading...</Box>
    </Stack>
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      overflow="hidden">
      <Grid2 container alignItems="center">

        <Grid2 size={4} />

        <Grid2 size={4} container justifyContent={"center"}>
          <Button sx={{ color:'black',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },}}
            onClick={() => handleChange((classID - 1)%20)}
            >◀</Button>

          <Stack sx={{height:'100px'}}>
            <h1 style={{ textAlign: 'center', marginBottom:'0px' }}>{room?.name}</h1>
            { room?.type === 1 &&
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'5px' }}>
                <Typography style={{ margin: 0 }}>( {students[0].classNo.startsWith('RAA') ? '' : '1-'}{students[0].classNo} )</Typography>
              </div>
            }
          </Stack>

          <Button sx={{ color:'black',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },}}
            onClick={() => handleChange((classID + 1)%20)}
            >▶</Button>
        </Grid2>

        <Grid2 size={4} container justifyContent="flex-end" spacing={1} padding={'10px'}>
          <Button onClick={() => updateState(true)} variant="outlined">
            전체 출석
          </Button>
          <Button onClick={() => updateState(false)} variant="outlined">
            전체 결석
          </Button>
        </Grid2>

      </Grid2>
      
      <Box
        display="flex"
        flex="1 1 auto"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden">
        <TransformWrapper
          initialScale={
            room?.type === 1 ? 0.9 :
            room?.type === 2 ? 0.55 :
            room?.type === 3 ? 0.75 :
            room?.type === 4 ? 0.9 :
            room?.type === 5 ? 0.7 :
            room?.type === 6 ? 0.45 :
            0.45
          }
          minScale={0.45}
          // onZoomStart={() => {setInteracting(true); console.log("here")}}
          // onPanningStart={() => {setInteracting(true); console.log('here')}}
          // onZoomStop={() => setInteracting(false)}
          // onPanningStop={() => setInteracting(false)}
        >
          <TransformComponent wrapperStyle={{ display: "flex", height: "100%" }}>
            <Box
              zIndex={10}
              sx={{
                pointerEvents: isInteracting ? "none" : "auto"
              }}>
              {room?.type === 1 && <Hyungsul students={studentList} />}
              {room?.type === 2 && room?.name === "형3" && <EOZ students={studentList} floor={3} />}
              {room?.type === 2 && room?.name === "형4" && <EOZ students={studentList} floor={4} />}
              {room?.type === 3 && <Chang3 students={studentList} />}
              {room?.type === 4 && <Library students={studentList} />}
              {room?.type === 5 && <Chang8_1 students={studentList} />}
              {room?.type === 6 && <Chang8_2 students={studentList} />}
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Box>
  )
}