"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import axios from "axios"
 
// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   password: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   confirmPassword: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const RegisterForm = () => {
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      })
     
      async function onSubmit(values: RegisterBodyType) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error registering:', error);
        }
      }

    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (error)=>{
        console.log(error);
      })} className="space-y-8 m-auto max-w-[500px] border-2 border-gray-300 p-5">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">REGISTER</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter the password ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
    );
}

export default RegisterForm;
