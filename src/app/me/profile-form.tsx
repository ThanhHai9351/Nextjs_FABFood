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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useRouter } from 'next/navigation'
import Http from "@/lib/http"
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from "@/schemaValidations/account.schema"
import { useAppContext } from "@/app/AppProvider"
type Profile = AccountResType['data']

const ProfileForm = ({profile}:{profile:Profile}) => {
    const {sessionToken} = useAppContext();
    const http = new Http();
    const router = useRouter()
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: profile.name
        },
      })
     
      async function onSubmit(values: UpdateMeBodyType) {
        try {
            const success = await http.updateAccount(values,sessionToken);
            if (success) {
               router.refresh();
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
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input  placeholder="Enter to name..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
          <ToastContainer />
            <Button type="submit">Edit</Button>
        </form>
    </Form>
    );
}

export default ProfileForm;
