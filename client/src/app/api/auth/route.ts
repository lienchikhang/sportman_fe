import axiosInstance from '@/libs/configs/axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request, res: NextResponse) {

    const payload = await new Response(req.body).json();

    // console.log({ payloadInSer: payload?.data?.content });

    const accessToken = payload?.data?.content?.accessToken;
    const refreshToken = payload?.data?.content?.refreshToken;

    cookies().set("access", accessToken);
    cookies().set("refresh", refreshToken);

    // Xử lý hoặc trả về cookies/token
    return NextResponse.json({ isDone: true });
}