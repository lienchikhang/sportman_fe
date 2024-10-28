'use client';
import React from 'react'
import "../../libs/styles/ui/logo.scss";
import { useRouter } from 'next/navigation';

export const Logo = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push("/home");
    }

    return (
        <div className='logo' onClick={handleClick}>
            <h1>SPORTMAN</h1>
        </div>
    )
}
