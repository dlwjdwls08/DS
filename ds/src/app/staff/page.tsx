'use client'

import { Book, People, Room, School, Settings } from "@mui/icons-material"
import { Backdrop, Box, Button, Card, Chip, Container, Paper, Skeleton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { koKR } from "@mui/x-date-pickers/locales"
import * as XLSX from "xlsx"
import PageButton from "@/components/pagebutton/pagebutton"
import dayjs, { Dayjs } from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { AbsenceLog, Leave } from "@prisma/client"
import { PickerValue } from "@mui/x-date-pickers/internals"

type LogData = {
  grade: number,
  classno: string,
  studentid: string,
  name: string,
  date: string,
  state: boolean | null,
  teacher: string
}

type LeaveDataRaw = {
  hakbun: string,
  kor_nm: string,
  gubun_nm: string,
  reg_date: string
}

dayjs.locale("ko")
dayjs.extend(utc)
dayjs.extend(timezone)

export default function StaffPage() {
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [startDay, setStartDay] = useState(dayjs(new Date()).subtract(1, 'day'))
  const [endDay, setEndDay] = useState(dayjs(new Date()).subtract(1, 'day'))
  const [getData, setData] = useState<LogData[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const visibleData = useMemo(
    () => 
      [...getData]
        .slice(page * 8, (page + 1) * 8),
      [page, getData]
  )

  const emptyRows = Math.max(0, (1 + page) * 8 - getData.length)

  const router = useRouter()


  useEffect(() => {
    const yesterday = dayjs().tz('Asia/Seoul').subtract(1, 'day')
    axios.get("/api/staff/absence", {
      params: {
        start: new Date(yesterday.year(), yesterday.month(), yesterday.date()),
        end: new Date(yesterday.year(), yesterday.month(), yesterday.date()),
      }
    })
    .then((res) => res.data)
    .then((data: {absenceData: LogData[]}) => {
      console.log(data)
      data.absenceData.sort((x, y) => {
        if (x.classno.startsWith("RAA")) {
          if (y.classno.startsWith("RAA")) {
            return Number(x.classno.at(-1)) - Number(y.classno.at(-1))
          }
          return 1
        }
        if (y.classno.startsWith("RAA")) {
          return -1
        }
        if (x.grade == y.grade) {
          return Number(x.classno) - Number(y.classno)
        }
        return x.grade - y.grade
      })
      setData(data.absenceData)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  const handleLoad = () => {
    const end = endDay
    setLoading(true)
    axios.get("/api/staff/absence", {
      params: {
        start: new Date(startDay.year(), startDay.month(), startDay.date()),
        end: new Date(end.year(), end.month(), end.date()),
      }
    })
    .then((res) => res.data)
    .then((data: { absenceData: LogData[] }) => {
      console.log(data)
      data.absenceData.sort((x, y) => {
        if (x.classno.startsWith("RAA")) {
          if (y.classno.startsWith("RAA")) {
            return Number(x.classno.at(-1)) - Number(y.classno.at(-1))
          }
          return 1
        }
        if (y.classno.startsWith("RAA")) {
          return -1
        }
        if (x.grade == y.grade) {
          return Number(x.classno) - Number(y.classno)
        }
        return x.grade - y.grade
      })
      setData(data.absenceData)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: "array" })

      const fixedData = []
      
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows:LeaveDataRaw[] = XLSX.utils.sheet_to_json(worksheet)
      for (const row of rows) {
        fixedData.push({
          studentID: row.hakbun,
          studentName: row.kor_nm,
          date: row.reg_date
        })
      }
      axios.post("/api/staff/leave", fixedData)
        .then(res => res.data)
        .then((data) => {

        })
    }

    reader.readAsArrayBuffer(file)
  }

  const handleFileDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(getData);

    // 워크북 생성
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 워크북을 바이너리 데이터로 변환
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    // 4. Blob 생성
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    // 5. 다운로드 링크 생성해서 강제 클릭
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${startDay.format("YYYY_MM_DD")}-${endDay.format("YYYY_MM_DD")}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="30px"
      padding="20px 30px 0">
      <Stack direction="row" flex={1} gap="10px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            gap="20px">
            <DatePicker 
              label="From"
              value={startDay}
              onChange={(e) => setStartDay(dayjs(e))}/>
            <DatePicker 
              label="To"
              value={endDay}
              onChange={(e) => setEndDay(dayjs(e))}/>
            <Button
              onClick={handleLoad}>
      `       로드
            </Button>
          </Stack>
        </LocalizationProvider>
        <Box
          display="flex"
          flex={1}
          gap="20px">
          <Card
            sx={{flex: 1}}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>학년</TableCell>
                    <TableCell>반</TableCell>
                    <TableCell>담임교사</TableCell>
                    <TableCell>학번</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isLoading ? 
                  visibleData?.map((row, index) => (
                    <TableRow
                      key={index}>
                      <TableCell>{dayjs(row.date).tz('Asia/Seoul').format("MM/DD")}</TableCell>
                      <TableCell>{row.grade}</TableCell>
                      <TableCell>{row.classno}</TableCell>
                      <TableCell>{row.teacher}</TableCell>
                      <TableCell>{row.studentid}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label="결석"
                          clickable/>
                      </TableCell>
                    </TableRow>
                  ))
                  :
                  [...Array(8)].map((_, index) => (
                    <TableRow key={index} sx={{ height: "65px" }}>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="rounded" /></TableCell>
                    </TableRow>
                  ))
                  }
                  {(!isLoading && emptyRows > 0) && (
                    <TableRow 
                      style={{
                        height: 52 * emptyRows
                      }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={getData.length!}
              rowsPerPage={8}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[]} />
          </Card>
          <Stack
            gap="20px">
            <Button
              variant="outlined"
              component="label">
              자습 이석 업로드
              <input 
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              hidden
              />
            </Button>
            <Button
              variant="outlined"
              component="label"
              onClick={handleFileDownload}>
              엑셀로 다운로드
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Backdrop
        open={speedDialOpen} />
      <SpeedDial
        ariaLabel=""
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20
        }}
        icon={<Settings />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}>
        <SpeedDialAction
          icon={<People />}
          tooltipOpen
          tooltipTitle="학생"
          tooltipPlacement="right"
          onClick={() => router.push("/staff/setting/students")} />
        <SpeedDialAction
          icon={<Book />}
          tooltipOpen
          tooltipTitle="수업"
          tooltipPlacement="right"
          onClick={() => router.push("/staff/setting/night_class")} />
        <SpeedDialAction
          icon={<School />}
          tooltipOpen
          tooltipTitle="교사"
          tooltipPlacement="right"
          onClick={() => router.push("/staff/setting/teacher")} />
        <SpeedDialAction 
          icon={<Room />}
          tooltipOpen
          tooltipTitle="교실"
          tooltipPlacement="right"
          onClick={() => router.push("/staff/setting/room")} />
      </SpeedDial>
    </Box>
  )
}