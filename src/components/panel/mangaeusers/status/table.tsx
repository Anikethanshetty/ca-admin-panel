"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const employess = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    userName: "John Smith",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    userName: "Sarah Johnson",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    userName: "Michael Brown",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    userName: "Emily Davis",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    userName: "Robert Wilson",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    userName: "Jennifer Lee",
  },
 
]

const headers = [
  "user",
  "user",
  "user",
  "user",
  "user",
  
]

export function StatusTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredemp = employess.filter((emp) =>
    emp.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full py-8 px-20">
      <div className="mb-8">
        <div className="relative">
          <Input
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 border-2 border-black/50 max-w-sm bg-white/5 backdrop-blur-sm"
          />
        </div>
      </div>
      
      <div className="bg-white/5  rounded-xl border shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
            {headers.map((names) => (
              <TableHead className="text-primary py-4 text-lg font-semibold">{names}</TableHead>
            ))}
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredemp.map((emp) => (
              <TableRow key={emp.invoice} className="hover:bg-white/5">
                <TableCell className="font-medium py-3 pl-2">{emp.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <p>Showing {filteredemp.length} of {employess.length} entries</p>
      </div>
    </div>
  )
}