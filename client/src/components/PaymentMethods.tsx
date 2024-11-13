'use client';
import React, { useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { useOrder } from '@/libs/contexts/order.context';

const methods = [
    {
        icon: 'shipping',
        text: 'Thanh toán khi nhận hàng',
        methodCode: 'cod'
    },
    {
        icon: 'vnpay',
        text: 'Ví điện tử VNPAY',
        methodCode: 'vnpay'
    },
]

const PaymentMethods = () => {

    const [curChoice, setCurChoice] = useState('cod');
    const { handleSetMethod } = useOrder();

    const handleChooseMethod = (method: string) => {
        setCurChoice(method);
        handleSetMethod(method);
    }

    return (
        <>
            <h1 className='text-3xl font-semibold mb-5'>Payment Method</h1>
            <div className='w-full flex flex-col gap-3'>
                {
                    methods.map((method, idx) => {
                        return <div key={idx} onClick={() => handleChooseMethod(method.methodCode)} className={`method__wrapper ${curChoice == method.methodCode ? 'active' : ''}`}>
                            <span></span>
                            <div>
                                {method.icon == 'shipping' && <LocalShippingIcon className='text-4xl' />}
                                {method.icon == 'vnpay' && <PaymentIcon className='text-4xl' />}
                            </div>
                            <p className='text-sm font-semibold'>{method.text}</p>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default PaymentMethods