'use client';
import { useAppContext } from '@/app/AppProvider';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading-component';
import Http from '@/lib/http';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ProductPage = () => {
    const {sessionToken} = useAppContext();
    const router = useRouter();
    const http = new Http();
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const data = await http.getAllProducts();
        return data;
    };
    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res);
        }).catch((error) => {
            console.error("Failed to fetch products:", error);
        });
    }, []);

    const handleDeleteProduct =async (id: number) =>{
        const isDelete = await http.deleteProduct(id,sessionToken);
        if(isDelete)
        {
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            toast.success("Xóa thành công!");
        }else{
            toast.error("Xóa thất bại!");
        }
        
    }

    return (
        <div>
            <h1>Product Page</h1>
            <Button variant={'default'} onClick={()=>router.push('/product/add')}>Create Product</Button>
            {products.length > 0 ? (
                <div className='grid grid-cols-5 gap-4'>
                    {products.map((product, index) => (
                        <div key={index} className='border p-4'>
                            <div>
                                <Image 
                                    src={product.image} 
                                    alt={product.name}  
                                    width={200} 
                                    height={200} 
                                    quality={100} 
                                    className='m-auto' 
                                />
                            </div>
                            <Link href={`/product/detail?id=${product.id}`}>Name: {product.name}</Link>
                            <p>Description: {product.description}</p>
                            <span>Price: {product.price}</span>
                            <div className='m-2'>
                                <Button className='mr-3' variant={'outline'}>Edit</Button>
                                <Button onClick={()=>handleDeleteProduct(product.id)} variant={'destructive'}>Delete</Button>
                            </div>
                        </div>
                    ))}
                    <ToastContainer />
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default ProductPage;
