'use client';
import { fetchOrder } from '@/app/actions/order.action';
import { IOrder, IOrderItem } from '@/libs/interfaces/order.interface';
import { notFound, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import OrderItem from './order/OrderItem';
import { OrderItemDetailProvider } from '@/libs/contexts/orderItemDetail.content';
import { Drawer } from '@mui/material';
import OrderItemDetail from './order/OrderItemDetail';

const UserOrder = () => {

    //states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState<IOrderItem[]>([]);
    const [curPage, setCurPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [open, setOpen] = useState(false);

    //routes
    const params = useSearchParams();

    //fetching
    useEffect(() => {
        setLoading(true);
        fetchOrder()
            .then((res) => {
                console.log({ resOrder: res });
                setOrders(res?.content?.orders);
                setCurPage(res?.content?.currentPage);
                setTotalPage(res?.content?.totalPage);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
            })
    }, []);

    //methods
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setOpen(open);
            };

    const handleToggleDrawer = (value: boolean) => {
        setOpen(value);
    }

    //case loading
    if (loading) {
        return <div className='p-12 bg-white rounded-lg'>
            ...loading
        </div>
    }

    //case error
    if (error) {
        return notFound();
    }

    //case not found
    if (!orders?.length) {
        return <div className='p-12 bg-white rounded-lg'>
            <h2 className='text-3xl pb-4 font-medium'>Order history</h2>
            <p className='pb-4' style={{ color: '#777777' }}>Your orders</p>
            <div className='py-4 flex items-center justify-center'>
                <p className='text-2xl font-semibold'>Not found!</p>
            </div>
        </div>
    }

    //case default
    return (
        <div className='p-12 bg-white rounded-lg'>
            <h2 className='text-3xl pb-4 font-medium'>Order history</h2>
            <p className='pb-4' style={{ color: '#777777' }}>Your orders</p>
            <div className='py-2'>
                <table className='min-w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='border border-gray-200 px-4 py-4 text-left text-sm font-medium text-gray-700'>Order ID</th>
                            <th className='border border-gray-200 px-4 py-4 text-left text-sm font-medium text-gray-700'>Created at</th>
                            <th className='border border-gray-200 px-4 py-4 text-left text-sm font-medium text-gray-700'>Status</th>
                            <th className='border border-gray-200 px-4 py-4 text-left text-sm font-medium text-gray-700'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItemDetailProvider>
                            {orders.map((order, idx) => <OrderItem key={idx} data={order} toggleDrawer={handleToggleDrawer} />)}
                            <Drawer
                                anchor={'right'}
                                open={open}
                                onClose={toggleDrawer(false)}
                            >
                                <OrderItemDetail />
                            </Drawer>
                        </OrderItemDetailProvider>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserOrder;