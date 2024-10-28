'use client';
import { Chip } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AppliedFilters = () => {

    const params = useSearchParams();
    const [filters, setFilters] = useState<string[]>([]);
    const route = useRouter();
    const pathname = usePathname();
    const query = new URLSearchParams(params as any);
    useEffect(() => {
        const fils = query.toString().split('&');
        fils.splice(0, 2);
        setFilters(fils);
    }, [params.toString()]);

    const handleDelete = (key: string) => {
        if (key == 'sort') return;
        const params = new URLSearchParams(query as any);
        params.delete(key);
        route.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className='mt-4 flex items-center gap-2'>
            <p className='text-zinc-500 font-medium'>Applied filters:</p>
            {
                filters.map((filter, idx) => {
                    return <Chip
                        key={idx}
                        //check is falsy or not, if falsy => type = NaN => no need to add "<="
                        label={+filter.split('=')[1] ? `<= ${filter.split('=')[1]}` : filter.split('=')[1]}
                        variant="outlined"
                        disabled={filter.split('=')[0] == 'sort'}
                        onDelete={() => handleDelete(filter.split('=')[0])}
                    />
                })
            }
        </div>
    )
}

export default AppliedFilters
