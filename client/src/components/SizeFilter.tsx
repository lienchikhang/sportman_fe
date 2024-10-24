'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Menu, Skeleton } from '@mui/material';
import '../libs/styles/filterPart.scss';
import { Button, Error } from './ui';
import http from '@/libs/configs/http';

interface ISize {
    sizeTag: string,
}

const SizeFilter = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const query = useSearchParams();
    const [filter, setFilter] = useState('');
    const [curChoice, setCurChoice] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sizes, setSizes] = useState<ISize[]>([]);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setLoading(true);
        http.get("/sizes")
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setSizes(res?.data?.content?.sizes);
                setLoading(false);
            })
            .catch((err) => { setError(true); setLoading(false); })
    }, []);

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

    const handleConfirm = () => {
        if (!filter) return;
        router.push(filter);
    }

    const handleCancel = () => {
        const params = new URLSearchParams(query as any);
        params.delete('size');
        setCurChoice("");
        setFilter('');
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleChoice = (size: ISize) => {
        if (!curChoice) {
            setCurChoice(size.sizeTag);
            updateQuery("size", size.sizeTag);
        }
        else {
            setCurChoice((prev) => prev + "-" + size.sizeTag);
            updateQuery("size", curChoice + "-" + size.sizeTag);
        }

    }

    if (error) {
        return <React.Fragment>
            <Error />
        </React.Fragment>
    }

    if (loading) {
        return <React.Fragment>
            <div className='size__wrapper'>
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={40} height={40} />
            </div>
            <div className="btn-section">
                <Button
                    text='Cancel'
                    primary={false}
                    callback={handleCancel}
                    style='!rounded-md'
                    disable
                />
                <Button
                    text='Apply'
                    primary
                    callback={handleConfirm}
                    style='!rounded-md'
                    disable
                />
            </div>
        </React.Fragment>
    }


    return (
        <React.Fragment>
            <div className='size__wrapper'>
                {
                    sizes && sizes.map((size, idx) => {
                        return <div className={`sizeItem ${curChoice.split("-").includes(size.sizeTag) ? 'active' : ''}`} key={idx} onClick={() => handleChoice(size)}>
                            <span>{size.sizeTag}</span>
                        </div>
                    })
                }
            </div>
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
        </React.Fragment>
    )
}

export default SizeFilter;