
"use client";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useWorkHistory from "@/hooks/manageEmployees/getWorkHistory"

interface WorkHistory {
  work_date: string;
  login_time: string;
  logout_time: string;
  latitude: string;
  longitude: string;
  uploaded_work: string;
  timestamp: string;
}




export function WorkHistoryTable({ userid }: { userid: string }) {
  const [page, setPage] = useState(1)
  const [currentData, setCurrentData] = useState<WorkHistory[]>([])
  const { workHistory, loading, error, totalPages } = useWorkHistory(userid, page)

  useEffect(() => {
    if (workHistory) {
      setCurrentData(workHistory)
    }
  }, [workHistory, page])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  if (loading) {
    return (
      <Card className="mt-20 mx-16">
        <CardHeader>
          <CardTitle>Work History</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-500 text-center">Loading History...</CardContent>
      </Card>
    )
  }

  if (error || currentData.length === 0) {
    return (
      <div className="flex flex-col items-center mt-5">
        <p className="text-muted-foreground">No Work History Found</p>
      </div>
    )
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary font-semibold">Date</TableHead>
              <TableHead className="text-primary font-semibold">Login Time</TableHead>
              <TableHead className="text-primary font-semibold">Logout Time</TableHead>
              <TableHead className="text-primary font-semibold">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {currentData.map((work, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {work.work_date
                    ? format(new Date(work.work_date), "MMM dd, yyyy")
                    : "Invalid Date"}
                </TableCell>
                <TableCell>{work.login_time}</TableCell>
                <TableCell>
                  {work.logout_time === "pending" ? (
                    <Badge variant="secondary">Active</Badge>
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

              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePreviousPage}
              className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {/* First page if not in view */}
          {getPageNumbers()[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
              </PaginationItem>
              {getPageNumbers()[0] > 2 && (
                <PaginationItem>
                  <span className="px-4">...</span>
                </PaginationItem>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {getPageNumbers().map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => handlePageClick(pageNum)}
                className={page === pageNum ? "bg-primary text-primary-foreground" : ""}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last page if not in view */}
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <span className="px-4">...</span>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => handlePageClick(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
