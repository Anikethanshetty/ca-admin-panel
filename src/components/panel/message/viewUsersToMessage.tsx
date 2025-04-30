'use client'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetFbEmpl } from '@/hooks/manageEmployees/getFbEmployees'



export default function ViewUserToMessage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const {fbUsers,loading,error} = useGetFbEmpl()

  const filteredUsers = fbUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleClick = (userId: string) => {
    router.push(`/message/${userId}/chat`)
  }

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>
  if (error) return <p className="text-center text-red-500">Failed to load users.</p>

  return (
    <div className="p-6">
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(({ user_id, name, email }) => (
            <Card
              key={user_id}
              className="cursor-pointer shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition duration-300 bg-white relative"
              onClick={() => handleClick(user_id)}
            >
              <CardHeader className="p-5">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  {name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-700">{email}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found</p>
      )}
    </div>
  )
}
