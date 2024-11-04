'use client';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useModalAuth } from '@/libs/contexts/modal.auth.context';


const ModalCloseButton = () => {

    const { handleToggle } = useModalAuth();

    const handleClick = () => {
        handleToggle(false);
    }

    return (
        <div className='modalBtn' onClick={handleClick}>
            <ClearIcon />
        </div>
    )
}

export default ModalCloseButton