'use client'
import { Button } from '@/components/ui/button';
import Http from '@/lib/http';
import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonLogout = () => {
    const http = new Http();
    const router = useRouter();
    const handleLogout = async() =>{
        try{
            await http.logoutFromNextClientToServer();
            router.push('/login')
        }catch(error)
        {
            console.log(error);
        }
    }
    return (
        <Button size={'sm'} onClick={handleLogout} >
            Logout
        </Button>
    );
}

export default ButtonLogout;
