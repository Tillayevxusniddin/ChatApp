import { emailSchema } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { useAuth } from '@/hooks/use-auth'
import { useMutation } from '@tanstack/react-query'
import { axiosClient } from '@/http/axios'
import { IError } from '@/types'
import { toast } from "sonner"



function SignIn() {

  const {setEmail, setStep} = useAuth()

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: ""},
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axiosClient.post<{email:string}>('/api/auth/login', { email })
      return data
    },
    onSuccess: res => {
      setEmail(res.email)
      setStep('verify')
      toast.success("Email sent")
    },
    onError: (error: IError) => {
      if (error.response?.data?.message) {
        return toast.error("Something went wrong", {description: error.response.data.message})
      }
    }
  })

  function onSubmit(values: z.infer<typeof emailSchema>) {
    mutate(values.email)
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
                  <Input placeholder="admin@example.com" disabled={isPending} className='h-10 bg-secondary' {...field} />
                </FormControl>
                <FormMessage className='text-xs text-red-500'/>
              </FormItem>
            )}
            />
          <Button type="submit" className='w-full' size={'lg'} disabled={isPending} >Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn