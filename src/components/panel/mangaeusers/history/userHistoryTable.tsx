'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Badge } from "@/components/ui/badge"

import { format } from "date-fns"
import {  MapPin } from "lucide-react"
import { useState, useMemo } from "react"
import useWorkHistory from "@/hooks/manageEmployees/getWorkHistory"
import { DowloadWorkHistoryForm } from "./dowloadWorkHistoryForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface WorkHistory {
  work_date: string
  login_time: string
  logout_time: string
  latitude: string
  longitude: string
  uploaded_work: string
  timestamp: string
}



export function WorkHistoryTable({ userid }: { userid: string }) {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const { workHistory, loading, error, totalPages } = useWorkHistory(userid, page)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalPages)) {
      setPage(newPage)
    }
  }

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 5
    const totalPagesCount = Math.ceil(totalPages)
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPagesCount, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [page, totalPages])

  if (loading) {
    return (
      <div className="mt-20 mx-16">
        <div className="text-gray-500 text-center py-4">Loading History...</div>
      </div>
    )
  }

  if (error || !workHistory?.history || workHistory.history.length === 0) {
    return (
      <div className="flex flex-col items-center mt-5">
        <p className="text-muted-foreground">No Work History Found</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground font-medium mb-5">Work History</div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div
              className="text-primary font-medium mb-5 flex cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Download History
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Select Date Range</DialogTitle>
            </DialogHeader>
            <DowloadWorkHistoryForm userId={userid} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary font-semibold">Date</TableHead>
                <TableHead className="text-primary font-semibold">Login Time</TableHead>
                <TableHead className="text-primary font-semibold">Logout Time</TableHead>
                <TableHead className="text-primary font-semibold">Location</TableHead>
                <TableHead className="text-primary font-semibold">Work Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workHistory.history.map((work: WorkHistory, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {work.work_date ? format(new Date(work.work_date), "MMM dd, yyyy") : "Invalid Date"}
                  </TableCell>
                  <TableCell>{work.login_time}</TableCell>
                  <TableCell>
                    {work.logout_time === "pending" ? (
                      <Badge variant={"secondary"}>Active</Badge>
                    ) : (
                      work.logout_time
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {work.latitude}, {work.longitude}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {work.uploaded_work}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {/* Pagination numbers with ... */}
            {pageNumbers[0] > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                </PaginationItem>
                {pageNumbers[0] > 2 && (
                  <PaginationItem>
                    <span className="px-4">...</span>
                  </PaginationItem>
                )}
              </>
            )}

            {pageNumbers.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  onClick={() => handlePageChange(num)}
                  className={page === num ? "bg-primary text-primary-foreground" : ""}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pageNumbers[pageNumbers.length - 1] < Math.ceil(totalPages) && (
              <>
                {pageNumbers[pageNumbers.length - 1] < Math.ceil(totalPages) - 1 && (
                  <PaginationItem>
                    <span className="px-4">...</span>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(Math.ceil(totalPages))}>
                    {Math.ceil(totalPages)}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={page >= Math.ceil(totalPages) ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
