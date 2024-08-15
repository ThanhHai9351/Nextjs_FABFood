'use client'
import React, { useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { usePathname,useRouter,useSearchParams } from 'next/navigation';
import { useAppContext } from '@/app/AppProvider';
import Http from '@/lib/http';

const PageLogout = () => {
    const {sessionToken} = useAppContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionTokenParam = searchParams.get('sessionToken')
    const http = new Http();
    const tokenArray = sessionToken.split('=');

    useEffect(()=>{
        if(tokenArray[0] === sessionTokenParam)
        {
            logout();
        }
    },[])

    const logout = async() =>{
        try{
            await http.logoutFromNextClientToServer();
            router.push(`/login?redirectlogout`);
        }catch(error)
        {
            console.log(error);
        }
    }
    
    

    return (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )
}

export default PageLogout;
