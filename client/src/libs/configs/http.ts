import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import axiosInstance from "./axios";

const http = {

    async get(endpoint: string): Promise<any> {

        const cookie = await fetch("/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        return await axiosInstance.get(endpoint, {
            headers: {
                "Authorization": cookie?.token,
            }
        });
    }

}

export default http;