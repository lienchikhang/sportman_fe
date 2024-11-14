'use client';
import { useOrder } from '@/libs/contexts/order.context';
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { Button } from '../ui';
import notificationEmitter from '@/libs/configs/eventDriven';
import http from '@/libs/configs/http';
import { useRouter } from 'next/navigation';

const OrderConfirm = () => {

    const { data } = useOrder();
    const router = useRouter();

    const handleOrder = async () => {

        //check order info
        if (!data.address ||
            !data.email ||
            !data.method ||
            !data.phone ||
            !data.receiver ||
            !data.orders.length
        ) {
            if (!data.address) {
                notificationEmitter.emit('orderInfoMissingAddress', 'Please fill out order\' information');
            }

            if (!data.email) {
                notificationEmitter.emit('orderInfoMissingEmail', 'Please fill out order\' information');
            }

            if (!data.method) {
                notificationEmitter.emit('orderInfoMissingMethod', 'Please fill out order\' information');
            }

            if (!data.phone) {
                notificationEmitter.emit('orderInfoMissingPhone', 'Please fill out order\' information');
            }

            if (!data.receiver) {
                notificationEmitter.emit('orderInfoMissingReceiver', 'Please fill out order\' information');
            }

            if (!data.orders.length) {
                notificationEmitter.emit('orderInfoMissingOrders', 'Your cart is empty!');
            }

            return;
        }



        if (data.method == 'cod') {
            http.post(`/orders/create`, {
                orders: data?.orders,
                phone: data?.phone,
                receiver: data?.receiver,
                address: data?.address,
            }).then((res) => {
                console.log('rs in placing order cod', res);
            }).catch((err) => {
                console.log('err in placing order cod', err);
            })

            router.push('/me/payment_result=success');
            notificationEmitter.emit('order::success', 'Thank you for shopping!');

            return;
        }

        if (data.method == 'vnpay') {

            try {

                //save order
                const newOrder = await http.post(`/orders/create`, {
                    orders: data?.orders,
                    phone: data?.phone,
                    receiver: data?.receiver,
                    address: data?.address,
                });

                console.log({ newOrder });

                if (newOrder?.data?.statusCode != 201) {
                    //noti error
                    return;
                }

                const vnpayUrlRes = await http.get(`/vnpay/create-payment-url?amount=${data?.total}&vnp_txnRef=${newOrder?.data?.content?.orderId}&bankCode=VNBANK&vnp_OrderInfo="THANH TOAN CHO ORDER ${newOrder?.data?.content?.orderId}"`);

                if (vnpayUrlRes?.status != 200) {
                    //noti error
                    return;
                }

                const vnpayUrl = vnpayUrlRes?.data?.content?.paymentUrl;
                router.push(vnpayUrl);

                return;

            } catch (err) {

            }


            // router.push('/me/payment_result=success');
            // notificationEmitter.emit('order::success', 'Thank you for shopping!');

            return;
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
                    <p className='text-sm font-medium text-right px-'>Total price:  <span className='text-base font-semibold' style={{ color: `var(--primaryBlue)` }}>{data?.total?.toLocaleString()} VND</span></p>
                </div>
                <Button
                    callback={() => handleOrder()}
                    primary
                    text={data.method == 'cod' ? 'Place Order' : 'Pay Online'}
                    onlyLoading
                    hasIntrospect
                    style='px-8 !pt-2 w-1/2'
                />
            </div>
        </div>
    )
}

export default OrderConfirm