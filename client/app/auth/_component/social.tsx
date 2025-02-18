import { Button } from "@/components/ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa";

function Social() {
  return (
    <div className="grid grid-cols-2 w-full gap-1">
        <Button variant={'destructive'}>
          <span>Sign up with Google</span>
          <FaGoogle />
        </Button>
        <Button variant={'secondary'}>
          <span>Sign up with Github</span>
          <FaGithub />
        </Button>
    </div>
  )
}

export default Social