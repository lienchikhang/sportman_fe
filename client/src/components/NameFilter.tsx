'use client';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NameFilter = () => {

    const query = useSearchParams();
    const [filter, setFilter] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        const params = new URLSearchParams(query as any);
        params.delete('name');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='nameFilter' onClick={handleClick}>
            <CancelIcon />
        </div>
    )
}

export default NameFilter