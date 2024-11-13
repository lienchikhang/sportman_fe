import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import axiosInstance from "./axios";
import axios from "axios";
import Cookies from 'js-cookie';

const http = {

    async get(endpoint: string, isSecure: boolean = false): Promise<any> {

        const cookie = await fetch("http://localhost:3000/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        if (isSecure) {
            return await axiosInstance.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${cookie?.token || 'token'}`
                }
            });
        }

        return await axiosInstance.get(endpoint);
    },

    async post(endpoint: string, body: any, isSecure: boolean = false): Promise<any> {
        const cookie = await fetch("http://localhost:3000/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        if (isSecure) {
            return await axiosInstance.post(endpoint, body, {
                headers: {
                    'Authorization': `Bearer ${cookie?.token || 'token'}`
                }
            });
        }

        return await axiosInstance.post(endpoint, body);

    },

    async delete(endpoint: string, isSecure: boolean = false): Promise<any> {
        const cookie = await fetch("http://localhost:3000/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        if (isSecure) {
            return await axiosInstance.delete(endpoint, {
                headers: {
                    'Authorization': `Bearer ${cookie?.token || 'token'}`
                }
            });
        }

        return await axiosInstance.delete(endpoint);
    },

    async introspect(endpoint: string): Promise<any> {
        const accessToken = Cookies.get('access');

        return await axiosInstance.post(endpoint, {
            token: accessToken || '',
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken || ''}`
            }
        });
    },

    async refresh(endpoint: string): Promise<any> {
        const cookie = await fetch("http://localhost:3000/api/get-refresh-token", {
            method: "GET",
        }).then((res) => res.json());

        return axios.post(endpoint, {
            token: cookie?.token,
        });
    }
}

export default http;