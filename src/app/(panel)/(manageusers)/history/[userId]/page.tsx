"use client"

import useWorkHistory from '@/hooks/manageEmployees/getWorkHistory'
import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkHistoryTable } from '@/components/panel/mangaeusers/history/userHistoryTable'

export default function UserWorkHistory() {
  const { userId } = useParams()
  const { workHistory, loading, error } = useWorkHistory(String(userId))

  if (loading) {
    return (
      <Card className='mt-20 mx-16'>
        <CardHeader>
          <CardTitle>Work History</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent> */}<CardContent className='text-gray-500 text-center'>Loading History...</CardContent>
      </Card>
    )
  }
console.log(error)
  if (error) {
    return (
   <div className='flex flex-col items-center'>
    <p className='text-muted-foreground'>No Work History Found</p>
   </div>
    )
  }

  return (
    <Card className='mt-20 mx-16 shadow-xl'>
      <CardHeader>
        <CardTitle className='text-muted-foreground font-medium'>Work History</CardTitle>
      </CardHeader>
      <CardContent>
        <WorkHistoryTable workHistory={workHistory} />
      </CardContent>
    </Card>
  )
}