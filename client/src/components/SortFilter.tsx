'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';

const SortFilter = () => {

    const params = useSearchParams();
    const pathname = usePathname();
    const route = useRouter();
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
        const query = new URLSearchParams(params as any);
        query.set('sort', toggle ? 'asc' : 'desc');
        route.push(`${pathname}?${query}`);
    }

    return (
        <div className='flex items-center gap-3'>
            <p className='text-zinc-400 font-medium'>Sort date by</p>
            <button className={`px-3 py-1 border-2 rounded-md ${toggle ? 'active' : ''}`} onClick={handleToggle}>
                {
                    toggle ? 'Newest' : 'Oldest'
                }
            </button>
        </div>
    )
}

export default SortFilter