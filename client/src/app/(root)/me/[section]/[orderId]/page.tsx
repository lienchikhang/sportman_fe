import { fetchOrderDetail } from '@/app/actions/orderDetail.action';
import React from 'react';

const page = async ({ params }: { params: { orderId: string } }) => {

    const { orderId } = params;

    const data = await fetchOrderDetail(orderId);

    console.log({ data });
    console.log({ orders: data?.content?.orders });

    return <div className='px-16 py-10'>
        <div>{'<-'}</div>
        <div>
            <h2 className='font-semibold text-3xl mb-1'>Order <span className='font-medium text-2xl'>#{orderId}</span></h2>
            <p className='font-medium text-zinc-500'>Created at {data?.content?.createdAt}</p>
        </div>
        <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-9 rounded-lg' style={{ backgroundColor: '#f7f7f9' }}>

            </div>
            <div className='col-span-3 rounded-lg' style={{ backgroundColor: '#f7f7f9' }}></div>
        </div>
    </div>

}

export default page