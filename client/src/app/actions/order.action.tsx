'use server';
import axiosInstance from '@/libs/configs/axios';
import { cookies } from 'next/headers';
import React from 'react'

export async function fetchOrder(page: number = 1) {

    const cookie = cookies().get('access')?.value;

    try {
        const response = await axiosInstance.get(`/orders/get-by-user?sort=desc&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${cookie}`
            }
        });

        console.log({ orderRes: response });
        return response.data;
    } catch (err: any) {
        console.log('actionError', err?.data);
    }

}