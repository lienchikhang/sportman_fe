import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
    url?: string,
    name: string,
}

const AvatarCustom: React.FC<Props> = ({ url, name }) => {
    return (
        url ? <Avatar src={url} sx={{ width: 46, height: 46 }}></Avatar>
            : <Avatar sx={{ width: 46, height: 46 }}>{name[0]}</Avatar>
    )
}

export default AvatarCustom