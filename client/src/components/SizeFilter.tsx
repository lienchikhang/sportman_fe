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

    //fetch data
    useEffect(() => {
        setLoading(true);
        http.get("/sizes?pageSize=12")
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setSizes(res?.data?.content?.sizes);
                setLoading(false);
            })
            .catch((err) => { setError(true); setLoading(false); })
    }, []);

    //check has filter or not
    useEffect(() => {
        const params = new URLSearchParams(query as any);

        if (params.has('size')) {
            //update state
            setCurChoice(`${params.get('size')}`)
        }
        else {
            setCurChoice('');
        }

    }, [query.toString()])

    const handleChoice = (size: ISize) => {

        const params = new URLSearchParams(query as any);
        const choices: string[] = curChoice.split('-');

        if (choices.includes(size.sizeTag)) {

            if (choices.length == 1) {
                params.delete("size");
                router.push(`${pathname}?${params.toString()}`);
                return;
            }

            const updateChoice = choices.filter((choice) => {
                return choice != size.sizeTag
            }).join('-');

            setCurChoice(updateChoice);
            params.set("size", updateChoice);
            router.push(`${pathname}?${params.toString()}`);
            return;
        }

        if (!curChoice) {
            choices.push(size.sizeTag);
            setCurChoice(choices.join('-'));
            // updateQuery("size", size.sizeTag);
            params.set("size", choices.join(''));
        }
        else {
            // setCurChoice((prev) => prev + "-" + size.sizeTag);
            choices.push(size.sizeTag);
            setCurChoice(choices.join('-'));
            // updateQuery("size", curChoice + "-" + size.sizeTag);
            params.set("size", choices.join('-'));
        }

        router.push(`${pathname}?${params.toString()}#att`);


    }

    if (error) {
        return <React.Fragment>
            <Error />
        </React.Fragment>
    }

    if (loading) {
        return <>
            <div className='size__wrapper'>
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={40} height={40} />
            </div>
        </>
    }


    return (
        <>
            <div className='size__wrapper'>
                {
                    sizes && sizes.map((size, idx) => {
                        return <div className={`sizeItem ${curChoice.split("-").includes(size.sizeTag) ? 'active' : ''}`} key={idx} onClick={() => handleChoice(size)}>
                            <span>{size.sizeTag}</span>
                        </div>
                    })
                }
            </div>
            {/* <div className="btn-section">
                <Button
                    text='Cancel'
                    primary={false}
                    showNotice={() => { }}
                    callback={handleCancel}
                    style='!rounded-md'
                />
                <Button
                    text='Apply'
                    primary
                    showNotice={() => { }}
                    callback={handleConfirm}
                    style='!rounded-md'
                />
            </div> */}
        </>
    )
}

export default SizeFilter;