'use client';
import { fetchOrderDetail } from '@/app/actions/orderDetail.action';
import { useOrderItemDetail } from '@/libs/contexts/orderItemDetail.content';
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AvatarCustom from '../ui/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import OrderActivity from './OrderActivity';
import { Button } from '../ui';
import http from '@/libs/configs/http';

interface Props {
}

interface IDetail {
    address: string,
    createdAt: string,
    deliveringAt: string,
    deliveredAt: string,
    cancelAt: string,
    phone: string,
    receiver: string,
    status: string
    user: { email: string, avatar: string | null, fullname: string }
}

const OrderItemDetail: React.FC<Props> = () => {

    const { orderId } = useOrderItemDetail();

    //states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [detail, setDetail] = useState<IDetail | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchOrderDetail(orderId)
            .then((res) => {
                console.log({ res000: res })
                setLoading(false);
                setOrders(res?.content?.orders);
                setDetail({
                    address: res?.content?.address,
                    createdAt: res?.content?.createdAt,
                    deliveredAt: res?.content?.deliveredAt,
                    deliveringAt: res?.content?.deliveringAt,
                    cancelAt: res?.content?.cancelAt,
                    phone: res?.content?.phone,
                    receiver: res?.content?.receiver,
                    status: res?.content?.status,
                    user: { email: res?.content?.user?.email, avatar: res?.content?.user?.avatar, fullname: res?.content?.user?.fullName }
                })
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            })
    }, [orderId]);

    //
    const handleCancel = async (orderId: string) => {
        const res = await http.delete(`/orders/cancel/${orderId}`, true);
        console.log('delete', res);
    }

    if (error || !detail) {
        return <div className='relative w-[1000px] flex justify-center items-center'>
            <div className='absolute top-5 left-5'>{'<-'}</div>
            <p className='text-4xl font-semibold'>Something is wrong!</p>
        </div>
    }

    if (loading) {
        return <div className='relative w-[1000px] h-full flex justify-center items-center'>
            <div className='absolute top-5 left-5'>{'<-'}</div>
            <p className='text-4xl font-semibold'>LOADING...</p>
        </div>
    }

    return (
        <div className='w-[1300px] p-8'>
            <div>
                <h2 className='font-semibold text-3xl mb-1 mb-4'>Order <span className='font-medium text-2xl'>#{orderId}</span> </h2>
                <p className='font-medium text-zinc-500 mb-4'>Status: <span style={{ backgroundColor: 'var(--primaryBlue)' }} className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${detail.status === 'CANCEL' ? '!bg-red-500' : ''}`}>{detail.status}</span></p>
                <p className='font-medium text-zinc-500'>Created at {detail.createdAt}</p>
            </div>
            <div className='grid grid-cols-12 gap-3 mt-4'>
                <div className='col-span-9 rounded-lg'>
                    <div>
                        {
                            orders.map((order, idx) => {
                                return <div className='flex items-center py-4 mb-4 rounded-lg' style={{ backgroundColor: '#f7f7f9' }} key={idx}>
                                    <div className='w-[140px] px-4 py-2 flex items-center justify-center'>
                                        <img className='object-cover w-full' src={order?.productFrontImage} alt="" />
                                    </div>
                                    <div className='flex-1 max-w-[380px]'>
                                        <h3 className='font-medium mb-3 max-w-[380px] text-wrap'>{order?.productName?.replaceAll("-", " ")}</h3>
                                        <p className='text-sm mb-3'>Size: <span>{order?.sizeTag}</span></p>
                                        <div className='flex items-center gap-2'>
                                            {
                                                order?.colors.map((color: string, idx: number) => {
                                                    return <div key={idx} style={{ backgroundColor: `${color}`, borderColor: `${color}`, boxShadow: `inset 0 0 0 2px white` }} className='w-[25px] h-[25px] rounded-full border'></div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='px-4'>
                                        <p className='font-medium text-sm'>{order?.price?.toLocaleString()} vnd</p>
                                    </div>
                                    <div className='px-4'>
                                        <p className='font-medium text-sm'>{order?.amount}</p>
                                    </div>
                                    <div className='px-4'>
                                        <p className='font-semibold text-sm'>{(order?.amount * order?.price)?.toLocaleString()} vnd</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className='flex items-center gap-5 mb-6'>
                        <div className='w-1/2 p-4 rounded-lg' style={{ backgroundColor: '#f7f7f9' }}>
                            <h3 className='text-2xl font-semibold'>Summary</h3>
                            <div className='flex items-center justify-between py-2'>
                                <p className='text-sm font-medium'>Subtotal</p>
                                <p className='text-sm'>1.000.000 vnd</p>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <p className='text-sm font-medium'>Shipping</p>
                                <p className='text-sm'>0 vnd</p>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <p className='text-sm font-medium'>Tax</p>
                                <p className='text-sm'>0 vnd</p>
                            </div>
                            <Divider />
                            <div className='flex items-center justify-between py-2'>
                                <p className='text-sm font-medium'>Total</p>
                                <p className='text-sm'>0 vnd</p>
                            </div>
                        </div>
                        <div className='w-1/2 p-4 rounded-lg' style={{ backgroundColor: '#f7f7f9' }}>
                            <h3 className='text-2xl font-semibold'>Shipping</h3>
                            <div className='flex items-center gap-3 py-7'>
                                <LocalShippingIcon className='text-5xl' />
                                <div>
                                    <p className='font-medium'>GHN Delivery</p>
                                    <p className='text-sm'>Saturday & Sunday Delivery</p>
                                </div>
                            </div>
                            <button style={{ backgroundColor: 'var(--primaryBlue)' }} className='w-full rounded-lg px-6 py-2 text-white'>View detail</button>
                        </div>
                    </div>
                    <div className='p-4 rounded-lg' style={{ backgroundColor: '#f7f7f9' }}>
                        <h3 className='font-semibold text-2xl mb-5'>Activity</h3>
                        <div className='p-4'>
                            <OrderActivity orderState={detail.status} date={{
                                createdAt: detail?.createdAt,
                                deliveredAt: detail?.deliveredAt,
                                deliveringAt: detail?.deliveringAt,
                                cancelAt: detail?.cancelAt
                            }} />
                        </div>
                    </div>
                </div>
                <div className='col-span-3 '>
                    <div className='rounded-lg p-4 sticky top-6' style={{ backgroundColor: '#f7f7f9' }}>
                        <h3 className='font-semibold text-3xl mb-1'>Customer</h3>
                        <div className='flex items-center gap-3 py-4'>
                            <AvatarCustom name={detail?.user.email} url={detail.user.avatar} />
                            <div>
                                <h2 className='font-medium'>{detail?.user.fullname}</h2>
                                <p className='text-sm'>{detail?.user.email}</p>
                            </div>
                        </div>
                        <Divider />
                        <div className='flex items-center gap-3 py-4'>
                            <EmailIcon />
                            <p className='text-sm'>{detail?.user.email}</p>
                        </div>
                        <Divider />
                        <div className='py-4'>
                            <h3 className='font-medium mb-3'>Shipping address</h3>
                            <p className='text-sm'>{detail?.address}</p>
                        </div>
                        <Divider />
                        <div className='py-4'>
                            <h3 className='font-medium mb-3'>Billing address</h3>
                            <ul>
                                <li className='flex items-center justify-between py-2'>
                                    <p className='text-sm font-medium'>Receiver</p>
                                    <p className='text-sm'>{detail?.receiver}</p>
                                </li>
                                <li className='flex items-center justify-between py-2'>
                                    <p className='text-sm font-medium'>Address</p>
                                    <p className='text-sm'>{detail?.address}</p>
                                </li>
                                <li className='flex items-center justify-between py-2'>
                                    <p className='text-sm font-medium'>Phone</p>
                                    <p className='text-sm'>{detail?.phone}</p>
                                </li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='py-4'>
                            <h3 className='font-medium mb-3'>Actions</h3>
                            <Button
                                callback={() => handleCancel(orderId)}
                                primary={false}
                                text="Cancel"
                                disable={detail.status === 'CANCEL'}
                                style={`w-full !rounded-lg px-4 py-2 mb-3`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderItemDetail