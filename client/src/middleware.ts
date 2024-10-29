import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import http from './libs/configs/http';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

    //get token
    const local = cookies().get('access')?.value;

    console.log('local cookies', local);
    console.log('next_url', request.nextUrl);
    console.log('path', request.nextUrl.pathname)

    if (local) {

        console.log('has cookie');

        try {
            const rs = await http.post('/auth/introspect-token', {
                token: local,
            });

            console.log('resssss', rs)

            if (rs?.data?.content?.auth) {
                if (request.nextUrl.pathname.includes('') || request.nextUrl.pathname.includes('register')) return NextResponse.redirect(new URL('/home', request.url))
            }

        } catch (error) {
            console.log('catch error in introspect', error);
        }

        console.log('after cookie');

        return NextResponse.next();

    } else {
        // if (!request.nextUrl.pathname.includes('login') && !request.nextUrl.pathname.includes('register')) return NextResponse.redirect(new URL('/auth/login', request.url));
        if (request.nextUrl.pathname.includes('me')) return NextResponse.redirect(new URL('/', request.url));

        return NextResponse.next();

    }
}

export const config = {
    matcher: [
        '/',
        '/register',
        '/home/me/:path*',
        '/payment/:path*'
    ]
}