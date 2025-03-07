import { StatusTable } from "@/components/panel/mangaeusers/status/table";

export default function Status(){
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-14">
          
            <main className="w-full ">
                    <StatusTable />
            </main>
        </div>
    )
}