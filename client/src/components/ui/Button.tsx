'use client';
import React, { useState } from 'react';
import "../../libs/styles/ui/button.scss";
import { CircularProgress } from '@mui/material';
import http from '@/libs/configs/http';
import { useUser } from '@/libs/contexts/user.context';
import { useRouter } from 'next/navigation';

interface Props {
    text: string,
    style?: string,
    hasIntrospect?: boolean,
    primary: boolean,
    disable?: boolean,
    onlyLoading?: boolean,
    type?: any,
    timer?: number,
    showNotice: (mess: string, isSuccess: boolean) => void,
    callback: () => void;
}

const Button: React.FC<Props> = ({
    text,
    style,
    hasIntrospect = false,
    primary = true,
    disable = false,
    onlyLoading = false,
    type = "button",
    timer = 1800,
    showNotice,
    callback
}) => {


    const [isLoading, setLoading] = useState(false);
    const { logout } = useUser();
    const router = useRouter();

    const handleClick = () => {

        if (isLoading) return;
        setLoading(true);

        if (hasIntrospect) {
            //check
            http.introspect(`auth/introspect-token`)
                .then((res) => {
                    setTimeout(() => {
                        callback();
                        setLoading(false);
                    }, timer)
                })
                .catch((err) => {

                    console.log('err in hasIntrospect', err);

                    if (err?.response?.status == 400) {
                        setTimeout(() => {
                            showNotice('Please login!', false);
                            setLoading(false);
                        }, timer)
                    }

                    if (err?.response?.status == 401 && err?.response?.msg == 'LoginExpired') {
                        setTimeout(() => {
                            showNotice('Login Expired', false);
                            setLoading(false);
                            logout();
                            router.refresh();
                        }, timer)
                    }
                });
        } else {
            setTimeout(() => {
                callback();
                setLoading(false);
            }, timer)
        }
    }

    return (
        <button
            type={type}
            className={`
                button ${style ? style : ''}
                ${primary ? 'primary' : 'secondary'} 
                ${disable || isLoading ? "disabled" : ""}`
            }
            disabled={disable}
            onClick={handleClick}
        >
            {isLoading ? <div className={`flex items-center ${onlyLoading ? 'justify-center' : 'gap-1'}`}>
                {onlyLoading ? <CircularProgress style={{ width: '19px', height: '19px' }} /> : <span>Loading...</span>}
            </div> : text}
        </button>
    )
}

export default Button