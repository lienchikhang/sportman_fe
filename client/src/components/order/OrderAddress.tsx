'ues client';
import notificationEmitter from '@/libs/configs/eventDriven';
import { useOrder } from '@/libs/contexts/order.context';
import React, { useEffect, useState } from 'react'

const OrderAddress = () => {

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const { handleSetAddress } = useOrder();

    useEffect(() => {
        notificationEmitter.on('orderInfoMissingAddress', (msg) => {
            console.log('err in email order', msg);
            setError(true);
        })

        return () => {
            notificationEmitter.off('orderInfoMissing', (msg) => { })
        }
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    }

    const handleSubmit = () => {
        if (!input) setError(true);
        else {
            setError(false);
            handleSetAddress(input);
        }
    }

    return (
        <div className={`flex flex-col flex-1 py-2`}>
            <label className={`text-sm font-medium ${error && "text-red-500"}`} htmlFor="">{`Address ${error ? "*" : ''}`}</label>
            <input
                type="text"
                placeholder="Type receiver's name"
                style={{ borderColor: `#d1d5db` }}
                className={`w-full px-6 py-2 text-sm rounded-full border outline-none ${error ? "!border-red-500" : ''} `}
                onChange={handleInput}
                onBlur={handleSubmit}
            />
        </div>
    )
}

export default OrderAddress;