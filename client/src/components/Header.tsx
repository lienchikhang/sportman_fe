'use client';
import React, { useEffect, useState } from 'react';
import "../libs/styles/header.scss";
import { Balance, Button, Cart, HeaderSub, Logo, User } from './ui';
import HeaderNav from './HeaderNav';
import SearchAction from './SearchAction';
import { SearchProvider } from '@/libs/contexts/search.context';
import SearchCompound from './SearchCompound';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {

    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Cuộn xuống, ẩn header
            setIsHidden(true);
        } else {
            // Cuộn lên, hiện header
            setIsHidden(false);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        // Gắn sự kiện scroll
        window.addEventListener('scroll', handleScroll);

        // Dọn dẹp sự kiện khi component bị huỷ
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        // Kiểm tra hash mỗi khi URL thay đổi
        const hash = window.location.hash;
        if (hash) {
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                setIsHidden(false); // Hiển thị header nếu có hash
            }
        }
    }, [window.location.hash]);


    return (
        <>
            <SearchProvider>
                <header className={`header ${isHidden ? 'active' : ''}`}>
                    <section className="header__nav">
                        <HeaderNav />
                    </section>
                    <section className='header__sub-nav'>
                        <p>New product: First time arrive at Sportman <span>Explore now</span> </p>
                    </section>
                    <section className="header__main">
                        <SearchCompound />
                        <div className="header__logo">
                            <Logo />
                        </div>
                        <div className="header__main-nav">
                            <HeaderSub />
                        </div>
                        <div className="header__actions">
                            <SearchAction />
                            <Cart />
                            <User />
                        </div>
                    </section>
                </header>
            </SearchProvider>
        </>
    )
}

export default Header