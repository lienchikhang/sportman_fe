import { ReactNode } from "react";

const convertCommentText = (text: string): string => {
    if (text.length <= 100) return text;
    return text.slice(0, 100) + "...";
}

const convertProductText = (text: string): string => {
    if (text.length <= 64) return text;
    return text.slice(0, 64) + "...";
}

export {
    convertCommentText,
    convertProductText,
}