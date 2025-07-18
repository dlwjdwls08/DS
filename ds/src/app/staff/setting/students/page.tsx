'use client'

import { Check, CloudUpload, Save, UploadFile } from "@mui/icons-material";
import { Box, Button, Card, Input, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

type StudentData = {
    grade: number,
    classNo: string,
    studentID: string,
    name: string,
    room: string,
    seat?: number
}

type StudentRawData = {
  classNo: string,
  no: number,
  id: string,
  name: string,
  room: string
}

export default function StudentsSettingPage() {
  const [getData, setData] = useState<StudentData[]>([])
  const [page, setPage] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const router = useRouter()

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const visibleData = useMemo(
    () => 
      [...getData]
        .slice(page * 10, (page + 1) * 10),
      [page, getData]
  )

  const emptyRows = Math.max(0, (1 + page) * 10 - getData.length)

  useEffect(() => {
    axios.get("/api/staff/students")
    .then((res) => res.data)
    .then((data) => {
      setData(data)
    })
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: "array" })

      const fixedData: StudentData[] = []
      for (const sheetName of workbook.SheetNames) {
        const sheetNameList = ["first_year", "second_year 2", "third_year 2"]
        const grade = sheetNameList.findIndex((v, i) => v == sheetName) + 1
        if (grade == 0) continue
        console.log(sheetName)
        const worksheet = workbook.Sheets[sheetName]
        const jsonData:StudentRawData[] = XLSX.utils.sheet_to_json(worksheet, { header: ["classNo", "no", "id", "name", "room"] })
        const rows = jsonData.slice(1)
        for (const row of rows) {
          fixedData.push({
              grade: grade,
              classNo: String(row.classNo),
              studentID: row.id,
              name: row.name,
              room: row.room == "창8" ? Number(row.no) < 55 ? "창8-1" : "창8-2" : row.room,
              seat: Number(row.no)
            })
        }
      }
      setData(fixedData)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleSubmit = () => {
    axios.post("/api/staff/students", getData)
    .then((res) => res.data)
    .then((data) => {
      setSnackbarMessage("저장되었습니다.")
    })
    .catch((error) => {
      console.error(error)
      setSnackbarMessage("에러가 발생했습니다.")
    })
    .finally(() => {
      setSnackbarOpen(true)
    })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      padding="50px 50px 0">
      <Box
        display="flex"
        justifyContent="space-between">
        <Box
          display="flex"
          gap="20px">
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}>
            파일 업로드
            <input 
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              hidden
            />
          </Button>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            startIcon={<Save />}>
            저장
          </Button>
        </Box>
        <Button
          variant="outlined"
          onClick={() => router.push("/staff")}
          startIcon={<Check />}>
          완료
        </Button>
      </Box>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>학년</TableCell>
                <TableCell>반</TableCell>
                <TableCell>학번</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>교실</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleData?.map((row, index) => (
                <TableRow
                  key={index}>
                  <TableCell>{row.grade}</TableCell>
                  <TableCell>{row.classNo}</TableCell>
                  <TableCell>{row.studentID}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.room}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow 
                  style={{
                    height: 52 * emptyRows
                  }}>
                  <TableCell colSpan={6} />
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
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        message={snackbarMessage}
        anchorOrigin={{vertical:"bottom", horizontal:"right"}}/>
    </Box>
  )
}