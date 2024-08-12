"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
const LoginForm = () => {

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
          email: "",
          password: ""
        },
      })
     
      async function onSubmit(values: LoginBodyType) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(()=>{
              toast.success("Đăng nhập thành công!");
            })
        } catch (error) {
            console.error('Error registering:', error);
            toast.error("Sai tài khoản hoặc mật khẩu!");
        }
      }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-32 border-2 border-gray-300 p-5">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">LOGIN</h2>
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input  placeholder="Enter to email..." {...field} />
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
                    <Input type="password" placeholder="Enter to password ..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
          <ToastContainer />
            <Button type="submit">Login</Button>
        </form>
    </Form>
    );
}

export default LoginForm;
