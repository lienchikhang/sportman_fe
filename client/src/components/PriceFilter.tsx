'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Menu } from '@mui/material';
import '../libs/styles/filterPart.scss';
import { Button } from './ui';

const PriceFilter = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const query = useSearchParams();
    const [filter, setFilter] = useState('');
    const [curPrice, setCurPrice] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const open = Boolean(anchorEl);

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

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
        <div className="relative">
            <button className="navbar__btn" onClick={handleClick}>
                Budget
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            <Menu
                className="navbar__menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
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
            </Menu>
        </div>
    )
}

export default PriceFilter