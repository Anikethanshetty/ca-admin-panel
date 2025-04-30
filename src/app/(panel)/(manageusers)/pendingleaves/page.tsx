"use client"
import { PendingLeavesTable } from "@/components/panel/mangaeusers/pendingleaves/pendingleavesTable";
import useAuthToken from "@/hooks/privateToken/authToken";
export default function PendingLeves() {

const {decodedToken} =  useAuthToken()

  return (
    <div className="flex flex-col items-center justify-center mt-16">
        { decodedToken ? <PendingLeavesTable adminId={decodedToken.id}/> : null}
    </div>
  )
}