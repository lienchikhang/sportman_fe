'use client';
import React, { ReactNode, useState } from 'react';
import "../../libs/styles/ui/button.scss";
import { CircularProgress } from '@mui/material';
import http from '@/libs/configs/http';
import { useUser } from '@/libs/contexts/user.context';
import { useRouter } from 'next/navigation';
import notificationEmitter from '../../libs/configs/eventDriven';


interface Props {
    text: string | ReactNode,
    style?: string,
    hasIntrospect?: boolean,
    primary: boolean,
    disable?: boolean,
    onlyLoading?: boolean,
    type?: any,
    timer?: number,
    callback: (e?: React.MouseEvent<HTMLButtonElement>) => void;
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
    callback
}) => {


    const [isLoading, setLoading] = useState(false);
    const { logout } = useUser();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
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

                    if (err?.status == 400) {
                        setTimeout(() => {
                            setLoading(false);
                            notificationEmitter.emit('error', 'Please Login!')
                        }, timer)
                    }

                    if (err?.status == 401 && err?.data?.msg == 'LoginExpired') {
                        setTimeout(() => {
                            setLoading(false);
                            notificationEmitter.emit('error', 'Login Expired!')
                            logout();
                            router.refresh();
                        }, timer)
                    }
                });
        } else {
            setTimeout(() => {
                callback();
                notificationEmitter.emit('success', 'Add to cart successfully!')
                setLoading(false);
            }, timer)
        }
    }

    return (
        <>
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
                    {onlyLoading ? <CircularProgress style={{ width: '19px', height: '19px' }} /> : <span className='block text-center'>Loading...</span>}
                </div> : text}
            </button>
        </>
    )
}

export default Button;

/**
 * Map<String, Object> data = new HashMap<>();
            data.put("orders", orders);
            data.put("phone", request.getPhone());
            data.put("receiver", request.getReceiver());
            data.put("address", request.getAddress());
            data.put("address", request.getAddress());

            //create jsonString
            String jsonString = objectMapper.writeValueAsString(data);

            //endcode
            String encodeJson = URLEncoder.encode(jsonString, StandardCharsets.UTF_8.toString());
            return encodeJson;
 */