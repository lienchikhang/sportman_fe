import axiosInstance from '@/libs/configs/axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookie = cookies().get("access")?.value || '';

    console.log('getting token');
    // Xử lý hoặc trả về cookies/token
    return NextResponse.json({ token: cookie });
}