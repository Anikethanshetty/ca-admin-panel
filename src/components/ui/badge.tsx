"use client"


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
import { Badge } from "lucide-react"
import { format } from "date-fns"
import { MapPin } from "lucide-react"
import { useState } from "react"

interface WorkHistory {
  work_date: string
  login_time: string
  logout_time: string
  latitude: string
  longitude: string
  uploaded_work: string
  timestamp: string
}

export function WorkHistoryTable({ workHistory }: { workHistory: WorkHistory[] }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(workHistory.length / itemsPerPage)

  const paginatedData = workHistory.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )





  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow >
              <TableHead className="text-primary font-semibold">Date</TableHead>
              <TableHead className="text-primary font-semibold">Login Time</TableHead>
              <TableHead className="text-primary font-semibold">Logout Time</TableHead>
              <TableHead className="text-primary font-semibold">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((work, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {format(new Date(work.work_date), "MMM dd, yyyy")}
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
                {/* <TableCell>{getStatusBadge(work.uploaded_work)}</TableCell> */}
                {/* <TableCell className="text-muted-foreground">
                  {format(new Date(work.timestamp), "MMM dd, yyyy HH:mm")}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}