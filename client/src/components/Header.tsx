import React from 'react';
import "../libs/styles/header.scss";
import { Balance, Button, Cart, HeaderSub, Logo, User } from './ui';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <header>
            <div className="header__wrapper">
                <section className="header__top">
                    <div className="header__logo">
                        <Logo />
                    </div>
                    <div className="header__search">
                        <SearchBar />
                        <HeaderSub />
                    </div>
                    <div className="header__nav">
                        <Cart />
                        <Balance />
                        <User />
                    </div>
                </section>
            </div>
        </header>
    )
}

export default Header