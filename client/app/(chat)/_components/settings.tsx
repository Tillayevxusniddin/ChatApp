import { Button } from '@/components/ui/button'
import { LogIn, Menu, Moon, Settings2, Sun, UserPlus, VolumeOff } from 'lucide-react'
import { Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from "@/components/ui/sheet"
import { useState } from 'react'


const Settings = () => {

  const [ isProfileOpen, setIsProfileOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
 
  return (
    <>
      <Popover>
        <PopoverTrigger>        
          <Button size={'icon'} variant={'secondary'} >
              <Menu />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 w-80'>
          <h2 className='pt-2 pl-2 text-muted-foreground'>
            Settings: <span className='text-white'>tillayevx1@gmail.com</span>
          </h2>
          <Separator className='my-2'/>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center p-2 hover:bg-secondary cursor-pointer' onClick={() => setIsProfileOpen(true)}>
              <div className='flex items-center gap-1'>
                <Settings2 size={16}/> 
                {/* <SlidersIcon />< */}
                <span className='text-sm'>Profile</span>
              </div>
            </div>
            <div className='flex justify-between items-center p-2 hover:bg-secondary cursor-pointer'>
            <div className='flex items-center gap-1' onClick={() => setIsProfileOpen(true)}>
                <UserPlus size={16}/> 
                <span className='text-sm'>Add contact</span>
              </div>
            </div>
            <div className='flex justify-between items-center p-2 hover:bg-secondary'>
              <div className='flex items-center gap-1'>
                <VolumeOff size={16}/> 
                <span className='text-sm'>Mute</span>
              </div>
              <Switch />
            </div>
            <div className='flex justify-between items-center p-2 hover:bg-secondary'>
              <div className='flex items-center gap-1'>
                {resolvedTheme === 'dark' ? <Sun size={16}/> : <Moon size={16}/> }
                <span className='text-sm'>{resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
              </div>
              <Switch 
                checked={resolvedTheme === 'dark' ? true: false}
                onCheckedChange={() => setTheme(resolvedTheme === 'dark' ? 'light':'dark')}
              />
            </div>
            <div className='flex justify-between items-center bg-destructive p-2 cursor-pointer'>
              <div className='flex items-center gap-1'>
                <LogIn size={16}/> 
                <span className='text-sm'>Logout</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent side={'left'} className='w-80 p-2'> 
          <SheetHeader>
            <SheetTitle className='text-2xl'>Profile</SheetTitle>
            <SheetDescription>
              Setting up your profile and level up
            </SheetDescription>
          </SheetHeader>
        </SheetContent> 
      </Sheet>
    </>
  )
}

export default Settings