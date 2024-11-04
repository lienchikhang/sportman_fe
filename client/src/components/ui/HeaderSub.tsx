import { headerSub } from '@/libs/constants/userHeader';
import React from 'react';

const HeaderSub = () => {
    return (
        <>
            {headerSub.map((sub, idx) => {
                return <div className='main-nav-item' key={idx}><p>{sub}</p></div>
            })}
        </>
    )
}

export default HeaderSub