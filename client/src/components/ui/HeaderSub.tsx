import { headerSub } from '@/libs/constants/userHeader';
import React from 'react';

const HeaderSub = () => {
    return (
        <ul className='flex items-center justify-between'>
            {headerSub.map((sub, idx) => {
                return <li key={idx} className='px-2 py-2 cursor-pointer'>
                    <p className='text-sm text-zinc-500 font-medium'>
                        {sub}
                    </p>
                </li>
            })}
        </ul>
    )
}

export default HeaderSub