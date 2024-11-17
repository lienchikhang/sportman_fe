'use client';
import { IOrderItem } from '@/libs/interfaces/order.interface';
import { Chip, Drawer } from '@mui/material';
import React, { useState } from 'react';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import Link from 'next/link';
import OrderItemDetail from './OrderItemDetail';
import { useOrderItemDetail } from '@/libs/contexts/orderItemDetail.content';

interface Props {
    data: IOrderItem,
    toggleDrawer: (value: boolean) => void,
}

const OrderItem: React.FC<Props> = ({ data, toggleDrawer }) => {

    const { handleToggle } = useOrderItemDetail();


    const handleChoose = (orderId: string) => {
        console.log('clicked')
        toggleDrawer(true);
        handleToggle(orderId);
    }

    return (
        <>
            <tr className='border-b border-gray-200'>
                <td className='border border-gray-200 px-4 py-3 text-sm text-gray-700'>{data?.orderId}</td>
                <td className='border border-gray-200 px-4 py-3 text-sm text-gray-700'>{data?.createdAt}</td>
                <td className='border border-gray-200 px-4 py-3 text-sm text-gray-700'>
                    {data?.status == 'PAID' ? <Chip label={data?.status} color="success" /> : <Chip label={data?.status} color="primary" />}
                </td>
                <td className='border border-gray-200 px-4 py-3 text-sm text-gray-700'>
                    <div className="">
                        <button onClick={() => handleChoose(data?.orderId)}>
                            <QueuePlayNextIcon />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default OrderItem