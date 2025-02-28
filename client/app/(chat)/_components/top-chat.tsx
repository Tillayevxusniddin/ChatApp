import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/use-auth'
import { useCurrentContact } from '@/hooks/use-current'
import {  SlidersIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TopChat = () => {

  const {currentContact} = useCurrentContact()
  const {onlineUsers} = useAuth()

  return (
    <div className='w-full flex items-center justify-between sticky top-0 z-50 h-[8vh] p-2 border-b bg-background'>
      <div className='flex items-center'>
        <Avatar className='z-40'>
          <AvatarImage src={currentContact?.avatar} alt={currentContact?.email} className='object-cover'/>
          <AvatarFallback className='uppercase'>{currentContact?.email[0]}</AvatarFallback>
        </Avatar>
        <div className='ml-2'>
          <h2 className='font-medium text-sm'>{currentContact?.email}</h2>
          {/* is Typing */}
          {/* <div className='text-xs flex items-center gap-1 text-muted-foreground'>
            <p className='text-secondary-foreground animate-pulse line-clamp-1'>Typing</p>
            <div className='self-end mb-1'>
              <div className='flex justify-center items-center gap-1'>
                <div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay: -0.3s]'></div>
                <div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay: -0.3s]'></div>
                <div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay: -0.3s]'></div>
              </div>
            </div>
                    </div> */}
          <p className='text-xs'>
          {/*  Online  Or Offline  */}
          {onlineUsers.some(user => user._id === currentContact?._id) ? (
            <> <span className='text-green-500'>●</span> Online </>
          ) : (
            <> <span className='text-muted-foreground'>●</span> Last seen recently </>
          )}          
          </p>
        </div>
      </div>
        
      <Sheet>
        <SheetTrigger asChild>
          <Button size={'icon'} variant={'secondary'}>
            <SlidersIcon />
          </Button>  
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle/>
          </SheetHeader>
          <div className='mx-auto w-1/2 h-36 relative'>
            <Avatar className='w-full h-36'>
              <AvatarImage src={currentContact?.avatar} alt={currentContact?.email} className='object-cover'/>
              <AvatarFallback className='text-6xl uppercase font-spaceGrotesk'>{currentContact?.email[0]}</AvatarFallback>
            </Avatar>
          </div>

          <Separator className='my-2'/>
          <h1 className='text-center capitalize font-spaceGrotesk text-xl'>{currentContact?.email}</h1>
          <div className='flex flex-col space-y-1'>
            {currentContact?.firstName && (
              <div className='flex items-center gap-1 mt-4'>
                <p className='font-spaceGrotesk'>FirstName: </p>
                <p className='font-spaceGrotesk text-muted-foreground'>{currentContact?.firstName}</p>
              </div>
            )}
            {currentContact?.lastName && (
              <div className='flex items-center gap-1 mt-4'>
                <p className='font-spaceGrotesk'>lastName: </p>
                <p className='font-spaceGrotesk text-muted-foreground'>{currentContact?.lastName}</p>
              </div>
            )}
            {currentContact?.bio && (
              <div className='flex items-center gap-1 mt-4'>
                <p className='font-spaceGrotesk'>
                  About: <span className='font-spaceGrotesk text-muted-foreground'>{currentContact?.bio}</span>
                </p>
              </div>
            )}
            <Separator className='my-2'/>
            <h2 className='text-xl'>Images</h2>
             <div className='flex flex-col space-y-2'>
                <div className='w-full h-36 relative'>
                  <Image 
                    src={'https://github.com/shadcn.png'}
                    alt={'https://github.com/shadcn.png'}
                    fill
                    className='object-cover rounded-md'
                  />
                </div>
             </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default TopChat