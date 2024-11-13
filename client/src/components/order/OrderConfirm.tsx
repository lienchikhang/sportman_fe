'use client';
import { useOrder } from '@/libs/contexts/order.context';
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { Button } from '../ui';
import notificationEmitter from '@/libs/configs/eventDriven';

const OrderConfirm = () => {

    const { data } = useOrder();

    const totalPay = data.orders.reduce((acc, cur) => {
        return acc + cur.amount;
    }, 0);

    const handleOrder = () => {

        //check order info
        if (!data.address ||
            !data.email ||
            !data.method ||
            !data.phone ||
            !data.receiver ||
            !data.orders.length
        ) {
            notificationEmitter.emit('error', 'Please fill out order\' information');
            return;
        }

        if (data.method == 'cod') {

        }

        if (data.method == 'vnpay') {

        }
    }

    return (
        <div className='w-full fixed left-0 bottom-0 z-50 flex items-center bg-white' style={{ boxShadow: `0 -4px 8px 0 rgba(0,0,0,.039)` }}>
            <div className="w-1/2 flex items-center py-6" style={{ backgroundColor: `#eaeefa` }}>
                <div className='w-1/2 flex justify-center relative items-center after:block  after:w-[1px] after:h-full after:absolute after:right-0 after:top-0 after:bg-zinc-500'>
                    {data.method == 'cod' ? <LocalShippingIcon className='text-5xl' /> : <PaymentIcon className='text-5xl' />}
                </div>
                <p className='w-1/2 text-sm font-semibold text-center' style={{ color: `var(--primaryBlue)` }}>you still haven't applied voucher yet</p>
            </div>
            <div className="w-1/2 flex">
                <div className='p-6 w-1/2'>
                    <p className='text-sm font-medium text-right px-'>Total price:  <span className='text-base font-semibold' style={{ color: `var(--primaryBlue)` }}>{totalPay}</span></p>
                </div>
                <Button
                    callback={() => handleOrder}
                    primary
                    text={data.method == 'cod' ? 'Place Order' : 'Pay Online'}
                    onlyLoading
                    hasIntrospect
                    style='px-8 w-1/2'
                />
            </div>
        </div>
    )
}

export default OrderConfirm