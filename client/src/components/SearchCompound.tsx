'use client';
import { useSearch } from '@/libs/contexts/search.context';
import React, { useEffect, useState } from 'react'
import HeaderNav from './HeaderNav';
import SearchBar from './SearchBar';

const SearchCompound = () => {

    const { toggle } = useSearch();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
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

    return (
        <div className={`main__search ${toggle ? 'active' : 'unactive'} ${isHidden ? 'mt-[144px]' : ''}`}>
            <div className="header__nav">
                <HeaderNav />
            </div>
            <div className='header__sub-nav'>
                <p>New product: First time arrive at Sportman <span>Explore now</span> </p>
            </div>
            <div className='search__section'>
                <SearchBar />
            </div>
        </div>
    )
}

export default SearchCompound