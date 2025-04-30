"use client"
import { useParams } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import { WorkHistoryTable } from '@/components/panel/mangaeusers/history/userHistoryTable'

export default function UserWorkHistory() {
  const { userId } = useParams()
 const userid = String(userId)

  return (
    <Card className='mt-20 mx-16 shadow-xl'>
    
      <CardContent>
      <WorkHistoryTable userid={userid} />
      </CardContent>
    </Card>
  )
}