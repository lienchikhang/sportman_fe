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

    const query = useSearchParams();
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

    const handleChoice = (season: ISeason) => {
        const params = new URLSearchParams(query as any);

        if (curChoice == season.yearStart + "-" + season.yearEnd) {
            params.delete('season');
            setCurChoice("");
        } else {
            setCurChoice(season.yearStart + "-" + season.yearEnd);
            params.set("season", season.yearStart + "-" + season.yearEnd);
        }

        router.push(`${pathname}?${params.toString()}#att`);
    }

    if (error) {
        return <Error />
    }

    if (loading) {
        return <>
            <div className='flex flex-wrap items-center gap-2 mb-4'>
                <Skeleton variant="rounded" width={120} height={36} />
                <Skeleton variant="rounded" width={120} height={36} />
                <Skeleton variant="rounded" width={120} height={36} />
                <Skeleton variant="rounded" width={120} height={36} />
                <Skeleton variant="rounded" width={120} height={36} />
                <Skeleton variant="rounded" width={120} height={36} />
            </div>
        </>
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
        </React.Fragment>
    )
}

export default SeasonFilter