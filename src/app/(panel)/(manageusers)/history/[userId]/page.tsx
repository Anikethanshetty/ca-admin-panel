"use client"

import useWorkHistory from '@/hooks/manageEmployees/getWorkHistory'
import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkHistoryTable } from '@/components/panel/mangaeusers/history/userHistoryTable'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from "next/link"
export default function UserWorkHistory({ setNavbarTitle }: { setNavbarTitle: (title: string) => void }) {
  const { userId } = useParams()
  const { workHistory, loading, error } = useWorkHistory(String(userId))
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/history') {
      setNavbarTitle('Work History')
    }
  }, [pathname, setNavbarTitle])

  if (loading) {
    return (
      <Card className='mt-20 mx-16'
           
      >
        
        <CardHeader>
          <CardTitle>Work History</CardTitle>
        </CardHeader>
        <CardContent className='text-black text-center'>Loading History...</CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center'>
        <p className='text-muted-foreground'>No Work History Found</p>
      </div>
    )
  }

import { useId, useState } from 'react'

export default function UserWorkHistory() {
  const { userId } = useParams()
 const userid = String(userId)

  return (
    <Link className='mt-20 mx-16 shadow-xl'
    href="/history">
      <CardHeader>
        <CardTitle className='font-2xl font-bold text-black'>Work History</CardTitle>
      </CardHeader>
      <CardContent>
      <WorkHistoryTable userid={userid} />
      </CardContent>
    </Link>
  )
}
