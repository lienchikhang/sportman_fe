'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import '../libs/styles/filterPart.scss';
import { Button } from './ui';

const PriceFilter = () => {

    const query = useSearchParams();
    const [filter, setFilter] = useState('');
    const [curPrice, setCurPrice] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(query as any);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setFilter(`${pathname}?${params.toString()}` as string);
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuery(e.currentTarget.name, e.currentTarget.value);
        setCurPrice(+e.currentTarget.value);
    }

    const handleConfirm = () => {
        if (!filter) return;
        router.push(filter);
    }

    const handleCancel = () => {
        const params = new URLSearchParams(query as any);
        params.delete('price');
        setCurPrice(0);
        setFilter('');
        router.push(`${pathname}?${params.toString()}`);
    }


    return (
        <div className="navbar__menu relative">
            <input min={10000} max={10000000} name='price' type="text" value={curPrice} placeholder="Enter budget" className="input-price" onChange={handleChangeSelect} />
            <div className="btn-section">
                <Button
                    text='Cancel'
                    primary={false}
                    callback={handleCancel}
                    style='!rounded-md'
                />
                <Button
                    text='Apply'
                    primary
                    callback={handleConfirm}
                    style='!rounded-md'
                />
            </div>
        </div>
    )
}

export default PriceFilter