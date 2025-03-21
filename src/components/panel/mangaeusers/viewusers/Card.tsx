"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUsers } from "@/hooks/manageEmployees/getEmployess"
import { EmplMenu } from "./menu"

export default function UserCards() {
    const { users, loading, error } = useUsers()

    if (loading) return <p className="text-center text-gray-500">Loading users...</p>
    if (!users || users.length === 0) {
        return <p className="text-center text-gray-500">No users found</p>
    }
    if (error) return <p className="text-center text-red-500">Error fetching Users</p>
    

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {users.map(({ user_id, name, email, position, login_status }) => (
                <Card 
                    key={user_id} 
                    className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition duration-300 bg-white relative"
                >
                    {/* Status Dot */}
                    <span 
                        className={`absolute top-3 right-3 w-3 h-3 rounded-full 
                        ${login_status ? "bg-green-500" : "bg-red-500"}`}
                    ></span>

                    <CardHeader className="p-5">
                        <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                            {name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-700">{email}</CardDescription>
                        <p className="text-xs text-gray-400 mt-1">{position}</p>
                        <div className="flex justify-end">
                            <EmplMenu emplId={user_id}  />
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}
