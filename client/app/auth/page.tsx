// import { FaTelegram } from 'react-icons/fa';
import { LuMessageCircleMore } from "react-icons/lu";
import StateAuth from "./_component/state";
import Social from "./_component/social";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";


const Page = async () => {

  const session = await getServerSession(authOptions)
  if (session) return redirect('/')

  return (
    <div className='container max-w-md w-full h-screen flex justify-center items-center flex-col space-y-4'>
        <LuMessageCircleMore size={120} className='text-green-500'/>
        <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">ChatApp</h1>
            <ModeToggle />
        </div>
        <StateAuth />
        <Social />
    </div>
  )
}

export default Page


