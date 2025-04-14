'use client'

import { CloudUpload, Save, UploadFile } from "@mui/icons-material";
import { Box, Button, Card, Input, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import { Rows } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

type NightClassData = {
  studentID: string,
  className: string,
  studentName: string,
  day: string,
  start: number,
  end: number
}

type NightClassRawData = {
  id: string,
  name: string,
  class: string,
  day: string,
  time: string
}

export default function NightClassSettingPage() {
  const [getData, setData] = useState<NightClassData[]>([])
  const [page, setPage] = useState(0)

  const visibleData = useMemo(
    () => 
      [...getData]
        .slice(page * 10, (page + 1) * 10),
      [page, getData]
  )

  const emptyRows = Math.max(0, (1 + page) * 10 - getData.length)

  useEffect(() => {
    axios.get("/api/staff/night_class")
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

      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData:NightClassRawData[] = XLSX.utils.sheet_to_json(worksheet, { header: ["id", "name", "class", "day", "time"] })
      console.log(jsonData)
      const fixedData: NightClassData[] = []
      const rows = jsonData.slice(1)
      for (const row of rows) {
        const start = String(row.time).split(",").at(0)
        const end = String(row.time).split(",").at(-1)
        fixedData.push({
            studentID: row.id,
            className: row.class,
            studentName: row.name,
            day: row.day,
            start: Number(start),
            end: Number(end)
          })
      }
      setData(fixedData)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleSubmit = () => {
    axios.post("/api/staff/night_class", getData)
    .catch((error) => console.error(error))
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
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>학번</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>수업</TableCell>
                <TableCell>요일</TableCell>
                <TableCell>시작 교시</TableCell>
                <TableCell>종료 교시</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleData?.map((row, index) => (
                <TableRow
                  key={index}>
                  <TableCell>{row.studentID}</TableCell>
                  <TableCell>{row.studentName}</TableCell>
                  <TableCell>{row.className}</TableCell>
                  <TableCell>{row.day}</TableCell>
                  <TableCell>{row.start}</TableCell>
                  <TableCell>{row.end}</TableCell>
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
      
    </Box>
  )
}