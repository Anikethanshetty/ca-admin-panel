"use client"
import { PendingLeavesTable } from "@/components/panel/mangaeusers/pendingleaves/pendingleavesTable";
import  Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
export default function PendingLeves() {
  const token = Cookies.get("token")
  if (token) {
  const Decoded = jwtDecode(token)
  console.log(Decoded)
  // @ts-ignore
  var adminId = Decoded.id
  }
  return (
    <div className="flex flex-col items-center justify-center mt-16">
          <PendingLeavesTable adminId={adminId}/>
    </div>
  )
}