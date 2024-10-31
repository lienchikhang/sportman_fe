import axiosInstance from '@/libs/configs/axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import http from '@/libs/configs/http';

export async function GET() {
    const cookie = cookies().get("refresh")?.value || '';

    console.log('get refresh token', cookie);
    // Xử lý hoặc trả về cookies/token
    return NextResponse.json({ token: cookie });
}