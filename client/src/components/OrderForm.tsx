'use client';
import { useUser } from '@/libs/contexts/user.context';
import React from 'react'
import OrderSelectProvince from './OrderSelectProvince';
import { AddressProvider } from '@/libs/contexts/address.context';
import OrderSelectDistinct from './OrderSelectDistinct';
import OrderSelectWard from './OrderSelectWard';
import PaymentMethods from './PaymentMethods';
import { Divider } from '@mui/material';
import { useOrder } from '@/libs/contexts/order.context';
import OrderReceiver from './order/OrderReceiver';
import OrderAddress from './order/OrderAddress';
import OrderEmail from './order/OrderEmail';
import OrderPhone from './order/OrderPhone';

const OrderForm = () => {

    const { user } = useUser();
    const { data } = useOrder();

    return (
        <form>
            <div className='flex items-center gap-7'>
                <OrderReceiver />
                <OrderPhone />
            </div>
            <OrderEmail />
            <OrderAddress />
            <div className='addressSelect__group'>
                {/* <AddressProvider>
                    <OrderSelectProvince />
                    <OrderSelectDistinct />
                    <OrderSelectWard />
                </AddressProvider> */}
            </div>
            <div className='pt-7'>
                <Divider />
            </div>
            <div className='payment__methods'>
                <PaymentMethods />
            </div>
        </form>
    )
}

export default OrderForm