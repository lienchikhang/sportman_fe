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

    const originalRequest = error.config;


    // Kiểm tra nếu là lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu request cũ để tránh lặp lại nhiều lần

        try {

            // Gọi API để refresh token
            const cookie = await fetch("http://localhost:3000/api/get-refresh-token", {
                method: "GET",
            })
                .then((res) => res.json())
                .catch((err) => console.log('errrrr in refresh token', err));

            console.log('refresh token', cookie.token);

            // const response = await http.refresh('http://localhost:8080/sportman/auth/refresh');
            const response = await axios.post(`http://localhost:8080/sportman/auth/refresh`, {
                token: cookie.token,
            });

            console.log('response from refresh token', response.status);
            console.log('response body from refresh token', response.data);

            // if (response?.status == 401) Promise.reject('loginExpired');

            // console.log('response in process refresh token', response);
            const newAccessToken = response.data?.content?.accessToken;

            //set cookie server
            const rs = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                body: JSON.stringify(response)
            })
            await rs.json();

            console.log('rs setting cookie server', rs);

            // if (!response) throw new Error("No new access token");
            await new Promise(resolve => setTimeout(resolve, 100));

            // Thêm token mới vào header Authorization
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Thực hiện lại request cũ
            console.log("Retrying original request with new access token:", originalRequest);
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            console.log('error in out of process', refreshError);
            console.log('out of process');
            // Xử lý nếu refresh token thất bại (ví dụ: logout user)
            return Promise.reject(refreshError);
        }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosInstance;