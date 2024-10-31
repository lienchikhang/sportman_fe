'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Skeleton } from '@mui/material';
import '../libs/styles/filterPart.scss';
import { Button, Error } from './ui';
import http from '@/libs/configs/http';

interface IClub {
    clubName: string,
    colorHex: string,
    shortName: string
}

const ClubFilter = () => {

    const query = useSearchParams();
    const [curChoice, setCurChoice] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [seasons, setSeasons] = useState<IClub[]>([]);

    //fetch data
    useEffect(() => {
        setLoading(true);
        http.get("/clubs")
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setSeasons(res?.data?.content);
                setLoading(false);
            })
            .catch((err) => { setError(true); setLoading(false); })
    }, []);

    //check has filter or not
    useEffect(() => {
        const params = new URLSearchParams(query as any);

        if (params.has('club')) {
            setCurChoice(`${params.get('club')}`)
        }
        else {
            setCurChoice('');
        }


    }, [query.toString()])

    const handleChoice = (club: IClub) => {
        const params = new URLSearchParams(query as any);

        if (curChoice == club.clubName.toLowerCase()) {
            params.delete('club');
            setCurChoice("");
        } else {
            setCurChoice(club.clubName.toLowerCase());
            params.set("club", club.clubName.toLowerCase());
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    if (error) {
        return <Error />
    }

    if (loading) {
        return <>
            <div className='flex flex-wrap items-center gap-2 mb-4'>
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
                <Skeleton variant="rounded" width={135} height={36} />
            </div>
        </>
    }


    return (
        <>
            <div className='flex flex-wrap items-center gap-2 mb-4'>
                {
                    seasons && seasons.map((club, idx) => {
                        return <div style={{ background: `${club.colorHex}` }} className={`seasonItem text-white ${curChoice == club.clubName.toLowerCase() ? 'active' : ''}`} key={idx} onClick={() => handleChoice(club)}>
                            <span>{club.shortName.toUpperCase()}</span>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default ClubFilter;