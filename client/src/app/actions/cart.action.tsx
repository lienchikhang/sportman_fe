'use server';

import axiosInstance from "@/libs/configs/axios";
import http from "@/libs/configs/http";
import { cookies } from "next/headers";

export async function fetchCart() {

  const cookie = cookies().get('access')?.value;

  // const res = await fetch(`http://localhost:8080/sportman/carts?pageSize=12`, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${cookie}`
  //   }
  // });

  try {
    const response = await axiosInstance.get(`/carts?pageSize=12`, {
      headers: {
        'Authorization': `Bearer ${cookie}`
      }
    });

    console.log({ response });
    return response.data;
  } catch (err: any) {
    console.log('actionError', err?.data);
  }

}