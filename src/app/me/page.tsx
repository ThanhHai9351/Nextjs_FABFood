import React from 'react';
import { cookies } from 'next/headers';
import axios from 'axios';
import envConfig from '../../../config';
import { redirect } from 'next/navigation';
import ProfileForm from '@/app/me/profile-form';
import ButtonLogout from '@/components/ui/button-logout';

const PageMe = async () => {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    const token = sessionToken?.value;

    try {
        const response = await axios.get(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken?.value}`
            }
        });

        return (
            <div>
                <ButtonLogout /> 
                <h1>Xin chao</h1>
                <div className='m-4'>
                <ProfileForm profile={response.data.data} />
                </div>
            </div>
        );
    } catch (error) {
        redirect(`/me/logout?sessionToken=${token}`);
    }
}

export default PageMe;
