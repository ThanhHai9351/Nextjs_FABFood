import Link from 'next/link';
import React from 'react';

const Menu = () => {
    return (
        <div className='p-3 bg-orange-200 dark:bg-zinc-500 '>
            <Link className='mx-3 dark:hover:text-orange-200 duration-300 hover:opacity-70' href="/">Home</Link>
            <Link className='mx-3 dark:hover:text-orange-200 duration-300 hover:opacity-70' href="/product">Product</Link>
            <Link className='mx-3 dark:hover:text-orange-200 duration-300 hover:opacity-70' href="/login">Login</Link>
            <Link className='mx-3 dark:hover:text-orange-200 duration-300 hover:opacity-70' href="/register">Register</Link>
            <Link className='mx-3 dark:hover:text-orange-200 duration-300 hover:opacity-70' href="/me">Profile</Link>
        </div>
    );
}

export default Menu;
