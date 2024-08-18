import React from 'react';
import "../libs/styles/header.scss";
import { Balance, Button, Cart, Logo, User } from './ui';
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
                    </div>
                    <div className="header__nav">
                        <Cart />
                        <Balance />
                        <User />
                    </div>
                </section>
                <div className="header__bottom"></div>
            </div>
        </header>
    )
}

export default Header