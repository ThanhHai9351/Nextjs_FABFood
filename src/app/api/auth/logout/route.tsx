import Http from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    const http = new Http();

    if (!sessionToken) {
        return new Response(
            JSON.stringify({ message: "Không thấy session token" }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    try {
        const result = await http.logoutFromNextServerToServer(sessionToken.value)
        return new Response(
            JSON.stringify(result),
            {
                status: 200,
                headers: {
                    'Set-Cookie': `sessionToken=; HttpOnly; Path=/;Max-Age=0` 
                }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
}
