'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Skeleton } from '@mui/material';
import '../libs/styles/filterPart.scss';
import { Button, Error } from './ui';
import http from '@/libs/configs/http';

interface ISeason {
    yearStart: number,
    yearEnd: number,
}

const SeasonFilter = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const query = useSearchParams();
    const [filter, setFilter] = useState('');
    const [curChoice, setCurChoice] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [seasons, setSeasons] = useState<ISeason[]>([]);
    const open = Boolean(anchorEl);


    useEffect(() => {
        setLoading(true);
        http.get("/seasons")
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setSeasons(res?.data?.content?.seasons);
                setLoading(false);
            })
            .catch((err) => { setError(true); setLoading(false); })
    }, []);

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

    // const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     updateQuery("season", e.currentTarget.value);
    //     // setCurPrice(+e.currentTarget.value);
    // }

    const handleConfirm = () => {
        if (!filter) return;
        router.push(filter);
    }

    const handleCancel = () => {
        const params = new URLSearchParams(query as any);
        params.delete('season');
        setCurChoice("");
        setFilter('');
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleChoice = (season: ISeason) => {
        setCurChoice(season.yearStart + "-" + season.yearEnd);
        updateQuery("season", season.yearStart + "-" + season.yearEnd);
    }

    if (error) {
        return <Error />
    }

    if (loading) {
        return <React.Fragment>
            <div className='flex flex-wrap items-center gap-2 mb-4'>
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
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
            <div className='flex flex-wrap items-center gap-2 mb-4'>
                {
                    seasons && seasons.map((ss, idx) => {
                        return <div className={`seasonItem ${curChoice == ss.yearStart + "-" + ss.yearEnd ? 'active' : ''}`} key={idx} onClick={() => handleChoice(ss)}>
                            <span>{ss.yearStart}</span>
                            <span>-</span>
                            <span>{ss.yearEnd}</span>
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

export default SeasonFilter