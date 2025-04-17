'use client'

import { Book, People, School, Settings } from "@mui/icons-material"
import { Backdrop, Box, Button, Card, Container, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { koKR } from "@mui/x-date-pickers/locales"
import * as XLSX from "xlsx"
import PageButton from "@/components/pagebutton/pagebutton"
import dayjs from "dayjs"
import "dayjs/locale/ko"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { AbsenceLog } from "@prisma/client"

type LogData = {
  grade: number,
  classNo: string,
  studentID: string,
  name: string,
  date: string,
  teacher: string
}

export default function StaffPage() {
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [dayValue, setDayValue] = useState(dayjs(new Date()))
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

  dayjs.locale("ko")


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="30px"
      height="100%"
      padding="0 30px">
      <Stack direction="row" flex={1}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko-KR">
          <DateCalendar
            value={dayValue}
            onChange={(e) => setDayValue(dayjs(e))}>

          </DateCalendar>
        </LocalizationProvider>
        <Stack
          flex={1}
          gap="20px">
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>학년</TableCell>
                    <TableCell>반</TableCell>
                    <TableCell>담임교사</TableCell>
                    <TableCell>학번</TableCell>
                    <TableCell>이름</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleData?.map((row, index) => (
                    <TableRow
                      key={index}>
                      <TableCell>{row.grade}</TableCell>
                      <TableCell>{row.classNo}</TableCell>
                      <TableCell>{row.teacher}</TableCell>
                      <TableCell>{row.studentID}</TableCell>
                      <TableCell>{row.name}</TableCell>
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
              rowsPerPage={4}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[]} />
          </Card>
          <Box>
            <Button
              variant="outlined">
              자습 이석 업로드
            </Button>
          </Box>
        </Stack>
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
      </SpeedDial>
    </Box>
  )
}