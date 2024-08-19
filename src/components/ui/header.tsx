import React from 'react';
import ButtonDarkMode from '@/components/ui/button-dark-mode'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Menu from '@/components/ui/menu';


const Header = () => {

    return (
        <>
        <div className='grid grid-cols-4 bg-slate-500 dark:bg-lime-700'>
            <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight p-3">TH COMPANY</h3>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
           <div className='flex justify-center'>
            <Avatar className='m-3'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
               <div className='m-3'>
                <ButtonDarkMode  />
               </div>
           </div>
        </div>
        </div>
        <hr/>
        <Menu />
        </>
    );
}

export default Header;
