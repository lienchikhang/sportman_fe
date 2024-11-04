'use client';
import React, { useEffect, useState } from 'react';
import AvatarCustom from './Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '@/libs/contexts/user.context';
import ModalAuth from '../ModalAuth';
import { ModalAuthProvider, useModalAuth } from '@/libs/contexts/modal.auth.context';
import ModalOpenButton from '../ModalOpenButton';


const User = () => {

    const [isHovered, setIsHovered] = useState(false);
    const { user, logout } = useUser();


    if (!user) {
        return <div className='user__wrapper'>
            <ModalAuthProvider>
                <ModalAuth />
                <ModalOpenButton />
            </ModalAuthProvider>
        </div>
    }

    return <AvatarCustom variant='rounded' url={user.avatar || ''} name={user.username} />;
};

export default User