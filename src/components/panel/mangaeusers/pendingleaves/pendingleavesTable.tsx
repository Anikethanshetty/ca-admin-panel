"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import usePendingLeaves from "@/hooks/manageEmployees/getPendingLeaves"
import Cookies from "js-cookie"
import { handelGrantLeaves } from "@/lib/manageEmployee/grantLeaves"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { handelDeclineLeaves } from "@/lib/manageEmployee/handleDeclineLeaves"
import { toast } from "sonner"


export function PendingLeavesTable({ adminId }: { adminId: string }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)
    const [disabled,setDisabled] = useState(false)
    const { pendingLeaves, loading, error, removeLeave } = usePendingLeaves(adminId, page)
    const authToken = Cookies.get("token")

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!pendingLeaves) return <p>No pending leaves available</p>

    const totalPages = Math.ceil(pendingLeaves.total_count / 10)
    const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1 + Math.max(0, page - 3))

    const filteredLeaves = pendingLeaves.leaves.filter((leave) =>
      leave.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    function handleAccept(leaveId: string) {
      setDisabled(true)
      if (!authToken) {
        console.error("Authorization token is missing")
        return
      }

      handelGrantLeaves(leaveId, authToken)
        .then(() => {
          removeLeave(leaveId) 
          setDisabled(false)

        })
        .catch(error => {
         setDisabled(false)
          console.error("Failed to grant leave:", error.message)
        })
    }

    function handleDecline(leaveId: string,userId:string) {
      setDisabled(true)
      if (!authToken) {
        console.error("Authorization token is missing")
        return
      }

      handelDeclineLeaves(leaveId, authToken, userId)
        .then(() => {
          removeLeave(leaveId)
          toast("Leave declined")
      setDisabled(false)
        
        })
        .catch(error => {
          toast("Leave decline failed: " + error.message)
          setDisabled(false)
        })
    }

    function handlePageChange(newPage: number) {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage)
      }
    }

    return (
      <div className="w-full py-8 px-20">
        <div className="mb-8">
          <Input
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 border-2 border-black/50 max-w-sm bg-white/5 backdrop-blur-sm"
          />
        </div>

        <div className="bg-white/5 rounded-xl border shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-primary py-4 text-lg font-semibold">Name</TableHead>
                <TableHead className="text-primary py-4 text-lg font-semibold">Email</TableHead>
                <TableHead className="text-primary py-4 text-lg font-semibold">Category</TableHead>
                <TableHead className="text-primary py-4 text-lg font-semibold">Leave From</TableHead>
                <TableHead className="text-primary py-4 text-lg font-semibold">Leave To</TableHead>
                <TableHead className="text-primary py-4 text-lg font-semibold">Reason</TableHead>
                <TableHead className="text-primary py-4 text-lg font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.leave_id} className="hover:bg-white/5">
                  <TableCell className="font-medium py-3 pl-2">{leave.user_name}</TableCell>
                  <TableCell>{leave.user_email}</TableCell>
                  <TableCell>{leave.user_category}</TableCell>
                  <TableCell>{leave.leave_from}</TableCell>
                  <TableCell>{leave.leave_to}</TableCell>
                  <TableCell>{leave.leave_reason}</TableCell>
                  <TableCell>
                    <Button variant="default" className="mr-2" onClick={() => handleAccept(leave.leave_id)} disabled={disabled}>Accept</Button>
                    <Button variant="destructive" onClick={() => handleDecline(leave.leave_id,leave.user_id)} disabled={disabled}>Decline</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className="justify-end mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
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
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
}
