import React from 'react';
import { cookies } from 'next/headers';
import axios from 'axios';
import envConfig from '../../../config';
import { redirect } from 'next/navigation';

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
                <h1>Xin chao {response.data.data.name}</h1>
            </div>
        );
    } catch (error) {
        redirect(`/me/logout?sessionToken=${token}`);
    }
}

export default PageMe;
