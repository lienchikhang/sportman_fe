import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    cookies().delete("access");
    cookies().delete("refresh");

    // Xử lý hoặc trả về cookies/token
    return NextResponse.json({ isDone: true });
}