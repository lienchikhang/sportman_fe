import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

    //get token
    const local = cookies().get('refresh')?.value;

    if (local) {
        try {
            const rs = await fetch('http://localhost:8080/sportman/auth/introspect-refresh-token', {
                method: 'POST',
                body: JSON.stringify({ token: local }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json());

            if (rs?.content?.auth) {
                if (request.nextUrl.pathname.includes('auth')) return NextResponse.redirect(new URL('/', request.url))
            }

        } catch (error: any) {
            console.log('catch error in introspect', error?.response?.data);
            if (request.nextUrl.pathname.includes('me')) return NextResponse.redirect(new URL('/', request.url));

        }

        return NextResponse.next();

    } else {
        if (request.nextUrl.pathname.includes('me')) return NextResponse.redirect(new URL('/', request.url));

        return NextResponse.next();

    }
}

export const config = {
    matcher: [
        '/auth/:path*',
        '/me/cart'
    ]
}