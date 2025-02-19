import { profileSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const InformationForm = () => {

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: '', lastName: '', bio: ''}
  })

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log(data)
  }

  return <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
  <FormField
    control={form.control}
    name="firstName"
    render={( { field } ) => (
      <FormItem>
        <Label>First name</Label>
        <FormControl>
          <Input placeholder='Oman' className='bg-secondary' {...field}/>
        </FormControl>
        <FormDescription />
        <FormMessage className='text-xs text-red-500'/>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="lastName"
    render={( {field} ) => (
      <FormItem>
        <Label> Last name</Label>
        <FormControl>
          <Input placeholder='Ali' className='bg-secondary' {...field}/>
        </FormControl>
        <FormDescription />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="bio"
    render={( {field} ) => (
      <FormItem>
        <Label> Bio </Label>
        <FormControl>
          <Textarea placeholder='Enter anything about yourself' className='bg-secondary' {...field}/>
        </FormControl>
        <FormDescription />
      </FormItem>
    )}
  />
  <Button type='submit' className='w-full'>
    Submit
  </Button>
  </form>
</Form>

}

export default InformationForm