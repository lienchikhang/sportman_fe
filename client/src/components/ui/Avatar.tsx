import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
    url?: string,
    name: string,
    variant?: string,
}

const AvatarCustom: React.FC<Props> = ({ url, name, variant = "rounded" }) => {
    return (
        url ? <Avatar variant={variant == "rounded" ? "rounded" : "square"} src={url} sx={{ width: 46, height: 46 }} ></Avatar>
            : <Avatar variant={variant == "rounded" ? "rounded" : "square"} sx={{ width: 46, height: 46, borderRadius: "11px" }}>{name[0]}</Avatar>
    )
}

export default AvatarCustom