import axios from "axios";
import { cookies } from "next/headers";
import http from "./http";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/sportman",
    // maxRate: 3,
});


axiosInstance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {

    console.log('running response interceptors')
    const originalRequest = error.config;


    // Kiểm tra nếu là lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu request cũ để tránh lặp lại nhiều lần

        try {

            //call api get refresh token
            const cookie = await fetch("http://localhost:3000/api/get-refresh-token", {
                method: "GET",
            }).then((res) => res.json())

            console.log('refresh token', cookie?.token);

            //call api refresh token
            const response = await axios.post(`http://localhost:8080/sportman/auth/refresh`, {
                token: cookie.token,
            });

            // if (response?.status == 401) Promise.reject('loginExpired');

            // console.log('response in process refresh token', response);
            const newAccessToken = response.data?.content?.accessToken;

            //set cookie server
            const rs = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                body: JSON.stringify(response)
            })
            await rs.json();

            // Thêm token mới vào header Authorization
            // [BE]:: điều chỉnh nhận token qua headers
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
        } catch (refreshError: any) {
            // console.log('error in out of process', refreshError?.response);
            return Promise.reject(refreshError?.response);
        }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosInstance;