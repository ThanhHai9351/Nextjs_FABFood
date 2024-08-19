'use client'
import { Loading } from '@/components/ui/loading-component';
import Http from '@/lib/http';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DetailProductPage = () => {
    const [product,setProduct] = useState(null)
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    const http = new Http();

    useEffect(()=>{
        const getProduct = async() =>{
            const data = await http.getProduct(Number(id))
            return data;
        }

        getProduct()
        .then(res=>{
            setProduct(res)
        })
    },[])
    
    return (
        <div>
            Detail Product
            {product !== null ? 
            <div className='m-5'>
               <Image
                src={product.image} 
                alt={product.name}  
                width={400} 
                height={400} 
                quality={100} 
                                />
                <h2>Name : {product.name}</h2>
                <h2>Description : {product.description}</h2>
                <h2>Price : {product.price}</h2>
            </div> : <Loading />}
        </div>
    );
}

export default DetailProductPage;
