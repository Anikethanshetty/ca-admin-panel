import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserCards(){

    const employees = [
        {
            id:1,
            name:"Anikethan",
            email:"shhetyanikethand@gmail.com",

        },
        {
            id:2,
            name:"Anikethan",
            email:"shhetyanikethand@gmail.com",

        },
        {
            id:3,
            name:"Anikethan",
            email:"shhetyanikethand@gmail.com",

        },
        {
            id:4,
            name:"Anikethan",
            email:"shhetyanikethand@gmail.com",

        },
        {
            id:5,
            name:"Anikethan",
            email:"shhetyanikethand@gmail.com",

        },
        {
            id:6,
            name:"Anikethan",
            email:"shhetyanikethand@gmail.com",

        },
       
    ]
    

    return (
        <>
                {employees.map(({ id, email, name }) => (
                    <Card key={id} className="px-5 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-primary ">{name}</CardTitle>
                            <CardDescription>{email}</CardDescription>
                        </CardHeader>
                        
                    </Card>
                ))}
        </>

    )
}