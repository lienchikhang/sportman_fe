import Link from 'next/link';
import React from 'react';


const navs = [
    {
        title: 'Join SportClub',
        href: '/'
    },
    {
        title: 'Blog',
        href: '/'
    },
    {
        title: 'About SportMan',
        href: '/'
    },
    {
        title: 'CSKH',
        href: '/'
    },
    {
        title: 'Login',
        href: '/'
    }
]

const HeaderNav = () => {
    return (
        <>
            <ul className='nav__list'>
                <Link className='nav__item' href="/">84RISING</Link>
                <Link className='nav__item' href="/">COOLXPRINT</Link>
            </ul>
            <ul className='nav__list'>
                {navs.map((nav, idx) => {
                    return <Link className='nav__item' href={nav.href} key={idx}>{nav.title}</Link>
                })}
            </ul>
        </>
    )
}

export default HeaderNav