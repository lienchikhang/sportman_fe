import { ReactNode } from "react";

const convertCommentText = (text: string): string => {
    if (text.length <= 100) return text;
    return text.slice(0, 100) + "...";
}

const convertProductText = (text: string): string => {
    if (text.length <= 64) return text;
    return text.slice(0, 64) + "...";
}

const convertText = (text: string, length: number = 20) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
}

export {
    convertCommentText,
    convertProductText,
    convertText
}