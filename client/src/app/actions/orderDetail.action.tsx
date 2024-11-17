'use server';
import axiosInstance from "@/libs/configs/axios";
import { cookies } from "next/headers";

export async function fetchOrderDetail(orderId: string) {

    const cookie = cookies().get('access')?.value;

    try {
        const response = await axiosInstance.get(`/orders/get-by-user/${orderId}`, {
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