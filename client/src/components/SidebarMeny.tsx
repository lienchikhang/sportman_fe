'use client';
import React from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MapIcon from '@mui/icons-material/Map';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/libs/contexts/user.context';

const SidebarMeny = () => {

    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        router.push('/')
    }

    return (
        <div className='w-full bg-white p-4  rounded-lg'>
            <Link href={'/me/info'} className={`w-full flex items-center gap-2 p-4 rounded-md ${pathname === '/me/info' ? 'bg-black' : 'bg-white'}`}>
                <AccountCircleIcon className={`text-2xl text-white ${pathname === '/me/info' ? 'text-white ' : 'text-black'}`} />
                <p className={`font-semibold ${pathname === '/me/info' ? 'text-white ' : 'text-black'}`}>Account information</p>
            </Link>
            <Link href={'/me/order-history'} className={`w-full flex items-center gap-2 p-4 rounded-md ${pathname === '/me/order-history' ? 'bg-black' : 'bg-white'}`}>
                <HistoryToggleOffIcon className={`text-2xl text-white ${pathname === '/me/order-history' ? 'text-white ' : 'text-black'}`} />
                <p className={`font-semibold ${pathname === '/me/order-history' ? 'text-white ' : 'text-black'}`}>Order history</p>
            </Link>
            <Link href={'/me/vouchers'} className={`w-full flex items-center gap-2 p-4 rounded-md ${pathname === '/me/vouchers' ? 'bg-black' : 'bg-white'}`}>
                <ConfirmationNumberIcon className={`text-2xl text-white ${pathname === '/me/vouchers' ? 'text-white ' : 'text-black'}`} />
                <p className={`font-semibold ${pathname === '/me/vouchers' ? 'text-white ' : 'text-black'}`}>Account vouchers</p>
            </Link>
            <Link href={'/me/addresses'} className={`w-full flex items-center gap-2 p-4 rounded-md ${pathname === '/me/addresses' ? 'bg-black' : 'bg-white'}`}>
                <AccountCircleIcon className={`text-2xl text-white ${pathname === '/me/addresses' ? 'text-white ' : 'text-black'}`} />
                <p className={`font-semibold ${pathname === '/me/addresses' ? 'text-white ' : 'text-black'}`}>Addresses</p>
            </Link>
            <a href="#" onClick={handleLogout} className={`w-full flex items-center gap-2 p-4 rounded-md ${pathname === '/me/addresses' ? 'bg-black' : 'bg-white'}`}>
                <p className={`font-semibold ${pathname === '/me/addresses' ? 'text-white ' : 'text-black'}`}>Logout</p>
            </a>
        </div>
    )
}

export default SidebarMeny