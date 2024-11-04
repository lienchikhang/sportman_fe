'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

export const Logo = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    }

    return (
        <div className='logo' onClick={handleClick}>
            <h1>SPORT <span>MAN</span></h1>
        </div>
    )
}
