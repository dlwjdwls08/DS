'use client'

import { Book, People, Room, School, Settings } from "@mui/icons-material"
import { Backdrop, Box, Button, Card, Chip, Container, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
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
  reason: string,
  start_date: string,
  start_time: string,
  end_date: string,
  end_time: string
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
  
  const visibleData = useMemo(
    () => 
      [...getData]
        .slice(page * 10, (page + 1) * 10),
      [page, getData]
  )

  const emptyRows = Math.max(0, (1 + page) * 10 - getData.length)

  const router = useRouter()


  useEffect(() => {
    const yesterday = dayjs.utc(new Date()).subtract(1, 'day')
    const today = dayjs.utc(new Date())
    axios.get("/api/staff/absence", {
      params: {
        start: new Date(yesterday.year(), yesterday.month(), yesterday.date()),
        end: new Date(today.year(), today.month(), today.date()),
        range: false
      }
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data)
      setData(data.absenceData)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

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
        const start = dayjs.tz(`${row.start_date} ${row.start_time}`, 'Asia/Seoul').utc().toDate()
        const end = dayjs.tz(`${row.end_date} ${row.end_time}`, 'Asia/Seoul').utc().toDate()
        fixedData.push({
          studentID: row.hakbun,
          studentName: row.kor_nm
        })
      }
      axios.post("/api/staff/leave", fixedData)
        .then(res => res.data)
        .then((data) => {

        })
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="30px"
      padding="20px 30px 0">
      <Stack direction="row" flex={1} gap="10px">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
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
                    <TableCell>학년</TableCell>
                    <TableCell>반</TableCell>
                    <TableCell>담임교사</TableCell>
                    <TableCell>학번</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleData?.map((row, index) => (
                    <TableRow
                      key={index}>
                      <TableCell>{row.grade}</TableCell>
                      <TableCell>{row.classno}</TableCell>
                      <TableCell>{row.teacher}</TableCell>
                      <TableCell>{row.studentid}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.state === null ? "미확인" : "결석"}
                          clickable/>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
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
              rowsPerPage={10}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[]} />
          </Card>
          <Box>
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
          </Box>
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