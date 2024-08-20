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
import { useRouter, useSearchParams } from 'next/navigation'
import Http from "@/lib/http"
import { UpdateProductBody, UpdateProductBodyType } from "@/schemaValidations/product.schema"
import { useState } from "react"
 
const LoginForm = () => {
    const {setSessionToken} = useAppContext();
    const [file,setFile] = useState<File|null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    const http = new Http();
    const form = useForm<UpdateProductBodyType>({
        resolver: zodResolver(UpdateProductBody),
        defaultValues: {
            name: "",
            description: "",
            image: "http://localhost:4000/static/73021aa02c63441f8e5ad0c8784b9c78.jpg",
            price: 0,
        },
      })
     
      async function onSubmit(values: UpdateProductBodyType) {
       /*  try {
            const success = await http.login(values);
            if (success) {
                setSessionToken(success);
                setTimeout(()=>{
                    router.push('/me')
                },2000)
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } */
    }

    return (
        <Form {...form}>
         <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error)
          console.log(form.getValues('image'))
        })}
        encType="multipart/form-data"
        className='space-y-8 m-32 border-2 border-gray-300 p-5'
        noValidate
      >
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">Edit Product</h2>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input accept='image/*' type="file" onChange={e => {
                        const fileSelected = e.target.files?.[0]
                        setFile(fileSelected || null)
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
                <FormField
              control={form.control}
              name="price"
              render={() => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Enter product price..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ToastContainer />
            <Button type="submit">Add Product</Button>
          </form>
        </Form>
    );
}

export default LoginForm;
