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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useAppContext } from "@/app/AppProvider"
import { useRouter } from 'next/navigation'
import Http from "@/lib/http"
 
const LoginForm = () => {
    const {setSessionToken} = useAppContext();
    const http = new Http();
    const router = useRouter()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
          email: "",
          password: ""
        },
      })
     
      async function onSubmit(values: LoginBodyType) {
        try {
            const success = await http.login(values);
            if (success) {
                setSessionToken(success);
                setTimeout(()=>{
                    router.push('/me')
                },2000)
            }
        } catch (error) {
            console.error('Unexpected error:', error);
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
