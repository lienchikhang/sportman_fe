'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select, SelectChangeEvent } from '@mui/material';

const CommentFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [maxRate, setMaxRate] = useState(0);

    useEffect(() => {
        const query = new URLSearchParams(searchParams as any);
        const rate = query.get('rate');
        setMaxRate(rate ? +rate : 0);
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setMaxRate(+event.target.value);
        const query = new URLSearchParams(searchParams as any);
        if (+event.target.value == 0) {
            query.delete('rate');
        } else {
            query.set('rate', event.target.value);
        }

        router.push(`${pathname}?${query.toString()}#att`);
    };

    return (
        <div className='commentFilter__wrapper'>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    id="demo-select-small"
                    value={maxRate.toString()}
                    onChange={handleChange}
                >
                    <MenuItem value={0}>Rate star</MenuItem>
                    <MenuItem value={1}>1 star</MenuItem>
                    <MenuItem value={3}>2 stars</MenuItem>
                    <MenuItem value={3}>3 stars</MenuItem>
                    <MenuItem value={4}>4 stars</MenuItem>
                    <MenuItem value={5}>5 stars</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default CommentFilter