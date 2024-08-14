import axios from "axios";
import envConfig from "../../config";
import { RegisterBodyType } from "@/schemaValidations/auth.schema";
import { toast } from "react-toastify";
import { MessageResType } from "@/schemaValidations/common.schema";

class Http{
    login = async(data:RegisterBodyType):Promise<boolean> =>{
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
                return true;
            } else {
                toast.error("Token không có trong phản hồi.");
                return false;
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
            console.error("Login error:", error);
            return false;
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
        })
    }

    logoutFromNextClientToServer = async() =>{
        await axios.post<MessageResType>(`/api/auth/logout`, null,{
            baseURL: ""
        })
    }
}

export default Http;

