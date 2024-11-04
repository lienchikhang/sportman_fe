'use client';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useModalAuth } from '@/libs/contexts/modal.auth.context';


const ModalOpenButton = () => {

    const { handleToggle } = useModalAuth();

    const handleClick = () => {
        handleToggle(true);
    }

    return (
        <div onClick={handleClick}>
            <PersonIcon />
        </div>
    )
}

export default ModalOpenButton