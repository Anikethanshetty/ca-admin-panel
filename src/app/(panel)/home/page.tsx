import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){
    return (
        <div className="w-full h-[800px] mt-6 px-20 flex mb-20">
            <div className="md:w-[50%] w-full flex flex-col justify-between h-full rounded-tl-2xl rounded-bl-2xl py-10 pl-10 border-gray-200 shadow-2xl">
                <header>
                    <h1 className="text-lg font-medium text-muted-foreground">Charted Accountant</h1>
                </header>
                <section>
                        <div className="grid gap-y-10">
                            <h1 className="text-5xl font-extrabold">Leading the Future of <span className="text-primary">Finance</span></h1>
                            <p className="text-lg font-medium grid gap-y-1">A Central Hub for Lead CAs <div>to Oversee and Streamline Their CA Workforce.</div> </p>
                        </div>
                </section>
                <footer>
                <Button  className=" bg-primary hover:bg-blue-500 font-semibold text-lg" asChild>
                        <Link href={"/viewuser"}>View Employess</Link>
                </Button>
                </footer>
            </div>
             <div className="w-[50%] hidden md:block bg-blue-500  h-full rounded-tr-2xl rounded-br-2xl shadow-2xl">
                
            </div>
        </div>
    )
}