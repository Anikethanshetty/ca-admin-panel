"use client"
import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkHistoryTable } from '@/components/panel/mangaeusers/history/userHistoryTable'

export default function UserWorkHistory() {
  const { userId } = useParams()
 const userid = String(userId)

  return (
    <Card className='mt-20 mx-16 shadow-xl'>
      <CardHeader>
        <CardTitle className='text-muted-foreground font-medium'>Work History</CardTitle>
      </CardHeader>
      <CardContent>
      <WorkHistoryTable userid={userid} />
      </CardContent>
    </Card>
  )
}