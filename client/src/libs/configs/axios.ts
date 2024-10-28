import axios from "axios";
import { cookies } from "next/headers";
import http from "./http";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/sportman",
    // maxRate: 3,
});

// const refreshToken = async () => {

//     // const cookie = await fetch("http://localhost:3000/api/get-token", {
//     //     method: "GET",
//     // }).then((res) => res.json())
//     //     .catch((err) => console.log('err in get token'));

//     // console.log('has cookie', cookie);
//     // Gọi API refresh token
//     // const response = await axiosInstance.post('/auth/refresh-token', {
//     //     refreshToken: cookies().get("refresh")?.value || '', // Giả sử refresh token được lưu trong localStorage
//     // });
//     const response = await fetch("/api/get-refresh-token", {
//         method: "GET",
//     }).then((res) => res.json())
//         .catch((err) => console.log('errrrr in refresh token', err));

//     // Cập nhật access token mới
//     const newAccessToken = response.data.accessToken;
//     // localStorage.setItem('accessToken', newAccessToken);
//     cookies().set("access", newAccessToken);

//     console.log('new accccc', newAccessToken);

//     return false;
// };

axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, async function (error) {

    const originalRequest = error.config;


    // Kiểm tra nếu là lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu request cũ để tránh lặp lại nhiều lần

        try {
            // Gọi API để refresh token
            // const response = await fetch("http://localhost:3000/api/get-refresh-token", {
            //     method: "GET",
            // })
            //     .then((res) => res.json())
            //     .catch((err) => console.log('errrrr in refresh token', err));

            //get refresh


            const response = await http.refresh('http://localhost:8080/sportman/auth/refresh');

            console.log('da', response);

            // if (response?.status == 401) Promise.reject('loginExpired');

            // console.log('response in process refresh token', response);
            // const newAccessToken = response.data.accessToken;

            // cookies().set("access", newAccessToken);
            // console.log('new accessToken', newAccessToken);

            // if (!response) throw new Error("No new access token");

            // Thêm token mới vào header Authorization
            originalRequest.headers['Authorization'] = `Bearer ${'newAccessToken'}`;

            // Thực hiện lại request cũ
            // return axiosInstance(originalRequest);
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