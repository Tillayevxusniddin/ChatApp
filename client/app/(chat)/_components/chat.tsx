// import ChatLoading from '@/components/loadings/chat.loading'
// import MessageCard from '@/components/cards/message.card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { messageSchema } from '@/lib/validation'
import { Paperclip, Send, Smile } from 'lucide-react'
import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import emojies from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Props {
  onSendMessage: (values: z.infer<typeof messageSchema>) => void
  messageForm: UseFormReturn<z.infer<typeof messageSchema>>
}
  

const Chat: FC<Props> = ({onSendMessage, messageForm}) => {
  return (
    <div className='flex flex-col justify-end z-40 min-h-[92vh]'>
      {/* Loading */}
      {/* <ChatLoading /> */}

      {/* Messages */}
      {/* <MessageCard isReceived /> */}
      
      {/* Start kaiwa */}
      <div className='w-full h-[88vh] flex items-center justify-center'>
        <div className='text-[100px] cursor-pointer' onClick={() => onSendMessage({text: '✍️'})}>✍️</div>
      </div>
      
      {/*  Message Input*/}
      <Form {...messageForm}>
        <form onSubmit={messageForm.handleSubmit(onSendMessage)} className='w-full flex relative'>
          <Button size={'icon'} type='button' variant={'secondary'}>
              <Paperclip />
          </Button>
          <FormField
            control={messageForm.control}
            name="text"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input 
                    className='bg-secondary border-1 border-l-muted-foreground border-r border-r-muted-foreground h-9'
                    placeholder='Type a message'
                    value={field.value}
                    onBlur={() => field.onBlur()}
                    onChange={e => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button size={'icon'} type='button' variant={'secondary'}>
                  <Smile/>
                </Button>
              </PopoverTrigger>
              <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>

            <Button type='submit' size={'icon'}>
              <Send/>
            </Button>
        </form>
      </Form>
    </div>
  )
}

export default Chat