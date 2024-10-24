'use client';
import React, { useState } from 'react';
import "../../libs/styles/ui/button.scss";
import { CircularProgress } from '@mui/material';
import http from '@/libs/configs/http';

interface Props {
    text: string,
    style?: string,
    hasIntrospect?: boolean,
    primary: boolean,
    disable?: boolean,
    onlyLoading?: boolean,
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
    showNotice,
    callback
}) => {


    const [isLoading, setLoading] = useState(false);

    const handleClick = () => {

        if (isLoading) return;
        setLoading(true);

        if (hasIntrospect) {
            //check
            http.introspect(`auth/introspect-token`)
                .then((res) => {
                    callback();
                })
                .catch((err) => {
                    if (err.response.status == 400) {
                        setTimeout(() => {
                            showNotice('Please login!', false);
                            setLoading(false);
                        }, 1800)
                    }
                });
        }

        setTimeout(() => {
            // callback();
            setLoading(false);
        }, 1800)
    }

    return (
        <button
            type='button'
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