import React from 'react';
import '../libs/styles/menu.scss';
import Divider from '@mui/material/Divider';
import MenuItem from './MenuItem';

const MenuFilter = () => {
    return (
        <div className='menu__wrapper'>
            <MenuItem type='Season' />
            <Divider />
            <MenuItem type='Size' />
            <Divider />
            <MenuItem type='Club' />
            <Divider />
            <MenuItem type='Price' />
        </div>
    )
}

export default MenuFilter