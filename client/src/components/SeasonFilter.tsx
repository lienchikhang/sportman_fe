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

    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const query = useSearchParams();
    const [filter, setFilter] = useState('');
    const [curChoice, setCurChoice] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [seasons, setSeasons] = useState<ISeason[]>([]);

    //fetch data
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

    //check has filter or not
    useEffect(() => {
        const params = new URLSearchParams(query as any);

        if (params.has('season')) {
            setCurChoice(`${params.get('season')}`)
        }
        else {
            setCurChoice('');
        }


    }, [query.toString()])

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
                    showNotice={() => { }}
                    disable
                />
                <Button
                    text='Apply'
                    primary
                    callback={handleConfirm}
                    showNotice={() => { }}
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
                    showNotice={() => { }}
                    style='!rounded-md'
                />
                <Button
                    text='Apply'
                    primary
                    callback={handleConfirm}
                    showNotice={() => { }}
                    style='!rounded-md'
                />
            </div>
        </React.Fragment>
    )
}

export default SeasonFilter