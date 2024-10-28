import axiosInstance from '@/libs/configs/axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import http from '@/libs/configs/http';

export async function GET() {
    const cookie = cookies().get("access")?.value || '';

    const rs = await http.post('/auth/introspect-token', {
        token: cookie,
    });

    console.log('rs in introspect server', rs);

    // Xử lý hoặc trả về cookies/token
    return NextResponse.json({ token: cookie });
}