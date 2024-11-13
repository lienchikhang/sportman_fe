'use server';

import axiosInstance from "@/libs/configs/axios";
import { cookies } from "next/headers";

export async function fetchCart() {

  const cookie = cookies().get('access')?.value;

  const res = await fetch(`http://localhost:8080/sportman/carts?pageSize=12`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${cookie}`
    }
  });

  const response = await axiosInstance.get(`/carts?pageSize=12`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${cookie}`
    }
  });

  // const data = await response.json();

  return response.data;
}