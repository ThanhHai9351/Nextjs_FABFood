export async function POST(request: Request) {
    try {
        const res = await request.json(); 
        const sessionToken = res.data?.data?.token;

        if (!sessionToken) {
            return new Response(
                JSON.stringify({ message: "Không thấy session token" }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify(res.data),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Path=/` 
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
