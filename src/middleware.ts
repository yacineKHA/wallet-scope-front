import axios from "axios";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

    const token = req.cookies.get("a_token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    } else {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/check-auth`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        
            return NextResponse.next();
        } catch (error) {
            
        }
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};