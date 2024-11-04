'use client';
import React, { useState } from 'react';
import AvatarCustom from './Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '@/libs/contexts/user.context';


const User = () => {

    const [isHovered, setIsHovered] = useState(false);
    const { user, logout } = useUser();

    const handleClick = () => {

    }

    if (!user) {
        return <div className='user__wrapper' onClick={handleClick}>
            <PersonIcon />
        </div>
    }

    return <AvatarCustom variant='rounded' url={user.avatar || ''} name={user.username} />;
};

export default User