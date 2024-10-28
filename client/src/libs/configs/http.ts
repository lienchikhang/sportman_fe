import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import axiosInstance from "./axios";
import axios from "axios";

const http = {

    async get(endpoint: string): Promise<any> {

        const cookie = await fetch("http://localhost:3000/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        return await axiosInstance.get(endpoint, {
            headers: {
                "Authorization": cookie?.token,
            }
        });
    },

    async post(endpoint: string, body: any): Promise<any> {
        const cookie = await fetch("http://localhost:3000/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        return await axiosInstance.post(endpoint, body, {
            headers: {
                "Authorization": cookie?.token,
            }
        });
    },

    async introspect(endpoint: string): Promise<any> {
        const cookie = await fetch("http://localhost:3000/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        return await axiosInstance.post(endpoint, {
            token: cookie?.token,
        }, {
            headers: {
                "Authorization": cookie?.token,
            }
        });
    },

    async refresh(endpoint: string) {
        const cookie = await fetch("http://localhost:3000/api/get-refresh-token", {
            method: "GET",
        }).then((res) => res.json());

        return await axios.post(endpoint, {
            token: cookie?.token,
        });
    }
}

export default http;