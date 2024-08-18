'use client';
import React, { useState } from 'react';
import "../../libs/styles/ui/button.scss";
import { CircularProgress } from '@mui/material';

interface Props {
    text: string,
    style?: string,
    hasIntrospect?: boolean,
    primary: boolean,
    disable?: boolean,
    callback: () => void;
}

const Button: React.FC<Props> = ({
    text,
    style,
    hasIntrospect = false,
    primary = true,
    disable = false,
    callback
}) => {


    const [isLoading, setLoading] = useState(false);

    const handleClick = () => {

        if (isLoading) return;
        setLoading(true);

        if (hasIntrospect) {
            //check
        }

        setTimeout(() => {
            callback();
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
            {isLoading ? <div className='flex items-center gap-1'>
                <CircularProgress style={{ width: '19px', height: '19px' }} />
                <span>Loading</span>
            </div> : text}
        </button>
    )
}

export default Button