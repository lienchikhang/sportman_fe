'use client';
import React from 'react'
import SidebarMeny from './SidebarMeny';
import { usePathname } from 'next/navigation';
import UserInfo from './UserInfo';
import UserOrder from './UserOrder';

const RenderUser = () => {

    const pathname = usePathname();

    const renderContent = () => {
        switch (pathname) {
            case '/me/info':
                return <UserInfo />;
            case '/me/order-history':
                return <UserOrder />;
            case '/me/vouchers':
                return <h2>Lịch sử CoolCash</h2>;
            case '/me/addresses':
                return <h2>Sổ địa chỉ</h2>;
            default:
                return <h2>Thông tin tài khoản</h2>; // Default là profile
        }
    };

    return (
        <>
            <div className='col-span-4  '>
                <SidebarMeny />
            </div>
            <div className='col-span-8'>
                {renderContent()}
            </div>
        </>
    )
}

export default RenderUser