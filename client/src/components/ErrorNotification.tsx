'use client';
import notificationEmitter from '@/libs/configs/eventDriven';
import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ErrorNotification = () => {

    const [msg, setMsg] = useState('');
    const [isHidden, setHidden] = useState(true);

    useEffect(() => {

        notificationEmitter.on('error', (msg) => {
            setMsg(msg);
            setHidden(false);
        });

        return () => {
            notificationEmitter.off('error', () => { });
        };

    }, []);

    useEffect(() => {
        if (isHidden) return;
        setTimeout(() => {
            setHidden(true);
        }, 3000);
    }, [isHidden])

    return (
        <Alert className={`${isHidden ? 'opacity-0' : 'opacity-100'} fixed bottom-7 right-7 z-[100] transition-opacity`} variant="filled" severity='error'>
            {msg}
        </Alert>
    )
}

export default ErrorNotification