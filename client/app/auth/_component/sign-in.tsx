import { emailSchema } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { useAuth } from '@/hooks/use-auth'


function SignIn() {

  const {setEmail, setStep} = useAuth()

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: ""},
  })
  function onSubmit(values: z.infer<typeof emailSchema>) {
    setStep('verify')
    setEmail(values.email)
  }
  return (
    <div className='w-full'>
      <p className="text-center text-muted-foreground text-sm"> 
        ChatApp is a convenient application for you to use
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="admin@example.com" className='h-10 bg-secondary' {...field} />
                </FormControl>
                <FormMessage className='text-xs text-red-500'/>
              </FormItem>
            )}
            />
          <Button type="submit" className='w-full' size={'lg'}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn