import axios from "axios";
import envConfig from "../../config";
import { RegisterBodyType,LoginBodyType } from "@/schemaValidations/auth.schema";
import { toast } from "react-toastify";
import { MessageResType } from "@/schemaValidations/common.schema";
import { UpdateMeBodyType } from "@/schemaValidations/account.schema";
import { CreateProductBodyType } from "@/schemaValidations/product.schema";

class Http{
    login = async(data:LoginBodyType):Promise<string> =>{
        try {
            const response = await axios.post(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, data, {
                headers: { 'Content-Type': 'application/json' }
            });

            const token = response.data.data?.token;

            if (token) {
                await axios.post('/api/auth', { data: response.data }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                toast.success("Đăng nhập thành công");
                return token;
            } else {
                toast.error("Token không có trong phản hồi.");
                return "";
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
            console.error("Login error:", error);
            return "";
        }
    }

    register = async(data : RegisterBodyType):Promise<boolean> =>{
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response)
            {
                toast.success("Đăng ký thành công");
            }
            return true;
        } catch (error) {
            console.error('Error registering:', error);
            toast.error("Đăng ký thất bại. Vui lòng thử lại.");
            return false;
        }
    }

    logoutFromNextServerToServer = async(sessionToken: string) =>{
        await axios.post<MessageResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {},{
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        }).catch(()=>{
            console.log("aloo");
        })
    }

    logoutFromNextClientToServer = async() =>{
        await axios.post<MessageResType>(`/api/auth/logout`, null,{
            baseURL: ""
        })
    }

    updateAccount = async(data:UpdateMeBodyType,sessionToken : string):Promise<boolean> =>{
        console.log(sessionToken);
        try{
            const res = await axios.put(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,data,{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionToken}`
                }
            })
            console.log(res.data);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    createProduct = async(data:CreateProductBodyType, sessionToken : string):Promise<boolean> =>{
        try {
            const res = await axios.post(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/products`,data,{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionToken}`
                }
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    uploadImage = async(data: FormData,sessionToken : string)=>{
        try{
            const res = await axios.post(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/media/upload`,data,{
                headers:{
                    Authorization: `Bearer ${sessionToken}`
                }
            })
            return res.data.data;
        }catch(error)
        {
            console.log(error);
            return "";
        }
    }

    getAllProducts = async() =>{
        try {
            const res = await axios.get(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/products`)
            return res.data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    deleteProduct = async(id: number, sessionToken: string):Promise<boolean> =>{
        try {
            const response = await axios.delete(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`,{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionToken}`,
                }
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}


export default Http;

