import React from 'react';
import { cookies } from 'next/headers'
import axios from 'axios';
import envConfig from '../../../config';
const PageMe = async () => {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const response = await axios.get(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,  {
        headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${sessionToken?.value}`
        }
    });
    return (
        <div>
            <h1>Xin chao {response.data.data.name}</h1>
        </div>
    );
}

export default PageMe;
