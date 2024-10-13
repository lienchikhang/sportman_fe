import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/sportman",
});

const refreshToken = async () => {

    const cookie = await fetch("/api/get-token", {
        method: "GET",

    }).then((res) => res.json());

    // Gọi API refresh token
    const response = await axiosInstance.post('/auth/refresh-token', {
        refreshToken: cookie.get("refresh")?.value || '', // Giả sử refresh token được lưu trong localStorage
    });

    // Cập nhật access token mới
    const newAccessToken = response.data.accessToken;
    // localStorage.setItem('accessToken', newAccessToken);
    cookie.set("access", newAccessToken);

    return newAccessToken;
};

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
            const newAccessToken = await refreshToken();

            // Thêm token mới vào header Authorization
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Thực hiện lại request cũ
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            // Xử lý nếu refresh token thất bại (ví dụ: logout user)
            return Promise.reject(refreshError);
        }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosInstance;